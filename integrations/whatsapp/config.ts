// ============================================================
// QORA — WhatsApp Integration Layer
// Prepared for future WhatsApp Cloud API connection
// Current: link-based (no credentials needed)
// Future: webhook-based with Cloud API
// ============================================================

// Environment variables — NEVER hardcode in frontend code
// Copy .env.example to .env.local and fill in values

export const WHATSAPP_CONFIG = {
  // Current: public number for link-based WhatsApp
  // Source: NEXT_PUBLIC_WHATSAPP_NUMBER env var
  publicNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,

  // Future: WhatsApp Cloud API (server-side only)
  // phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  // accessToken:   process.env.WHATSAPP_ACCESS_TOKEN,
  // verifyToken:   process.env.WHATSAPP_VERIFY_TOKEN,
  // webhookUrl:    process.env.WHATSAPP_WEBHOOK_URL,

  // Future: CRM/Botpress webhook
  // botpressUrl:   process.env.BOTPRESS_WEBHOOK_URL,
} as const

/*
 * FUTURE INTEGRATION ARCHITECTURE
 * ================================
 *
 * Web → QORA AI → Botpress → WhatsApp → CRM / Google Sheets / Backend
 *
 * Phase 1 (current): Link-based WhatsApp
 *   - User clicks → opens WhatsApp with pre-filled message
 *   - No credentials needed
 *
 * Phase 2: WhatsApp Cloud API
 *   - Webhook receives messages
 *   - Botpress handles conversation flow
 *   - CRM stores leads
 *   - Requires: WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_ACCESS_TOKEN
 *
 * Phase 3: Full automation
 *   - 24/7 automated responses
 *   - Lead qualification pipeline
 *   - Calendar integration
 *   - Multi-tenant support
 *
 * See integrations/whatsapp/types.ts for data models
 */

export type WhatsAppMessageType =
  | 'text'
  | 'interactive'
  | 'template'
  | 'image'

export interface WhatsAppWebhookPayload {
  object: string
  entry: Array<{
    id: string
    changes: Array<{
      value: {
        messaging_product: string
        metadata: { phone_number_id: string }
        contacts?: Array<{ wa_id: string; profile: { name: string } }>
        messages?: Array<{
          id: string
          from: string
          timestamp: string
          type: WhatsAppMessageType
          text?: { body: string }
        }>
      }
    }>
  }>
}
