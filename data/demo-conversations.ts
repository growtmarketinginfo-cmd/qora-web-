// ============================================================
// QORA — Interactive Demo Conversation Scripts
// Simulates QORA AI Sales Agent responses
// ============================================================

export interface DemoOption {
  id: string
  label: string
  emoji: string
}

export interface DemoResponse {
  id: string
  triggerIds: string[]
  agentMessage: string
  followUpOptions?: string[] // ids of follow-up options to show
}

export const DEMO_OPTIONS: DemoOption[] = [
  { id: 'santa-cruz',    label: 'Quiero hacer Santa Cruz',     emoji: '🏔️' },
  { id: 'precio',        label: '¿Cuánto cuesta?',             emoji: '💰' },
  { id: 'solo',          label: 'Viajo solo',                  emoji: '🎒' },
  { id: 'aclimatacion',  label: '¿Necesito aclimatarme?',      emoji: '🫁' },
  { id: 'ingles',        label: '¿Hablan inglés?',             emoji: '🌎' },
  { id: 'reservar',      label: 'Quiero reservar',             emoji: '✅' },
]

export const DEMO_RESPONSES: DemoResponse[] = [
  {
    id: 'r-santa-cruz',
    triggerIds: ['santa-cruz'],
    agentMessage:
      '¡Excelente elección! 🏔️ La ruta Santa Cruz es una de las más espectaculares de los Andes. Son 4 días / 3 noches, ~50 km, con alturas de hasta 4,750 msnm (Punta Unión). Incluye todo el equipamiento, guía certificado, transporte y alimentación.\n\nPara darte una cotización exacta necesito saber:\n• ¿Cuántas personas viajan?\n• ¿Tienen fechas aproximadas?\n• ¿Necesitan equipo de camping o traen el propio?',
    followUpOptions: ['precio', 'solo', 'aclimatacion', 'reservar'],
  },
  {
    id: 'r-precio',
    triggerIds: ['precio'],
    agentMessage:
      '💰 El precio depende del grupo y los servicios incluidos. Para darte una cotización exacta:\n\n• Santa Cruz (4D/3N): desde S/. 380 pp en grupo\n• Huayhuash completo (9D): desde S/. 1,200 pp\n• Alpamayo circuito: desde S/. 1,800 pp\n\n¿Cuántas personas son? ¿Tienen fechas en mente? Con esa información te preparo una propuesta personalizada.',
    followUpOptions: ['solo', 'reservar'],
  },
  {
    id: 'r-solo',
    triggerIds: ['solo'],
    agentMessage:
      '🎒 ¡Sin problema! Tenemos salidas grupales programadas ideales para viajeros solos. Te conectamos con otros trekkers de todo el mundo. También ofrecemos guía privado si prefieres la experiencia a tu ritmo.\n\nViajeros solos representan una buena parte de nuestros clientes. ¿Tienes fechas en mente? Te comparto el calendario de salidas.',
    followUpOptions: ['aclimatacion', 'precio', 'reservar'],
  },
  {
    id: 'r-aclimatacion',
    triggerIds: ['aclimatacion'],
    agentMessage:
      '🫁 Muy buena pregunta — y fundamental para tu seguridad. Huaraz está a 3,050 msnm, por eso recomendamos:\n\n• Llegar 1-2 días antes de iniciar trekking\n• Primer día: descanso, hidratación, nada de esfuerzo intenso\n• Segundo día: caminata corta de aclimatación (Laguna Wilcacocha o Laguna 69)\n• Tercero en adelante: trekking principal\n\nNuestros guías monitorean el estado de todos los participantes. ¿Cuándo planeas llegar a Huaraz?',
    followUpOptions: ['santa-cruz', 'reservar'],
  },
  {
    id: 'r-ingles',
    triggerIds: ['ingles'],
    agentMessage:
      '🌎 Yes, we work with international travelers regularly! Our guides are bilingual (Spanish/English) and we handle the full coordination in both languages.\n\nWe have experience with travelers from USA, UK, Germany, France, and many other countries. All our safety briefings and route information are available in English.\n\nWhere are you traveling from? We can share our availability for your dates.',
    followUpOptions: ['santa-cruz', 'precio', 'reservar'],
  },
  {
    id: 'r-reservar',
    triggerIds: ['reservar'],
    agentMessage:
      '✅ ¡Perfecto! Para confirmar tu reserva necesito:\n\n1. Nombre completo\n2. Ruta y fechas preferidas\n3. Número de personas\n4. Contacto (WhatsApp)\n\nCon esos datos un especialista de la agencia te confirma disponibilidad y te envía el detalle del pago. ¿Te escribo por WhatsApp para coordinar directamente?',
    followUpOptions: [],
  },
]

export const DEMO_INTRO = 'Hola 👋 Soy el asistente de [Tu Agencia]. Estoy aquí para ayudarte con información sobre nuestros tours, precios y disponibilidad. ¿Qué necesitas saber?'
