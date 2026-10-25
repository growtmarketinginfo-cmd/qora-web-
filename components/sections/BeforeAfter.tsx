'use client'

import { X, Check } from 'lucide-react'

const BEFORE = [
  { time: '11:47 PM', event: 'Turista escribe preguntando por disponibilidad para Santa Cruz.' },
  { time: '11:48 PM', event: 'No hay respuesta. El agente está durmiendo.' },
  { time: '11:52 PM', event: 'El turista espera unos minutos y sigue buscando.' },
  { time: '12:01 AM', event: 'Encuentra otra agencia. Completa la reserva ahí.' },
  { time: 'Mañana',   event: 'Tu equipo ve el mensaje. La oportunidad ya no existe.' },
]

const AFTER = [
  { time: '11:47 PM', event: 'Turista escribe preguntando por disponibilidad.' },
  { time: '11:47 PM', event: 'QORA responde en segundos. Saluda y pregunta detalles.' },
  { time: '11:49 PM', event: 'Entiende la intención. Entrega información del tour, precio y fechas.' },
  { time: '11:51 PM', event: 'Recopila: nombre, grupo, fecha, necesidades especiales.' },
  { time: '11:53 PM', event: 'Orienta al siguiente paso. Registra la oportunidad.' },
  { time: 'Mañana',   event: 'Tu equipo tiene contexto completo. La conversación puede continuar.' },
]

export default function BeforeAfter() {
  return (
    <section
      className="section bg-qora-bg"
      aria-label="Comparación antes y después de QORA"
    >
      <div className="container-qora">

        <div className="mb-12">
          <span className="qora-label">El cambio</span>
          <h2 className="qora-headline text-3xl md:text-5xl text-qora-text max-w-2xl mt-4 text-balance">
            Lo que ocurre cuando una consulta llega a las 11 PM.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* BEFORE */}
          <div className="rounded-xl border border-red-900/30 bg-red-950/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-red-900/30 flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-red-900/30 flex items-center justify-center">
                <X size={12} className="text-red-400" aria-hidden="true" />
              </div>
              <span className="font-display font-semibold text-red-400 text-sm">Sin QORA</span>
            </div>
            <div className="p-6">
              <ul className="space-y-4" role="list">
                {BEFORE.map(({ time, event }) => (
                  <li key={time} className="flex gap-4">
                    <span className="font-mono text-xs text-red-800 w-16 flex-shrink-0 pt-0.5">
                      {time}
                    </span>
                    <span className="text-qora-muted text-sm leading-relaxed">{event}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 rounded-lg bg-red-950/20 border border-red-900/20">
                <p className="text-red-400/80 text-sm font-medium">
                  Resultado: oportunidad perdida.
                </p>
              </div>
            </div>
          </div>

          {/* AFTER */}
          <div className="rounded-xl border border-qora-primary/20 bg-qora-primary/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-qora-primary/20 flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-qora-primary/20 flex items-center justify-center">
                <Check size={12} className="text-qora-primary" aria-hidden="true" />
              </div>
              <span className="font-display font-semibold text-qora-primary text-sm">Con QORA</span>
            </div>
            <div className="p-6">
              <ul className="space-y-4" role="list">
                {AFTER.map(({ time, event }) => (
                  <li key={`${time}-${event}`} className="flex gap-4">
                    <span className="font-mono text-xs text-qora-primary/60 w-16 flex-shrink-0 pt-0.5">
                      {time}
                    </span>
                    <span className="text-qora-muted text-sm leading-relaxed">{event}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 rounded-lg bg-qora-primary/10 border border-qora-primary/20">
                <p className="text-qora-primary text-sm font-medium">
                  Resultado: oportunidad registrada y lista para convertir.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-qora-subtle text-sm max-w-xl">
          * Representación conceptual del flujo de atención. Los resultados reales dependen de la configuración del agente y la operación de cada agencia.
        </p>
      </div>
    </section>
  )
}
