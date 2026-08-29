import { callGemini } from '../../lib/gemini'

export async function POST(request: Request) {
  try {
    const { text, targetLanguage, email } = await request.json()

    if (!text) {
      return Response.json({ error: 'Paste the text to translate first' }, { status: 400 })
    }
    if (!targetLanguage) {
      return Response.json({ error: 'Choose a target language' }, { status: 400 })
    }
    if (!email) {
      return Response.json({ error: 'Enter your account email first' }, { status: 400 })
    }

    const prompt = `Translate the following document into ${targetLanguage}. Preserve the Markdown structure exactly (headings marked with #, bold marked with **, bullet lists marked with -) and keep the same professional tone. Output only the translated document — no commentary, no notes, no explanation of your translation choices.

Document:
${text}`

    const result = await callGemini(prompt)
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 500 })
    }

    return Response.json({ translation: result.text })
  } catch (error) {
    console.error('Translation error:', error)
    return Response.json({ error: 'Failed to translate' }, { status: 500 })
  }
}
