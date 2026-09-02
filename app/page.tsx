'use client'
import { useEffect } from 'react'
import Link from 'next/link'

const FEATURES = [
  {
    icon: '◆',
    title: 'Everything In Your Voice',
    body: 'Every message — a proposal, a quote, an appointment reminder, a follow-up — uses your company’s real details and tone, not generic filler.',
  },
  {
    icon: '✦',
    title: 'Client-Ready, Every Time',
    body: 'Text, email, or a branded PDF — get exactly what you need to send, ready to go, not a wall of text to clean up yourself.',
  },
  {
    icon: '●',
    title: 'One Account, Every Tool',
    body: 'Calls, appointments, jobs, deliveries, outreach, quotes, and contracts — no separate sign-up per tool, and it’s all saved to your history.',
  },
]

const STEPS = [
  {
    title: 'Tell it what’s happening',
    body: 'A job, an appointment, a missed call, a job that’s wrapping up, even a big formal bid request — describe it in a line or two.',
  },
  {
    title: 'It writes the message',
    body: 'In your voice, using your business details, structured and ready to go — in under a minute.',
  },
  {
    title: 'Send it, and get back to work',
    body: 'Copy the text, send the email, or download the PDF. Nothing left to clean up.',
  },
]

const FAQS = [
  {
    q: 'What is Daybase?',
    a: 'Daybase is a set of AI-powered tools for running a service business day to day \u2014 quoting a job, confirming an appointment, following up on a missed call, updating a customer on a delivery, drafting a contract, posting for new leads, and turning a bid request into a proposal. Everything is written in your company\u2019s voice, using the profile you set up once.'
  },
  {
    q: 'How is this different from just using a chatbot?',
    a: 'A chatbot forgets everything the moment you close the tab. Daybase remembers your company details so you never re-explain them, keeps a running history of every proposal you\u2019ve generated, formats the output as an actual document instead of a wall of chat text, and exports a branded, client-ready PDF in one click.',
  },
  {
    q: 'How accurate is the AI, and do I need to edit the output?',
    a: 'Treat the draft as a strong first pass \u2014 clearly organized and well-written, but you should still check it against your own facts, figures, and client details before sending. It will never invent a dollar amount or detail that wasn\u2019t in what you gave it.',
  },
  {
    q: 'What industries does this work for?',
    a: 'Any business that deals with jobs, appointments, quotes, or clients \u2014 from landscaping, roofing, HVAC, and home service companies juggling calls and deliveries, to CEOs and consultants responding to big formal bid requests. The AI adapts to whatever job or business you describe.',
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
    a: 'Yes. Checkout is handled entirely by Stripe, the payment processor used by most modern SaaS companies \u2014 Daybase never sees or stores your card details.',
  },
  {
    q: 'Is my data private?',
    a: 'Your company profile and proposal history are stored locally in your own browser, not on a server \u2014 they\u2019re never sent anywhere except to the AI model at the moment you generate a proposal.',
  },
  {
    q: 'What tools come with an account besides proposals?',
    a: 'Every account gets free access to the full toolkit: appointment and job update messages, a call script and missed-call text-back assistant, a review request generator, a social post generator for Facebook/Instagram, a quote builder, a client onboarding packet generator, a service agreement drafter, multi-language translation, and a checker for big formal bid requests. See the Tools page for the full lineup.',
  },
]

const POPULAR_TOOLS = [
  {
    icon: '\u2726',
    title: 'Proposals & Quotes',
    body: 'Turn a bid request or job description into a client-ready proposal, written in your voice.',
    href: '/dashboard',
  },
  {
    icon: '\ud83d\udcc5',
    title: 'Customer Update Messages',
    body: 'Appointment confirmations, reminders, and job or delivery updates \u2014 written for you.',
    href: '/tools/customer-updates',
  },
  {
    icon: '\ud83d\udcde',
    title: 'Call & Missed-Call Assistant',
    body: 'Know what to say before you dial, and never leave a missed call hanging.',
    href: '/tools/call-assistant',
  },
  {
    icon: '\ud83d\udce3',
    title: 'Social Post Generator',
    body: 'Turn a job or offer into three ready-to-post Facebook/Instagram updates.',
    href: '/tools/outreach-post',
  },
  {
    icon: '\u2605',
    title: 'Review Request Generator',
    body: 'Ask for the review while the good feeling from a finished job is still fresh.',
    href: '/tools/review-request',
  },
  {
    icon: '\ud83d\udcc4',
    title: 'Service Agreement Drafter',
    body: 'A contract starting point built from your scope, terms, and timeline.',
    href: '/tools/agreement',
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
            Daybase
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
            AI-powered, built for how small businesses actually run
          </div>

          <h1
            className="max-w-3xl text-5xl md:text-6xl leading-tight mt-8 mb-8 fade-in-up fade-delay-1"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
          >
            Running Your Business Should Be{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Simple
            </span>
          </h1>

          <p
            className="max-w-xl text-lg mb-12 leading-relaxed fade-in-up fade-delay-2"
            style={{ color: 'rgba(248,245,238,0.7)' }}
          >
            Calls, appointments, jobs, deliveries, quotes, contracts, and
            client outreach — all handled in your own voice, in minutes.
            Built for consultants, contractors, and local businesses who
            don&apos;t have time to waste.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 fade-in-up fade-delay-3">
            <Link
              href="/dashboard"
              className="btn-gold px-10 py-4 text-sm tracking-[0.2em] uppercase"
              style={{ fontWeight: 600 }}
            >
              Get Started Free
            </Link>
            <a href="#popular-tools" className="link-gold text-sm tracking-[0.15em] uppercase">
              See what it does ↓
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
                Minutes
              </div>
              <div className="text-sm" style={{ color: 'rgba(248,245,238,0.6)' }}>
                From job to ready-to-send
              </div>
            </div>
            <div>
              <div
                className="text-3xl mb-2"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)' }}
              >
                $0 To Start
              </div>
              <div className="text-sm" style={{ color: 'rgba(248,245,238,0.6)' }}>
                No card needed, every tool free
              </div>
            </div>
            <div>
              <div
                className="text-3xl mb-2"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)' }}
              >
                One Place
              </div>
              <div className="text-sm" style={{ color: 'rgba(248,245,238,0.6)' }}>
                Calls, jobs, quotes & outreach
              </div>
            </div>
          </div>
        </div>

        <section id="popular-tools" className="w-full max-w-5xl py-24" style={{ borderTop: '1px solid var(--gold-dim)' }}>
          <div className="ornament mb-6"><span>◆</span></div>
          <div
            className="text-xs tracking-[0.3em] uppercase mb-4 text-center reveal"
            style={{ color: 'var(--gold)' }}
          >
            Most Popular
          </div>
          <h2
            className="text-3xl text-center mb-4 reveal"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
          >
            The Tools Businesses Use Every Day
          </h2>
          <p className="text-center text-sm mb-14 max-w-lg mx-auto reveal" style={{ color: 'rgba(248,245,238,0.55)' }}>
            Proposals are one piece. Most accounts lean on all of these just as much — every one is free with any account.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {POPULAR_TOOLS.map((tool) => (
              <Link key={tool.title} href={tool.href} className="card card-hover p-7 reveal block">
                <div
                  className="w-9 h-9 flex items-center justify-center text-base mb-5"
                  style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}
                >
                  {tool.icon}
                </div>
                <h3 className="text-base mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
                  {tool.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(34,38,47,0.65)' }}>
                  {tool.body}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center reveal">
            <Link href="/tools" className="link-gold text-xs tracking-[0.2em] uppercase">
              See every tool →
            </Link>
          </div>
        </section>

        <section className="w-full max-w-5xl py-24" style={{ borderTop: '1px solid var(--gold-dim)' }}>
          <div className="ornament mb-6"><span>◆</span></div>
          <div
            className="text-xs tracking-[0.3em] uppercase mb-4 text-center reveal"
            style={{ color: 'var(--gold)' }}
          >
            Proposals, In Detail
          </div>
          <h2
            className="text-3xl text-center mb-4 reveal"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}
          >
            From Brief to Draft
          </h2>
          <p className="text-center text-sm mb-14 max-w-lg mx-auto reveal" style={{ color: 'rgba(248,245,238,0.55)' }}>
            One tool, closer up — an illustrative example. Your own output is generated live from your request and company profile.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-dark p-8 reveal">
              <div className="text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--gold-light)' }}>
                The Request
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
                The Proposal Daybase Drafts
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
            Why Daybase
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
            Only proposal generation is metered, priced below. Every other tool \u2014 calls, appointments, jobs, deliveries, outreach, contracts \u2014 is free with any account, on any plan.
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
              Not ready to try it? Get the free Bid Response Checklist →
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
            Get Started Free
          </Link>
          <div className="mt-5">
            <Link href="/tools" className="link-gold text-xs tracking-[0.2em] uppercase">
              Or browse every tool first →
            </Link>
          </div>
        </div>
      </main>

      <footer
        className="px-8 py-10 relative z-10"
        style={{ borderTop: '1px solid var(--gold-dim)' }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: 'rgba(248,245,238,0.4)' }}>
          <div>Daybase — Run your business, without the busywork · © {new Date().getFullYear()}</div>
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
