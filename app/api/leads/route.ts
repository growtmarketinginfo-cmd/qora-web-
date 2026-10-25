import { NextRequest, NextResponse } from 'next/server'
import { leadFormSchema } from '@/lib/validations'

// ============================================================
// POST /api/leads
// Receives lead form data, validates, and stores/forwards.
//
// CURRENT: Stores to console / logs (no DB configured)
// FUTURE:  Connect to CRM, Google Sheets, or database
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Honeypot check
    if (body.website) {
      // Silently reject spam without giving info to bots
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Validate with Zod
    const result = leadFormSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 422 }
      )
    }

    const lead = {
      ...result.data,
      website:   undefined,
      source:    body.source || 'landing_form',
      timestamp: body.timestamp || new Date().toISOString(),
      ip:        req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      userAgent: req.headers.get('user-agent') || 'unknown',
    }

    // ========================================================
    // LEAD STORAGE — Configure one or more of these:
    // ========================================================

    // Option A: Forward to webhook (Zapier, Make, n8n, etc.)
    const webhookUrl = process.env.LEADS_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(lead),
      }).catch((err) => {
        console.error('[QORA Leads] Webhook error:', err)
      })
    }

    // Option B: Log to server console (development / fallback)
    if (process.env.NODE_ENV === 'development' || !webhookUrl) {
      console.log('[QORA Lead]', JSON.stringify(lead, null, 2))
    }

    // Option C: Database — configure DATABASE_URL and add Prisma/Drizzle
    // await db.leads.create({ data: lead })

    return NextResponse.json(
      { success: true, message: 'Lead received.' },
      { status: 201 }
    )

  } catch (error) {
    console.error('[QORA API] /api/leads error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again.' },
      { status: 500 }
    )
  }
}

// Block other methods
export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
