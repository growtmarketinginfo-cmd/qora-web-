'use client'

import { MessageCircle, TrendingUp, Cpu } from 'lucide-react'

const VALUE_PROPS = [
  {
    id:      'responde',
    icon:    MessageCircle,
    label:   '01 — Responde',
    title:   'Tus clientes reciben respuesta incluso cuando tu equipo está ocupado.',
    points: [
      'Atiende consultas en español e inglés.',
      'Cubre horarios nocturnos y fines de semana.',
      'Entrega información precisa basada en tu operación.',
    ],
    result: 'Menos consultas sin respuesta. Mejor primera impresión.',
  },
  {
    id:      'convierte',
    icon:    TrendingUp,
    label:   '02 — Convierte',
    title:   'Identifica intención, califica oportunidades y orienta hacia la reserva.',
    points: [
      'Distingue quién está listo para reservar de quien solo explora.',
      'Recopila datos clave: destino, fecha, grupo, necesidades.',
      'Guía al cliente al siguiente paso concreto.',
    ],
    result: 'Más oportunidades capturadas. Menos calor perdido.',
  },
  {
    id:      'automatiza',
    icon:    Cpu,
    label:   '03 — Automatiza',
    title:   'Reduce tareas repetitivas y organiza la información de las conversaciones.',
    points: [
      'Responde preguntas frecuentes sin intervención del equipo.',
      'Registra la oportunidad y entrega contexto al humano.',
      'Libera tiempo para lo que realmente importa.',
    ],
    result: 'Menos trabajo repetitivo. Más foco en la operación.',
  },
]

export default function ValueProps() {
  return (
    <section
      id="producto"
      className="section bg-qora-surface/20 border-y border-qora-border"
      aria-labelledby="value-headline"
    >
      <div className="container-qora">

        <div className="mb-12">
          <span className="qora-label">QORA AI Sales Agent</span>
          <h2
            id="value-headline"
            className="qora-headline text-3xl md:text-5xl text-qora-text max-w-2xl mt-4 text-balance"
          >
            Captura y convierte mejor tus consultas.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUE_PROPS.map(({ id, icon: Icon, label, title, points, result }) => (
            <div
              key={id}
              className="card-glow flex flex-col"
            >
              {/* Icon + Label */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-qora-primary/10 border border-qora-primary/20 flex items-center justify-center">
                  <Icon size={18} className="text-qora-primary" aria-hidden="true" />
                </div>
                <span className="font-mono text-xs text-qora-primary tracking-widest uppercase">
                  {label}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-semibold text-qora-text text-lg mb-4 leading-snug">
                {title}
              </h3>

              {/* Points */}
              <ul className="space-y-2 mb-6 flex-1" role="list">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-qora-muted text-sm">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-qora-primary flex-shrink-0" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>

              {/* Result */}
              <div className="mt-auto pt-4 border-t border-qora-border">
                <p className="text-qora-text text-sm font-medium">{result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
