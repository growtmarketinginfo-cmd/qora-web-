'use client'

import { Moon, Clock, RotateCcw, UserX, Layers, TrendingDown } from 'lucide-react'
import WhatsAppButton from '@/components/WhatsAppButton'

const PROBLEMS = [
  {
    icon: Moon,
    title: 'Consultas nocturnas sin respuesta',
    desc: 'Un turista escribe a las 11 PM preguntando por Santa Cruz. No hay nadie. Busca otra agencia.',
  },
  {
    icon: Clock,
    title: 'Respuestas que llegan tarde',
    desc: 'Cuando tu equipo responde al día siguiente, la conversación ya está fría — o el cliente ya reservó en otro lugar.',
  },
  {
    icon: RotateCcw,
    title: 'Las mismas preguntas, todo el día',
    desc: '"¿Cuánto cuesta?" "¿Qué incluye?" "¿Necesito aclimatarme?" Tu equipo responde lo mismo cien veces.',
  },
  {
    icon: UserX,
    title: 'Leads sin seguimiento',
    desc: 'Una consulta llega, se responde, y nadie hace seguimiento. La oportunidad se enfría y se pierde.',
  },
  {
    icon: Layers,
    title: 'Conversaciones dispersas',
    desc: 'WhatsApp, Instagram, email, teléfono. Imposible dar seguimiento a todo sin perder algo.',
  },
  {
    icon: TrendingDown,
    title: 'Oportunidades que se enfrían',
    desc: 'Cada consulta sin respuesta rápida es una oportunidad que disminuye con el tiempo.',
  },
]

export default function Problem() {
  return (
    <section
      id="problema"
      className="section bg-qora-bg"
      aria-labelledby="problem-headline"
    >
      <div className="container-qora">

        {/* Label */}
        <div className="mb-6">
          <span className="qora-label">El problema</span>
        </div>

        {/* Headline */}
        <h2
          id="problem-headline"
          className="qora-headline text-3xl md:text-5xl text-qora-text max-w-3xl mb-6 text-balance"
        >
          Mientras tú operas la montaña,
          <br />
          <span className="text-qora-muted">tus clientes siguen preguntando.</span>
        </h2>

        <p className="text-qora-muted text-lg max-w-2xl mb-16">
          Los operadores de turismo de aventura gestionan una operación compleja. La atención comercial no siempre puede estar al mismo nivel que la operación en campo — y eso tiene un costo.
        </p>

        {/* Problem Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROBLEMS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="card hover:border-qora-muted/30 transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-lg bg-qora-bg border border-qora-border flex items-center justify-center mb-4">
                <Icon size={16} className="text-qora-muted" aria-hidden="true" />
              </div>
              <h3 className="font-display font-semibold text-qora-text text-sm mb-2">
                {title}
              </h3>
              <p className="text-qora-muted text-sm leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Consequence bridge */}
        <div className="mt-16 p-8 rounded-xl border border-qora-border bg-qora-surface/50 max-w-2xl">
          <p className="text-qora-muted text-base leading-relaxed">
            No es un problema de motivación ni de equipo. Es un problema de capacidad:
            un negocio de turismo de aventura no puede tener a alguien disponible las 24 horas
            respondiendo mensajes — y aún así cada consulta representa una oportunidad real.
          </p>
        </div>

        {/* CTA bridge */}
        <div className="mt-10">
          <WhatsAppButton
            context="hero"
            label="Ver cómo QORA lo resuelve"
            variant="secondary"
            size="md"
          />
        </div>
      </div>
    </section>
  )
}
