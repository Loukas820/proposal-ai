import { consumeUsage } from '../../lib/billing'
import { callGemini } from '../../lib/gemini'

export async function POST(request: Request) {
  try {
    const { rfp, companyProfile, email } = await request.json()

    if (!rfp) {
      return Response.json({ error: 'No RFP provided' }, { status: 400 })
    }

    if (!email) {
      return Response.json({ error: 'Enter your account email first' }, { status: 400 })
    }

    let usage
    try {
      usage = await consumeUsage(email)
    } catch (billingError) {
      console.error('Billing error:', billingError)
      return Response.json(
        { error: billingError instanceof Error ? billingError.message : 'Could not check your account' },
        { status: 500 }
      )
    }

    if (!usage.allowed) {
      return Response.json(
        { error: 'limit_reached', status: usage.status },
        { status: 402 }
      )
    }

    let senderContext = ''
    if (companyProfile && (companyProfile.companyName || companyProfile.tagline)) {
      senderContext = `\n\nThis proposal is being written on behalf of the following company. Write it in their voice, as the sender:\nCompany Name: ${companyProfile.companyName || ''}\nWhat they do: ${companyProfile.tagline || ''}\nContact Email: ${companyProfile.email || ''}\nContact Phone: ${companyProfile.phone || ''}\nDo not invent a different company name in the proposal — use the one provided above.`
    }

    const prompt = `You are an elite consulting proposal writer, trained on the standards of top-tier firms. Based on this RFP or brief, write a polished, persuasive, client-ready proposal.

Structure it using Markdown (#### for section headings, **bold** for emphasis, - for bullet lists, no raw HTML), covering:

- A brief personalized opening addressed to the client, referencing their specific need
- #### Executive Summary — 2-3 sentences on the outcome you will deliver, not just the activity
- #### Scope of Work — organized into clear phases or workstreams, each with what it covers
- #### Timeline — phases mapped to a realistic duration
- #### Why [Company Name] — a short, confident case for why this team is the right fit, grounded in the company profile if provided
- #### Next Steps — one clear, specific call to action

Keep the tone precise and confident, never generic or padded with filler. Do not invent specific dollar figures, client names, or statistics that were not in the RFP — if pricing isn't specified, describe the investment in terms of value and offer to discuss scope-based pricing on a call.${senderContext}

RFP:
${rfp}`

    const result = await callGemini(prompt)

    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 500 })
    }

    return Response.json({ proposal: result.text, status: usage.status })
  } catch (error) {
    console.error('Error:', error)
    return Response.json(
      { error: 'Failed to generate proposal' },
      { status: 500 }
    )
  }
}
