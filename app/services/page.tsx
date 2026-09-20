'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import ToolIcon, { IconName } from '../components/ToolIcon'

type Service = { icon: IconName; title: string; body: string; href: string; note?: string }

const CATEGORIES: { name: string; blurb: string; freeAll?: boolean; services: Service[] }[] = [
  {
    name: 'Your Front Desk',
    blurb: 'The calls, appointments, and inbound requests that used to need someone answering the phone.',
    freeAll: true,
    services: [
      {
        icon: 'phone',
        title: 'Call & Missed-Call Assistant',
        body: 'A short talking-points script before you dial, plus a friendly missed-call text-back so a call that goes to voicemail never just goes cold.',
        href: '/tools/call-assistant',
      },
      {
        icon: 'calendar',
        title: 'Customer Update Messages',
        body: 'Appointment confirmations, reminders, delay notices, job-started and job-complete updates, delivery notices — the message that keeps a customer in the loop, written for you in seconds.',
        href: '/tools/customer-updates',
      },
      {
        icon: 'link',
        title: 'Public Quote Request Link',
        body: 'A shareable link for your Facebook bio or posts — anyone can request a quote and it lands straight in your inbox, no app or account needed on their end.',
        href: '/settings',
      },
    ],
  },
  {
    name: 'Get Found & Stay In Touch',
    blurb: 'The outreach that keeps new work coming in, and keeps past clients coming back.',
    freeAll: true,
    services: [
      {
        icon: 'megaphone',
        title: 'Social Post Generator',
        body: 'Not every business runs on formal RFPs. Landscapers, roofers, and local contractors can describe a job or offer and get three ready-to-post Facebook or Instagram updates for client outreach.',
        href: '/tools/outreach-post',
      },
      {
        icon: 'mail',
        title: 'Follow-Up Email Generator',
        body: 'Silence after sending a quote is where deals quietly die. Paste what you sent and get a warm, low-pressure follow-up in seconds.',
        href: '/tools/follow-up',
      },
      {
        icon: 'star',
        title: 'Review Request Generator',
        body: 'Job’s done — get a text message and email version asking for a review while the good feeling is still fresh.',
        href: '/tools/review-request',
      },
    ],
  },
  {
    name: 'Back Office',
    blurb: 'The paperwork — quotes, proposals, contracts — once someone’s ready to say yes.',
    services: [
      {
        icon: 'sparkle',
        title: 'Proposals & Quotes',
        body: 'Paste a bid request or describe a job and get a structured, client-ready proposal in your voice — executive summary, scope, timeline, and a clear next step.',
        href: '/dashboard',
        note: '2 free/mo · $9.99/proposal · $49/mo unlimited',
      },
      {
        icon: 'receipt',
        title: 'Quote Builder',
        body: 'Line items, tax, and total calculated for you — export a branded quote as a PDF. Pure arithmetic, no AI, built for trades and service businesses that quote by the job.',
        href: '/tools/quote-builder',
      },
      {
        icon: 'search',
        title: 'Bid Request Checker',
        body: 'Not every big, formal bid request (also called an RFP) is worth a full response. Paste one in and quickly see what it’s asking for, before you spend hours writing.',
        href: '/tools/rfp-analyzer',
      },
      {
        icon: 'document',
        title: 'Service Agreement Drafter',
        body: 'A starting contract template built from your scope, payment terms, and timeline — not legal advice, but a real head start before an attorney reviews it.',
        href: '/tools/agreement',
      },
      {
        icon: 'pencil',
        title: 'Client Onboarding Packet',
        body: 'The moment a proposal is accepted, generate a welcome packet automatically — next steps, what you need from them, and who to contact.',
        href: '/tools/onboarding-packet',
      },
      {
        icon: 'swap',
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
            Daybase
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
          What Daybase Does
        </div>
        <h1 className="text-4xl md:text-5xl text-center mb-6" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}>
          Everything It Takes To Run Your Day
        </h1>
        <p className="text-center text-base max-w-xl mx-auto mb-20" style={{ color: 'rgba(246,247,249,0.65)' }}>
          Most of running a service business isn&apos;t the pitch — it&apos;s the phone ringing, the calendar filling up, and staying in touch after the job&apos;s done. Daybase runs your front desk first, and handles the quotes, proposals, and contracts once someone&apos;s ready to say yes.
        </p>

        {CATEGORIES.map((cat) => (
          <div key={cat.name} className="mb-16">
            <div className="text-xs tracking-[0.3em] uppercase mb-3 text-center reveal" style={{ color: 'var(--gold)' }}>
              {cat.name}{cat.freeAll ? ' · Free With Every Account' : ''}
            </div>
            <p className="text-center text-sm max-w-md mx-auto mb-8 reveal" style={{ color: 'rgba(246,247,249,0.55)' }}>
              {cat.blurb}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cat.services.map((s) => (
                <div key={s.title} className="card-dark p-8 reveal">
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-9 h-9 flex items-center justify-center text-base"
                      style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}
                    >
                      <ToolIcon name={s.icon} />
                    </div>
                    {s.note && (
                      <span
                        className="text-[10px] tracking-[0.15em] uppercase px-2 py-1"
                        style={{ backgroundColor: 'var(--gold-dim)', color: 'var(--gold-light)' }}
                      >
                        Paid Tool
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)' }}>
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-2" style={{ color: 'rgba(246,247,249,0.65)' }}>
                    {s.body}
                  </p>
                  {s.note && (
                    <p className="text-xs mb-3" style={{ color: 'rgba(246,247,249,0.45)' }}>
                      {s.note}
                    </p>
                  )}
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

      <footer className="px-8 py-6 text-center text-xs relative z-10" style={{ borderTop: '1px solid var(--gold-dim)', color: 'rgba(246,247,249,0.4)' }}>
        Daybase — Run your business, without the busywork · © {new Date().getFullYear()}
      </footer>
    </div>
  )
}
