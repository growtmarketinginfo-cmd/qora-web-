'use client'

export default function Origin() {
  return (
    <section
      className="section bg-qora-surface/10 border-y border-qora-border"
      aria-labelledby="origin-headline"
    >
      <div className="container-qora">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <span className="qora-label">Origen</span>
            <h2
              id="origin-headline"
              className="qora-headline text-3xl md:text-4xl text-qora-text mt-4 mb-6 text-balance"
            >
              Nacidos en Huaraz.
            </h2>
            <div className="space-y-4 text-qora-muted text-base leading-relaxed">
              <p>
                QORA comienza en Huaraz porque Huaraz es donde la operación es real, donde la complejidad es diaria y donde cada consulta puede convertirse en una expedición que alguien recordará toda la vida.
              </p>
              <p>
                En este entorno, la comunicación importa. La información importa. Los clientes llegan desde todo el mundo — con idiomas, horarios y expectativas diferentes. Y los errores operativos tienen un costo concreto.
              </p>
              <p>
                QORA nace para ayudar a los operadores de este tipo de entornos a trabajar mejor — no a reemplazarlos.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-qora-border">
              <p className="text-qora-text/60 text-sm italic">
                &ldquo;Construido en Huaraz. Diseñado para operar en cualquier lugar donde aventura y complejidad se encuentren.&rdquo;
              </p>
            </div>
          </div>

          {/* Visual — Coordinate/altitude data block */}
          <div className="relative">
            <div className="card font-mono text-xs space-y-3" aria-hidden="true">
              <div className="flex items-center gap-2 pb-3 border-b border-qora-border">
                <span className="signal-dot" />
                <span className="text-qora-primary tracking-widest uppercase">QORA / Base de operación</span>
              </div>
              {[
                ['LOCATION',  'Huaraz, Áncash, Perú'],
                ['ALTITUDE',  '3,050 msnm'],
                ['LAT',       '−9.5270°'],
                ['LON',       '−77.5280°'],
                ['TIMEZONE',  'PET (UTC-5)'],
                ['MARKET',    'Adventure Tourism'],
                ['LANGUAGES', 'ES / EN'],
                ['STATUS',    'OPERATIONAL'],
              ].map(([key, val]) => (
                <div key={key} className="flex gap-4">
                  <span className="text-qora-subtle w-24 flex-shrink-0">{key}</span>
                  <span className={key === 'STATUS' ? 'text-qora-primary' : 'text-qora-muted'}>{val}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-qora-border text-qora-subtle">
                <span className="text-qora-primary">→</span> Próxima expansión: Perú → Andes → LATAM
              </div>
            </div>

            {/* Corner decoration */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-qora-primary/30" aria-hidden="true" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-qora-primary/30" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
