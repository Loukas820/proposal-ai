'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAccountEmail } from '../../lib/storage'
import ProposalView from '../../components/ProposalView'
import ToolIcon from '../../components/ToolIcon'

const LANGUAGES = [
  'Spanish', 'French', 'German', 'Portuguese', 'Italian',
  'Mandarin Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi',
]

export default function TranslateTool() {
  const [text, setText] = useState('')
  const [language, setLanguage] = useState(LANGUAGES[0])
  const [email, setEmail] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setEmail(getAccountEmail())
  }, [])

  const translate = async () => {
    if (!email) {
      alert('Set your account email in the Workspace first.')
      return
    }
    setLoading(true)
    setResult('')
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLanguage: language, email }),
      })
      const data = await res.json()
      if (data.error) {
        alert('Error: ' + data.error)
      } else {
        setResult(data.translation)
      }
    } catch (e) {
      alert('Error: ' + e)
    }
    setLoading(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // best-effort
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)' }}>
      <header className="nav-glass-light" style={{ borderBottom: '1px solid var(--hairline)' }}>
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl tracking-wide" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
            Daybase
          </Link>
          <nav className="flex gap-6 text-xs tracking-[0.2em] uppercase">
            <Link href="/dashboard" className="link-gold" style={{ color: 'var(--charcoal)' }}>Workspace</Link>
            <Link href="/tools" style={{ color: 'var(--gold)' }}>Tools</Link>
            <Link href="/history" className="link-gold" style={{ color: 'var(--charcoal)' }}>History</Link>
            <Link href="/settings" className="link-gold" style={{ color: 'var(--charcoal)' }}>Profile</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-8 py-12 fade-in-up">
        <Link href="/tools" className="text-xs tracking-[0.15em] uppercase link-gold" style={{ color: 'var(--gold)' }}>
          ← All Tools
        </Link>
        <div className="flex items-center gap-3 mt-5 mb-4">
          <div
            className="w-10 h-10 flex items-center justify-center text-lg shrink-0"
            style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}
          >
            <ToolIcon name="swap" />
          </div>
          <span
            className="text-xs tracking-[0.2em] uppercase px-3 py-1"
            style={{ border: '1px solid var(--gold-dim)', color: 'var(--gold)' }}
          >
            Free Tool
          </span>
        </div>
        <h1 className="text-3xl mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
          Multi-Language Proposals
        </h1>
        <p className="text-sm mb-10 max-w-xl" style={{ color: 'rgba(34,38,47,0.6)' }}>
          Paste a proposal or document, pick a language — get a translation that keeps the tone and structure.
        </p>

        <div className="card p-8 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-xs tracking-[0.2em] uppercase mb-2 block" style={{ color: 'var(--navy)' }}>
              Translate To
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input-refined w-full px-4 py-3 text-sm mb-6"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <label className="text-xs tracking-[0.2em] uppercase mb-2 block" style={{ color: 'var(--navy)' }}>
              Original Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your proposal or document..."
              className="input-refined w-full h-56 p-5 text-sm leading-relaxed"
            />
            <button
              onClick={translate}
              disabled={loading || !text}
              className="btn-navy w-full mt-4 py-3 text-sm tracking-[0.2em] uppercase disabled:opacity-40"
              style={{ fontWeight: 600 }}
            >
              {loading ? 'Translating…' : `Translate to ${language}`}
            </button>
          </div>

          <div>
            <div className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--navy)' }}>
              Translation
            </div>
            <div className={result ? 'doc-paper h-72 p-6 text-sm leading-relaxed overflow-y-auto' : 'card h-72 p-5 text-sm overflow-y-auto'}>
              {loading ? (
                <div className="flex flex-col gap-3 pt-1">
                  <div className="skeleton-line w-5/6" />
                  <div className="skeleton-line w-full" />
                  <div className="skeleton-line w-4/6" />
                </div>
              ) : result ? (
                <ProposalView text={result} />
              ) : (
                <span style={{ color: 'rgba(34,38,47,0.35)' }}>Your translation will appear here…</span>
              )}
            </div>
            {result && (
              <button onClick={handleCopy} className="btn-outline w-full mt-4 py-3 text-sm tracking-[0.2em] uppercase" style={{ fontWeight: 600 }}>
                {copied ? 'Copied ✓' : 'Copy Text'}
              </button>
            )}
          </div>
        </div>
        </div>
      </main>

      <footer className="px-8 py-6 text-center text-xs" style={{ borderTop: '1px solid var(--hairline)', color: 'rgba(34,38,47,0.4)' }}>
        Daybase — Run your business, without the busywork
      </footer>
    </div>
  )
}
