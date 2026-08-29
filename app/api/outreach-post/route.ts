import { callGemini } from '../../lib/gemini'

// Free bonus utility — not gated by the billing/usage system, same reasoning
// as /api/followup and /api/rfp-analyzer. Aimed at local/service businesses
// (contractors, landscapers, roofers, salons, etc.) who need quick,
// ready-to-post social content rather than formal proposals.
export async function POST(request: Request) {
  try {
    const { business, message, email } = await request.json()

    if (!business || !message) {
      return Response.json(
        { error: 'Describe your business and what you want to post about' },
        { status: 400 }
      )
    }
    if (!email) {
      return Response.json({ error: 'Enter your account email first' }, { status: 400 })
    }

    const prompt = `You write short, engaging Facebook/Instagram-style posts for local service businesses (contractors, landscapers, roofers, salons, cleaners, and similar) to use for client outreach and marketing.

Business: ${business}
What they want to post about: ${message}

Write 3 short, distinct variations of a ready-to-post update, using Markdown headings to separate them:

#### Option 1
(a friendly, direct version)

#### Option 2
(a version that leads with the benefit to the customer)

#### Option 3
(a version with a light sense of urgency or seasonal timing, only if it fits naturally)

Each option should: open with a hook in the first line, describe the offer or update in plain, everyday language (no jargon), end with one clear call to action (call, message, or visit their page), and include 3-5 relevant hashtags on their own line at the end. Keep each option under 70 words. Do not invent specific prices, addresses, or phone numbers that weren't provided.`

    const result = await callGemini(prompt)
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 500 })
    }

    return Response.json({ posts: result.text })
  } catch (error) {
    console.error('Outreach post generation error:', error)
    return Response.json({ error: 'Failed to generate posts' }, { status: 500 })
  }
}
