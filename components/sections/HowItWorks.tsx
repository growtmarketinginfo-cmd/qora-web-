'use client'

import { Radio, Brain, MessageSquare, Users } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    icon:   Radio,
    title:  'Captura',
    desc:   'QORA recibe la consulta en el canal configurado. Detecta el idioma automáticamente — español o inglés — y reconoce el contexto de la conversación.',
  },
  {
    number: '02',
    icon:   Brain,
    title:  'Entiende',
    desc:   'Identifica la intención del cliente: ¿Qué tour busca? ¿Cuándo viaja? ¿Cuántas personas? ¿Qué necesita saber antes de decidir? Califica la oportunidad.',
  },
  {
    number: '03',
    icon:   MessageSquare,
    title:  'Responde',
    desc:   'Entrega información precisa basada en la base de conocimiento de tu agencia. Precios, itinerarios, requisitos, disponibilidad — según lo que hayas configurado.',
  },
  {
    number: '04',
    icon:   Users,
    title:  'Conecta',
    desc:   'Cuando el caso requiere criterio humano — negociación, decisión compleja, situación especial — QORA deriva al equipo con contexto completo de la conversación.',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="section bg-qora-surface/10 border-y border-qora-border"
      aria-labelledby="how-headline"
    >
      <div className="container-qora">

        <div className="mb-16">
          <span className="qora-label">Mecanismo</span>
          <h2
            id="how-headline"
            className="qora-headline text-3xl md:text-5xl text-qora-text max-w-2xl mt-4 text-balance"
          >
            Cuatro pasos. Una experiencia continua.
          </h2>
          <p className="text-qora-muted text-lg mt-4 max-w-xl">
            QORA no improvisa. Opera dentro de los límites que tú defines — con tu información, tus tours y tus reglas.
          </p>
        </div>

        {/* Steps — horizontal timeline on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">

          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-8 left-[calc(12.5%+1px)] right-[calc(12.5%+1px)] h-px bg-gradient-to-r from-transparent via-qora-border to-transparent"
            aria-hidden="true"
          />

          {STEPS.map(({ number, icon: Icon, title, desc }) => (
            <div key={number} className="flex flex-col items-start">

              {/* Step indicator */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-xl border border-qora-border bg-qora-surface flex items-center justify-center">
                  <Icon size={22} className="text-qora-primary" aria-hidden="true" />
                </div>
                <span className="absolute -top-2 -right-2 font-mono text-xs text-qora-primary bg-qora-bg border border-qora-border px-1.5 py-0.5 rounded">
                  {number}
                </span>
              </div>

              <h3 className="font-display font-bold text-qora-text text-xl mb-3">
                {title}
              </h3>
              <p className="text-qora-muted text-sm leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-14 p-6 rounded-xl border border-qora-border bg-qora-surface/30 max-w-2xl">
          <p className="text-qora-muted text-sm leading-relaxed">
            <span className="text-qora-text font-medium">Importante:</span> QORA no toma decisiones autónomas sobre reservas, precios o situaciones de seguridad. Esas decisiones las toman las personas. QORA facilita, organiza y deriva.
          </p>
        </div>
      </div>
    </section>
  )
}
