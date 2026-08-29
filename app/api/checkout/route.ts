import { getOrCreateCustomer } from '../../lib/billing'
import { stripeRequest } from '../../lib/stripe'

export async function POST(request: Request) {
  try {
    const { email, type } = await request.json()

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 })
    }
    if (type !== 'single' && type !== 'unlimited') {
      return Response.json({ error: 'Invalid plan type' }, { status: 400 })
    }

    const customer = await getOrCreateCustomer(email)
    const origin = new URL(request.url).origin
    const isSingle = type === 'single'

    const priceData: Record<string, unknown> = {
      currency: 'usd',
      unit_amount: isSingle ? 999 : 4900,
      product_data: {
        name: isSingle ? 'ProposalAI — Single Proposal' : 'ProposalAI — Unlimited Monthly',
      },
    }
    if (!isSingle) {
      priceData.recurring = { interval: 'month' }
    }

    const session = await stripeRequest('/checkout/sessions', 'POST', {
      mode: isSingle ? 'payment' : 'subscription',
      customer: customer.id,
      line_items: [{ quantity: 1, price_data: priceData }],
      success_url: `${origin}/dashboard?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard?checkout=cancel`,
    })

    return Response.json({ url: session.url })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return Response.json({ error: error.message || 'Failed to start checkout' }, { status: 500 })
  }
}
