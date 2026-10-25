'use client'

import { useState, useCallback } from 'react'
import { trackEvent } from '@/lib/analytics'
import WhatsAppButton from '@/components/WhatsAppButton'

interface CalcState {
  monthlyQueries:   number
  avgTicket:        number
  currentConvRate:  number  // percentage 0–100
  offHoursPercent:  number  // percentage 0–100
}

const DEFAULT: CalcState = {
  monthlyQueries:  80,
  avgTicket:       400,
  currentConvRate: 15,
  offHoursPercent: 35,
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
  id,
}: {
  label:    string
  value:    number
  min:      number
  max:      number
  step:     number
  format:   (_v: number) => string
  onChange: (_v: number) => void
  id:       string
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="text-qora-text text-sm font-medium">{label}</label>
        <span className="font-mono text-qora-primary text-sm font-semibold">{format(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="
          w-full h-1.5 rounded-full appearance-none cursor-pointer
          bg-qora-border
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-qora-primary
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:transition-transform
          [&::-webkit-slider-thumb]:hover:scale-110
          accent-[#C8F241]
        "
        aria-label={label}
      />
      <div className="flex justify-between mt-1">
        <span className="text-qora-subtle text-xs">{format(min)}</span>
        <span className="text-qora-subtle text-xs">{format(max)}</span>
      </div>
    </div>
  )
}

export default function ROICalculator() {
  const [calc, setCalc] = useState<CalcState>(DEFAULT)

  const update = useCallback(
    (field: keyof CalcState) => (value: number) => {
      setCalc((prev) => ({ ...prev, [field]: value }))
      // Track usage when any slider moves (debounce not needed for this simple case)
      trackEvent({
        name:   'roi_calculator_use',
        params: { monthly_queries: calc.monthlyQueries, avg_ticket: calc.avgTicket },
      })
    },
    [calc.monthlyQueries, calc.avgTicket]
  )

  // ============================================================
  // Calculation — conservative, transparent
  // ============================================================
  const offHoursQueries      = Math.round(calc.monthlyQueries * (calc.offHoursPercent / 100))
  const currentConversions   = Math.round(calc.monthlyQueries * (calc.currentConvRate / 100))
  // Assumption: off-hours queries have ~0 conversion today (none answered)
  // With QORA: capture a portion of those off-hours queries
  const potentialAdditional  = Math.round(offHoursQueries * 0.30) // conservative 30%
  const potentialRevenue     = potentialAdditional * calc.avgTicket

  return (
    <section
      id="roi"
      className="section bg-qora-surface/10 border-y border-qora-border"
      aria-labelledby="roi-headline"
      onFocus={() => trackEvent({ name: 'pricing_view' })}
    >
      <div className="container-qora">

        <div className="mb-12">
          <span className="qora-label">Calculadora de oportunidad</span>
          <h2
            id="roi-headline"
            className="qora-headline text-3xl md:text-5xl text-qora-text max-w-2xl mt-4 text-balance"
          >
            ¿Cuánta oportunidad podría estar perdiendo tu agencia?
          </h2>
          <p className="text-qora-muted text-lg mt-4 max-w-xl">
            Ajusta los datos de tu operación para ver una estimación.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Inputs */}
          <div className="card space-y-8">
            <h3 className="font-display font-semibold text-qora-text text-base">
              Datos de tu operación
            </h3>

            <Slider
              id="monthly-queries"
              label="Consultas mensuales aproximadas"
              value={calc.monthlyQueries}
              min={10}
              max={500}
              step={10}
              format={(v) => `${v} consultas`}
              onChange={update('monthlyQueries')}
            />
            <Slider
              id="avg-ticket"
              label="Ticket promedio por reserva"
              value={calc.avgTicket}
              min={50}
              max={3000}
              step={50}
              format={(v) => `S/. ${v.toLocaleString()}`}
              onChange={update('avgTicket')}
            />
            <Slider
              id="conv-rate"
              label="% de consultas que actualmente convierten"
              value={calc.currentConvRate}
              min={1}
              max={60}
              step={1}
              format={(v) => `${v}%`}
              onChange={update('currentConvRate')}
            />
            <Slider
              id="off-hours"
              label="% de consultas que llegan fuera de horario"
              value={calc.offHoursPercent}
              min={5}
              max={80}
              step={5}
              format={(v) => `${v}%`}
              onChange={update('offHoursPercent')}
            />
          </div>

          {/* Output */}
          <div className="space-y-4">
            {/* Main metric */}
            <div className="card-glow border-qora-primary/20 bg-qora-primary/5">
              <p className="font-mono text-xs text-qora-primary tracking-widest uppercase mb-2">
                Oportunidad potencial no capturada / mes
              </p>
              <p className="font-display font-bold text-4xl md:text-5xl text-qora-primary mb-1">
                S/. {potentialRevenue.toLocaleString()}
              </p>
              <p className="text-qora-muted text-sm">
                Basado en {offHoursQueries} consultas fuera de horario sin respuesta, con un 30% de captura potencial conservadora.
              </p>
            </div>

            {/* Supporting metrics */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: 'Consultas/mes sin respuesta',
                  value: `~${offHoursQueries}`,
                },
                {
                  label: 'Conversiones actuales/mes',
                  value: `~${currentConversions}`,
                },
                {
                  label: 'Potencial adicional/mes',
                  value: `+${potentialAdditional}`,
                },
                {
                  label: 'Ticket promedio',
                  value: `S/. ${calc.avgTicket}`,
                },
              ].map(({ label, value }) => (
                <div key={label} className="card p-4">
                  <p className="font-mono font-semibold text-qora-text text-lg">{value}</p>
                  <p className="text-qora-muted text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="p-4 rounded-xl border border-qora-border bg-qora-bg/40">
              <p className="text-qora-subtle text-xs leading-relaxed">
                ⚠️ Estimación basada en los datos ingresados y supuestos conservadores. No representa una garantía de resultados. Los resultados reales dependen de múltiples factores operativos.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <p className="text-qora-muted text-sm mb-3">
                ¿Quieres entender exactamente cuánto está perdiendo tu agencia?
              </p>
              <WhatsAppButton
                context="diagnostic"
                label="Solicitar diagnóstico gratuito"
                size="md"
                className="w-full justify-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
