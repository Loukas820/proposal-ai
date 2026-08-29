import { callGemini } from '../../lib/gemini'

export async function POST(request: Request) {
  try {
    const { businessName, callPurpose, contactName, notes, email } = await request.json()

    if (!businessName || !callPurpose) {
      return Response.json({ error: 'Enter your business name and the reason for the call' }, { status: 400 })
    }
    if (!email) {
      return Response.json({ error: 'Enter your account email first' }, { status: 400 })
    }

    const nameNote = contactName ? `The person is ${contactName}.` : `No name was given — keep it generic.`
    const notesNote = notes ? `Context to reference on the call: ${notes}` : ''

    const prompt = `${businessName} needs to make a phone call to a customer or lead. The reason for the call is: "${callPurpose}".

${nameNote}
${notesNote}

Use Markdown headings to produce two things:

#### Call Talking Points
A short bullet-point script for the actual phone call: a natural opening line, 3-5 key points to cover in order, how to handle the most likely objection or question, and a clear close (what to confirm or ask for before hanging up). Keep it conversational, not stiff or salesy.

#### Missed-Call Text-Back
A single short text message (under 30 words) to send immediately if the call goes to voicemail or isn't picked up — friendly, low-pressure, inviting them to call back or reply.

Do not invent specific dollar amounts, dates, or facts that weren't given.`

    const result = await callGemini(prompt)
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 500 })
    }

    return Response.json({ messages: result.text })
  } catch (error) {
    console.error('Call assistant generation error:', error)
    return Response.json({ error: 'Failed to generate call assistant content' }, { status: 500 })
  }
}
