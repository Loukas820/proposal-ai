'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProfile, addHistoryEntry, downloadProposalPDF, CompanyProfile } from '../lib/storage'

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

  useEffect(() => {
    setProfile(getProfile())
  }, [])

  const generate = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rfp, companyProfile: profile }),
      })
      const data = await res.json()
      if (data.error) {
        alert('Error: ' + data.error)
      } else {
        setProposal(data.proposal)
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

  const handleDownload = () => {
    downloadProposalPDF(profile.companyName, profile.tagline, profile.email, profile.phone, proposal)
  }

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
        <p className="text-sm mb-10" style={{ color: 'rgba(34,38,47,0.6)' }}>
          {profile.companyName
            ? `Writing on behalf of ${profile.companyName}. Paste an RFP below to draft a proposal.`
            : 'Paste an RFP below and let AI draft a precise, client-ready response.'}
        </p>

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
