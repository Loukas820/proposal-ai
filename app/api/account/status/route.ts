import { getAccountStatus } from '../../../lib/billing'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    if (!email) {
      return Response.json({ error: 'Missing email' }, { status: 400 })
    }
    const status = await getAccountStatus(email)
    return Response.json(status)
  } catch (error) {
    console.error('Account status error:', error)
    return Response.json({ error: error instanceof Error ? error.message : 'Failed to load account status' }, { status: 500 })
  }
}
