# QORA — AI Operating System for Adventure Tourism

> **Intelligence for the Wild**

QORA es la primera capa comercial digital de una plataforma SaaS para operadores de turismo de aventura. Esta aplicación web es el **primer sistema de adquisición de QORA**: una máquina de conversión B2B que genera conversaciones comerciales calificadas.

---

## Producto inicial: QORA AI Sales Agent

Un agente de IA especializado en turismo de aventura que responde consultas 24/7, califica leads e inicia el proceso de conversión hacia una reserva.

**Canal principal:** WhatsApp (`+51 958 226 909`)  
**Mercado inicial:** Huaraz, Áncash, Perú  
**ICP:** Agencias y operadores medianos de turismo de aventura / trekking / montañismo

---

## Stack Técnico

| Layer | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router, SSG) |
| Estilos | Tailwind CSS v3 |
| Tipado | TypeScript |
| Validación | Zod + React Hook Form |
| Analytics | GTM-ready (custom events) |
| Deploy | Vercel (recomendado) |

---

## Requisitos

- **Node.js** ≥ 18.17.0
- **npm** ≥ 9

---

## Instalación

```bash
# 1. Clonar / abrir el directorio
cd qora-web

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus valores

# 4. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## Variables de Entorno

Copia `.env.example` a `.env.local` y configura:

```bash
# MÍNIMO para funcionar en desarrollo:
NEXT_PUBLIC_WHATSAPP_NUMBER=51958226909
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# PARA PRODUCCIÓN (agregar según necesidad):
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX        # Google Tag Manager
LEADS_WEBHOOK_URL=https://...          # Zapier / Make / n8n
```

Ver `.env.example` para la lista completa con documentación de cada variable.

---

## Estructura del Proyecto

```
qora-web/
├── app/
│   ├── layout.tsx              # Root layout: SEO, GTM, Schema.org, fuentes
│   ├── page.tsx                # Landing page principal (assembla todas las secciones)
│   ├── globals.css             # Design system: tokens, componentes, tipografía
│   ├── api/leads/route.ts      # API endpoint para formulario de leads
│   ├── privacy/page.tsx        # Política de privacidad
│   └── terms/page.tsx          # Términos de uso
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Barra de navegación sticky
│   │   ├── Footer.tsx          # Footer con info y enlaces legales
│   │   └── MobileStickyCTA.tsx # CTA sticky inferior en móvil
│   ├── sections/
│   │   ├── Hero.tsx            # [AWARENESS] Hero con visual de terrain/signal
│   │   ├── Problem.tsx         # [PROBLEM] 6 problemas reales del operador
│   │   ├── ValueProps.tsx      # [DESIRE] Responde / Convierte / Automatiza
│   │   ├── BeforeAfter.tsx     # [PROOF] Comparación Sin QORA vs Con QORA
│   │   ├── HowItWorks.tsx      # [MECHANISM] 4 pasos: Captura→Entiende→Responde→Conecta
│   │   ├── InteractiveDemo.tsx # [PROOF] Simulación de chat interactiva
│   │   ├── ROICalculator.tsx   # [DESIRE] Calculadora de oportunidad potencial
│   │   ├── UseCases.tsx        # [PROOF] 4 casos de uso reales
│   │   ├── Origin.tsx          # [TRUST] Historia de Huaraz
│   │   ├── FAQ.tsx             # [OBJECTION] Acordeón de preguntas frecuentes
│   │   ├── LeadForm.tsx        # [CTA] Formulario calificador de leads
│   │   └── FinalCTA.tsx        # [CTA] Bloque final de conversión
│   └── WhatsAppButton.tsx      # Botón WhatsApp universal con tracking
├── data/
│   ├── site-config.ts          # Config global: nombre, WA number, mensajes
│   ├── demo-conversations.ts   # Scripts de la demo interactiva
│   └── faq.ts                  # Preguntas frecuentes
├── lib/
│   ├── analytics.ts            # Sistema de eventos custom (GTM/GA4)
│   ├── whatsapp.ts             # Helper de URLs de WhatsApp
│   ├── validations.ts          # Schemas Zod para el formulario
│   └── utils.ts                # Utilidades (cn)
├── integrations/
│   └── whatsapp/config.ts      # Capa de integración futura WhatsApp Cloud API
└── public/
    ├── favicon.svg             # Favicon SVG
    ├── robots.txt              # Reglas de indexación
    └── sitemap.xml             # Sitemap para SEO
```

---

## Scripts

```bash
npm run dev      # Servidor de desarrollo (localhost:3000)
npm run build    # Build de producción
npm run start    # Servidor de producción (post-build)
npm run lint     # Linting con ESLint
```

---

## Analytics Events

Todos los eventos están preparados para GTM / GA4. Se activan automáticamente:

| Evento | Cuándo se dispara |
|---|---|
| `page_view` | Al cargar la página |
| `hero_cta_click` | Clic en CTAs del Hero |
| `whatsapp_click` | Cualquier clic en botón de WhatsApp |
| `demo_start` | Primera interacción con la demo |
| `demo_step` | Cada selección en la demo |
| `demo_complete` | Al completar la demo |
| `roi_calculator_use` | Al mover sliders de la calculadora |
| `lead_form_start` | Al hacer focus en el formulario |
| `lead_form_submit` | Al enviar el formulario |
| `faq_open` | Al abrir una pregunta del FAQ |
| `scroll_depth` | A 25%, 50%, 75%, 90%, 100% |

Para activar GTM, agrega `NEXT_PUBLIC_GTM_ID` en `.env.local`.

---

## Integración de Leads

El formulario envía un `POST` a `/api/leads`. Por defecto, el endpoint:

1. Valida los datos con Zod
2. Verifica el honeypot anti-spam
3. Reenvía a `LEADS_WEBHOOK_URL` si está configurado (Zapier, Make, n8n)
4. Loguea en consola en desarrollo

**Para conectar con Google Sheets:** Crea un webhook en Zapier/Make que capture el POST de QORA y lo escriba en la hoja. Configura `LEADS_WEBHOOK_URL` con la URL del webhook.

---

## WhatsApp

La integración actual usa **enlaces de click-to-chat** (no requiere credenciales de API):

```
https://wa.me/51958226909?text=Mensaje%20precargado
```

Cada sección tiene un mensaje contextual diferente. Ver `data/site-config.ts` → `WHATSAPP_MESSAGES`.

**Integración futura (WhatsApp Cloud API):** Ver `integrations/whatsapp/config.ts` para la arquitectura preparada.

---

## Deploy en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Variables de entorno: configurar en vercel.com/dashboard
# o con:
vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER
vercel env add NEXT_PUBLIC_GTM_ID
vercel env add LEADS_WEBHOOK_URL
```

---

## Roadmap de Integraciones

```
Fase 1 (actual)
└── Web + Links de WhatsApp

Fase 2
├── WhatsApp Cloud API + webhooks
└── Botpress (agente conversacional)

Fase 3
├── CRM / Google Sheets
├── Make / Zapier automations
└── Dashboard de analytics

Fase 4 (SaaS)
├── Multi-tenant
├── Dashboard por organización
└── Gestión de leads, tours y reservas
```

---

## Seguridad

- No se almacenan API keys en frontend
- Variables de entorno separadas por contexto (pública/privada)
- Honeypot anti-spam en formulario
- Validación Zod en frontend y API
- Security headers en `next.config.js`
- `.env.local` en `.gitignore`

---

## Notas importantes

- **No hay testimonios inventados:** Las secciones usan casos de uso reales, no clientes ficticios
- **No hay porcentajes de mejora garantizados:** La calculadora tiene disclaimer explícito
- **QORA no es servicio de emergencia:** El FAQ y las restricciones de copy lo aclaran explícitamente
- **WhatsApp funciona por enlace:** No simula una API configurada si no existen credenciales

---

## Contacto

**QORA** · Intelligence for the Wild  
Huaraz, Áncash, Perú  
WhatsApp: +51 958 226 909
