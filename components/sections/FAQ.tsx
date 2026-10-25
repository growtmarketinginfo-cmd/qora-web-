'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQ_ITEMS } from '@/data/faq'
import { trackEvent } from '@/lib/analytics'

function FAQItem({ question, answer, id }: { question: string; answer: string; id: string }) {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    const next = !open
    setOpen(next)
    if (next) {
      trackEvent({ name: 'faq_open', params: { question } })
    }
  }

  return (
    <div className="border-b border-qora-border last:border-0">
      <button
        onClick={toggle}
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
        id={`faq-question-${id}`}
        className="
          w-full flex items-center justify-between
          py-5 text-left gap-4
          text-qora-text font-display font-medium text-sm md:text-base
          hover:text-qora-primary transition-colors duration-150
          focus-visible:outline-none focus-visible:text-qora-primary
        "
      >
        <span>{question}</span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-qora-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={`faq-answer-${id}`}
        role="region"
        aria-labelledby={`faq-question-${id}`}
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}
      >
        <p className="text-qora-muted text-sm leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <section
      id="faq"
      className="section bg-qora-bg"
      aria-labelledby="faq-headline"
    >
      <div className="container-qora">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

          {/* Label + headline */}
          <div className="md:col-span-1">
            <span className="qora-label">Preguntas</span>
            <h2
              id="faq-headline"
              className="qora-headline text-3xl md:text-4xl text-qora-text mt-4 text-balance"
            >
              Respuestas honestas.
            </h2>
            <p className="text-qora-muted text-sm mt-4 leading-relaxed">
              Si tienes una pregunta que no está aquí, contáctanos directamente.
            </p>
          </div>

          {/* FAQ List */}
          <div className="md:col-span-2">
            <div className="divide-y divide-qora-border" role="list">
              {FAQ_ITEMS.map((item) => (
                <FAQItem
                  key={item.id}
                  id={item.id}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
