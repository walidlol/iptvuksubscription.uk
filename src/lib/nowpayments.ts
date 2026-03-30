const NOWPAYMENTS_API = 'https://api.nowpayments.io/v1'

export interface CreatePaymentParams {
  planName: string
  amount:   number
  currency?: string
  payCurrency?: string
}

export interface PaymentResult {
  payment_id?:     string
  payment_url?:    string
  pay_address?:    string
  pay_amount?:     number
  pay_currency?:   string
  price_amount?:   number
  price_currency?: string
  error?:          string
}

export async function createPayment({
  planName,
  amount,
  currency    = 'gbp',
  payCurrency = 'btc',
}: CreatePaymentParams): Promise<PaymentResult> {
  const apiKey = process.env.NOWPAYMENTS_API_KEY
  if (!apiKey) {
    return { error: 'NOWPayments API key not configured' }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://iptvuksubscription.uk'

  const res = await fetch(`${NOWPAYMENTS_API}/payment`, {
    method: 'POST',
    headers: {
      'x-api-key':    apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      price_amount:      amount,
      price_currency:    currency,
      pay_currency:      payCurrency,
      order_description: `IPTV UK - ${planName}`,
      ipn_callback_url:  `${siteUrl}/api/payment/webhook`,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    return { error: (err as { message?: string }).message ?? 'Payment creation failed' }
  }

  return res.json()
}
