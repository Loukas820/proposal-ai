'use client'
import { useState } from 'react'
import Link from 'next/link'
import ToolIcon, { IconName } from '../components/ToolIcon'

type Guide = {
  id: string
  tag: string
  icon: IconName
  title: string
  intro: string
  items: { title: string; body: string }[]
}

const GUIDES: Guide[] = [
  {
    id: 'front-desk',
    tag: 'Your Front Desk',
    icon: 'phone',
    title: 'Never Miss a Call',
    intro: 'Eight habits that keep a ringing phone or a missed call from turning into a lost job. Free to use, no account required.',
    items: [
      {
        title: 'Answer like it’s already a customer',
        body: 'Assume every call is a paying job until proven otherwise — tone shapes whether they book more than the words you use do.',
      },
      {
        title: 'Text back within five minutes',
        body: 'A missed call answered by text inside five minutes converts far more often than one returned an hour later — most callers have already tried the next business by then.',
      },
      {
        title: 'Give a price range on the first call',
        body: 'Vague pricing invites shopping around. A ballpark number filters out the wrong jobs and builds trust with the right ones, immediately.',
      },
      {
        title: 'Confirm every appointment the day before',
        body: 'A short reminder text cuts no-shows dramatically and costs you nothing to send.',
      },
      {
        title: 'Give a name, not a "we’ll"',
        body: '"I’ll be there Tuesday at 9" builds more trust than "we’ll get someone out soon."',
      },
      {
        title: 'Repeat back what they said, not what you assumed',
        body: 'Echo their exact words in the confirmation message so nothing gets lost between the call and the job showing up.',
      },
      {
        title: 'Make your voicemail do double duty',
        body: 'A voicemail that states your hours and promises a callback window keeps a caller from hanging up and dialing a competitor.',
      },
      {
        title: 'Follow up on quotes you never heard back on',
        body: 'Silence usually isn’t "no" — a short check-in a few days later recovers jobs that would otherwise just quietly disappear.',
      },
    ],
  },
  {
    id: 'get-found',
    tag: 'Get Found & Stay In Touch',
    icon: 'megaphone',
    title: 'Get Found & Stay In Touch',
    intro: 'Eight habits for staying top of mind with new leads and past clients, without spending your evenings on marketing. Free to use, no account required.',
    items: [
      {
        title: 'Post consistently, not perfectly',
        body: 'A short, real photo of today’s job beats a polished post you never get around to making.',
      },
      {
        title: 'Ask for the review while the feeling is fresh',
        body: 'A request sent same-day converts far better than one sent a week later, once the moment has passed.',
      },
      {
        title: 'Make leaving a review a one-tap action',
        body: 'Send the direct review link, not just "check us out on Google" — every extra step loses people.',
      },
      {
        title: 'Follow up on quotes within three days',
        body: 'Most "they went with someone else" is really "they forgot you existed." A short nudge recovers more than you’d expect.',
      },
      {
        title: 'Show the work, not just the pitch',
        body: 'Before-and-after photos and finished-job posts build more trust than any tagline you could write.',
      },
      {
        title: 'Reuse your best language everywhere',
        body: 'The phrasing that wins a proposal works just as well in a review request, a post, or your About page — stay consistent.',
      },
      {
        title: 'Keep a short list to check in with seasonally',
        body: 'A repeat client costs nothing to win back — a quick "thinking of you this season" message is enough.',
      },
      {
        title: 'Answer public comments and reviews, good or bad',
        body: 'A calm, professional public reply builds trust with everyone reading later, not just the person you’re replying to.',
      },
    ],
  },
  {
    id: 'back-office',
    tag: 'Back Office',
    icon: 'sparkle',
    title: 'The Bid Response Checklist',
    intro: 'Eight habits that separate proposals that win from proposals that get skimmed and filed. Free to use, no account required.',
    items: [
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
    ],
  },
]

export default function Resources() {
  const [active, setActive] = useState(0)
  const guide = GUIDES[active]

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
            <Link href="/dashboard" className="link-navy" style={{ color: 'var(--charcoal)' }}>Workspace</Link>
            <Link href="/tools" className="link-navy" style={{ color: 'var(--charcoal)' }}>Tools</Link>
            <Link href="/resources" style={{ color: 'var(--gold)' }}>Free Guides</Link>
            <Link href="/history" className="link-navy" style={{ color: 'var(--charcoal)' }}>History</Link>
            <Link href="/settings" className="link-navy" style={{ color: 'var(--charcoal)' }}>Profile</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto px-8 py-16 fade-in-up">
        <div className="no-print text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--gold)', fontWeight: 600 }}>
          Free Resources
        </div>
        <h1
          className="no-print text-4xl mb-6"
          style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--navy)' }}
        >
          A Free Guide For Every Part Of The Job
        </h1>

        {/* Horizontal guide picker — pick one, no scrolling required to find it */}
        <div className="no-print flex flex-row gap-3 mb-10 overflow-x-auto pb-1">
          {GUIDES.map((g, i) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setActive(i)}
              className="flex items-center gap-3 px-5 py-4 text-left shrink-0"
              style={{
                border: i === active ? '1px solid var(--gold)' : '1px solid var(--hairline)',
                backgroundColor: i === active ? 'rgba(30,79,216,0.05)' : '#ffffff',
                minWidth: '210px',
              }}
            >
              <div
                className="w-9 h-9 flex items-center justify-center text-base shrink-0"
                style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}
              >
                <ToolIcon name={g.icon} />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.15em] uppercase mb-0.5" style={{ color: 'var(--gold)', fontWeight: 600 }}>
                  {g.tag}
                </div>
                <div className="text-sm" style={{ color: 'var(--navy)', fontWeight: 600 }}>
                  {g.title}
                </div>
              </div>
            </button>
          ))}
        </div>

        <h2
          className="text-3xl mb-4"
          style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--navy)' }}
        >
          {guide.title}
        </h2>
        <p className="text-base leading-relaxed mb-12" style={{ color: 'rgba(27,30,38,0.65)' }}>
          {guide.intro}
        </p>

        <div className="flex flex-col gap-8 mb-16">
          {guide.items.map((item, i) => (
            <div key={item.title} className="card p-6 flex gap-5">
              <div
                className="text-2xl shrink-0"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--gold)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--navy)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(27,30,38,0.6)' }}>
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="no-print card p-10 text-center" style={{ borderColor: 'var(--gold)' }}>
          <h2 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--navy)' }}>
            Ready to draft one in minutes?
          </h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(27,30,38,0.6)' }}>
            Daybase applies this exact approach automatically, every time.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={handlePrint} className="btn-outline px-8 py-3 text-sm tracking-[0.2em] uppercase">
              Download This Guide
            </button>
            <Link href="/dashboard" className="btn-navy px-8 py-3 text-sm tracking-[0.2em] uppercase" style={{ fontWeight: 600 }}>
              Try Daybase Free
            </Link>
          </div>
        </div>
      </main>

      <footer
        className="no-print px-8 py-6 text-center text-xs"
        style={{ borderTop: '1px solid var(--hairline)', color: 'rgba(27,30,38,0.4)' }}
      >
        Daybase — Run your business, without the busywork
      </footer>
    </div>
  )
}
