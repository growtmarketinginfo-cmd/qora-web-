import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { SITE_CONFIG } from '@/data/site-config'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

// ============================================================
// SEO — Metadata
// ============================================================
export const metadata: Metadata = {
  title: {
    default: 'QORA | AI Operating System for Adventure Tourism',
    template: '%s | QORA',
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: { canonical: '/' },
  keywords: [
    'turismo de aventura',
    'agente de IA',
    'Huaraz',
    'trekking Perú',
    'WhatsApp automation',
    'adventure tourism AI',
    'QORA',
  ],
  authors: [{ name: 'QORA', url: SITE_CONFIG.url }],
  creator: 'QORA',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type:        'website',
    locale:      'es_PE',
    alternateLocale: ['en_US'],
    url:         SITE_CONFIG.url,
    siteName:    SITE_CONFIG.name,
    title:       'QORA | Intelligence for the Wild',
    description: SITE_CONFIG.description,
    images: [
      {
        url:    SITE_CONFIG.ogImage,
        width:  1200,
        height: 630,
        alt:    'QORA — AI Operating System for Adventure Tourism',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'QORA | Intelligence for the Wild',
    description: SITE_CONFIG.description,
    images:      [SITE_CONFIG.ogImage],
  },
}

export const viewport: Viewport = {
  width:             'device-width',
  initialScale:      1,
  themeColor:        '#0A0B0E',
  colorScheme:       'dark',
}

// ============================================================
// Schema.org — SoftwareApplication
// ============================================================
const schemaOrg = {
  '@context':          'https://schema.org',
  '@type':             'SoftwareApplication',
  name:                'QORA',
  alternateName:       'QORA AI Sales Agent',
  applicationCategory: 'BusinessApplication',
  operatingSystem:     'Web',
  description:         SITE_CONFIG.description,
  offers: {
    '@type':       'Offer',
    priceCurrency: 'PEN',
    availability:  'https://schema.org/InStock',
  },
  creator: {
    '@type':    'Organization',
    name:       'QORA',
    url:        SITE_CONFIG.url,
    areaServed: 'PE',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Preconnect for Google Fonts performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="bg-qora-bg text-qora-text antialiased">
        {/* GTM noscript fallback */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        {children}

        {/* Google Tag Manager — loaded after page using next/script */}
        {GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}
