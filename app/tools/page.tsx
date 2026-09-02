'use client'
import Link from 'next/link'

const APP_NAV = [
  { href: '/dashboard', label: 'Workspace' },
  { href: '/tools', label: 'Tools' },
  { href: '/history', label: 'History' },
  { href: '/resources', label: 'Free Guide' },
  { href: '/settings', label: 'Profile' },
]

function AppHeader({ active }: { active: string }) {
  return (
    <header className="nav-glass-light" style={{ borderBottom: '1px solid var(--hairline)' }}>
      <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
        <Link href="/" className="text-2xl tracking-wide" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
          Daybase
        </Link>
        <nav className="flex gap-6 text-xs tracking-[0.2em] uppercase">
          {APP_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.href === active ? '' : 'link-gold'}
              style={{ color: item.href === active ? 'var(--gold)' : 'var(--charcoal)' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

type Tool = { href: string; icon: string; title: string; body: string }

const CATEGORIES: { name: string; blurb: string; tools: Tool[] }[] = [
  {
    name: 'Get Found & Get Leads',
    blurb: 'Turn attention into requests, whether that’s a Facebook post or a link in your bio.',
    tools: [
      {
        href: '/tools/outreach-post',
        icon: '📣',
        title: 'Social Post Generator',
        body: 'Describe what you want to promote and get three ready-to-post Facebook/Instagram options.',
      },
      {
        href: '/settings',
        icon: '🔗',
        title: 'Public Quote Request Link',
        body: 'A shareable link for your bio or posts — anyone can request a quote straight to your inbox, no app needed.',
      },
    ],
  },
  {
    name: 'Win The Work',
    blurb: 'Decide what to bid on, and make the case once you do.',
    tools: [
      {
        href: '/tools/quote-builder',
        icon: '🧾',
        title: 'Quote Builder',
        body: 'Line items, tax, and total calculated for you — export a branded quote PDF. No AI involved, just fast math.',
      },
      {
        href: '/tools/rfp-analyzer',
        icon: '◎',
        title: 'Bid Request Checker',
        body: 'Quickly check whether a big, formal bid request (also called an RFP) is worth your time before you write a full response.',
      },
    ],
  },
  {
    name: 'Calls, Appointments & Jobs',
    blurb: 'Keep customers in the loop on what’s scheduled, what’s happening, and what to say on the phone.',
    tools: [
      {
        href: '/tools/customer-updates',
        icon: '\ud83d\udcc5',
        title: 'Customer Update Messages',
        body: 'Appointment confirmations, reminders, delay notices, job and delivery updates — text and email versions in seconds.',
      },
      {
        href: '/tools/call-assistant',
        icon: '\ud83d\udcde',
        title: 'Call & Missed-Call Assistant',
        body: 'Talking points before you dial, plus a ready text-back for the calls that go to voicemail.',
      },
    ],
  },
  {
    name: 'Stay In Touch',
    blurb: 'The follow-through that turns a maybe into a yes.',
    tools: [
      {
        href: '/tools/follow-up',
        icon: '✉',
        title: 'Follow-Up Email Generator',
        body: 'Paste your proposal and get a warm, low-pressure follow-up email ready to send.',
      },
      {
        href: '/tools/review-request',
        icon: '★',
        title: 'Review Request Generator',
        body: 'Job’s done — get a text and email version asking for a review while the feeling is fresh.',
      },
    ],
  },
  {
    name: 'Close & Deliver',
    blurb: 'What happens the moment someone says yes.',
    tools: [
      {
        href: '/tools/onboarding-packet',
        icon: '✎',
        title: 'Client Onboarding Packet',
        body: 'Generate a welcome packet automatically — next steps, what you need from them, and who to contact.',
      },
      {
        href: '/tools/translate',
        icon: '⇄',
        title: 'Multi-Language Proposals',
        body: 'Translate a proposal into another language, preserving structure and tone.',
      },
      {
        href: '/tools/agreement',
        icon: '📄',
        title: 'Service Agreement Drafter',
        body: 'A starting contract template built from your scope, payment terms, and timeline. Not legal advice — for attorney review.',
      },
    ],
  },
]

export default function Tools() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)' }}>
      <AppHeader active="/tools" />

      <main className="flex-1 max-w-6xl w-full mx-auto px-8 py-12 fade-in-up">
        <h1 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
          Tools
        </h1>
        <p className="text-sm mb-14" style={{ color: 'rgba(34,38,47,0.6)' }}>
          Everything it takes to run the day — calls, appointments, jobs, deliveries, outreach, and the paperwork in between — all free with your account.
        </p>

        {CATEGORIES.map((cat) => (
          <div key={cat.name} className="mb-14">
            <div className="flex items-baseline justify-between mb-1 flex-wrap gap-2">
              <h2 className="text-lg" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
                {cat.name}
              </h2>
            </div>
            <p className="text-sm mb-6" style={{ color: 'rgba(34,38,47,0.5)' }}>
              {cat.blurb}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cat.tools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="card card-hover p-8 block">
                  <div
                    className="w-10 h-10 flex items-center justify-center text-lg mb-5"
                    style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}
                  >
                    {tool.icon}
                  </div>
                  <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
                    {tool.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(34,38,47,0.6)' }}>
                    {tool.body}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </main>

      <footer
        className="px-8 py-6 text-center text-xs"
        style={{ borderTop: '1px solid var(--hairline)', color: 'rgba(34,38,47,0.4)' }}
      >
        Daybase — Run your business, without the busywork
      </footer>
    </div>
  )
}
