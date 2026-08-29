'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [rfp, setRfp] = useState('')
  const [proposal, setProposal] = useState('')
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rfp }),
      })
      const data = await res.json()
      if (data.error) {
        alert('Error: ' + data.error)
      } else {
        setProposal(data.proposal)
      }
    } catch (e) {
      alert('Error: ' + e)
    }
    setLoading(false)
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
          <div
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: 'var(--gold)' }}
          >
            Draft Workspace
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-8 py-12">
        <h1
          className="text-3xl mb-2"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}
        >
          Compose a Proposal
        </h1>
        <p className="text-sm mb-10" style={{ color: 'rgba(34,38,47,0.6)' }}>
          Paste an RFP below and let AI draft a precise, client-ready response.
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
              className="w-full h-80 p-5 text-sm leading-relaxed focus:outline-none"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--hairline)',
                color: 'var(--charcoal)',
              }}
            />
            <button
              onClick={generate}
              disabled={loading || !rfp}
              className="w-full mt-4 py-3 text-sm tracking-[0.2em] uppercase transition disabled:opacity-40"
              style={{
                backgroundColor: 'var(--navy)',
                color: 'var(--cream)',
                fontWeight: 600,
              }}
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
              className="h-80 p-5 text-sm leading-relaxed overflow-y-auto whitespace-pre-wrap"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--hairline)',
                color: 'var(--charcoal)',
              }}
            >
              {proposal || (
                <span style={{ color: 'rgba(34,38,47,0.35)' }}>
                  Your draft will appear here…
                </span>
              )}
            </div>
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
