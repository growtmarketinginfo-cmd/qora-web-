'use client'

import { useEffect, useState } from 'react'
import WhatsAppButton from '@/components/WhatsAppButton'

/**
 * Mobile sticky CTA — visible at bottom of screen on mobile.
 * Appears after user scrolls past the hero (300px).
 * Does NOT block content.
 */
export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-40
        md:hidden
        transition-transform duration-300
        ${visible ? 'translate-y-0' : 'translate-y-full'}
      `}
      aria-label="CTA móvil"
    >
      <div className="bg-qora-surface border-t border-qora-border px-4 py-3 safe-area-inset-bottom">
        <WhatsAppButton
          context="hero"
          label="Hablar con QORA"
          size="md"
          className="w-full justify-center"
        />
      </div>
    </div>
  )
}
