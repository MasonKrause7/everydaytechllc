type EventParams = Record<string, string | number | boolean | undefined>

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue: unknown[]
  push: Fbq
  loaded: boolean
  version: string
  disablePushState?: boolean
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] }
    fbq?: Fbq
    _fbq?: Fbq
  }
}

const env = import.meta.env
const enabled = env.PROD
const gaId: string | undefined = env.VITE_GA_MEASUREMENT_ID
const clarityId: string | undefined = env.VITE_CLARITY_PROJECT_ID
const metaPixelId: string | undefined = env.VITE_META_PIXEL_ID

function loadScript(src: string) {
  const script = document.createElement('script')
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

function handleClick(event: MouseEvent) {
  const link = (event.target as Element | null)?.closest?.('a')
  if (!link) return
  const href = link.getAttribute('href') ?? ''
  const label = link.textContent?.trim() || link.getAttribute('aria-label') || ''
  const page = window.location.pathname

  if (href.startsWith('tel:') || href.startsWith('mailto:')) {
    trackEvent('contact_click', { method: href.startsWith('tel:') ? 'phone' : 'email', page })
    window.fbq?.('track', 'Contact')
  } else if (/^\/(start-project|book|project-update)/.test(href)) {
    trackEvent('cta_click', { label, destination: href, page })
  }
}

function initMetaPixel(pixelId: string) {
  if (window.fbq) return
  // Same queueing stub as Meta's official snippet: calls made before fbevents.js loads are
  // stored and replayed once it arrives.
  const fbq = function () {
    // fbevents.js expects the native arguments object, like gtag.
    const args = arguments as unknown as unknown[]
    if (fbq.callMethod) fbq.callMethod(...args)
    else fbq.queue.push(args)
  } as unknown as Fbq
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []
  // trackPageView sends PageView on each route change, so turn off the pixel's own
  // history tracking to avoid counting every page twice.
  fbq.disablePushState = true
  window.fbq = fbq
  window._fbq = fbq

  fbq('init', pixelId)
  loadScript('https://connect.facebook.net/en_US/fbevents.js')
}

export function initAnalytics() {
  if (!enabled) return

  if (gaId) {
    window.dataLayer = window.dataLayer ?? []
    window.gtag = function gtag() {
      // gtag.js only accepts the native arguments object, not a rest array.
      window.dataLayer!.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', gaId, { send_page_view: false })
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`)
  }

  if (clarityId) {
    const clarity: NonNullable<Window['clarity']> = (...args: unknown[]) => {
      ;(clarity.q = clarity.q ?? []).push(args)
    }
    window.clarity = window.clarity ?? clarity
    loadScript(`https://www.clarity.ms/tag/${clarityId}`)
  }

  if (metaPixelId) initMetaPixel(metaPixelId)

  document.addEventListener('click', handleClick, { capture: true })
}

export function trackPageView() {
  if (!enabled) return
  window.gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
  })
  window.fbq?.('track', 'PageView')
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (!enabled) return
  window.gtag?.('event', name, params)
  window.clarity?.('event', name)
}

// Pass `value` (in USD) when there is a dollar figure, so ad platforms can favor bigger leads.
export function trackLead(form: 'contact' | 'start_project' | 'booking', params: EventParams = {}) {
  if (!enabled) return
  const value = typeof params.value === 'number' ? params.value : undefined
  trackEvent('generate_lead', {
    form,
    ...params,
    ...(value !== undefined && { currency: 'USD' }),
  })
  window.clarity?.('set', 'lead', form)
  window.fbq?.('track', 'Lead', {
    content_name: form,
    ...(value !== undefined && { value, currency: 'USD' }),
  })
}
