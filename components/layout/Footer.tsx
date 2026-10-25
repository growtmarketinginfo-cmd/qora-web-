'use client'

import Link from 'next/link'
import { MessageCircle, MapPin } from 'lucide-react'
import { SITE_CONFIG } from '@/data/site-config'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { trackEvent } from '@/lib/analytics'

export default function Footer() {
  const whatsappUrl = buildWhatsAppUrl('hero')

  return (
    <footer className="border-t border-qora-border bg-qora-bg" role="contentinfo">
      <div className="container-qora px-4 py-16">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-qora-border">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="font-display font-bold text-2xl text-qora-text">QORA</span>
              <p className="font-mono text-xs text-qora-primary tracking-widest uppercase mt-1">
                Intelligence for the Wild
              </p>
            </div>
            <p className="text-qora-muted text-sm leading-relaxed mb-4">
              AI Operating System for Adventure Tourism.
            </p>
            <div className="flex items-center gap-2 text-qora-muted text-sm">
              <MapPin size={14} aria-hidden="true" />
              <span>{SITE_CONFIG.location}</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display font-semibold text-qora-text text-sm mb-4">Navegación</h3>
            <ul className="space-y-3" role="list">
              {[
                ['#producto',      'Producto'],
                ['#como-funciona', 'Cómo funciona'],
                ['#roi',           'ROI'],
                ['#faq',           'Preguntas frecuentes'],
                ['#contacto',      'Contacto'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-qora-muted hover:text-qora-text text-sm transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-qora-text text-sm mb-4">Contacto</h3>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent({ name: 'whatsapp_click', params: { context: 'footer' } })}
              className="inline-flex items-center gap-2 text-qora-muted hover:text-[#25D366] text-sm transition-colors mb-6"
            >
              <MessageCircle size={15} aria-hidden="true" />
              {SITE_CONFIG.whatsapp.display}
            </a>
            <p className="text-qora-subtle text-xs leading-relaxed">
              Construido en Huaraz.<br />
              Diseñado para operar en cualquier lugar donde aventura y complejidad se encuentren.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-qora-subtle text-xs">
            © {new Date().getFullYear()} QORA. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-qora-subtle hover:text-qora-muted text-xs transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="/terms"
              className="text-qora-subtle hover:text-qora-muted text-xs transition-colors"
            >
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
