'use client'

import { Mountain, Globe, Moon, Compass } from 'lucide-react'

const USE_CASES = [
  {
    icon:  Mountain,
    tag:   'Trekking',
    title: 'Consulta → Información → Calificación → Reserva',
    scenario:
      'Un grupo de amigos escribe el sábado por la tarde preguntando por Santa Cruz. QORA responde con el itinerario, precio, qué incluye y disponibilidad. Califica el interés y orienta al paso siguiente.',
    detail:
      'Tu equipo tiene el contexto completo cuando retoma el lunes.',
  },
  {
    icon:  Compass,
    tag:   'Montañismo',
    title: 'Consulta técnica → Derivación humana → Seguimiento',
    scenario:
      'Un cliente pregunta por aclimatación para el Huascarán, equipo necesario y certificación del guía. QORA entrega lo que puede responder y avisa al equipo para las preguntas que requieren criterio especializado.',
    detail:
      'Las preguntas técnicas de seguridad siempre van a personas.',
  },
  {
    icon:  Globe,
    tag:   'Turismo internacional',
    title: 'Idioma → Consulta → Información → Lead',
    scenario:
      'Un viajero alemán escribe en inglés. QORA detecta el idioma y responde en inglés con información del tour, precios en USD y qué necesita antes de llegar a Huaraz.',
    detail:
      'Sin necesidad de que tu equipo esté disponible en tiempo real.',
  },
  {
    icon:  Moon,
    tag:   'Fuera de horario',
    title: 'Consulta nocturna → Respuesta → Captura',
    scenario:
      'Son las 11 PM. Alguien está planificando su viaje a Perú desde España. Pregunta por fechas y precios. QORA atiende, recopila los datos y registra el lead para que el equipo dé seguimiento al día siguiente.',
    detail:
      'La oportunidad no se pierde. El equipo continúa la conversación con contexto.',
  },
]

export default function UseCases() {
  return (
    <section
      id="casos"
      className="section bg-qora-bg"
      aria-labelledby="cases-headline"
    >
      <div className="container-qora">

        <div className="mb-12">
          <span className="qora-label">Diseñado para operaciones reales</span>
          <h2
            id="cases-headline"
            className="qora-headline text-3xl md:text-5xl text-qora-text max-w-2xl mt-4 text-balance"
          >
            Casos de uso de turismo de aventura.
          </h2>
          <p className="text-qora-muted text-lg mt-4 max-w-xl">
            No inventamos escenarios. Estos son los flujos que ocurren todos los días en agencias de trekking y montañismo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {USE_CASES.map(({ icon: Icon, tag, title, scenario, detail }) => (
            <div key={tag} className="card hover:border-qora-muted/30 transition-colors duration-200">

              {/* Tag */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-qora-primary/10 border border-qora-primary/20 flex items-center justify-center">
                  <Icon size={14} className="text-qora-primary" aria-hidden="true" />
                </div>
                <span className="font-mono text-xs text-qora-primary tracking-widest uppercase">
                  {tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-semibold text-qora-text text-base mb-3 leading-snug">
                {title}
              </h3>

              {/* Scenario */}
              <p className="text-qora-muted text-sm leading-relaxed mb-4">
                {scenario}
              </p>

              {/* Detail */}
              <div className="pt-3 border-t border-qora-border">
                <p className="text-qora-text/70 text-xs font-medium">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
