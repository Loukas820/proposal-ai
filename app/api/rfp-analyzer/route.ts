import { callGemini } from '../../lib/gemini'

// Free bonus utility — not gated by the billing/usage system, same reasoning
// as /api/followup.
export async function POST(request: Request) {
  try {
    const { rfp, email } = await request.json()

    if (!rfp) {
      return Response.json({ error: 'Paste an RFP first' }, { status: 400 })
    }
    if (!email) {
      return Response.json({ error: 'Enter your account email first' }, { status: 400 })
    }

    const prompt = `You are a consulting operations analyst. Read the RFP or client brief below and produce a structured breakdown to help a consultant quickly decide whether and how to respond. Use Markdown (#### headings, - bullet lists, **bold**).

Structure:
#### Key Requirements — bullet the concrete deliverables and requirements stated
#### Deadline & Budget Signals — what's stated about timing and budget; if either is missing, say so plainly rather than guessing
#### Potential Red Flags — anything vague, contradictory, or risky about scope, timeline, or terms
#### Recommended Approach — a short, direct read on how a strong response should be framed given what's here

Never invent facts not present in the text below — call out explicitly when something isn't stated.

RFP or brief:
${rfp}`

    const result = await callGemini(prompt)
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 500 })
    }

    return Response.json({ analysis: result.text })
  } catch (error) {
    console.error('RFP analysis error:', error)
    return Response.json({ error: 'Failed to analyze the RFP' }, { status: 500 })
  }
}
