import { callGemini } from '../../lib/gemini'

// Free bonus utility, same pattern as the other /api/* tools. Produces a
// starting-point service agreement template — explicitly not legal advice,
// and the prompt is written to keep it generic rather than jurisdiction-
// specific so it doesn't overstate what an AI draft can safely cover.
export async function POST(request: Request) {
  try {
    const { clientName, scope, paymentTerms, timeline, email, companyProfile } = await request.json()

    if (!scope) {
      return Response.json({ error: 'Describe the scope of work first' }, { status: 400 })
    }
    if (!email) {
      return Response.json({ error: 'Enter your account email first' }, { status: 400 })
    }

    let senderContext = ''
    if (companyProfile && (companyProfile.companyName || companyProfile.tagline)) {
      senderContext = `\n\nThe service provider is: ${companyProfile.companyName || '[Your Company Name]'}${companyProfile.email ? ` (${companyProfile.email})` : ''}${companyProfile.phone ? `, ${companyProfile.phone}` : ''}.`
    }

    const prompt = `Draft a plain-language service agreement TEMPLATE between a service provider and a client, based on the details below. Use Markdown (#### headings, - bullet lists, **bold**). This is a generic starting template, not a jurisdiction-specific legal document — do not invent governing law, state-specific clauses, or legal citations.

Structure:
#### Parties
Service Provider and Client (use ${clientName || '[Client Name]'} for the client), with a line for the effective date to be filled in.
#### Scope of Work
Based on the description below, stated clearly and specifically.
#### Payment Terms
Based on what's provided below; if not provided, leave a clear placeholder like [PAYMENT TERMS] rather than inventing amounts.
#### Timeline
Based on what's provided below; use a placeholder if not given.
#### Cancellation & Changes
A short, standard, fair clause covering how either party can end the engagement or request scope changes.
#### Signatures
Placeholder lines for both parties to sign and date.

At the very top, include this exact line in bold: **This is a starting template, not legal advice. Have it reviewed by a licensed attorney before using it.**${senderContext}

Scope of work:
${scope}

Payment terms: ${paymentTerms || 'not specified'}
Timeline: ${timeline || 'not specified'}`

    const result = await callGemini(prompt)
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 500 })
    }

    return Response.json({ agreement: result.text })
  } catch (error) {
    console.error('Agreement generation error:', error)
    return Response.json({ error: 'Failed to generate the agreement' }, { status: 500 })
  }
}
