// ============================================================
// QORA — Analytics Event System
// Wrapper for GA4 / GTM custom events
// ============================================================

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

type AnalyticsEvent =
  | { name: 'page_view' }
  | { name: 'hero_cta_click';     params: { cta: 'whatsapp' | 'see_how' } }
  | { name: 'whatsapp_click';     params: { context: string; message?: string } }
  | { name: 'demo_start' }
  | { name: 'demo_step';          params: { step: number; option: string } }
  | { name: 'demo_complete' }
  | { name: 'roi_calculator_use'; params: { monthly_queries: number; avg_ticket: number } }
  | { name: 'lead_form_start' }
  | { name: 'lead_form_submit';   params: { source: string } }
  | { name: 'pricing_view' }
  | { name: 'faq_open';           params: { question: string } }
  | { name: 'scroll_depth';       params: { depth: 25 | 50 | 75 | 90 | 100 } }
  | { name: 'outbound_click';     params: { url: string } }

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return

  const { name, ...rest } = event as { name: string; params?: object }

  // Push to GTM dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({ event: name, ...(rest.params || {}) })
  }

  // Also push to gtag if available (GA4 direct)
  if (window.gtag) {
    window.gtag('event', name, rest.params || {})
  }

  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[QORA Analytics]', name, rest.params || '')
  }
}

// ============================================================
// Scroll depth tracking hook helper
// ============================================================
export function initScrollDepthTracking(): () => void {
  if (typeof window === 'undefined') return () => {}

  const depths = [25, 50, 75, 90, 100] as const
  const fired = new Set<number>()

  const handler = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const pct = Math.round((scrollTop / docHeight) * 100)

    for (const depth of depths) {
      if (pct >= depth && !fired.has(depth)) {
        fired.add(depth)
        trackEvent({ name: 'scroll_depth', params: { depth } })
      }
    }
  }

  window.addEventListener('scroll', handler, { passive: true })
  return () => window.removeEventListener('scroll', handler)
}
