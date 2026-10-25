// ============================================================
// QORA — FAQ / Objection Handling Data
// ============================================================

export interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'product' | 'integration' | 'safety' | 'pricing' | 'trust'
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'replace-team',
    category: 'product',
    question: '¿QORA reemplaza a mi equipo?',
    answer:
      'No. QORA complementa a tu equipo y automatiza tareas repetitivas. Cuando una consulta requiere criterio humano, decisión compleja o acción operativa, QORA deriva al responsable correspondiente. Tu equipo sigue siendo central — QORA cubre los momentos en que no pueden estar disponibles.',
  },
  {
    id: 'whatsapp-replace',
    category: 'integration',
    question: 'Ya uso WhatsApp. ¿Por qué necesitaría QORA?',
    answer:
      'QORA no reemplaza WhatsApp — añade una capa inteligente sobre él. La diferencia está en lo que ocurre cuando no hay nadie disponible para responder: QORA atiende, califica la intención del cliente, recopila información relevante y entrega contexto útil a tu equipo cuando retoman la conversación.',
  },
  {
    id: 'english-support',
    category: 'product',
    question: '¿Puede atender en inglés?',
    answer:
      'Sí, cuando el agente está configurado y probado para ello. QORA puede manejar conversaciones en español e inglés según la base de conocimiento que se configure. Idiomas adicionales dependen de la implementación específica.',
  },
  {
    id: 'reservations',
    category: 'product',
    question: '¿QORA puede hacer reservas?',
    answer:
      'QORA puede iniciar y orientar el proceso de reserva: capturar datos, confirmar intención e indicar el siguiente paso. La confirmación final y el procesamiento de pago dependen de las integraciones configuradas con tu sistema de reservas. En la implementación inicial, QORA prepara la reserva y la deriva al equipo humano para confirmar.',
  },
  {
    id: 'emergencies',
    category: 'safety',
    question: '¿QORA puede atender emergencias de montaña?',
    answer:
      'No. QORA no debe usarse como sustituto de servicios profesionales de emergencia. Para situaciones de riesgo en montaña, los protocolos establecidos y los servicios especializados de rescate son siempre la vía correcta. QORA está diseñado para procesos comerciales y de atención al cliente.',
  },
  {
    id: 'bad-response',
    category: 'trust',
    question: '¿Y si QORA responde algo incorrecto?',
    answer:
      'La precisión de las respuestas depende directamente de la base de conocimiento configurada. QORA opera dentro de los límites de lo que se le proporciona — no inventa información. Los casos que requieren criterio, negociación o decisión compleja se derivan al equipo humano. La revisión y ajuste continuo de la configuración es parte del proceso de implementación.',
  },
  {
    id: 'trust-ai',
    category: 'trust',
    question: 'No confío en una IA para atender a mis clientes.',
    answer:
      'Es una preocupación válida. Por eso QORA opera con transparencia: el agente trabaja dentro de una base de conocimiento que tú defines, y los casos sensibles se escalan a tu equipo. Puedes revisar todas las conversaciones. La implementación incluye un período de configuración y pruebas donde ajustamos el comportamiento antes de que atienda clientes reales.',
  },
  {
    id: 'pricing',
    category: 'pricing',
    question: '¿Cuánto cuesta?',
    answer:
      'Los planes de QORA se diseñan según el volumen de tu operación, las integraciones necesarias y el nivel de servicio. Contacta con nosotros para recibir una propuesta específica para tu agencia. No existe un precio genérico porque cada implementación es diferente.',
  },
  {
    id: 'setup-time',
    category: 'product',
    question: '¿Cuánto tiempo toma la implementación?',
    answer:
      'Una implementación inicial puede estar operativa en días, no meses. El proceso incluye configuración de la base de conocimiento con la información de tus tours, pruebas de conversación y ajustes. La complejidad de la integración determina el tiempo total.',
  },
]
