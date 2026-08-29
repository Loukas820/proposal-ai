'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProfile, addHistoryEntry, downloadProposalPDF, CompanyProfile } from '../lib/storage'

type AccountStatus = {
  plan: 'free' | 'unlimited'
  freeUsed: number
  freeLimit: number
  credits: number
  unlimitedActive: boolean
}

const EMAIL_KEY = 'proposalai_account_email'

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

    const savedEmail = typeof window !== 'undefined' ? window.localStorage.getItem(EMAIL_KEY) : ''
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
    window.localStorage.setItem(EMAIL_KEY, trimmed)
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

  const freeRemaining = status ? Math.max(status.freeLimit - status.freeUsed, 0) : null

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)' }}>
      <header style={{ borderBottom: '1px solid var(--hairline)' }}>
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl tracking-wide"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}
          >
            ProposalAI
          </Link>
          <nav className="flex gap-6 text-xs tracking-[0.2em] uppercase">
            <Link href="/dashboard" style={{ color: 'var(--gold)' }}>Workspace</Link>
            <Link href="/history" className="link-gold" style={{ color: 'var(--charcoal)' }}>History</Link>
            <Link href="/resources" className="link-gold" style={{ color: 'var(--charcoal)' }}>Free Guide</Link>
            <Link href="/settings" className="link-gold" style={{ color: 'var(--charcoal)' }}>Profile</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-8 py-12 fade-in-up">
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
            ? `Writing on behalf of ${profile.companyName}. Paste an RFP below to draft a proposal.`
            : 'Paste an RFP below and let AI draft a precise, client-ready response.'}
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
                  <span style={{ color: 'var(--gold)' }} className="font-medium">Unlimited plan active</span>
                )}
                {!statusLoading && status && !status.unlimitedActive && (
                  <span style={{ color: 'rgba(34,38,47,0.7)' }}>
                    {freeRemaining} of {status.freeLimit} free proposals left this month
                    {status.credits > 0 ? ` · ${status.credits} credit${status.credits === 1 ? '' : 's'} available` : ''}
                  </span>
                )}
                <button
                  onClick={() => {
                    window.localStorage.removeItem(EMAIL_KEY)
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
              You've used your free proposals for this month
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div
              className="text-xs tracking-[0.2em] uppercase mb-3"
              style={{ color: 'var(--navy)' }}
            >
              Request for Proposal
            </div>
            <textarea
              value={rfp}
              onChange={(e) => setRfp(e.target.value)}
              placeholder="Paste RFP..."
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
            <div className="card h-80 p-5 text-sm leading-relaxed overflow-y-auto whitespace-pre-wrap">
              {proposal || (
                <span style={{ color: 'rgba(34,38,47,0.35)' }}>
                  Your draft will appear here…
                </span>
              )}
            </div>
            {proposal && (
              <button
                onClick={handleDownload}
                className="btn-outline w-full mt-4 py-3 text-sm tracking-[0.2em] uppercase"
                style={{ fontWeight: 600 }}
              >
                Download PDF
              </button>
            )}
          </div>
        </div>
      </main>

      <footer
        className="px-8 py-6 text-center text-xs"
        style={{ borderTop: '1px solid var(--hairline)', color: 'rgba(34,38,47,0.4)' }}
      >
        ProposalAI — Precision proposal writing, powered by AI
      </footer>
    </div>
  )
}
