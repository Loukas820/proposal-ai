import { callGemini } from '../../lib/gemini'

// Free bonus utility, same reasoning as the other /api/* tools — builds the
// "what happens after they say yes" moment that proposal generation alone
// doesn't cover.
export async function POST(request: Request) {
  try {
    const { clientName, projectSummary, email, companyProfile } = await request.json()

    if (!projectSummary) {
      return Response.json({ error: 'Describe the project or paste the accepted proposal' }, { status: 400 })
    }
    if (!email) {
      return Response.json({ error: 'Enter your account email first' }, { status: 400 })
    }

    let senderContext = ''
    if (companyProfile && (companyProfile.companyName || companyProfile.tagline)) {
      senderContext = `\n\nSent on behalf of: ${companyProfile.companyName || ''}${companyProfile.email ? ` (${companyProfile.email})` : ''}${companyProfile.phone ? `, ${companyProfile.phone}` : ''}.`
    }

    const prompt = `Write a short, warm client onboarding packet for a project that was just accepted. Use Markdown (#### headings, - bullet lists, **bold**). Address it to ${clientName || 'the client'}.

Structure:
#### Welcome
A brief, genuine welcome message confirming the project is starting.
#### What Happens Next
3-5 concrete next steps, as a bullet list, in the order they'll happen.
#### What We'll Need From You
Anything the client typically needs to provide or prepare, based on the project described (keep generic if unclear).
#### Your Point of Contact
Restate the company contact details provided.

Do not invent specific dates, prices, or names not given below.${senderContext}

Project or accepted proposal:
${projectSummary}`

    const result = await callGemini(prompt)
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 500 })
    }

    return Response.json({ packet: result.text })
  } catch (error) {
    console.error('Onboarding packet generation error:', error)
    return Response.json({ error: 'Failed to generate the onboarding packet' }, { status: 500 })
  }
}
