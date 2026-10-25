// ============================================================
// QORA — WhatsApp URL Helper
// Builds WhatsApp deep links from env config
// Never hardcodes secrets or tokens
// ============================================================

import { SITE_CONFIG, WHATSAPP_MESSAGES, type WhatsAppContext } from '@/data/site-config'

/**
 * Builds a WhatsApp click-to-chat URL with a pre-filled message.
 * Uses the public WhatsApp number from environment/config.
 * No API credentials required for this link-based integration.
 */
export function buildWhatsAppUrl(context: WhatsAppContext): string {
  const number  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || SITE_CONFIG.whatsapp.number
  const message = WHATSAPP_MESSAGES[context]
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${number}?text=${encoded}`
}

/**
 * Opens WhatsApp in a new tab with appropriate attribution.
 * Call this client-side only.
 */
export function openWhatsApp(context: WhatsAppContext): void {
  const url = buildWhatsAppUrl(context)
  window.open(url, '_blank', 'noopener,noreferrer')
}
