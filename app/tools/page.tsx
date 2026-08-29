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
          ProposalAI
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

const LIVE_TOOLS = [
  {
    href: '/tools/follow-up',
    icon: '✉',
    title: 'Follow-Up Email Generator',
    body: 'Paste your proposal and get a warm, low-pressure follow-up email ready to send — no more staring at a blank compose window a week later.',
    tag: 'Free with your account',
  },
  {
    href: '/tools/rfp-analyzer',
    icon: '◎',
    title: 'RFP Analyzer',
    body: 'Paste an RFP before you commit to responding — get requirements, budget and deadline signals, and red flags pulled out in seconds.',
    tag: 'Free with your account',
  },
]

const ROADMAP_TOOLS = [
  {
    icon: '✎',
    title: 'Client Onboarding Packet',
    body: 'Generate a welcome packet automatically the moment a proposal is accepted — kickoff details, what to expect, and first steps.',
  },
  {
    icon: '⇄',
    title: 'Multi-Language Proposals',
    body: 'Draft the same proposal in a second language for international clients, without losing tone or structure.',
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
        <p className="text-sm mb-12" style={{ color: 'rgba(34,38,47,0.6)' }}>
          Beyond proposal generation — free utilities included with every account, no extra charge.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {LIVE_TOOLS.map((tool) => (
            <Link key={tool.href} href={tool.href} className="card card-hover p-8 block">
              <div className="flex items-center justify-between mb-5">
                <div
                  className="w-10 h-10 flex items-center justify-center text-lg"
                  style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}
                >
                  {tool.icon}
                </div>
                <span
                  className="text-xs tracking-[0.15em] uppercase px-3 py-1"
                  style={{ backgroundColor: 'var(--gold-dim)', color: 'var(--navy)' }}
                >
                  {tool.tag}
                </span>
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

        <div className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--gold)' }}>
          On the Roadmap
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ROADMAP_TOOLS.map((tool) => (
            <div key={tool.title} className="p-8" style={{ border: '1px dashed var(--hairline)', opacity: 0.75 }}>
              <div
                className="w-10 h-10 flex items-center justify-center text-lg mb-5"
                style={{ border: '1px solid var(--hairline)', color: 'rgba(34,38,47,0.4)' }}
              >
                {tool.icon}
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--charcoal)' }}>
                {tool.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(34,38,47,0.5)' }}>
                {tool.body}
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer
        className="px-8 py-6 text-center text-xs"
        style={{ borderTop: '1px solid var(--hairline)', color: 'rgba(34,38,47,0.4)' }}
      >
        ProposalAI — Precision proposal writing, powered by AI
      </footer>
    </div>
  )
}
