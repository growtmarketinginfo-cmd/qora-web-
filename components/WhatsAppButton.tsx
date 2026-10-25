'use client'

import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { trackEvent } from '@/lib/analytics'
import type { WhatsAppContext } from '@/data/site-config'

interface WhatsAppButtonProps {
  context:    WhatsAppContext
  label?:     string
  variant?:   'primary' | 'secondary' | 'ghost' | 'icon-only'
  size?:      'sm' | 'md' | 'lg'
  className?: string
  onClick?:   () => void
}

export default function WhatsAppButton({
  context,
  label = 'Hablar por WhatsApp',
  variant = 'primary',
  size = 'md',
  className,
  onClick,
}: WhatsAppButtonProps) {
  const url = buildWhatsAppUrl(context)

  const handleClick = () => {
    trackEvent({
      name:   'whatsapp_click',
      params: { context, message: url },
    })
    onClick?.()
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  }[size]

  const iconSize = { sm: 14, md: 16, lg: 18 }[size]

  const variantClasses = {
    primary:   'bg-[#25D366] hover:bg-[#128C7E] text-white',
    secondary: 'border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10',
    ghost:     'text-[#25D366] hover:bg-[#25D366]/10',
    'icon-only':'',
  }[variant]

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={label}
      className={cn(
        'inline-flex items-center font-display font-bold rounded-lg',
        'transition-all duration-200 active:scale-[0.98]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]',
        sizeClasses,
        variantClasses,
        variant === 'icon-only' && 'p-3 rounded-full',
        className,
      )}
    >
      <MessageCircle size={iconSize} aria-hidden="true" />
      {variant !== 'icon-only' && <span>{label}</span>}
    </a>
  )
}
