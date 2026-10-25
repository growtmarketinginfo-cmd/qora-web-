import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Términos de Uso',
  robots: { index: false },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-qora-bg">
      <div className="container-qora px-4 py-24 max-w-3xl">
        <Link href="/" className="text-qora-primary text-sm hover:underline mb-8 block">
          ← Volver a QORA
        </Link>

        <h1 className="qora-headline text-3xl text-qora-text mb-8">Términos de Uso</h1>

        <div className="text-qora-muted space-y-6 leading-relaxed text-sm">

          <div className="p-4 rounded-lg border border-qora-border bg-qora-surface">
            <p className="text-xs text-qora-muted">
              <strong className="text-qora-text">Nota legal:</strong> Este documento es un borrador orientativo.
              Debe ser revisado por asesoría legal especializada antes de ser utilizado en producción comercial.
            </p>
          </div>

          <section>
            <h2 className="font-display font-semibold text-qora-text text-lg mb-3">1. Aceptación</h2>
            <p>Al acceder a este sitio web y utilizar sus funcionalidades, aceptas estos términos. Si no estás de acuerdo, no uses este sitio.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-qora-text text-lg mb-3">2. Naturaleza del servicio</h2>
            <p>QORA es un sistema de asistencia comercial basado en IA para operadores de turismo de aventura. No es un servicio de emergencia, rescate, ni sistema médico. No debe utilizarse como tal.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-qora-text text-lg mb-3">3. Limitaciones</h2>
            <p>QORA opera dentro de una base de conocimiento definida. Las respuestas del agente dependen de la información configurada. No garantizamos resultados comerciales específicos. Las estimaciones de la calculadora de ROI son orientativas y no constituyen garantías.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-qora-text text-lg mb-3">4. Propiedad intelectual</h2>
            <p>El nombre QORA, el logotipo, el territorio &ldquo;Intelligence for the Wild&rdquo; y los materiales de este sitio son propiedad de QORA. No pueden reproducirse sin autorización expresa.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-qora-text text-lg mb-3">5. Cambios</h2>
            <p>Estos términos pueden actualizarse. Las actualizaciones se reflejarán en esta página con la fecha de última modificación.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-qora-text text-lg mb-3">6. Contacto</h2>
            <p>Para consultas sobre estos términos, contáctanos por WhatsApp: +51 958 226 909.</p>
          </section>

          <p className="text-qora-subtle text-xs pt-4 border-t border-qora-border">
            Última actualización: {new Date().getFullYear()}. Sujeto a revisión legal profesional.
          </p>
        </div>
      </div>
    </div>
  )
}
