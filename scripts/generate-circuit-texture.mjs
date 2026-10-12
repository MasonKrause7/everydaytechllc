// Generates the circuit-board background textures in src/assets/brand. The layout wraps on
// every edge, so it tiles seamlessly when the texture runs continuously down a long page.
// Usage: node scripts/generate-circuit-texture.mjs [seed]
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const SEED = Number(process.argv[2] ?? 7)
const G = 12
const W = 1680
const H = 2016
const COLS = W / G
const ROWS = H / G
const VIA_R = 3
const BUS_SPACING_SHIFT = G * (Math.SQRT2 - 1)

function mulberry32(a) {
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(SEED)
const randInt = (min, max) => min + Math.floor(rand() * (max - min + 1))
const pick = (items) => items[Math.floor(rand() * items.length)]

const blocked = new Uint8Array(COLS * ROWS)
const wrap = (n, size) => ((n % size) + size) % size
const cellIndex = (cx, cy) => wrap(cy, ROWS) * COLS + wrap(cx, COLS)
const ORTHO = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

const blobs = Array.from({ length: 16 }, () => ({
  x: rand() * W,
  y: rand() * H,
  r: 220 + rand() * 260,
}))

function density(x, y) {
  let d = 0.03
  for (const b of blobs) {
    const dx = Math.min(Math.abs(wrap(x, W) - b.x), W - Math.abs(wrap(x, W) - b.x))
    const dy = Math.min(Math.abs(wrap(y, H) - b.y), H - Math.abs(wrap(y, H) - b.y))
    d += Math.exp(-(dx ** 2 + dy ** 2) / b.r ** 2)
  }
  return Math.min(d, 1) ** 2
}

function cellsOf(line) {
  const cells = []
  for (let i = 1; i < line.length; i++) {
    const [ax, ay] = line[i - 1]
    const [bx, by] = line[i]
    const steps = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / (G / 2)))
    for (let s = 0; s <= steps; s++) {
      const t = s / steps
      cells.push([Math.round((ax + (bx - ax) * t) / G), Math.round((ay + (by - ay) * t) / G)])
    }
  }
  return cells
}

function canPlace(lines) {
  return lines.every((line) => cellsOf(line).every(([cx, cy]) => !blocked[cellIndex(cx, cy)]))
}

function commit(lines) {
  for (const line of lines) {
    for (const [cx, cy] of cellsOf(line)) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) blocked[cellIndex(cx + dx, cy + dy)] = 1
      }
    }
  }
}

function singleTrace() {
  let [x, y] = [randInt(0, COLS - 1), randInt(0, ROWS - 1)]
  if (rand() > density(x * G, y * G)) return null

  let [dx, dy] = pick(ORTHO)
  const points = [[x * G, y * G]]
  const segments = randInt(2, 5)

  for (let s = 0; s < segments; s++) {
    const run = randInt(3, 12)
    const next = [(x + dx * run) * G, (y + dy * run) * G]
    if (!canPlace([[points.at(-1), next]])) break
    points.push(next)
    x += dx * run
    y += dy * run

    if (s === segments - 1) break
    const [px, py] = rand() < 0.5 ? [-dy, dx] : [dy, -dx]
    const turn = rand() < 0.45
    const diag = turn ? randInt(1, 2) : randInt(2, 4)
    const bend = [(x + (dx + px) * diag) * G, (y + (dy + py) * diag) * G]
    if (!canPlace([[points.at(-1), bend]])) break
    points.push(bend)
    x += (dx + px) * diag
    y += (dy + py) * diag
    if (turn) [dx, dy] = [px, py]
  }

  const length = points.slice(1).reduce((sum, p, i) => sum + Math.hypot(p[0] - points[i][0], p[1] - points[i][1]), 0)
  if (points.length < 3 || length < 8 * G || !canPlace([points])) return null
  commit([points])
  return [{ points, startVia: rand() < 0.85, endVia: rand() < 0.85 }]
}

function busTraces() {
  const count = randInt(2, 4)
  const x0 = randInt(0, COLS - 1) * G
  const y0 = randInt(0, ROWS - 1) * G
  if (rand() > density(x0, y0)) return null

  const run1 = randInt(4, 10) * G
  const diag = randInt(2, 4) * G
  const run2 = randInt(4, 10) * G
  const s = rand() < 0.5 ? 1 : -1
  const vertical = rand() < 0.4

  const lines = Array.from({ length: count }, (_, i) => {
    const off = i * G
    const bendX = x0 + run1 - s * i * BUS_SPACING_SHIFT
    const raw = [
      [x0, y0 + off],
      [bendX, y0 + off],
      [bendX + diag, y0 + off + s * diag],
      [x0 + run1 + diag + run2, y0 + off + s * diag],
    ]
    return vertical ? raw.map(([a, b]) => [x0 + (b - y0), y0 + (a - x0)]) : raw
  })

  if (!canPlace(lines)) return null
  commit(lines)
  const viasAtStart = rand() < 0.5
  return lines.map((points) => ({ points, startVia: viasAtStart, endVia: !viasAtStart }))
}

function shorten(from, to) {
  const len = Math.hypot(to[0] - from[0], to[1] - from[1])
  return [to[0] - ((to[0] - from[0]) / len) * VIA_R, to[1] - ((to[1] - from[1]) / len) * VIA_R]
}

const traces = []
for (let attempt = 0; attempt < 80000 && traces.length < 280; attempt++) {
  const result = rand() < 0.1 ? busTraces() : singleTrace()
  if (result) traces.push(...result)
}

const fmt = (n) => String(Math.round(n * 10) / 10)
const paths = []
const vias = []
for (const { points, startVia, endVia } of traces) {
  const drawn = points.map((p) => [...p])
  const ends = []
  if (startVia) {
    ends.push(points[0])
    drawn[0] = shorten(points[1], points[0])
  }
  if (endVia) {
    ends.push(points.at(-1))
    drawn[drawn.length - 1] = shorten(points.at(-2), points.at(-1))
  }

  const xs = points.map((p) => p[0])
  const ys = points.map((p) => p[1])
  const shiftX = -Math.floor(Math.min(...xs) / W) * W
  const shiftY = -Math.floor(Math.min(...ys) / H) * H
  for (const ox of [shiftX, shiftX - W]) {
    for (const oy of [shiftY, shiftY - H]) {
      if (Math.max(...xs) + ox < -VIA_R || Math.max(...ys) + oy < -VIA_R) continue
      if (Math.min(...xs) + ox > W + VIA_R || Math.min(...ys) + oy > H + VIA_R) continue
      paths.push('M' + drawn.map(([x, y]) => `${fmt(x + ox)} ${fmt(y + oy)}`).join('L'))
      for (const [x, y] of ends) vias.push([x + ox, y + oy])
    }
  }
}

function svg({ trace, traceOpacity, via, viaOpacity }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
<path stroke="${trace}" stroke-opacity="${traceOpacity}" stroke-linecap="round" stroke-linejoin="round" d="${paths.join('')}"/>
<g stroke="${via}" stroke-opacity="${viaOpacity}">${vias.map(([x, y]) => `<circle cx="${fmt(x)}" cy="${fmt(y)}" r="${VIA_R}"/>`).join('')}</g>
</svg>
`
}

const out = (name) => fileURLToPath(new URL(`../src/assets/brand/${name}`, import.meta.url))
writeFileSync(out('texture-circuit-dark.svg'), svg({ trace: '#e9ecf7', traceOpacity: 0.075, via: '#e9ecf7', viaOpacity: 0.13 }))
writeFileSync(out('texture-circuit-light.svg'), svg({ trace: '#0a0f1f', traceOpacity: 0.07, via: '#3b6bff', viaOpacity: 0.22 }))
console.log(`seed ${SEED}: ${traces.length} traces, ${vias.length} vias`)
