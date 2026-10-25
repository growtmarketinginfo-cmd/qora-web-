'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import WhatsAppButton from '@/components/WhatsAppButton'

const NAV_LINKS = [
  { href: '#producto',    label: 'Producto' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#roi',         label: 'ROI' },
  { href: '#faq',         label: 'Preguntas' },
  { href: '#contacto',    label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNavClick = () => {
    setOpen(false)
  }

  return (
    <header
      role="banner"
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${scrolled
          ? 'bg-qora-bg/90 backdrop-blur-md border-b border-qora-border'
          : 'bg-transparent'}
      `}
    >
      <nav
        className="container-qora flex items-center justify-between h-16 px-4"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-qora-primary rounded"
          aria-label="QORA — inicio"
        >
          <span className="font-display font-bold text-xl text-qora-text tracking-tight">
            QORA
          </span>
          <span className="hidden xs:block font-mono text-[10px] text-qora-primary tracking-widest uppercase pt-0.5">
            Intelligence for the Wild
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-qora-muted hover:text-qora-text text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-qora-primary rounded"
                onClick={handleNavClick}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <WhatsAppButton
            context="hero"
            label="Hablar con QORA"
            size="sm"
            variant="primary"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-qora-muted hover:text-qora-text hover:bg-qora-surface transition-colors"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-qora-surface border-b border-qora-border px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-2" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2.5 text-qora-muted hover:text-qora-text text-sm font-medium transition-colors"
                  onClick={handleNavClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-qora-border">
            <WhatsAppButton
              context="hero"
              label="Hablar con QORA"
              size="md"
              className="w-full justify-center"
            />
          </div>
        </div>
      )}
    </header>
  )
}
