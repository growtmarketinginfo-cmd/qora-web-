'use client'

import { useEffect } from 'react'
import { ArrowRight, Zap } from 'lucide-react'
import WhatsAppButton from '@/components/WhatsAppButton'
import { trackEvent } from '@/lib/analytics'

// Abstract SVG terrain/signal visualization
function TerrainVisual() {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden" aria-hidden="true">
      {/* Grid terrain */}
      <svg
        viewBox="0 0 800 400"
        className="absolute inset-0 w-full h-full opacity-20"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Topographic contour lines */}
        <g stroke="#C8F241" strokeWidth="0.5" fill="none" opacity="0.6">
          <path d="M0,320 Q200,280 400,300 Q600,320 800,280" />
          <path d="M0,280 Q200,240 400,260 Q600,280 800,240" />
          <path d="M0,240 Q200,180 400,210 Q600,240 800,190" />
          <path d="M0,200 Q200,140 400,160 Q600,200 800,150" />
          <path d="M0,160 Q200,100 400,120 Q600,160 800,110" />
          <path d="M0,120 Q200,80 400,90 Q600,120 800,80" />
          <path d="M0,80 Q200,50 400,60 Q600,80 800,50" />
        </g>

        {/* Signal lines — data flow */}
        <g stroke="#4FFFB0" strokeWidth="1" fill="none" opacity="0.4">
          <path d="M100,350 L150,300 L200,320 L250,280 L300,290 L400,240 L500,260 L600,220 L700,230" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" values="0;-32" dur="2s" repeatCount="indefinite" />
          </path>
          <path d="M0,380 L100,360 L200,340 L300,330 L450,310 L600,290 L800,270" strokeDasharray="3 6" opacity="0.3">
            <animate attributeName="stroke-dashoffset" values="0;-27" dur="3s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Data nodes / signal points */}
        <g fill="#C8F241">
          <circle cx="250" cy="280" r="3" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="240" r="4" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="600" cy="220" r="2.5" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Altitude markers */}
        <g fill="#6B7280" fontSize="9" fontFamily="monospace">
          <text x="20"  y="325" opacity="0.5">4750m</text>
          <text x="20"  y="285" opacity="0.5">4600m</text>
          <text x="20"  y="245" opacity="0.5">4400m</text>
          <text x="20"  y="205" opacity="0.5">4200m</text>
        </g>

        {/* Grid overlay */}
        <g stroke="#C8F241" strokeWidth="0.2" opacity="0.15">
          {[0, 100, 200, 300, 400, 500, 600, 700, 800].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="400" />
          ))}
          {[0, 50, 100, 150, 200, 250, 300, 350, 400].map((y) => (
            <line key={y} x1="0" y1={y} x2="800" y2={y} />
          ))}
        </g>
      </svg>

      {/* Gradient fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-qora-bg to-transparent" />
    </div>
  )
}

export default function Hero() {
  useEffect(() => {
    trackEvent({ name: 'page_view' })
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden terrain-bg bg-grid-64"
      aria-labelledby="hero-headline"
    >
      {/* Radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(200,242,65,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container-qora px-4 pt-28 pb-16 relative z-10">

        {/* Category label */}
        <div className="flex items-center gap-2 mb-8">
          <span className="signal-dot" aria-hidden="true" />
          <span className="qora-label">AI Operating System for Adventure Tourism</span>
        </div>

        {/* Main headline */}
        <h1
          id="hero-headline"
          className="qora-headline text-4xl md:text-6xl lg:text-7xl text-qora-text max-w-4xl text-balance mb-6"
        >
          La inteligencia que ayuda a los operadores de aventura a{' '}
          <span className="text-gradient">responder, vender y operar mejor.</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-qora-muted text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Atiende consultas 24/7, califica oportunidades y automatiza el seguimiento — para que menos clientes se pierdan antes de reservar.
        </p>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <WhatsAppButton
            context="hero"
            label="Hablar con QORA"
            size="lg"
            onClick={() => trackEvent({ name: 'hero_cta_click', params: { cta: 'whatsapp' } })}
          />
          <a
            href="#como-funciona"
            className="btn-secondary"
            onClick={() => trackEvent({ name: 'hero_cta_click', params: { cta: 'see_how' } })}
          >
            <span>Ver cómo funciona</span>
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        {/* Trust micro-signals */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          {[
            'Respuesta inmediata',
            'Español e inglés',
            '24/7',
            'Sin reemplazar a tu equipo',
          ].map((tag) => (
            <span key={tag} className="data-tag">
              <Zap size={10} className="text-qora-primary" aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Terrain visual */}
      <div className="container-qora px-0 relative z-10">
        <TerrainVisual />
      </div>
    </section>
  )
}
