// Remembers where a visitor came from (ad click IDs, UTM tags, referrer, landing page) so the
// source can be attached to a lead even if they browse several pages before submitting.

export type Attribution = Record<string, string>

const storageKey = 'etl_attribution'
const maxAgeMs = 30 * 24 * 60 * 60 * 1000

const campaignParams = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'msclkid',
]

type Stored = { capturedAt: number; data: Attribution }

function read(): Stored | null {
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return null
    const stored = JSON.parse(raw) as Stored
    return Date.now() - stored.capturedAt < maxAgeMs ? stored : null
  } catch {
    return null
  }
}

function write(data: Attribution) {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ capturedAt: Date.now(), data }))
  } catch {
    // Storage can be blocked (private mode, strict settings). Attribution is best-effort.
  }
}

function externalReferrer() {
  try {
    if (!document.referrer) return ''
    return new URL(document.referrer).origin !== window.location.origin ? document.referrer : ''
  } catch {
    return ''
  }
}

// Call once on initial page load, before the router changes the URL.
export function captureAttribution() {
  const params = new URLSearchParams(window.location.search)
  const data: Attribution = {}
  for (const key of campaignParams) {
    const value = params.get(key)
    if (value) data[key] = value
  }
  const referrer = externalReferrer()
  if (referrer) data.referrer = referrer

  const existing = read()
  const hasCampaign = campaignParams.some((key) => data[key])

  // A new ad click replaces the old source. A plain referral only counts if nothing is saved yet,
  // so someone who clicked an ad and later came back through Google still credits the ad.
  if (hasCampaign || (referrer && !existing)) {
    data.landing_page = window.location.pathname
    write(data)
  }
}

export function getAttribution(): Attribution {
  return read()?.data ?? {}
}
