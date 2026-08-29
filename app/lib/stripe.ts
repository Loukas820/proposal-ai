const STRIPE_API = 'https://api.stripe.com/v1'

type Json = Record<string, unknown>

function flatten(obj: Json, prefix = ''): [string, string][] {
  const out: [string, string][] = []
  for (const key in obj) {
    const value = obj[key]
    const k = prefix ? `${prefix}[${key}]` : key
    if (value === undefined || value === null) continue
    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (v && typeof v === 'object') {
          out.push(...flatten(v as Json, `${k}[${i}]`))
        } else {
          out.push([`${k}[${i}]`, String(v)])
        }
      })
    } else if (typeof value === 'object') {
      out.push(...flatten(value as Json, k))
    } else {
      out.push([k, String(value)])
    }
  }
  return out
}

// Minimal Stripe REST client using fetch + form encoding, no SDK dependency.
export async function stripeRequest(
  path: string,
  method: 'GET' | 'POST' = 'GET',
  body?: Json
) {
  const apiKey = process.env.STRIPE_SECRET_KEY
  if (!apiKey) throw new Error('STRIPE_SECRET_KEY is not set')

  let url = `${STRIPE_API}${path}`
  const headers: Record<string, string> = {
    Authorization: 'Basic ' + Buffer.from(`${apiKey}:`).toString('base64'),
  }
  const init: RequestInit = { method, headers }

  if (body && method === 'GET') {
    const params = new URLSearchParams(flatten(body))
    const qs = params.toString()
    if (qs) url += `?${qs}`
  } else if (body) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
    init.body = new URLSearchParams(flatten(body)).toString()
  }

  const res = await fetch(url, init)
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data?.error?.message || 'Stripe API error')
  }
  return data
}
