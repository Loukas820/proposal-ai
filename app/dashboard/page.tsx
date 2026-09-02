'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProfile, addHistoryEntry, downloadProposalPDF, CompanyProfile, getAccountEmail, saveAccountEmail, clearAccountEmail } from '../lib/storage'
import ProposalView from '../components/ProposalView'

type AccountStatus = {
  plan: 'free' | 'unlimited'
  freeUsed: number
  freeLimit: number
  credits: number
  unlimitedActive: boolean
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export default function Dashboard() {
  const [rfp, setRfp] = useState('')
  const [proposal, setProposal] = useState('')
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<CompanyProfile>({
    companyName: '',
    tagline: '',
    email: '',
    phone: '',
  })

  const [accountEmail, setAccountEmail] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [status, setStatus] = useState<AccountStatus | null>(null)
  const [statusLoading, setStatusLoading] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState<'single' | 'unlimited' | null>(null)
  const [limitReached, setLimitReached] = useState(false)
  const [banner, setBanner] = useState('')
  const [copied, setCopied] = useState(false)

  const fetchStatus = async (email: string) => {
    setStatusLoading(true)
    try {
      const res = await fetch(`/api/account/status?email=${encodeURIComponent(email)}`)
      const data = await res.json()
      if (!data.error) setStatus(data)
    } catch {
      // ignore — billing status is best-effort for display
    }
    setStatusLoading(false)
  }

  useEffect(() => {
    setProfile(getProfile())

    const savedEmail = getAccountEmail()
    if (savedEmail) {
      setAccountEmail(savedEmail)
      setEmailInput(savedEmail)
    }

    const params = new URLSearchParams(window.location.search)
    const checkout = params.get('checkout')
    const sessionId = params.get('session_id')

    if (checkout === 'success' && sessionId && savedEmail) {
      fetch(`/api/checkout/confirm?session_id=${encodeURIComponent(sessionId)}&email=${encodeURIComponent(savedEmail)}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.confirmed) {
            setBanner(
              data.mode === 'subscription'
                ? 'Unlimited plan active — generate as many proposals as you need.'
                : 'Payment received — 1 proposal credit added to your account.'
            )
            setLimitReached(false)
          }
          if (data.status) setStatus(data.status)
        })
        .finally(() => {
          window.history.replaceState({}, '', '/dashboard')
        })
    } else if (checkout === 'cancel') {
      window.history.replaceState({}, '', '/dashboard')
    } else if (savedEmail) {
      fetchStatus(savedEmail)
    }
  }, [])

  const saveEmail = () => {
    const trimmed = emailInput.trim()
    if (!isValidEmail(trimmed)) {
      alert('Enter a valid email address to track your usage and plan.')
      return
    }
    saveAccountEmail(trimmed)
    setAccountEmail(trimmed)
    fetchStatus(trimmed)
  }

  const generate = async () => {
    if (!accountEmail) {
      alert('Enter your account email first so we can track your plan.')
      return
    }
    setLoading(true)
    setLimitReached(false)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rfp, companyProfile: profile, email: accountEmail }),
      })
      const data = await res.json()
      if (res.status === 402) {
        setLimitReached(true)
        if (data.status) setStatus(data.status)
      } else if (data.error) {
        alert('Error: ' + data.error)
      } else {
        setProposal(data.proposal)
        if (data.status) setStatus(data.status)
        addHistoryEntry({
          rfp,
          proposal: data.proposal,
          companyName: profile.companyName,
        })
      }
    } catch (e) {
      alert('Error: ' + e)
    }
    setLoading(false)
  }

  const startCheckout = async (type: 'single' | 'unlimited') => {
    if (!accountEmail) {
      alert('Enter your account email first so we know whose plan to upgrade.')
      return
    }
    setCheckoutLoading(type)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: accountEmail, type }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Error: ' + (data.error || 'Could not start checkout'))
      }
    } catch (e) {
      alert('Error: ' + e)
    }
    setCheckoutLoading(null)
  }

  const handleDownload = () => {
    downloadProposalPDF(profile.companyName, profile.tagline, profile.email, profile.phone, proposal)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(proposal)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard access can fail silently in some browser contexts — no-op
    }
  }

  const freeRemaining = status ? Math.max(status.freeLimit - status.freeUsed, 0) : null

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)' }}>
      <header className="nav-glass-light" style={{ borderBottom: '1px solid var(--hairline)' }}>
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl tracking-wide"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}
          >
            Daybase
          </Link>
          <nav className="flex gap-6 text-xs tracking-[0.2em] uppercase">
            <Link href="/dashboard" style={{ color: 'var(--gold)' }}>Workspace</Link>
            <Link href="/tools" className="link-gold" style={{ color: 'var(--charcoal)' }}>Tools</Link>
            <Link href="/history" className="link-gold" style={{ color: 'var(--charcoal)' }}>History</Link>
            <Link href="/resources" className="link-gold" style={{ color: 'var(--charcoal)' }}>Free Guide</Link>
            <Link href="/settings" className="link-gold" style={{ color: 'var(--charcoal)' }}>Profile</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-8 py-12 fade-in-up">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 flex items-center justify-center text-lg shrink-0"
            style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}
          >
            ✦
          </div>
          <span
            className="text-xs tracking-[0.2em] uppercase px-3 py-1"
            style={{ border: '1px solid var(--gold-dim)', color: 'var(--gold)' }}
          >
            Proposals & Quotes
          </span>
        </div>
        <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
          <h1
            className="text-3xl"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}
          >
            Compose a Proposal
          </h1>
          {!profile.companyName && (
            <Link
              href="/settings"
              className="text-xs tracking-[0.15em] uppercase self-center"
              style={{ color: 'var(--gold)' }}
            >
              Set up your company profile →
            </Link>
          )}
        </div>
        <p className="text-sm mb-6" style={{ color: 'rgba(34,38,47,0.6)' }}>
          {profile.companyName
            ? `Writing on behalf of ${profile.companyName}. Paste the request, brief, or job details below to draft a proposal.`
            : 'Paste the request, brief, or job details below and let AI draft a clear, client-ready response.'}
        </p>

        {/* Account / billing strip */}
        <div className="card p-5 mb-10 flex flex-wrap items-center gap-4 justify-between">
          {!accountEmail ? (
            <>
              <div className="text-sm" style={{ color: 'var(--charcoal)' }}>
                Enter your email to track your free proposals and plan.
              </div>
              <div className="flex gap-2 items-center flex-1 min-w-[260px]">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveEmail()}
                  placeholder="you@company.com"
                  className="input-refined flex-1 px-4 py-2 text-sm"
                />
                <button onClick={saveEmail} className="btn-navy px-5 py-2 text-xs tracking-[0.15em] uppercase">
                  Save
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-sm" style={{ color: 'var(--charcoal)' }}>
                <span style={{ color: 'rgba(34,38,47,0.5)' }}>Account:</span>{' '}
                <strong style={{ color: 'var(--navy)' }}>{accountEmail}</strong>
              </div>
              <div className="text-sm flex items-center gap-3 flex-wrap">
                {statusLoading && <span style={{ color: 'rgba(34,38,47,0.5)' }}>Checking plan…</span>}
                {!statusLoading && status?.unlimitedActive && (
                  <span className="flex items-center gap-2" style={{ color: 'var(--gold)' }}>
                    <span className="status-dot" style={{ backgroundColor: 'var(--gold)' }} />
                    <span className="font-medium">Unlimited plan active</span>
                  </span>
                )}
                {!statusLoading && status && !status.unlimitedActive && (
                  <span className="flex items-center gap-2" style={{ color: 'rgba(34,38,47,0.7)' }}>
                    <span
                      className="status-dot"
                      style={{ backgroundColor: freeRemaining && freeRemaining > 0 ? '#3f8f5f' : '#b5533c' }}
                    />
                    {freeRemaining} of {status.freeLimit} free proposals left this month
                    {status.credits > 0 ? ` · ${status.credits} credit${status.credits === 1 ? '' : 's'} available` : ''}
                  </span>
                )}
                <button
                  onClick={() => {
                    clearAccountEmail()
                    setAccountEmail('')
                    setEmailInput('')
                    setStatus(null)
                  }}
                  className="text-xs uppercase tracking-[0.15em]"
                  style={{ color: 'rgba(34,38,47,0.4)' }}
                >
                  Change
                </button>
              </div>
            </>
          )}
        </div>

        {banner && (
          <div
            className="mb-8 px-5 py-4 text-sm"
            style={{ backgroundColor: 'var(--gold-dim)', border: '1px solid var(--gold)', color: 'var(--navy)' }}
          >
            {banner}
          </div>
        )}

        {limitReached && (
          <div className="card-featured p-6 mb-10">
            <div className="text-lg mb-1" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
              You&apos;ve used your free proposals for this month
            </div>
            <p className="text-sm mb-5" style={{ color: 'rgba(34,38,47,0.65)' }}>
              Buy a single proposal or go unlimited to keep drafting.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => startCheckout('single')}
                disabled={checkoutLoading !== null}
                className="btn-outline px-6 py-3 text-xs tracking-[0.15em] uppercase disabled:opacity-40"
              >
                {checkoutLoading === 'single' ? 'Redirecting…' : 'Buy 1 Proposal — $9.99'}
              </button>
              <button
                onClick={() => startCheckout('unlimited')}
                disabled={checkoutLoading !== null}
                className="btn-gold px-6 py-3 text-xs tracking-[0.15em] uppercase disabled:opacity-40"
              >
                {checkoutLoading === 'unlimited' ? 'Redirecting…' : 'Go Unlimited — $49/mo'}
              </button>
            </div>
          </div>
        )}

        <div className="card p-8 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div
              className="text-xs tracking-[0.2em] uppercase mb-3"
              style={{ color: 'var(--navy)' }}
            >
              Request Or Job Brief
            </div>
            <textarea
              value={rfp}
              onChange={(e) => setRfp(e.target.value)}
              placeholder="Paste the request or brief here..."
              className="input-refined w-full h-80 p-5 text-sm leading-relaxed"
            />
            <button
              onClick={generate}
              disabled={loading || !rfp}
              className="btn-navy w-full mt-4 py-3 text-sm tracking-[0.2em] uppercase disabled:opacity-40"
              style={{ fontWeight: 600 }}
            >
              {loading ? 'Drafting…' : 'Generate Proposal'}
            </button>
          </div>

          <div>
            <div
              className="text-xs tracking-[0.2em] uppercase mb-3"
              style={{ color: 'var(--navy)' }}
            >
              Draft Proposal
            </div>
            <div
              className={
                proposal
                  ? 'doc-paper h-80 p-6 text-sm leading-relaxed overflow-y-auto whitespace-pre-wrap fade-in-up'
                  : 'card h-80 p-5 text-sm leading-relaxed overflow-y-auto whitespace-pre-wrap'
              }
            >
              {loading ? (
                <div className="flex flex-col gap-3 pt-1">
                  <div className="skeleton-line w-5/6" />
                  <div className="skeleton-line w-full" />
                  <div className="skeleton-line w-11/12" />
                  <div className="skeleton-line w-4/6" />
                  <div className="skeleton-line w-full mt-4" />
                  <div className="skeleton-line w-10/12" />
                  <div className="skeleton-line w-3/6" />
                </div>
              ) : proposal ? (
                <ProposalView text={proposal} />
              ) : (
                <span style={{ color: 'rgba(34,38,47,0.35)' }}>
                  Your draft will appear here…
                </span>
              )}
            </div>
            {proposal && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCopy}
                  className="btn-outline flex-1 py-3 text-sm tracking-[0.2em] uppercase"
                  style={{ fontWeight: 600 }}
                >
                  {copied ? 'Copied ✓' : 'Copy Text'}
                </button>
                <button
                  onClick={handleDownload}
                  className="btn-navy flex-1 py-3 text-sm tracking-[0.2em] uppercase"
                  style={{ fontWeight: 600 }}
                >
                  Download PDF
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
      </main>

      <footer
        className="px-8 py-6 text-center text-xs"
        style={{ borderTop: '1px solid var(--hairline)', color: 'rgba(34,38,47,0.4)' }}
      >
        Daybase — Run your business, without the busywork
      </footer>
    </div>
  )
}
