import { callGemini } from '../../lib/gemini'

export async function POST(request: Request) {
  try {
    const { businessName, jobType, reviewLink, email } = await request.json()

    if (!businessName || !jobType) {
      return Response.json({ error: 'Enter your business name and the type of job completed' }, { status: 400 })
    }
    if (!email) {
      return Response.json({ error: 'Enter your account email first' }, { status: 400 })
    }

    const linkNote = reviewLink
      ? `Include this exact review link naturally in both versions: ${reviewLink}`
      : `Use the placeholder [REVIEW LINK] where the link should go — the business will fill in their own.`

    const prompt = `Write two short, friendly review requests for a customer after ${businessName} completed a ${jobType} job for them. Keep it casual, warm, and low-pressure — never guilt-tripping or pushy. Use Markdown headings to separate them.

#### Text Message Version
Under 40 words, casual tone.

#### Email Version
Under 90 words, slightly more complete but still warm and brief, with a short subject line suggestion first.

${linkNote}`

    const result = await callGemini(prompt)
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 500 })
    }

    return Response.json({ messages: result.text })
  } catch (error) {
    console.error('Review request generation error:', error)
    return Response.json({ error: 'Failed to generate review requests' }, { status: 500 })
  }
}
