'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProfile, getAccountEmail } from '../../lib/storage'
import ProposalView from '../../components/ProposalView'

export default function ReviewRequestTool() {
  const [businessName, setBusinessName] = useState('')
  const [jobType, setJobType] = useState('')
  const [reviewLink, setReviewLink] = useState('')
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
      const res = await fetch('/api/review-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, jobType, reviewLink, email }),
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
            ProposalAI
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
        <h1 className="text-3xl mt-4 mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
          Review Request Generator
        </h1>
        <p className="text-sm mb-10" style={{ color: 'rgba(34,38,47,0.6)' }}>
          Job&apos;s done — ask for the review while the good feeling is fresh. Free with your account.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
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
              Job Completed
            </label>
            <input
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              placeholder="e.g. roof replacement"
              className="input-refined w-full px-4 py-3 text-sm mb-6"
            />
            <label className="text-xs tracking-[0.2em] uppercase mb-2 block" style={{ color: 'var(--navy)' }}>
              Review Link (optional)
            </label>
            <input
              value={reviewLink}
              onChange={(e) => setReviewLink(e.target.value)}
              placeholder="e.g. your Google Business review link"
              className="input-refined w-full px-4 py-3 text-sm"
            />
            <button
              onClick={generate}
              disabled={loading || !businessName || !jobType}
              className="btn-navy w-full mt-4 py-3 text-sm tracking-[0.2em] uppercase disabled:opacity-40"
              style={{ fontWeight: 600 }}
            >
              {loading ? 'Writing…' : 'Generate Messages'}
            </button>
          </div>

          <div>
            <div className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--navy)' }}>
              Text & Email Versions
            </div>
            <div className={result ? 'doc-paper h-80 p-6 text-sm leading-relaxed overflow-y-auto' : 'card h-80 p-5 text-sm overflow-y-auto'}>
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
                <span style={{ color: 'rgba(34,38,47,0.35)' }}>Your review request messages will appear here…</span>
              )}
            </div>
            {result && (
              <button onClick={handleCopy} className="btn-outline w-full mt-4 py-3 text-sm tracking-[0.2em] uppercase" style={{ fontWeight: 600 }}>
                {copied ? 'Copied ✓' : 'Copy Text'}
              </button>
            )}
          </div>
        </div>
      </main>

      <footer className="px-8 py-6 text-center text-xs" style={{ borderTop: '1px solid var(--hairline)', color: 'rgba(34,38,47,0.4)' }}>
        ProposalAI — Precision proposal writing, powered by AI
      </footer>
    </div>
  )
}
