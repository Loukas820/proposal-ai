import { callGemini } from '../../lib/gemini'

export async function POST(request: Request) {
  try {
    const { businessName, messageType, customerName, dateTime, jobDescription, notes, email } = await request.json()

    if (!businessName || !messageType || !jobDescription) {
      return Response.json({ error: 'Enter your business name, message type, and a short job/service description' }, { status: 400 })
    }
    if (!email) {
      return Response.json({ error: 'Enter your account email first' }, { status: 400 })
    }

    const nameNote = customerName ? `Address the customer as ${customerName}.` : `Use a placeholder like [Customer Name] since no name was given.`
    const timeNote = dateTime ? `The relevant date/time is: ${dateTime}.` : `No specific date/time was given — use a placeholder like [date/time] where needed.`
    const extraNote = notes ? `Extra context to weave in naturally: ${notes}` : ''

    const prompt = `Write a short customer update message for ${businessName} to send about: ${jobDescription}.

The message type is "${messageType}" — write it in a tone appropriate to that type (a reminder should feel helpful, not naggy; a delay notice should be apologetic and reassuring; a job-complete or delivery message should feel satisfying and clear about what happens next).

${nameNote}
${timeNote}
${extraNote}

Use Markdown headings to separate two versions:

#### Text Message Version
Under 35 words. Plain, friendly, easy to read at a glance on a phone. No emojis unless the message type is celebratory (like job complete).

#### Email Version
Under 80 words. Slightly more complete, with a short subject line suggestion first, still warm and to the point — never corporate-sounding.

Do not invent specific dollar amounts, addresses, or facts that weren't given.`

    const result = await callGemini(prompt)
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 500 })
    }

    return Response.json({ messages: result.text })
  } catch (error) {
    console.error('Customer update generation error:', error)
    return Response.json({ error: 'Failed to generate customer update messages' }, { status: 500 })
  }
}
