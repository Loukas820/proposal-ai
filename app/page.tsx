'use client'
import Link from 'next/link'

const FEATURES = [
  {
    title: 'Precision Drafting',
    body: 'Every proposal is written in your company’s voice, referencing your capabilities and terms — not generic filler.',
  },
  {
    title: 'Client-Ready Documents',
    body: 'Export a clean, branded PDF in one click — ready to send, not a wall of raw text to reformat yourself.',
  },
  {
    title: 'Built for Volume',
    body: 'Every proposal is saved to your history automatically, so nothing is ever lost and nothing is retyped twice.',
  },
]

const FAQS = [
  {
    q: 'What is ProposalAI?',
    a: 'ProposalAI turns an RFP or client brief into a polished, ready-to-send proposal in minutes, written on behalf of your company using the profile you set up.',
  },
  {
    q: 'How is this different from just using a chatbot?',
    a: 'ProposalAI remembers your company details so you never re-explain them, keeps a history of every proposal you’ve generated, and exports a branded, client-ready PDF — not just raw chat text.',
  },
  {
    q: 'How does pricing work?',
    a: 'Pay per proposal, or go unlimited with a monthly plan if you send proposals regularly. Choose whichever fits how often you pitch new work.',
  },
  {
    q: 'Is my data private?',
    a: 'Your company profile and proposal history are stored locally in your own browser — they are not sent anywhere except to generate each proposal.',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-hero" style={{ color: 'var(--cream)' }}>
      <header style={{ borderBottom: '1px solid var(--gold-dim)' }}>
        <nav className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between">
          <div
            className="text-2xl tracking-wide"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
          >
            ProposalAI
          </div>
          <div className="flex items-center gap-8">
            <Link href="/resources" className="link-gold text-sm tracking-widest uppercase">
              Free Guide
            </Link>
            <Link href="/dashboard" className="link-gold text-sm tracking-widest uppercase">
              Enter →
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center px-6">
        <div className="flex flex-col items-center justify-center text-center pt-28 pb-24 w-full">
          <div
            className="text-xs tracking-[0.3em] uppercase mb-8 fade-in-up"
            style={{ color: 'var(--gold)' }}
          >
            AI-Powered Proposal Generation
          </div>

          <h1
            className="max-w-3xl text-5xl md:text-6xl leading-tight mb-8 fade-in-up fade-delay-1"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
          >
            Turn RFPs Into Proposals of Distinction
          </h1>

          <p
            className="max-w-xl text-lg mb-12 leading-relaxed fade-in-up fade-delay-2"
            style={{ color: 'rgba(248,245,238,0.7)' }}
          >
            A disciplined, precise approach to proposal writing — built for
            consultants who value their time as much as their reputation.
          </p>

          <Link
            href="/dashboard"
            className="btn-gold px-10 py-4 text-sm tracking-[0.2em] uppercase fade-in-up fade-delay-3"
            style={{ fontWeight: 600 }}
          >
            Begin
          </Link>

          <div
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-3xl w-full pt-12"
            style={{ borderTop: '1px solid var(--gold-dim)' }}
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
        </div>

        <section className="w-full max-w-5xl py-24" style={{ borderTop: '1px solid var(--gold-dim)' }}>
          <div className="ornament mb-6"><span>◆</span></div>
          <div
            className="text-xs tracking-[0.3em] uppercase mb-4 text-center"
            style={{ color: 'var(--gold)' }}
          >
            Why ProposalAI
          </div>
          <h2
            className="text-3xl text-center mb-16"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
          >
            More Than a Chatbot
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FEATURES.map((f) => (
              <div key={f.title} className="card-dark p-8">
                <div
                  className="w-8 h-8 flex items-center justify-center mb-5 text-sm"
                  style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}
                >
                  ◆
                </div>
                <h3
                  className="text-lg mb-3"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)' }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,245,238,0.65)' }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="w-full max-w-4xl py-24" style={{ borderTop: '1px solid var(--gold-dim)' }}>
          <div className="ornament mb-6"><span>◆</span></div>
          <div
            className="text-xs tracking-[0.3em] uppercase mb-4 text-center"
            style={{ color: 'var(--gold)' }}
          >
            Pricing
          </div>
          <h2
            className="text-3xl text-center mb-16"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-sm mb-12 max-w-lg mx-auto" style={{ color: 'rgba(248,245,238,0.55)' }}>
            Priced for what the writing alone is worth — not what a generic document platform charges for e-signatures and storage you may not need.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-dark p-8 flex flex-col items-center text-center">
              <div className="text-sm tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--gold-light)' }}>
                Free
              </div>
              <div className="text-4xl mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}>
                $0
              </div>
              <div className="text-sm mb-8" style={{ color: 'rgba(248,245,238,0.55)' }}>
                2 proposals every month
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,245,238,0.6)' }}>
                No card required. See the quality for yourself before you spend anything.
              </p>
            </div>
            <div className="card-dark p-8 flex flex-col items-center text-center">
              <div className="text-sm tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--gold-light)' }}>
                Per Proposal
              </div>
              <div className="text-4xl mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}>
                $9.99
              </div>
              <div className="text-sm mb-8" style={{ color: 'rgba(248,245,238,0.55)' }}>
                pay only when you send one
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,245,238,0.6)' }}>
                For the occasional pitch — no subscription to remember to cancel.
              </p>
            </div>
            <div className="card-dark card-featured p-8 flex flex-col items-center text-center relative">
              <div
                className="absolute -top-3 px-4 py-1 text-xs tracking-[0.2em] uppercase"
                style={{ backgroundColor: 'var(--gold)', color: 'var(--navy-deep)', fontWeight: 600 }}
              >
                Best Value
              </div>
              <div className="text-sm tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--gold-light)' }}>
                Unlimited
              </div>
              <div className="text-4xl mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}>
                $49
                <span className="text-base"> /mo</span>
              </div>
              <div className="text-sm mb-8" style={{ color: 'rgba(248,245,238,0.55)' }}>
                unlimited proposals
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,245,238,0.6)' }}>
                Less than one hour of billable time, for every proposal you send all month.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/resources" className="link-gold text-xs tracking-[0.2em] uppercase">
              Not ready to try it? Get the free RFP Response Checklist →
            </Link>
          </div>
        </section>

        <section className="w-full max-w-3xl py-24" style={{ borderTop: '1px solid var(--gold-dim)' }}>
          <div className="ornament mb-6"><span>◆</span></div>
          <div
            className="text-xs tracking-[0.3em] uppercase mb-4 text-center"
            style={{ color: 'var(--gold)' }}
          >
            Frequently Asked
          </div>
          <h2
            className="text-3xl text-center mb-16"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
          >
            Questions & Answers
          </h2>
          <div className="flex flex-col gap-6">
            {FAQS.map((item) => (
              <details key={item.q} className="group" style={{ borderBottom: '1px solid var(--gold-dim)', paddingBottom: '1.5rem' }}>
                <summary
                  className="cursor-pointer text-lg list-none flex items-center justify-between"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
                >
                  {item.q}
                  <span style={{ color: 'var(--gold)' }} className="ml-4 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm leading-relaxed mt-4" style={{ color: 'rgba(248,245,238,0.6)' }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <div className="w-full max-w-3xl pb-24 text-center">
          <Link
            href="/dashboard"
            className="btn-gold inline-block px-10 py-4 text-sm tracking-[0.2em] uppercase"
            style={{ fontWeight: 600 }}
          >
            Begin Your First Proposal
          </Link>
        </div>
      </main>

      <footer
        className="px-8 py-6 text-center text-xs"
        style={{ borderTop: '1px solid var(--gold-dim)', color: 'rgba(248,245,238,0.4)' }}
      >
        ProposalAI — Precision proposal writing, powered by AI · © {new Date().getFullYear()}
      </footer>
    </div>
  )
}
