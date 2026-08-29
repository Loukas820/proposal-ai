'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--navy)', color: 'var(--cream)' }}>
      <header style={{ borderBottom: '1px solid rgba(184,148,79,0.25)' }}>
        <nav className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between">
          <div
            className="text-2xl tracking-wide"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
          >
            ProposalAI
          </div>
          <Link
            href="/dashboard"
            className="text-sm tracking-widest uppercase"
            style={{ color: 'var(--gold-light)' }}
          >
            Enter →
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div
          className="text-xs tracking-[0.3em] uppercase mb-8"
          style={{ color: 'var(--gold)' }}
        >
          AI-Powered Proposal Generation
        </div>

        <h1
          className="max-w-3xl text-5xl md:text-6xl leading-tight mb-8"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
        >
          Turn RFPs Into Proposals of Distinction
        </h1>

        <p
          className="max-w-xl text-lg mb-12 leading-relaxed"
          style={{ color: 'rgba(248,245,238,0.7)' }}
        >
          A disciplined, precise approach to proposal writing — built for
          consultants who value their time as much as their reputation.
        </p>

        <Link
          href="/dashboard"
          className="px-10 py-4 text-sm tracking-[0.2em] uppercase transition"
          style={{
            backgroundColor: 'var(--gold)',
            color: 'var(--navy-deep)',
            fontWeight: 600,
          }}
        >
          Begin
        </Link>

        <div
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-3xl w-full pt-12"
          style={{ borderTop: '1px solid rgba(184,148,79,0.25)' }}
        >
          <div>
            <div
              className="text-3xl mb-2"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)' }}
            >
              20–40 hrs
            </div>
            <div className="text-sm" style={{ color: 'rgba(248,245,238,0.6)' }}>
              Saved per proposal
            </div>
          </div>
          <div>
            <div
              className="text-3xl mb-2"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)' }}
            >
              Minutes
            </div>
            <div className="text-sm" style={{ color: 'rgba(248,245,238,0.6)' }}>
              From RFP to draft
            </div>
          </div>
          <div>
            <div
              className="text-3xl mb-2"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)' }}
            >
              Precision
            </div>
            <div className="text-sm" style={{ color: 'rgba(248,245,238,0.6)' }}>
              Client-ready quality
            </div>
          </div>
        </div>
      </main>

      <footer
        className="px-8 py-6 text-center text-xs"
        style={{ borderTop: '1px solid rgba(184,148,79,0.25)', color: 'rgba(248,245,238,0.4)' }}
      >
        ProposalAI — Precision proposal writing, powered by AI
      </footer>
    </div>
  )
}
