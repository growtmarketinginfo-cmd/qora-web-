'use client'

import { useEffect } from 'react'
import Navbar          from '@/components/layout/Navbar'
import Footer          from '@/components/layout/Footer'
import MobileStickyCTA from '@/components/layout/MobileStickyCTA'
import Hero            from '@/components/sections/Hero'
import Problem         from '@/components/sections/Problem'
import ValueProps      from '@/components/sections/ValueProps'
import BeforeAfter     from '@/components/sections/BeforeAfter'
import HowItWorks      from '@/components/sections/HowItWorks'
import InteractiveDemo from '@/components/sections/InteractiveDemo'
import ROICalculator   from '@/components/sections/ROICalculator'
import UseCases        from '@/components/sections/UseCases'
import Origin          from '@/components/sections/Origin'
import FAQ             from '@/components/sections/FAQ'
import LeadForm        from '@/components/sections/LeadForm'
import FinalCTA        from '@/components/sections/FinalCTA'
import { initScrollDepthTracking } from '@/lib/analytics'

export default function HomePage() {
  useEffect(() => {
    const cleanup = initScrollDepthTracking()
    return cleanup
  }, [])

  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-qora-primary focus:text-qora-bg focus:rounded-lg focus:font-bold focus:text-sm"
      >
        Saltar al contenido principal
      </a>

      <Navbar />

      <main id="main-content">
        {/* [AWARENESS] — Hero */}
        <Hero />

        {/* [PROBLEM] — Pain points */}
        <Problem />

        {/* [DESIRE] — Value props: Responde / Convierte / Automatiza */}
        <ValueProps />

        {/* [PROOF] — Before / After comparison */}
        <BeforeAfter />

        {/* [MECHANISM] — How it works */}
        <HowItWorks />

        {/* [PROOF] — Interactive demo */}
        <InteractiveDemo />

        {/* [DESIRE] — ROI Calculator */}
        <ROICalculator />

        {/* [PROOF] — Use cases */}
        <UseCases />

        {/* [TRUST] — Origin / Huaraz */}
        <Origin />

        {/* [OBJECTION] — FAQ */}
        <FAQ />

        {/* [CTA] — Lead form */}
        <LeadForm />

        {/* [CTA] — Final push */}
        <FinalCTA />
      </main>

      <Footer />

      {/* Mobile sticky CTA — appears after scroll */}
      <MobileStickyCTA />
    </>
  )
}
