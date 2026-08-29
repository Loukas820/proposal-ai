// Shared Gemini REST helper. Uses raw fetch rather than an SDK so the app
// has zero extra runtime dependencies for AI calls.

export async function callGemini(prompt: string): Promise<
  { ok: true; text: string } | { ok: false; error: string }
> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return { ok: false, error: 'GEMINI_API_KEY is not set' }
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  )

  const data = await res.json()

  if (!res.ok) {
    console.error('Gemini API error:', JSON.stringify(data))
    return { ok: false, error: data?.error?.message || 'The AI request failed' }
  }

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
  return { ok: true, text }
}
