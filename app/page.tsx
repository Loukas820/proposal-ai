'use client'
import { useEffect } from 'react'
import Link from 'next/link'

const FEATURES = [
  {
    icon: '◆',
    title: 'Precision Drafting',
    body: 'Every proposal is written in your company’s voice, referencing your capabilities and terms — not generic filler.',
  },
  {
    icon: '✦',
    title: 'Client-Ready Documents',
    body: 'Export a clean, branded PDF in one click — ready to send, not a wall of raw text to reformat yourself.',
  },
  {
    icon: '●',
    title: 'Built for Volume',
    body: 'Every proposal is saved to your history automatically, so nothing is ever lost and nothing is retyped twice.',
  },
]

const STEPS = [
  {
    title: 'Paste your RFP',
    body: 'Drop in the request, brief, or even a rough email describing the opportunity — no reformatting needed.',
  },
  {
    title: 'AI drafts your proposal',
    body: 'Written in your voice, referencing your company profile, structured and persuasive, in under a minute.',
  },
  {
    title: 'Export & send',
    body: 'Download a branded, client-ready PDF straight from the workspace — nothing left to clean up.',
  },
]

const FAQS = [
  {
    q: 'What is ProposalAI?',
    a: 'ProposalAI turns an RFP or client brief into a polished, ready-to-send proposal in minutes, written on behalf of your company using the profile you set up \u2014 structured with an executive summary, scope of work, timeline, and a clear next step, the way a senior consultant would write it.',
  },
  {
    q: 'How is this different from just using a chatbot?',
    a: 'A chatbot forgets everything the moment you close the tab. ProposalAI remembers your company details so you never re-explain them, keeps a running history of every proposal you\u2019ve generated, formats the output as an actual document instead of a wall of chat text, and exports a branded, client-ready PDF in one click.',
  },
  {
    q: 'How accurate is the AI, and do I need to edit the output?',
    a: 'Treat the draft as a strong first pass from a capable junior consultant \u2014 the structure, tone, and logic are consulting-grade, but you should still review it for your specific facts, figures, and client details before sending. It will never invent a dollar amount or statistic that wasn\u2019t in your RFP.',
  },
  {
    q: 'What industries does this work for?',
    a: 'Any business that quotes, pitches, or proposes work \u2014 from CEOs and management consultants responding to formal RFPs, to landscaping, roofing, and home service companies sending a straightforward quote or client outreach post. The AI adapts its structure to whatever brief or business you describe.',
  },
  {
    q: 'How does pricing work?',
    a: 'Pay per proposal at $9.99 if you pitch occasionally, or go unlimited at $49/month if you send proposals regularly \u2014 unlimited pays for itself after roughly five proposals a month. Everyone starts with 2 free proposals to see the quality before spending anything.',
  },
  {
    q: 'Can I cancel the Unlimited plan anytime?',
    a: 'Yes \u2014 there\u2019s no contract or minimum term. Cancel whenever you like and you\u2019ll keep unlimited access through the rest of the billing period you\u2019ve already paid for.',
  },
  {
    q: 'Is my payment information secure?',
    a: 'Yes. Checkout is handled entirely by Stripe, the payment processor used by most modern SaaS companies \u2014 ProposalAI never sees or stores your card details.',
  },
  {
    q: 'Is my data private?',
    a: 'Your company profile and proposal history are stored locally in your own browser, not on a server \u2014 they\u2019re never sent anywhere except to the AI model at the moment you generate a proposal.',
  },
  {
    q: 'Do you offer anything beyond proposal generation?',
    a: 'Yes \u2014 every account also gets free access to a Follow-Up Email Generator and an RFP Analyzer, and we\u2019re actively building more. See the Services page for the full lineup.',
  },
]

const EXAMPLE_RFP = `We are seeking a marketing consultant to develop and execute a 6-month digital growth strategy for our boutique hospitality brand.

Budget: $40,000–$60,000
Deadline: Proposals due within 10 business days
Requirements: Include a proposed timeline, key deliverables, and relevant experience with hospitality or lifestyle brands.`

const EXAMPLE_PROPOSAL = `Dear [Client],

Thank you for the opportunity to submit this proposal for your digital growth strategy. Having reviewed your objectives, we propose a phased six-month engagement designed to increase qualified bookings by 25–40% while strengthening your brand's presence across key channels.

Our approach unfolds in three phases: Discovery & Audit (Weeks 1–2), Strategy & Campaign Build (Weeks 3–6), and Execution & Optimization (Weeks 7–24). Each phase concludes with a milestone review, so progress is never ambiguous...`

export default function Home() {
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
          <div
            className="text-2xl tracking-wide"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
          >
            ProposalAI
          </div>
          <div className="flex items-center gap-8">
            <Link href="/services" className="link-gold text-sm tracking-widest uppercase hidden sm:inline">
              Services
            </Link>
            <Link href="/pricing" className="link-gold text-sm tracking-widest uppercase hidden sm:inline">
              Pricing
            </Link>
            <Link href="/resources" className="link-gold text-sm tracking-widest uppercase">
              Free Guide
            </Link>
            <Link href="/dashboard" className="link-gold text-sm tracking-widest uppercase">
              Enter →
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 relative z-10">
        <div className="relative flex flex-col items-center justify-center text-center pt-28 pb-24 w-full overflow-hidden">
          <div className="bg-mesh">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
          </div>

          <div className="badge-ai fade-in-up" style={{ color: 'var(--gold-light)' }}>
            <span className="dot" />
            Generative AI, purpose-built for proposals
          </div>

          <h1
            className="max-w-3xl text-5xl md:text-6xl leading-tight mt-8 mb-8 fade-in-up fade-delay-1"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
          >
            Turn RFPs Into Proposals of{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Distinction
            </span>
          </h1>

          <p
            className="max-w-xl text-lg mb-12 leading-relaxed fade-in-up fade-delay-2"
            style={{ color: 'rgba(248,245,238,0.7)' }}
          >
            A disciplined, precise approach to proposal writing — built for
            consultants, contractors, and local businesses alike who value
            their time as much as their reputation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 fade-in-up fade-delay-3">
            <Link
              href="/dashboard"
              className="btn-gold px-10 py-4 text-sm tracking-[0.2em] uppercase"
              style={{ fontWeight: 600 }}
            >
              Begin
            </Link>
            <a href="#example" className="link-gold text-sm tracking-[0.15em] uppercase">
              See an example ↓
            </a>
          </div>

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

        <section id="example" className="w-full max-w-5xl py-24" style={{ borderTop: '1px solid var(--gold-dim)' }}>
          <div className="ornament mb-6"><span>◆</span></div>
          <div
            className="text-xs tracking-[0.3em] uppercase mb-4 text-center reveal"
            style={{ color: 'var(--gold)' }}
          >
            See It In Action
          </div>
          <h2
            className="text-3xl text-center mb-4 reveal"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
          >
            From Brief to Draft
          </h2>
          <p className="text-center text-sm mb-14 max-w-lg mx-auto reveal" style={{ color: 'rgba(248,245,238,0.55)' }}>
            An illustrative example — your own output is generated live from your RFP and company profile.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-dark p-8 reveal">
              <div className="text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--gold-light)' }}>
                The RFP
              </div>
              <p
                className="text-sm leading-relaxed whitespace-pre-line"
                style={{ color: 'rgba(248,245,238,0.7)', fontFamily: 'Georgia, serif' }}
              >
                {EXAMPLE_RFP}
              </p>
            </div>
            <div
              className="p-8 reveal"
              style={{ backgroundColor: 'var(--parchment)', border: '1px solid var(--gold)' }}
            >
              <div className="text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--gold)' }}>
                The Proposal ProposalAI Drafts
              </div>
              <p
                className="text-sm leading-relaxed whitespace-pre-line"
                style={{ color: 'var(--charcoal)', fontFamily: 'Georgia, serif' }}
              >
                {EXAMPLE_PROPOSAL}
              </p>
            </div>
          </div>
        </section>

        <section className="w-full max-w-4xl py-24" style={{ borderTop: '1px solid var(--gold-dim)' }}>
          <div className="ornament mb-6"><span>◆</span></div>
          <div
            className="text-xs tracking-[0.3em] uppercase mb-4 text-center reveal"
            style={{ color: 'var(--gold)' }}
          >
            How It Works
          </div>
          <h2
            className="text-3xl text-center mb-16 reveal"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
          >
            Three Steps, Minutes Apart
          </h2>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-0">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex md:flex-1 md:flex-col items-start md:items-center gap-5 md:gap-0 reveal">
                <div className="step-number">{String(i + 1).padStart(2, '0')}</div>
                <div className="md:text-center md:mt-5 md:px-6">
                  <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,245,238,0.65)' }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full max-w-5xl py-24" style={{ borderTop: '1px solid var(--gold-dim)' }}>
          <div className="ornament mb-6"><span>◆</span></div>
          <div
            className="text-xs tracking-[0.3em] uppercase mb-4 text-center reveal"
            style={{ color: 'var(--gold)' }}
          >
            Why ProposalAI
          </div>
          <h2
            className="text-3xl text-center mb-16 reveal"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
          >
            More Than a Chatbot
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FEATURES.map((f) => (
              <div key={f.title} className="card-dark p-8 reveal">
                <div
                  className="w-8 h-8 flex items-center justify-center mb-5 text-sm"
                  style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}
                >
                  {f.icon}
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
          <div className="mt-12 text-center reveal">
            <Link href="/services" className="link-gold text-xs tracking-[0.2em] uppercase">
              See the full lineup, including free bonus tools →
            </Link>
          </div>
        </section>

        <section id="pricing" className="w-full max-w-4xl py-24" style={{ borderTop: '1px solid var(--gold-dim)' }}>
          <div className="ornament mb-6"><span>◆</span></div>
          <div
            className="text-xs tracking-[0.3em] uppercase mb-4 text-center reveal"
            style={{ color: 'var(--gold)' }}
          >
            Pricing
          </div>
          <h2
            className="text-3xl text-center mb-16 reveal"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-sm mb-12 max-w-lg mx-auto reveal" style={{ color: 'rgba(248,245,238,0.55)' }}>
            Priced for what the writing alone is worth — not what a generic document platform charges for e-signatures and storage you may not need.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-dark p-8 flex flex-col items-center text-center reveal">
              <div className="text-lg mb-3" style={{ color: 'var(--gold)' }}>○</div>
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
            <div className="card-dark p-8 flex flex-col items-center text-center reveal">
              <div className="text-lg mb-3" style={{ color: 'var(--gold)' }}>◆</div>
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
            <div className="card-dark card-featured p-8 flex flex-col items-center text-center relative reveal">
              <div
                className="absolute -top-3 px-4 py-1 text-xs tracking-[0.2em] uppercase"
                style={{ backgroundColor: 'var(--gold)', color: 'var(--navy-deep)', fontWeight: 600 }}
              >
                Best Value
              </div>
              <div className="text-lg mb-3" style={{ color: 'var(--gold)' }}>✦</div>
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
          <p className="mt-10 text-center text-xs tracking-[0.15em] uppercase reveal" style={{ color: 'rgba(248,245,238,0.4)' }}>
            Secure checkout via Stripe · Cancel unlimited anytime · No card required for the free tier
          </p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <Link href="/pricing" className="link-gold text-xs tracking-[0.2em] uppercase">
              See full pricing details & feature comparison →
            </Link>
            <Link href="/resources" className="link-gold text-xs tracking-[0.2em] uppercase">
              Not ready to try it? Get the free RFP Response Checklist →
            </Link>
          </div>
        </section>

        <section className="w-full max-w-3xl py-24" style={{ borderTop: '1px solid var(--gold-dim)' }}>
          <div className="ornament mb-6"><span>◆</span></div>
          <div
            className="text-xs tracking-[0.3em] uppercase mb-4 text-center reveal"
            style={{ color: 'var(--gold)' }}
          >
            Frequently Asked
          </div>
          <h2
            className="text-3xl text-center mb-16 reveal"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
          >
            Questions & Answers
          </h2>
          <div className="flex flex-col gap-6 reveal">
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

        <div className="w-full max-w-3xl pb-24 text-center reveal">
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
        className="px-8 py-10 relative z-10"
        style={{ borderTop: '1px solid var(--gold-dim)' }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: 'rgba(248,245,238,0.4)' }}>
          <div>ProposalAI — Precision proposal writing, powered by AI · © {new Date().getFullYear()}</div>
          <div className="flex items-center gap-6">
            <Link href="/services" className="link-gold uppercase tracking-[0.15em]">Services</Link>
            <Link href="/pricing" className="link-gold uppercase tracking-[0.15em]">Pricing</Link>
            <Link href="/resources" className="link-gold uppercase tracking-[0.15em]">Free Guide</Link>
            <span>Payments secured by Stripe</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
