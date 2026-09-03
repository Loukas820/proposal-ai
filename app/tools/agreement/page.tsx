'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProfile, getAccountEmail, downloadProposalPDF, CompanyProfile } from '../../lib/storage'
import ProposalView from '../../components/ProposalView'
import ToolIcon from '../../components/ToolIcon'

export default function AgreementTool() {
  const [clientName, setClientName] = useState('')
  const [scope, setScope] = useState('')
  const [paymentTerms, setPaymentTerms] = useState('')
  const [timeline, setTimeline] = useState('')
  const [email, setEmail] = useState('')
  const [profile, setProfile] = useState<CompanyProfile | null>(null)
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setEmail(getAccountEmail())
    setProfile(getProfile())
  }, [])

  const generate = async () => {
    if (!email) {
      alert('Set your account email in the Workspace first.')
      return
    }
    setLoading(true)
    setResult('')
    try {
      const res = await fetch('/api/agreement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName, scope, paymentTerms, timeline, email, companyProfile: profile }),
      })
      const data = await res.json()
      if (data.error) {
        alert('Error: ' + data.error)
      } else {
        setResult(data.agreement)
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

  const handleDownload = () => {
    if (!profile) return
    downloadProposalPDF(profile.companyName, profile.tagline, profile.email, profile.phone, result)
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
            <ToolIcon name="document" />
          </div>
          <span
            className="text-xs tracking-[0.2em] uppercase px-3 py-1"
            style={{ border: '1px solid var(--gold-dim)', color: 'var(--gold)' }}
          >
            Free Tool
          </span>
        </div>
        <h1 className="text-3xl mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
          Service Agreement Drafter
        </h1>
        <p className="text-sm mb-3 max-w-xl" style={{ color: 'rgba(34,38,47,0.6)' }}>
          A contract starting point, built from your scope, payment terms, and timeline.
        </p>
        <div className="mb-10 px-5 py-4 text-sm" style={{ backgroundColor: 'var(--gold-dim)', border: '1px solid var(--gold)', color: 'var(--navy)' }}>
          <strong>Not legal advice.</strong> This drafts a generic starting point only — have any agreement reviewed by a licensed attorney in your state before sending it to a client.
        </div>

        <div className="card p-8 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-xs tracking-[0.2em] uppercase mb-2 block" style={{ color: 'var(--navy)' }}>
              Client Name (optional)
            </label>
            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Sarah Johnson"
              className="input-refined w-full px-4 py-3 text-sm mb-6"
            />
            <label className="text-xs tracking-[0.2em] uppercase mb-2 block" style={{ color: 'var(--navy)' }}>
              Scope of Work
            </label>
            <textarea
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              placeholder="Describe the job — e.g. full roof tear-off and replacement, 2,200 sq ft, architectural shingles..."
              className="input-refined w-full h-32 p-5 text-sm leading-relaxed mb-6"
            />
            <label className="text-xs tracking-[0.2em] uppercase mb-2 block" style={{ color: 'var(--navy)' }}>
              Payment Terms (optional)
            </label>
            <input
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              placeholder="e.g. 50% deposit, 50% on completion"
              className="input-refined w-full px-4 py-3 text-sm mb-6"
            />
            <label className="text-xs tracking-[0.2em] uppercase mb-2 block" style={{ color: 'var(--navy)' }}>
              Timeline (optional)
            </label>
            <input
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              placeholder="e.g. 3-5 business days, weather permitting"
              className="input-refined w-full px-4 py-3 text-sm"
            />
            <button
              onClick={generate}
              disabled={loading || !scope}
              className="btn-navy w-full mt-6 py-3 text-sm tracking-[0.2em] uppercase disabled:opacity-40"
              style={{ fontWeight: 600 }}
            >
              {loading ? 'Drafting…' : 'Draft Agreement'}
            </button>
          </div>

          <div>
            <div className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--navy)' }}>
              Agreement Draft
            </div>
            <div className={result ? 'doc-paper h-96 p-6 text-sm leading-relaxed overflow-y-auto' : 'card h-96 p-5 text-sm overflow-y-auto'}>
              {loading ? (
                <div className="flex flex-col gap-3 pt-1">
                  <div className="skeleton-line w-5/6" />
                  <div className="skeleton-line w-full" />
                  <div className="skeleton-line w-4/6" />
                  <div className="skeleton-line w-full mt-4" />
                  <div className="skeleton-line w-10/12" />
                  <div className="skeleton-line w-3/6" />
                </div>
              ) : result ? (
                <ProposalView text={result} />
              ) : (
                <span style={{ color: 'rgba(34,38,47,0.35)' }}>Your agreement draft will appear here…</span>
              )}
            </div>
            {result && (
              <div className="flex gap-3 mt-4">
                <button onClick={handleCopy} className="btn-outline flex-1 py-3 text-sm tracking-[0.2em] uppercase" style={{ fontWeight: 600 }}>
                  {copied ? 'Copied ✓' : 'Copy Text'}
                </button>
                <button onClick={handleDownload} className="btn-navy flex-1 py-3 text-sm tracking-[0.2em] uppercase" style={{ fontWeight: 600 }}>
                  Download PDF
                </button>
              </div>
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
