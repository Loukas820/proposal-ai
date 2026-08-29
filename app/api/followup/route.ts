import { callGemini } from '../../lib/gemini'

// Free bonus utility — not gated by the billing/usage system. Requiring an
// email keeps it tied to an account without adding friction or cannibalizing
// the metered proposal-generation product.
export async function POST(request: Request) {
  try {
    const { context, clientName, email, companyProfile } = await request.json()

    if (!context) {
      return Response.json({ error: 'Paste the proposal or a short summary first' }, { status: 400 })
    }
    if (!email) {
      return Response.json({ error: 'Enter your account email first' }, { status: 400 })
    }

    let senderContext = ''
    if (companyProfile && (companyProfile.companyName || companyProfile.tagline)) {
      senderContext = `\n\nSign it on behalf of: ${companyProfile.companyName || ''}${companyProfile.email ? ` (${companyProfile.email})` : ''}.`
    }

    const prompt = `You write short, warm, professional follow-up emails for consultants checking in after sending a proposal. Given the proposal (or a summary of it) below, write a brief follow-up email that:

- Opens with a light, genuine check-in — never pushy or salesy
- References the specific work proposed, in one sentence
- Removes friction with one low-effort next step (e.g. a short call this week)
- Closes warmly, signed off simply

Keep it under 120 words. Address it to ${clientName || 'the client'}.${senderContext}

Proposal or summary:
${context}`

    const result = await callGemini(prompt)
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 500 })
    }

    return Response.json({ email: result.text })
  } catch (error) {
    console.error('Follow-up generation error:', error)
    return Response.json({ error: 'Failed to generate the follow-up email' }, { status: 500 })
  }
}
