import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-qora-bg">
      <div className="container-qora px-4 py-24 max-w-3xl">
        <Link href="/" className="text-qora-primary text-sm hover:underline mb-8 block">
          ← Volver a QORA
        </Link>

        <h1 className="qora-headline text-3xl text-qora-text mb-8">Política de Privacidad</h1>

        <div className="prose prose-sm text-qora-muted space-y-6 leading-relaxed">

          <div className="p-4 rounded-lg border border-qora-border bg-qora-surface">
            <p className="text-xs text-qora-muted">
              <strong className="text-qora-text">Nota legal:</strong> Este documento es un borrador orientativo.
              Para operaciones comerciales reales, este texto debe ser revisado por un abogado especializado
              en protección de datos en Perú y los mercados donde QORA opere.
            </p>
          </div>

          <section>
            <h2 className="font-display font-semibold text-qora-text text-lg mb-3">1. Responsable del tratamiento</h2>
            <p>QORA — Huaraz, Áncash, Perú. Contacto: {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? '+51 958 226 909' : '[pendiente]'}.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-qora-text text-lg mb-3">2. Datos que recopilamos</h2>
            <p>Cuando completas el formulario de contacto recopilamos: nombre, nombre de empresa, número de WhatsApp, y las respuestas seleccionadas en el formulario. No recopilamos datos sensibles.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-qora-text text-lg mb-3">3. Finalidad</h2>
            <p>Los datos se utilizan exclusivamente para contactarte y evaluar si QORA puede ser útil para tu operación. No los usamos para publicidad de terceros.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-qora-text text-lg mb-3">4. Cookies y analítica</h2>
            <p>Esta web puede utilizar cookies técnicas necesarias para el funcionamiento y cookies de analítica (Google Analytics via GTM) para entender cómo se usa el sitio. Puedes configurar tu navegador para rechazarlas.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-qora-text text-lg mb-3">5. Tus derechos</h2>
            <p>Puedes solicitar acceso, rectificación o eliminación de tus datos contactándonos directamente por WhatsApp o los canales indicados en esta web.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-qora-text text-lg mb-3">6. Conservación</h2>
            <p>Conservamos los datos el tiempo necesario para gestionar tu solicitud, salvo que nos pidas su eliminación antes.</p>
          </section>

          <p className="text-qora-subtle text-xs pt-4 border-t border-qora-border">
            Última actualización: {new Date().getFullYear()}. Este documento está sujeto a revisión profesional.
          </p>
        </div>
      </div>
    </div>
  )
}
