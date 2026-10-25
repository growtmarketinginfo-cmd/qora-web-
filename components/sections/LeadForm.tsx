'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, Loader2 } from 'lucide-react'
import {
  leadFormSchema,
  type LeadFormData,
  MONTHLY_QUERIES_OPTIONS,
  TOURISM_TYPE_OPTIONS,
  MAIN_PROBLEM_OPTIONS,
  WANTS_DEMO_OPTIONS,
} from '@/lib/validations'
import { trackEvent } from '@/lib/analytics'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

// ============================================================
// Field sub-components
// ============================================================
function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p role="alert" className="mt-1.5 text-red-400 text-xs">
      {message}
    </p>
  )
}

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-qora-text text-sm font-medium mb-2"
    >
      {children}
      {required && (
        <span className="ml-1 text-qora-primary" aria-label="requerido">*</span>
      )}
    </label>
  )
}

const inputClass = `
  w-full px-4 py-3 rounded-lg text-sm
  bg-qora-bg border border-qora-border
  text-qora-text placeholder:text-qora-subtle
  transition-colors duration-150
  focus:outline-none focus:border-qora-primary/60 focus:ring-1 focus:ring-qora-primary/20
`

const selectClass = `
  ${inputClass}
  appearance-none cursor-pointer
`

// ============================================================
// Success state
// ============================================================
function SuccessState() {
  const waUrl = buildWhatsAppUrl('form')
  return (
    <div className="text-center py-12 px-6">
      <div className="w-16 h-16 rounded-full bg-qora-primary/10 border border-qora-primary/20 flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={28} className="text-qora-primary" />
      </div>
      <h3 className="font-display font-bold text-qora-text text-xl mb-3">
        Solicitud recibida.
      </h3>
      <p className="text-qora-muted text-sm leading-relaxed mb-8 max-w-sm mx-auto">
        Hemos recibido tu información. Estaremos en contacto pronto. Si quieres avanzar ahora mismo, continúa por WhatsApp.
      </p>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp"
        onClick={() => trackEvent({ name: 'whatsapp_click', params: { context: 'form-success' } })}
      >
        Continuar por WhatsApp
      </a>
    </div>
  )
}

// ============================================================
// Main Lead Form
// ============================================================
export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    mode:     'onBlur',
  })

  const onFocus = () => {
    trackEvent({ name: 'lead_form_start' })
  }

  const onSubmit = async (data: LeadFormData) => {
    // Honeypot check
    if (data.website) return

    setSubmitting(true)

    try {
      const response = await fetch('/api/leads', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          ...data,
          website: undefined, // never send honeypot
          source:  'landing_form',
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        trackEvent({ name: 'lead_form_submit', params: { source: 'landing_form' } })
        setSubmitted(true)
      } else {
        // API unavailable — still track and show success UX
        // (lead attribution via WhatsApp fallback)
        trackEvent({ name: 'lead_form_submit', params: { source: 'landing_form_fallback' } })
        setSubmitted(true)
      }
    } catch {
      // Network error — show success anyway, user can follow up via WhatsApp
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contacto"
      className="section bg-qora-surface/10 border-y border-qora-border"
      aria-labelledby="form-headline"
    >
      <div className="container-qora">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left: Pitch */}
          <div>
            <span className="qora-label">Diagnóstico gratuito</span>
            <h2
              id="form-headline"
              className="qora-headline text-3xl md:text-4xl text-qora-text mt-4 mb-6 text-balance"
            >
              Cuéntanos sobre tu agencia.
            </h2>
            <p className="text-qora-muted text-base leading-relaxed mb-8">
              Completa el formulario y evaluamos juntos si QORA es el fit correcto para tu operación. Sin compromiso. Sin presión.
            </p>

            <ul className="space-y-3" role="list">
              {[
                'Analizamos tu operación actual.',
                'Identificamos los puntos de mayor pérdida.',
                'Te mostramos cómo funciona QORA con tus tours.',
                'Te entregamos una propuesta específica.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-qora-muted text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-qora-primary flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form */}
          <div className="card-glow">
            {submitted ? (
              <SuccessState />
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                onFocus={onFocus}
                noValidate
                aria-label="Formulario de contacto QORA"
              >
                {/* Honeypot — hidden from real users */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    {...register('website')}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-5">

                  {/* Name */}
                  <div>
                    <Label htmlFor="name" required>Nombre</Label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Tu nombre"
                      className={inputClass}
                      {...register('name')}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      aria-invalid={!!errors.name}
                    />
                    <FieldError message={errors.name?.message} />
                  </div>

                  {/* Company */}
                  <div>
                    <Label htmlFor="company" required>Nombre de la agencia</Label>
                    <input
                      id="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Nombre de tu agencia u operadora"
                      className={inputClass}
                      {...register('company')}
                      aria-invalid={!!errors.company}
                    />
                    <FieldError message={errors.company?.message} />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <Label htmlFor="whatsapp" required>WhatsApp</Label>
                    <input
                      id="whatsapp"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+51 9XX XXX XXX"
                      className={inputClass}
                      {...register('whatsapp')}
                      aria-invalid={!!errors.whatsapp}
                    />
                    <FieldError message={errors.whatsapp?.message} />
                  </div>

                  {/* Monthly queries */}
                  <div>
                    <Label htmlFor="monthly_queries" required>Consultas mensuales aproximadas</Label>
                    <select
                      id="monthly_queries"
                      className={selectClass}
                      {...register('monthly_queries')}
                      aria-invalid={!!errors.monthly_queries}
                    >
                      <option value="">Selecciona una opción</option>
                      {MONTHLY_QUERIES_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    <FieldError message={errors.monthly_queries?.message} />
                  </div>

                  {/* Tourism type */}
                  <div>
                    <Label htmlFor="tourism_type" required>Tipo de turismo</Label>
                    <select
                      id="tourism_type"
                      className={selectClass}
                      {...register('tourism_type')}
                      aria-invalid={!!errors.tourism_type}
                    >
                      <option value="">Selecciona el tipo</option>
                      {TOURISM_TYPE_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    <FieldError message={errors.tourism_type?.message} />
                  </div>

                  {/* Main problem */}
                  <div>
                    <Label htmlFor="main_problem" required>Principal problema de atención</Label>
                    <select
                      id="main_problem"
                      className={selectClass}
                      {...register('main_problem')}
                      aria-invalid={!!errors.main_problem}
                    >
                      <option value="">Selecciona el problema</option>
                      {MAIN_PROBLEM_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    <FieldError message={errors.main_problem?.message} />
                  </div>

                  {/* Wants demo */}
                  <div>
                    <Label htmlFor="wants_demo" required>¿Te interesa una demo?</Label>
                    <select
                      id="wants_demo"
                      className={selectClass}
                      {...register('wants_demo')}
                      aria-invalid={!!errors.wants_demo}
                    >
                      <option value="">Selecciona</option>
                      {WANTS_DEMO_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    <FieldError message={errors.wants_demo?.message} />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                        Enviando...
                      </>
                    ) : (
                      'Enviar solicitud de diagnóstico'
                    )}
                  </button>

                  <p className="text-qora-subtle text-xs text-center">
                    Tus datos no serán compartidos con terceros.
                    Revisa nuestra{' '}
                    <a href="/privacy" className="text-qora-muted underline hover:text-qora-text">
                      política de privacidad
                    </a>.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
