// ============================================================
// QORA — Form Validation Schemas (Zod)
// ============================================================

import { z } from 'zod'

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .max(80, 'Nombre demasiado largo.')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'El nombre solo puede contener letras.'),

  company: z
    .string()
    .min(2, 'El nombre de la empresa debe tener al menos 2 caracteres.')
    .max(120, 'Nombre de empresa demasiado largo.'),

  whatsapp: z
    .string()
    .min(7, 'Número de WhatsApp inválido.')
    .max(20, 'Número de WhatsApp inválido.')
    .regex(/^[+\d\s()-]+$/, 'Formato de número inválido.'),

  monthly_queries: z.enum([
    'menos-50',
    '50-150',
    '150-500',
    'mas-500',
  ], { required_error: 'Selecciona una opción.' }),

  tourism_type: z.enum([
    'trekking',
    'mountaineering',
    'adventure-mixed',
    'cultural',
    'other',
  ], { required_error: 'Selecciona el tipo de turismo.' }),

  main_problem: z.enum([
    'no-response-off-hours',
    'lost-leads',
    'repetitive-questions',
    'no-followup',
    'slow-response',
    'other',
  ], { required_error: 'Selecciona tu principal problema.' }),

  wants_demo: z.enum(['yes', 'maybe', 'no']),

  // Honeypot field — must be empty
  website: z.string().max(0, 'Invalid submission.').optional(),
})

export type LeadFormData = z.infer<typeof leadFormSchema>

// Labels for select options
export const MONTHLY_QUERIES_OPTIONS = [
  { value: 'menos-50',  label: 'Menos de 50 consultas/mes' },
  { value: '50-150',    label: '50 – 150 consultas/mes' },
  { value: '150-500',   label: '150 – 500 consultas/mes' },
  { value: 'mas-500',   label: 'Más de 500 consultas/mes' },
] as const

export const TOURISM_TYPE_OPTIONS = [
  { value: 'trekking',       label: 'Trekking / Senderismo' },
  { value: 'mountaineering', label: 'Montañismo / Escalada' },
  { value: 'adventure-mixed',label: 'Aventura mixta' },
  { value: 'cultural',       label: 'Turismo cultural / vivencial' },
  { value: 'other',          label: 'Otro' },
] as const

export const MAIN_PROBLEM_OPTIONS = [
  { value: 'no-response-off-hours', label: 'No podemos responder fuera de horario' },
  { value: 'lost-leads',            label: 'Perdemos leads / consultas sin seguimiento' },
  { value: 'repetitive-questions',  label: 'Demasiadas preguntas repetitivas' },
  { value: 'no-followup',           label: 'Falta de seguimiento post-consulta' },
  { value: 'slow-response',         label: 'Tiempos de respuesta lentos' },
  { value: 'other',                 label: 'Otro' },
] as const

export const WANTS_DEMO_OPTIONS = [
  { value: 'yes',   label: 'Sí, quiero una demo' },
  { value: 'maybe', label: 'Tal vez, primero quiero más información' },
  { value: 'no',    label: 'No por ahora' },
] as const
