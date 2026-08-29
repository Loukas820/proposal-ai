'use client'
import { useEffect } from 'react'
import Link from 'next/link'

const CORE = {
  title: 'Proposal Generation',
  body: 'Paste an RFP or brief, get a structured, client-ready proposal in your voice — executive summary, scope, timeline, and a clear next step. The core of ProposalAI, and still the fastest way to turn an opportunity into a sent document.',
  cta: { href: '/dashboard', label: 'Open the Workspace' },
  pricing: 'Free (2/mo) · $9.99/proposal · $49/mo unlimited',
}

type Service = { icon: string; title: string; body: string; href: string }

const CATEGORIES: { name: string; services: Service[] }[] = [
  {
    name: 'Get Found & Get Leads',
    services: [
      {
        icon: '📣',
        title: 'Social Post Generator',
        body: 'Not every business runs on formal RFPs. Landscapers, roofers, and local contractors can describe a job or offer and get three ready-to-post Facebook or Instagram updates for client outreach.',
        href: '/tools/outreach-post',
      },
      {
        icon: '🔗',
        title: 'Public Quote Request Link',
        body: 'A shareable link for your Facebook bio or posts — anyone can request a quote and it lands straight in your inbox, no app or account needed on their end.',
        href: '/settings',
      },
    ],
  },
  {
    name: 'Win The Work',
    services: [
      {
        icon: '◎',
        title: 'RFP Analyzer',
        body: 'Not every RFP is worth a full response. Paste one in before you commit hours to writing — get requirements, budget and deadline signals, and red flags pulled out so you can make a fast go/no-go call.',
        href: '/tools/rfp-analyzer',
      },
      {
        icon: '🧾',
        title: 'Quote Builder',
        body: 'Line items, tax, and total calculated for you — export a branded quote as a PDF. Pure arithmetic, no AI, built for trades and service businesses that quote by the job.',
        href: '/tools/quote-builder',
      },
    ],
  },
  {
    name: 'Stay In Touch',
    services: [
      {
        icon: '✉',
        title: 'Follow-Up Email Generator',
        body: 'Silence after sending a proposal is where deals quietly die. Paste what you sent and get a warm, low-pressure follow-up in seconds.',
        href: '/tools/follow-up',
      },
      {
        icon: '★',
        title: 'Review Request Generator',
        body: 'Job’s done — get a text message and email version asking for a review while the good feeling is still fresh.',
        href: '/tools/review-request',
      },
    ],
  },
  {
    name: 'Close & Deliver',
    services: [
      {
        icon: '✎',
        title: 'Client Onboarding Packet',
        body: 'The moment a proposal is accepted, generate a welcome packet automatically — next steps, what you need from them, and who to contact.',
        href: '/tools/onboarding-packet',
      },
      {
        icon: '⇄',
        title: 'Multi-Language Proposals',
        body: 'Translate a proposal into another language for international clients, preserving tone and structure.',
        href: '/tools/translate',
      },
    ],
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
          Whether you&apos;re a CEO responding to a formal RFP or a roofing or landscaping company promoting your next job on Facebook, winning work is one moment in a longer cycle — deciding what to pursue, pitching it, and following up. ProposalAI is built to cover the whole thing, not just the document.
        </p>

        <div className="card-dark card-featured p-10 mb-20 reveal">
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

        {CATEGORIES.map((cat) => (
          <div key={cat.name} className="mb-16">
            <div className="text-xs tracking-[0.3em] uppercase mb-8 text-center reveal" style={{ color: 'var(--gold)' }}>
              {cat.name} · Free With Every Account
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cat.services.map((s) => (
                <div key={s.title} className="card-dark p-8 reveal">
                  <div
                    className="w-9 h-9 flex items-center justify-center text-base mb-5"
                    style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}
                  >
                    {s.icon}
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
          </div>
        ))}

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
