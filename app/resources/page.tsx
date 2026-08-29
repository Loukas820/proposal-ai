'use client'
import Link from 'next/link'

const CHECKLIST = [
  {
    title: 'Read the request twice before writing anything',
    body: 'Once for the requirements, once for the unstated priorities — budget language, tone, and what they list first usually signals what they care about most.',
  },
  {
    title: 'Mirror their language back to them',
    body: 'Reuse the client’s own terms for their problem and goals. It signals you actually listened, and it reads as tailored rather than templated.',
  },
  {
    title: 'Lead with outcomes, not activities',
    body: 'Buyers skim for "what changes for us" before they read "what you’ll do." Put the result in the first paragraph, not the last.',
  },
  {
    title: 'Make the scope unambiguous',
    body: 'Every deliverable should be a concrete noun a client could check off — not a vague phrase like "ongoing support" with no boundary.',
  },
  {
    title: 'Show the timeline as phases, not a date range',
    body: 'A single end date invites doubt. Phases with milestones make the plan feel real and give you natural check-in points to bill against.',
  },
  {
    title: 'Price with a number, not a range',
    body: 'Ranges read as uncertainty. If you must show a range, anchor it with what changes the price — scope, timeline, or team size.',
  },
  {
    title: 'Answer the objection they haven’t asked yet',
    body: 'Every bid request has a silent worry behind it — usually risk, price, or "will this actually get done." Address it before they have to ask.',
  },
  {
    title: 'End with one clear next step',
    body: 'Not three options. One call to action — a call, a signature, a kickoff date — removes friction at the exact moment they’re ready to say yes.',
  },
]

export default function Resources() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)' }}>
      <header className="no-print nav-glass-light" style={{ borderBottom: '1px solid var(--hairline)' }}>
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl tracking-wide"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}
          >
            Daybase
          </Link>
          <nav className="flex gap-6 text-xs tracking-[0.2em] uppercase">
            <Link href="/dashboard" className="link-gold" style={{ color: 'var(--charcoal)' }}>Workspace</Link>
            <Link href="/tools" className="link-gold" style={{ color: 'var(--charcoal)' }}>Tools</Link>
            <Link href="/resources" style={{ color: 'var(--gold)' }}>Free Guide</Link>
            <Link href="/history" className="link-gold" style={{ color: 'var(--charcoal)' }}>History</Link>
            <Link href="/settings" className="link-gold" style={{ color: 'var(--charcoal)' }}>Profile</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto px-8 py-16 fade-in-up">
        <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
          Free Resource
        </div>
        <h1
          className="text-4xl mb-6"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}
        >
          The Bid Response Checklist
        </h1>
        <p className="text-base leading-relaxed mb-12" style={{ color: 'rgba(34,38,47,0.65)' }}>
          Eight habits that separate proposals that win from proposals that
          get skimmed and filed. Free to use, no account required — bookmark
          this page and come back before every pitch.
        </p>

        <div className="flex flex-col gap-8 mb-16">
          {CHECKLIST.map((item, i) => (
            <div key={item.title} className="card p-6 flex gap-5">
              <div
                className="text-2xl shrink-0"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(34,38,47,0.6)' }}>
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="no-print card p-10 text-center" style={{ borderColor: 'var(--gold)' }}>
          <h2 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
            Ready to draft one in minutes?
          </h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(34,38,47,0.6)' }}>
            Daybase applies this exact approach automatically, every time.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={handlePrint} className="btn-outline px-8 py-3 text-sm tracking-[0.2em] uppercase">
              Download Checklist
            </button>
            <Link href="/dashboard" className="btn-navy px-8 py-3 text-sm tracking-[0.2em] uppercase" style={{ fontWeight: 600 }}>
              Try Daybase Free
            </Link>
          </div>
        </div>
      </main>

      <footer
        className="no-print px-8 py-6 text-center text-xs"
        style={{ borderTop: '1px solid var(--hairline)', color: 'rgba(34,38,47,0.4)' }}
      >
        Daybase — Run your business, without the busywork
      </footer>
    </div>
  )
}
