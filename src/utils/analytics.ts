type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] }
  }
}

const env = import.meta.env
const enabled = env.PROD
const gaId: string | undefined = env.VITE_GA_MEASUREMENT_ID
const adsId: string | undefined = env.VITE_GOOGLE_ADS_ID
const adsLeadLabel: string | undefined = env.VITE_GOOGLE_ADS_LEAD_LABEL
const clarityId: string | undefined = env.VITE_CLARITY_PROJECT_ID

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

  if (href.startsWith('tel:')) trackEvent('contact_click', { method: 'phone', page })
  else if (href.startsWith('mailto:')) trackEvent('contact_click', { method: 'email', page })
  else if (/^\/(start-project|book|project-update)/.test(href)) trackEvent('cta_click', { label, destination: href, page })
}

export function initAnalytics() {
  if (!enabled) return

  if (gaId || adsId) {
    window.dataLayer = window.dataLayer ?? []
    window.gtag = function gtag() {
      // gtag.js only accepts the native arguments object, not a rest array.
      window.dataLayer!.push(arguments)
    }
    window.gtag('js', new Date())
    if (gaId) window.gtag('config', gaId, { send_page_view: false })
    if (adsId) window.gtag('config', adsId)
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${gaId ?? adsId}`)
  }

  if (clarityId) {
    const clarity: NonNullable<Window['clarity']> = (...args: unknown[]) => {
      ;(clarity.q = clarity.q ?? []).push(args)
    }
    window.clarity = window.clarity ?? clarity
    loadScript(`https://www.clarity.ms/tag/${clarityId}`)
  }

  document.addEventListener('click', handleClick, { capture: true })
}

export function trackPageView() {
  if (!enabled || !gaId) return
  window.gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
  })
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (!enabled) return
  window.gtag?.('event', name, params)
  window.clarity?.('event', name)
}

export function trackLead(form: 'contact' | 'start_project' | 'booking', params: EventParams = {}) {
  trackEvent('generate_lead', { form, ...params })
  if (enabled && adsId && adsLeadLabel) {
    window.gtag?.('event', 'conversion', { send_to: `${adsId}/${adsLeadLabel}` })
  }
  window.clarity?.('set', 'lead', form)
}
