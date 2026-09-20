'use client'
import Link from 'next/link'
import ToolIcon, { IconName } from '../components/ToolIcon'

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

type Tool = { href: string; icon: IconName; title: string; body: string; note?: string }

const CATEGORIES: { name: string; blurb: string; tools: Tool[] }[] = [
  {
    name: 'Your Front Desk',
    blurb: 'The calls, appointments, and inbound requests that used to need someone answering the phone.',
    tools: [
      {
        href: '/tools/call-assistant',
        icon: 'phone',
        title: 'Call & Missed-Call Assistant',
        body: 'Talking points before you dial, plus a ready text-back for the calls that go to voicemail.',
      },
      {
        href: '/tools/customer-updates',
        icon: 'calendar',
        title: 'Customer Update Messages',
        body: 'Appointment confirmations, reminders, delay notices, job and delivery updates — text and email versions in seconds.',
      },
      {
        href: '/settings',
        icon: 'link',
        title: 'Public Quote Request Link',
        body: 'A shareable link for your bio or posts — anyone can request a quote straight to your inbox, no app needed.',
      },
    ],
  },
  {
    name: 'Get Found & Stay In Touch',
    blurb: 'The outreach that keeps new work coming in, and keeps past clients coming back.',
    tools: [
      {
        href: '/tools/outreach-post',
        icon: 'megaphone',
        title: 'Social Post Generator',
        body: 'Describe what you want to promote and get three ready-to-post Facebook/Instagram options.',
      },
      {
        href: '/tools/follow-up',
        icon: 'mail',
        title: 'Follow-Up Email Generator',
        body: 'Paste your proposal or quote and get a warm, low-pressure follow-up email ready to send.',
      },
      {
        href: '/tools/review-request',
        icon: 'star',
        title: 'Review Request Generator',
        body: 'Job’s done — get a text and email version asking for a review while the feeling is fresh.',
      },
    ],
  },
  {
    name: 'Back Office',
    blurb: 'The paperwork — quotes, proposals, contracts — once someone’s ready to say yes.',
    tools: [
      {
        href: '/dashboard',
        icon: 'sparkle',
        title: 'Proposals & Quotes',
        body: 'Paste a bid request or describe a job and get a structured, client-ready proposal in your voice.',
        note: '2 free/mo · $9.99/proposal · $49/mo unlimited',
      },
      {
        href: '/tools/quote-builder',
        icon: 'receipt',
        title: 'Quote Builder',
        body: 'Line items, tax, and total calculated for you — export a branded quote PDF. No AI involved, just fast math.',
      },
      {
        href: '/tools/rfp-analyzer',
        icon: 'search',
        title: 'Bid Request Checker',
        body: 'Quickly check whether a big, formal bid request (also called an RFP) is worth your time before you write a full response.',
      },
      {
        href: '/tools/agreement',
        icon: 'document',
        title: 'Service Agreement Drafter',
        body: 'A starting contract template built from your scope, payment terms, and timeline. Not legal advice — for attorney review.',
      },
      {
        href: '/tools/onboarding-packet',
        icon: 'pencil',
        title: 'Client Onboarding Packet',
        body: 'Generate a welcome packet automatically — next steps, what you need from them, and who to contact.',
      },
      {
        href: '/tools/translate',
        icon: 'swap',
        title: 'Multi-Language Proposals',
        body: 'Translate a proposal into another language, preserving structure and tone.',
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
          Your front desk, your outreach, and the paperwork behind it — all free with your account.
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
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-10 h-10 flex items-center justify-center text-lg"
                      style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}
                    >
                      <ToolIcon name={tool.icon} />
                    </div>
                    {tool.note && (
                      <span
                        className="text-[10px] tracking-[0.15em] uppercase px-2 py-1 rounded-full"
                        style={{ backgroundColor: 'var(--gold-dim)', color: 'var(--gold)' }}
                      >
                        Paid
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
                    {tool.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(34,38,47,0.6)' }}>
                    {tool.body}
                  </p>
                  {tool.note && (
                    <p className="text-xs mt-3" style={{ color: 'rgba(34,38,47,0.45)' }}>
                      {tool.note}
                    </p>
                  )}
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
