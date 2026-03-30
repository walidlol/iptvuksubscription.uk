import { NextRequest, NextResponse } from 'next/server'

interface NOWPaymentsWebhook {
  payment_id?:     string
  payment_status?: string
  price_amount?:   number
  price_currency?: string
  pay_amount?:     number
  pay_currency?:   string
  order_description?: string
}

export async function POST(req: NextRequest) {
  const body: NOWPaymentsWebhook = await req.json().catch(() => ({}))

  const { payment_id, payment_status, price_amount, order_description } = body

  if (payment_status === 'finished') {
    // Payment confirmed — log for now, automate credential delivery here in future
    console.log('[NOWPayments] Payment confirmed:', {
      payment_id,
      amount: price_amount,
      plan:   order_description,
    })

    // TODO: trigger WhatsApp credential delivery via Twilio or similar
  }

  return NextResponse.json({ received: true })
}
