'use client'

import { useState, useEffect, useRef } from 'react'
import { RotateCcw } from 'lucide-react'
import WhatsAppButton from '@/components/WhatsAppButton'
import { trackEvent } from '@/lib/analytics'
import {
  DEMO_OPTIONS,
  DEMO_RESPONSES,
  DEMO_INTRO,
  type DemoOption,
} from '@/data/demo-conversations'

type MessageRole = 'agent' | 'user'

interface ChatMessage {
  id:      string
  role:    MessageRole
  content: string
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-qora-surface border border-qora-border rounded-2xl rounded-tl-sm w-16">
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
    </div>
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isAgent = message.role === 'agent'
  return (
    <div className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`
          max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line
          ${isAgent
            ? 'bg-qora-surface border border-qora-border text-qora-text rounded-tl-sm'
            : 'bg-qora-primary text-qora-bg font-medium rounded-tr-sm'}
        `}
      >
        {message.content}
      </div>
    </div>
  )
}

export default function InteractiveDemo() {
  const [messages,        setMessages]        = useState<ChatMessage[]>([])
  const [typing,          setTyping]          = useState(false)
  const [availableOpts,   setAvailableOpts]   = useState<string[]>(DEMO_OPTIONS.map((o) => o.id))
  const [demoStarted,     setDemoStarted]     = useState(false)
  const [demoCompleted,   setDemoCompleted]   = useState(false)
  const [stepCount,       setStepCount]       = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  // Initialize with agent intro
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([{ id: 'intro', role: 'agent', content: DEMO_INTRO }])
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  const handleOptionClick = (option: DemoOption) => {
    if (typing) return

    if (!demoStarted) {
      setDemoStarted(true)
      trackEvent({ name: 'demo_start' })
    }

    const newStep = stepCount + 1
    setStepCount(newStep)
    trackEvent({ name: 'demo_step', params: { step: newStep, option: option.id } })

    // Add user message
    const userMsg: ChatMessage = {
      id:      `user-${Date.now()}`,
      role:    'user',
      content: option.label,
    }
    setMessages((prev) => [...prev, userMsg])
    setAvailableOpts((prev) => prev.filter((id) => id !== option.id))

    // Show typing indicator
    setTyping(true)

    // Find matching response
    const response = DEMO_RESPONSES.find((r) => r.triggerIds.includes(option.id))

    setTimeout(() => {
      setTyping(false)

      if (response) {
        const agentMsg: ChatMessage = {
          id:      `agent-${Date.now()}`,
          role:    'agent',
          content: response.agentMessage,
        }
        setMessages((prev) => [...prev, agentMsg])

        // Update available options based on follow-ups
        if (response.followUpOptions && response.followUpOptions.length > 0) {
          setAvailableOpts(response.followUpOptions)
        } else {
          setAvailableOpts([])
          setDemoCompleted(true)
          trackEvent({ name: 'demo_complete' })
        }
      }
    }, 1200 + Math.random() * 800)
  }

  const resetDemo = () => {
    setMessages([{ id: 'intro-reset', role: 'agent', content: DEMO_INTRO }])
    setAvailableOpts(DEMO_OPTIONS.map((o) => o.id))
    setDemoStarted(false)
    setDemoCompleted(false)
    setTyping(false)
    setStepCount(0)
  }

  const visibleOptions = DEMO_OPTIONS.filter((o) => availableOpts.includes(o.id))

  return (
    <section
      id="demo"
      className="section bg-qora-bg"
      aria-labelledby="demo-headline"
    >
      <div className="container-qora">

        <div className="mb-12">
          <span className="qora-label">Demo interactiva</span>
          <h2
            id="demo-headline"
            className="qora-headline text-3xl md:text-5xl text-qora-text max-w-2xl mt-4 text-balance"
          >
            Prueba una conversación.
          </h2>
          <p className="text-qora-muted text-lg mt-4 max-w-xl">
            Así se ve QORA en acción. Sin datos personales. Sin cuenta. En menos de 2 minutos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Chat Window */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-qora-border bg-qora-surface overflow-hidden">

              {/* Chat Header */}
              <div className="px-4 py-3 border-b border-qora-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-qora-primary/20 border border-qora-primary/30 flex items-center justify-center">
                    <span className="font-display font-bold text-xs text-qora-primary">Q</span>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-qora-text text-sm">QORA Agent</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" aria-hidden="true" />
                      <p className="text-qora-muted text-xs">Activo</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={resetDemo}
                  className="p-2 rounded-lg text-qora-muted hover:text-qora-text hover:bg-qora-bg/60 transition-colors"
                  aria-label="Reiniciar demo"
                  title="Reiniciar conversación"
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              {/* Messages */}
              <div
                className="h-80 overflow-y-auto p-4 space-y-3 no-scrollbar"
                role="log"
                aria-live="polite"
                aria-label="Conversación de demostración"
              >
                {messages.map((msg) => (
                  <ChatBubble key={msg.id} message={msg} />
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <TypingIndicator />
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Option Chips */}
              <div className="px-4 py-3 border-t border-qora-border bg-qora-bg/40">
                {visibleOptions.length > 0 ? (
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Selecciona una opción">
                    {visibleOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionClick(option)}
                        disabled={typing}
                        className="
                          flex items-center gap-1.5 px-3 py-1.5
                          text-xs font-medium text-qora-text
                          bg-qora-surface border border-qora-border
                          rounded-full transition-all duration-150
                          hover:border-qora-primary/40 hover:text-qora-primary
                          disabled:opacity-40 disabled:cursor-not-allowed
                          focus-visible:outline-2 focus-visible:outline-qora-primary
                        "
                      >
                        <span aria-hidden="true">{option.emoji}</span>
                        {option.label}
                      </button>
                    ))}
                  </div>
                ) : demoCompleted ? (
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-qora-muted text-xs">Fin de la demo.</p>
                    <button
                      onClick={resetDemo}
                      className="text-xs text-qora-primary hover:underline"
                    >
                      Reiniciar
                    </button>
                  </div>
                ) : (
                  <p className="text-qora-muted text-xs">Esperando respuesta...</p>
                )}
              </div>
            </div>

            {/* Disclaimer */}
            <p className="mt-3 text-qora-subtle text-xs leading-relaxed">
              Esta es una simulación. Las respuestas reales dependen de la configuración y base de conocimiento de cada agencia.
            </p>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card">
              <h3 className="font-display font-semibold text-qora-text text-sm mb-3">
                ¿Qué demuestra esto?
              </h3>
              <ul className="space-y-2.5" role="list">
                {[
                  'Respuesta en segundos, no horas.',
                  'Manejo de preguntas en español e inglés.',
                  'Identificación de intención sin formularios.',
                  'Derivación al humano cuando corresponde.',
                  'Información precisa, sin improvisar.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-qora-muted text-sm">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-qora-primary flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Post-demo CTA */}
            {demoCompleted && (
              <div className="card border-qora-primary/20 bg-qora-primary/5">
                <p className="font-display font-semibold text-qora-text text-sm mb-1">
                  ¿Quieres ver esto con las consultas de tu agencia?
                </p>
                <p className="text-qora-muted text-xs mb-4">
                  Cuéntanos cómo opera tu agencia y armamos una demo con tus tours.
                </p>
                <WhatsAppButton
                  context="demo"
                  label="Probar QORA con mi agencia"
                  size="sm"
                  className="w-full justify-center"
                />
              </div>
            )}

            {!demoCompleted && (
              <div className="card">
                <p className="text-qora-muted text-sm leading-relaxed">
                  Selecciona opciones en el chat para ver cómo QORA responde a consultas reales de turismo de aventura.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
