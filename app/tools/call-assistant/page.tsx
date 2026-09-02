'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProfile, getAccountEmail } from '../../lib/storage'
import ProposalView from '../../components/ProposalView'

const CALL_PURPOSES = [
  'New Lead Follow-Up',
  'Appointment Confirmation Call',
  'Job Update Call',
  'Payment / Invoice Reminder Call',
  'General Check-In',
]

export default function CallAssistantTool() {
  const [businessName, setBusinessName] = useState('')
  const [callPurpose, setCallPurpose] = useState(CALL_PURPOSES[0])
  const [contactName, setContactName] = useState('')
  const [notes, setNotes] = useState('')
  const [email, setEmail] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setEmail(getAccountEmail())
    const profile = getProfile()
    if (profile.companyName) setBusinessName(profile.companyName)
  }, [])

  const generate = async () => {
    if (!email) {
      alert('Set your account email in the Workspace first.')
      return
    }
    setLoading(true)
    setResult('')
    try {
      const res = await fetch('/api/call-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, callPurpose, contactName, notes, email }),
      })
      const data = await res.json()
      if (data.error) {
        alert('Error: ' + data.error)
      } else {
        setResult(data.messages)
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
            📞
          </div>
          <span
            className="text-xs tracking-[0.2em] uppercase px-3 py-1"
            style={{ border: '1px solid var(--gold-dim)', color: 'var(--gold)' }}
          >
            Free Tool
          </span>
        </div>
        <h1 className="text-3xl mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
          Call &amp; Missed-Call Assistant
        </h1>
        <p className="text-sm mb-10 max-w-xl" style={{ color: 'rgba(34,38,47,0.6)' }}>
          Know what to say before you dial, plus a text ready if the call goes to voicemail.
        </p>

        <div className="card p-8 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-xs tracking-[0.2em] uppercase mb-2 block" style={{ color: 'var(--navy)' }}>
              Reason For The Call
            </label>
            <select
              value={callPurpose}
              onChange={(e) => setCallPurpose(e.target.value)}
              className="input-refined w-full px-4 py-3 text-sm mb-6"
            >
              {CALL_PURPOSES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <label className="text-xs tracking-[0.2em] uppercase mb-2 block" style={{ color: 'var(--navy)' }}>
              Your Business Name
            </label>
            <input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Acme Roofing"
              className="input-refined w-full px-4 py-3 text-sm mb-6"
            />

            <label className="text-xs tracking-[0.2em] uppercase mb-2 block" style={{ color: 'var(--navy)' }}>
              Contact Name
            </label>
            <input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="optional"
              className="input-refined w-full px-4 py-3 text-sm mb-6"
            />

            <label className="text-xs tracking-[0.2em] uppercase mb-2 block" style={{ color: 'var(--navy)' }}>
              Context For The Call
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="optional — e.g. quoted them last week, following up on the estimate"
              rows={3}
              className="input-refined w-full px-4 py-3 text-sm"
            />

            <button
              onClick={generate}
              disabled={loading || !businessName}
              className="btn-navy w-full mt-6 py-3 text-sm tracking-[0.2em] uppercase disabled:opacity-40"
              style={{ fontWeight: 600 }}
            >
              {loading ? 'Writing…' : 'Generate'}
            </button>
          </div>

          <div>
            <div className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--navy)' }}>
              Script &amp; Text-Back
            </div>
            <div className={result ? 'doc-paper h-96 p-6 text-sm leading-relaxed overflow-y-auto' : 'card h-96 p-5 text-sm overflow-y-auto'}>
              {loading ? (
                <div className="flex flex-col gap-3 pt-1">
                  <div className="skeleton-line w-4/6" />
                  <div className="skeleton-line w-full" />
                  <div className="skeleton-line w-5/6 mt-4" />
                  <div className="skeleton-line w-full" />
                </div>
              ) : result ? (
                <ProposalView text={result} />
              ) : (
                <span style={{ color: 'rgba(34,38,47,0.35)' }}>Your call script and text-back message will appear here…</span>
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
