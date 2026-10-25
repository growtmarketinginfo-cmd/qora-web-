'use client'

import WhatsAppButton from '@/components/WhatsAppButton'
import { SITE_CONFIG } from '@/data/site-config'

export default function FinalCTA() {
  return (
    <section
      className="section bg-qora-bg relative overflow-hidden"
      aria-labelledby="finalcta-headline"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,242,65,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Terrain grid subtle */}
      <div className="absolute inset-0 terrain-bg bg-grid-64 opacity-50" aria-hidden="true" />

      <div className="container-qora relative z-10 text-center">

        {/* Headline */}
        <h2
          id="finalcta-headline"
          className="qora-headline text-4xl md:text-6xl text-qora-text max-w-3xl mx-auto mb-6 text-balance"
        >
          Cada consulta es{' '}
          <span className="text-gradient">una oportunidad.</span>
        </h2>

        <p className="text-qora-muted text-xl max-w-2xl mx-auto mb-4">
          ¿Cuántas oportunidades podría estar perdiendo tu agencia mientras tu equipo está ocupado?
        </p>

        <p className="text-qora-subtle text-base max-w-xl mx-auto mb-12">
          La primera conversación es gratuita. Sin compromiso. Te mostramos exactamente cómo QORA puede ayudar a tu operación.
        </p>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <WhatsAppButton
            context="final"
            label="Hablar con QORA"
            size="lg"
          />
          <a
            href="#contacto"
            className="btn-secondary"
          >
            Solicitar diagnóstico
          </a>
        </div>

        {/* Contact detail */}
        <p className="mt-10 text-qora-subtle text-sm">
          {SITE_CONFIG.whatsapp.display} · {SITE_CONFIG.location}
        </p>

        {/* Micro-copy */}
        <p className="mt-3 font-mono text-xs text-qora-subtle tracking-widest uppercase">
          Intelligence for the Wild
        </p>
      </div>
    </section>
  )
}
