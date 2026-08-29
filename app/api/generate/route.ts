export async function POST(request: Request) {
  try {
    const { rfp, companyProfile } = await request.json()

    if (!rfp) {
      return Response.json({ error: 'No RFP provided' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return Response.json(
        { error: 'GEMINI_API_KEY is not set' },
        { status: 500 }
      )
    }

    let senderContext = ''
    if (companyProfile && (companyProfile.companyName || companyProfile.tagline)) {
      senderContext = `\n\nThis proposal is being written on behalf of the following company. Write it in their voice, as the sender:\nCompany Name: ${companyProfile.companyName || ''}\nWhat they do: ${companyProfile.tagline || ''}\nContact Email: ${companyProfile.email || ''}\nContact Phone: ${companyProfile.phone || ''}\nDo not invent a different company name in the proposal — use the one provided above.`
    }

    const prompt = `You are an expert proposal writer. Based on this RFP, write a professional consulting proposal. Make it detailed, persuasive, and ready to send to the client.${senderContext}\n\nRFP:\n${rfp}`

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    )

    const data = await geminiRes.json()

    if (!geminiRes.ok) {
      console.error('Gemini API error:', JSON.stringify(data))
      return Response.json(
        { error: data?.error?.message || 'Failed to generate proposal' },
        { status: 500 }
      )
    }

    const proposal =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || ''

    return Response.json({ proposal })
  } catch (error) {
    console.error('Error:', error)
    return Response.json(
      { error: 'Failed to generate proposal' },
      { status: 500 }
    )
  }
}
