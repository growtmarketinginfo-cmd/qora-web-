// ============================================================
// QORA — Site Configuration
// Central source of truth for all site-wide data
// ============================================================

export const SITE_CONFIG = {
  name: 'QORA',
  tagline: 'Intelligence for the Wild',
  category: 'AI Operating System for Adventure Tourism',
  product: 'QORA AI Sales Agent',
  description:
    'QORA ayuda a operadores de turismo de aventura a responder consultas 24/7, capturar oportunidades y automatizar procesos comerciales mediante IA.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://qora.ai',
  location: 'Huaraz, Áncash, Perú',
  whatsapp: {
    number: '51958226909',
    display: '+51 958 226 909',
  },
  social: {
    instagram: '', // To be configured
  },
  ogImage: '/og-image.png',
} as const

export const WHATSAPP_MESSAGES = {
  hero:       'Hola, quiero conocer QORA para mi agencia.',
  demo:       'Hola, acabo de probar la demo de QORA y quiero saber cómo funcionaría con mi agencia.',
  pricing:    'Hola, quiero conocer los planes de QORA.',
  diagnostic: 'Hola, quiero hacer un diagnóstico de atención y ventas de mi agencia.',
  final:      'Hola, ¿están disponibles para hablar sobre QORA?',
  form:       'Hola, vengo de la web de QORA. Completé el formulario y quiero evaluar cómo implementarlo en mi agencia.',
} as const

export type WhatsAppContext = keyof typeof WHATSAPP_MESSAGES
