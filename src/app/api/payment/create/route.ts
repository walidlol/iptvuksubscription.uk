import { NextRequest, NextResponse } from 'next/server'
import { createPayment } from '@/lib/nowpayments'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || typeof body.planName !== 'string' || typeof body.amount !== 'number') {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { planName, amount, payCurrency } = body as {
    planName:     string
    amount:       number
    payCurrency?: string
  }

  const result = await createPayment({ planName, amount, payCurrency })

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 502 })
  }

  return NextResponse.json({
    payment_id:    result.payment_id,
    payment_url:   result.payment_url,
    pay_address:   result.pay_address,
    pay_amount:    result.pay_amount,
    pay_currency:  result.pay_currency,
  })
}
