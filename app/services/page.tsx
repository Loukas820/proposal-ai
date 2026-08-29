'use client'
import { useEffect } from 'react'
import Link from 'next/link'

const CORE = {
  title: 'Proposal Generation',
  body: 'Paste an RFP or brief, get a structured, client-ready proposal in your voice — executive summary, scope, timeline, and a clear next step. The core of ProposalAI, and still the fastest way to turn an opportunity into a sent document.',
  cta: { href: '/dashboard', label: 'Open the Workspace' },
  pricing: 'Free (2/mo) · $9.99/proposal · $49/mo unlimited',
}

const LIVE = [
  {
    icon: '✉',
    title: 'Follow-Up Email Generator',
    body: 'Silence after sending a proposal is where deals quietly die. Paste what you sent and get a warm, low-pressure follow-up in seconds — no more staring at a blank compose window a week later wondering how to phrase it.',
    href: '/tools/follow-up',
    tag: 'Free with your account',
  },
  {
    icon: '◎',
    title: 'RFP Analyzer',
    body: 'Not every RFP is worth a full response. Paste one in before you commit hours to writing — get requirements, budget and deadline signals, and red flags pulled out so you can make a fast go/no-go call.',
    href: '/tools/rfp-analyzer',
    tag: 'Free with your account',
  },
]

const ROADMAP = [
  {
    icon: '✎',
    title: 'Client Onboarding Packet',
    body: 'The moment a proposal is accepted, generate a welcome packet automatically — kickoff details, what to expect, and first steps — so the handoff from "yes" to "working together" feels as sharp as the pitch.',
  },
  {
    icon: '⇄',
    title: 'Multi-Language Proposals',
    body: 'Draft the same proposal in a second language for international clients, preserving tone and structure — for consultancies pitching beyond their home market.',
  },
]

export default function Services() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-hero bg-grain relative" style={{ color: 'var(--cream)' }}>
      <header className="nav-glass-dark" style={{ borderBottom: '1px solid var(--gold-dim)' }}>
        <nav className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl tracking-wide" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}>
            ProposalAI
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/services" className="text-sm tracking-widest uppercase" style={{ color: 'var(--gold)' }}>Services</Link>
            <Link href="/pricing" className="link-gold text-sm tracking-widest uppercase">Pricing</Link>
            <Link href="/resources" className="link-gold text-sm tracking-widest uppercase">Free Guide</Link>
            <Link href="/dashboard" className="link-gold text-sm tracking-widest uppercase">Enter →</Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-20 relative z-10">
        <div className="text-xs tracking-[0.3em] uppercase mb-4 text-center" style={{ color: 'var(--gold)' }}>
          What ProposalAI Does
        </div>
        <h1 className="text-4xl md:text-5xl text-center mb-6" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}>
          A Complete Practice Around Winning Work
        </h1>
        <p className="text-center text-base max-w-xl mx-auto mb-20" style={{ color: 'rgba(248,245,238,0.65)' }}>
          Proposal writing is one moment in a longer cycle — deciding what to bid on, sending it, and following up. ProposalAI is built to cover the whole thing, not just the document.
        </p>

        <div className="card-dark card-featured p-10 mb-16 reveal">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <h2 className="text-2xl" style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)' }}>
              {CORE.title}
            </h2>
            <span className="text-xs tracking-[0.15em] uppercase" style={{ color: 'var(--gold)' }}>{CORE.pricing}</span>
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(248,245,238,0.7)' }}>
            {CORE.body}
          </p>
          <Link href={CORE.cta.href} className="btn-gold inline-block px-8 py-3 text-xs tracking-[0.2em] uppercase" style={{ fontWeight: 600 }}>
            {CORE.cta.label}
          </Link>
        </div>

        <div className="text-xs tracking-[0.3em] uppercase mb-8 text-center reveal" style={{ color: 'var(--gold)' }}>
          Included Free With Every Account
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {LIVE.map((s) => (
            <div key={s.title} className="card-dark p-8 reveal">
              <div className="flex items-center justify-between mb-5">
                <div className="w-9 h-9 flex items-center justify-center text-base" style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}>
                  {s.icon}
                </div>
                <span className="text-xs tracking-[0.15em] uppercase" style={{ color: 'var(--gold-light)' }}>{s.tag}</span>
              </div>
              <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)' }}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(248,245,238,0.65)' }}>
                {s.body}
              </p>
              <Link href={s.href} className="link-gold text-xs tracking-[0.2em] uppercase">
                Try it →
              </Link>
            </div>
          ))}
        </div>

        <div className="text-xs tracking-[0.3em] uppercase mb-8 text-center reveal" style={{ color: 'var(--gold)' }}>
          On the Roadmap
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {ROADMAP.map((s) => (
            <div key={s.title} className="p-8 reveal" style={{ border: '1px dashed var(--gold-dim)' }}>
              <div className="w-9 h-9 flex items-center justify-center text-base mb-5" style={{ border: '1px solid var(--gold-dim)', color: 'rgba(248,245,238,0.5)' }}>
                {s.icon}
              </div>
              <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'rgba(248,245,238,0.75)' }}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,245,238,0.5)' }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center reveal">
          <Link href="/dashboard" className="btn-gold inline-block px-10 py-4 text-sm tracking-[0.2em] uppercase" style={{ fontWeight: 600 }}>
            Start Free
          </Link>
        </div>
      </main>

      <footer className="px-8 py-6 text-center text-xs relative z-10" style={{ borderTop: '1px solid var(--gold-dim)', color: 'rgba(248,245,238,0.4)' }}>
        ProposalAI — Precision proposal writing, powered by AI · © {new Date().getFullYear()}
      </footer>
    </div>
  )
}
