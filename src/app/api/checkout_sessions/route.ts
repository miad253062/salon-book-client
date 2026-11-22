import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '@/app/lib/stripe'

type CheckoutBody = {
  amount?: number
  appointmentId?: string
  serviceName?: string
  userId?: string
  customerName?: string
  customerEmail?: string
  appointmentDate?: string
}

export async function POST(request: Request) {
  try {
    const origin =
      (await headers()).get('origin') ||
      process.env.BETTER_AUTH_URL ||
      'http://localhost:3000'

    const body = (await request.json()) as CheckoutBody

    const amount = Math.round(Number(body.amount))
    const serviceName = body.serviceName?.trim() || 'SalonBook service'

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: 'A valid amount is required.' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: amount,
            product_data: {
              name: serviceName,
            },
          },
        },
      ],
      metadata: {
        appointmentId: body.appointmentId ?? '',
        userId: body.userId ?? '',
        serviceName,
        customerName: body.customerName ?? '',
        customerEmail: body.customerEmail ?? '',
        appointmentDate: body.appointmentDate ?? '',
      },
      client_reference_id: body.appointmentId,
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment-canceled`,
    })

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unable to start checkout'
    const status =
      typeof err === 'object' && err !== null && 'statusCode' in err
        ? Number((err as { statusCode?: number }).statusCode) || 500
        : 500

    console.error('[checkout] failed:', message)
    return NextResponse.json({ error: message }, { status })
  }
}
