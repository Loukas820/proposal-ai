import { stripeRequest } from './stripe'

const FREE_LIMIT = 2
const MS_30_DAYS = 30 * 24 * 60 * 60 * 1000

export type AccountStatus = {
  customerId: string
  plan: 'free' | 'unlimited'
  freeUsed: number
  freeLimit: number
  credits: number
  unlimitedActive: boolean
}

type StripeCustomer = {
  id: string
  metadata?: Record<string, string>
}

async function findCustomerByEmail(email: string): Promise<StripeCustomer | null> {
  const data = await stripeRequest('/customers', 'GET', { email, limit: 1 })
  return data.data?.[0] || null
}

async function createCustomer(email: string): Promise<StripeCustomer> {
  return stripeRequest('/customers', 'POST', {
    email,
    metadata: {
      credits: '0',
      free_used: '0',
      free_period_start: new Date().toISOString(),
    },
  })
}

export async function getOrCreateCustomer(email: string): Promise<StripeCustomer> {
  const existing = await findCustomerByEmail(email)
  if (existing) return existing
  return createCustomer(email)
}

function resolveFreeUsage(metadata: Record<string, string>) {
  const start = metadata.free_period_start ? new Date(metadata.free_period_start).getTime() : 0
  const expired = !start || Date.now() - start > MS_30_DAYS
  return {
    freeUsed: expired ? 0 : parseInt(metadata.free_used || '0', 10),
    periodStart: expired ? new Date().toISOString() : metadata.free_period_start,
    expired,
  }
}

async function hasActiveSubscription(customerId: string): Promise<boolean> {
  const data = await stripeRequest('/subscriptions', 'GET', {
    customer: customerId,
    status: 'active',
    limit: 1,
  })
  return (data.data?.length || 0) > 0
}

export async function getAccountStatus(email: string): Promise<AccountStatus> {
  const customer = await getOrCreateCustomer(email)
  const metadata = customer.metadata || {}
  const { freeUsed, periodStart, expired } = resolveFreeUsage(metadata)

  if (expired) {
    await stripeRequest(`/customers/${customer.id}`, 'POST', {
      metadata: { free_used: '0', free_period_start: periodStart },
    })
  }

  const credits = parseInt(metadata.credits || '0', 10)
  const unlimitedActive = await hasActiveSubscription(customer.id)

  return {
    customerId: customer.id,
    plan: unlimitedActive ? 'unlimited' : 'free',
    freeUsed,
    freeLimit: FREE_LIMIT,
    credits,
    unlimitedActive,
  }
}

export async function consumeUsage(
  email: string
): Promise<{ allowed: boolean; status: AccountStatus }> {
  const status = await getAccountStatus(email)

  if (status.unlimitedActive) {
    return { allowed: true, status }
  }

  if (status.freeUsed < status.freeLimit) {
    await stripeRequest(`/customers/${status.customerId}`, 'POST', {
      metadata: { free_used: String(status.freeUsed + 1) },
    })
    return { allowed: true, status: { ...status, freeUsed: status.freeUsed + 1 } }
  }

  if (status.credits > 0) {
    await stripeRequest(`/customers/${status.customerId}`, 'POST', {
      metadata: { credits: String(status.credits - 1) },
    })
    return { allowed: true, status: { ...status, credits: status.credits - 1 } }
  }

  return { allowed: false, status }
}

// Idempotent: a given Checkout Session only ever grants one credit, even if
// the confirm endpoint is called more than once (e.g. the user refreshes).
export async function grantCreditOnce(customerId: string, sessionId: string) {
  const customer: StripeCustomer = await stripeRequest(`/customers/${customerId}`)
  const metadata = customer.metadata || {}
  const already = (metadata.credited_sessions || '').split(',').filter(Boolean)
  if (already.includes(sessionId)) return

  const current = parseInt(metadata.credits || '0', 10)
  const updatedSessions = [...already, sessionId].slice(-20).join(',')

  await stripeRequest(`/customers/${customerId}`, 'POST', {
    metadata: {
      credits: String(current + 1),
      credited_sessions: updatedSessions,
    },
  })
}
