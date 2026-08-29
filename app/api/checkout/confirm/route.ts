import { stripeRequest } from '../../../lib/stripe'
import { grantCreditOnce, getAccountStatus } from '../../../lib/billing'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')
    const email = searchParams.get('email')

    if (!sessionId || !email) {
      return Response.json({ error: 'Missing session_id or email' }, { status: 400 })
    }

    const session = await stripeRequest(`/checkout/sessions/${sessionId}`)
    const paid = session.payment_status === 'paid' || session.status === 'complete'

    if (paid && session.mode === 'payment' && session.customer) {
      await grantCreditOnce(session.customer, sessionId)
    }

    const status = await getAccountStatus(email)
    return Response.json({ confirmed: paid, mode: session.mode, status })
  } catch (error) {
    console.error('Confirm checkout error:', error)
    return Response.json({ error: error instanceof Error ? error.message : 'Failed to confirm checkout' }, { status: 500 })
  }
}
