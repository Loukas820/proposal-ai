import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { rfp } = await request.json()

    if (!rfp) {
      return Response.json({ error: 'No RFP provided' }, { status: 400 })
    }

    const message = await client.messages.create({
      model: 'claude-opus-5',
      max_tokens: 3000,
      messages: [
        {
          role: 'user',
          content: `You are an expert proposal writer. Based on this RFP, write a professional consulting proposal. Make it detailed, persuasive, and ready to send to the client.\n\nRFP:\n${rfp}`,
        },
      ],
    })

    const proposal =
      message.content[0].type === 'text' ? message.content[0].text : ''

    return Response.json({ proposal })
  } catch (error) {
    console.error('Error:', error)
    return Response.json(
      { error: 'Failed to generate proposal' },
      { status: 500 }
    )
  }
}
