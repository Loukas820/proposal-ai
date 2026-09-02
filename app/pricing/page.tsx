'use client'
import Link from 'next/link'

const ROWS: { label: string; free: string; single: string; unlimited: string }[] = [
  { label: 'Proposals included', free: '2 / month', single: 'Pay per proposal', unlimited: 'Unlimited' },
  { label: 'Branded PDF export', free: '✓', single: '✓', unlimited: '✓' },
  { label: 'Company voice & profile', free: '✓', single: '✓', unlimited: '✓' },
  { label: 'Proposal history', free: '✓', single: '✓', unlimited: '✓' },
  { label: 'Every other tool (calls, appointments, jobs, outreach…)', free: '✓', single: '✓', unlimited: '✓' },
  { label: 'Card required', free: 'No', single: 'At purchase', unlimited: 'Yes' },
  { label: 'Cancel anytime', free: '—', single: '—', unlimited: '✓' },
]

const MINI_FAQ = [
  {
    q: 'What happens after my 2 free proposals?',
    a: 'You’ll be prompted to buy a single proposal or go unlimited. Nothing is ever charged automatically — the free tier simply pauses until the next month or until you choose a paid option.',
  },
  {
    q: 'Can I switch between plans?',
    a: 'Yes. Buying a single proposal never locks you in, and you can start or cancel Unlimited at any time from Stripe’s checkout — there’s no downgrade fee or waiting period.',
  },
  {
    q: 'Do unused free proposals roll over?',
    a: 'No — the free allotment resets to 2 each month rather than accumulating, to keep the free tier sustainable for everyone.',
  },
]

const COMPARISON = [
  { name: 'PandaDoc', price: '$35\u2013$65/user/mo', note: '(or $19\u2013$49/mo per user, billed annually)' },
  { name: 'Proposify', price: '$29\u2013$49/mo', note: '(3-seat cap even on the Team plan)' },
  { name: 'Qwilr', price: '$49/mo per user', note: '(or $35/mo per user, billed annually)' },
  { name: 'Daybase', price: '$49/mo flat', note: 'unlimited proposals, every other tool included, no seats to count', highlight: true },
]

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col bg-hero bg-grain relative" style={{ color: 'var(--cream)' }}>
      <header className="nav-glass-dark" style={{ borderBottom: '1px solid var(--gold-dim)' }}>
        <nav className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl tracking-wide" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}>
            Daybase
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/services" className="link-gold text-sm tracking-widest uppercase">Services</Link>
            <Link href="/pricing" className="text-sm tracking-widest uppercase" style={{ color: 'var(--gold)' }}>Pricing</Link>
            <Link href="/resources" className="link-gold text-sm tracking-widest uppercase">Free Guide</Link>
            <Link href="/dashboard" className="link-gold text-sm tracking-widest uppercase">Enter →</Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-20 relative z-10">
        <div className="text-xs tracking-[0.3em] uppercase mb-4 text-center" style={{ color: 'var(--gold)' }}>
          Pricing
        </div>
        <h1 className="text-4xl md:text-5xl text-center mb-6" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}>
          Priced For What Your Time Is Worth
        </h1>
        <p className="text-center text-base max-w-xl mx-auto mb-16" style={{ color: 'rgba(248,245,238,0.65)' }}>
          Every tool on the Tools page — calls, appointments, jobs, deliveries, outreach, contracts — is free with any account. Only proposal generation is metered. Start free, upgrade only when it&apos;s clearly paying for itself.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="card-dark p-8 flex flex-col items-center text-center">
            <div className="text-sm tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--gold-light)' }}>Free</div>
            <div className="text-4xl mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}>$0</div>
            <div className="text-sm mb-8" style={{ color: 'rgba(248,245,238,0.55)' }}>2 proposals every month</div>
            <Link href="/dashboard" className="btn-outline w-full py-3 text-xs tracking-[0.2em] uppercase" style={{ borderColor: 'var(--gold)', color: 'var(--cream)' }}>
              Start Free
            </Link>
          </div>
          <div className="card-dark p-8 flex flex-col items-center text-center">
            <div className="text-sm tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--gold-light)' }}>Per Proposal</div>
            <div className="text-4xl mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}>$9.99</div>
            <div className="text-sm mb-8" style={{ color: 'rgba(248,245,238,0.55)' }}>pay only when you send one</div>
            <Link href="/dashboard" className="btn-outline w-full py-3 text-xs tracking-[0.2em] uppercase" style={{ borderColor: 'var(--gold)', color: 'var(--cream)' }}>
              Buy One
            </Link>
          </div>
          <div className="card-dark card-featured p-8 flex flex-col items-center text-center relative">
            <div className="absolute -top-3 px-4 py-1 text-xs tracking-[0.2em] uppercase" style={{ backgroundColor: 'var(--gold)', color: 'var(--navy-deep)', fontWeight: 600 }}>
              Best Value
            </div>
            <div className="text-sm tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--gold-light)' }}>Unlimited</div>
            <div className="text-4xl mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}>
              $49<span className="text-base"> /mo</span>
            </div>
            <div className="text-sm mb-8" style={{ color: 'rgba(248,245,238,0.55)' }}>unlimited proposals</div>
            <Link href="/dashboard" className="btn-gold w-full py-3 text-xs tracking-[0.2em] uppercase" style={{ fontWeight: 600 }}>
              Go Unlimited
            </Link>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-2xl text-center mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}>
            Priced To Undercut, Not Just Compete
          </h2>
          <p className="text-center text-sm mb-10 max-w-xl mx-auto" style={{ color: 'rgba(248,245,238,0.55)' }}>
            Most proposal software charges per seat and pushes you toward annual billing to get a fair rate. Daybase is one flat price, month to month, and includes the rest of the toolkit at no extra cost.
          </p>
          <div className="max-w-lg mx-auto flex flex-col gap-3">
            {COMPARISON.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between gap-4 px-6 py-4"
                style={
                  c.highlight
                    ? { backgroundColor: 'rgba(47,111,237,0.1)', border: '1px solid var(--gold)' }
                    : { border: '1px solid var(--gold-dim)' }
                }
              >
                <div style={{ color: c.highlight ? 'var(--gold-light)' : 'rgba(248,245,238,0.75)', fontWeight: c.highlight ? 600 : 400 }}>
                  {c.name}
                </div>
                <div className="text-right">
                  <div style={{ color: c.highlight ? 'var(--cream)' : 'rgba(248,245,238,0.75)', fontWeight: c.highlight ? 600 : 400 }}>
                    {c.price}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(248,245,238,0.45)' }}>{c.note}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-6 max-w-lg mx-auto" style={{ color: 'rgba(248,245,238,0.4)' }}>
            Competitor pricing shown is publicly listed, standard-tier pricing as of {new Date().getFullYear()} and can change — check each provider’s site for current rates. None of them offer a true pay-once option; Daybase’s $9.99 single proposal means you’re never forced into a subscription just to send one.
          </p>
        </div>

        <div className="overflow-x-auto mb-20">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--gold-dim)' }}>
                <th className="text-left py-4 font-normal" style={{ color: 'rgba(248,245,238,0.5)' }}>Feature</th>
                <th className="text-center py-4 font-normal" style={{ color: 'var(--gold-light)' }}>Free</th>
                <th className="text-center py-4 font-normal" style={{ color: 'var(--gold-light)' }}>Per Proposal</th>
                <th className="text-center py-4 font-normal" style={{ color: 'var(--gold)' }}>Unlimited</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} style={{ borderBottom: '1px solid var(--gold-dim)' }}>
                  <td className="py-4" style={{ color: 'rgba(248,245,238,0.7)' }}>{row.label}</td>
                  <td className="py-4 text-center" style={{ color: 'rgba(248,245,238,0.6)' }}>{row.free}</td>
                  <td className="py-4 text-center" style={{ color: 'rgba(248,245,238,0.6)' }}>{row.single}</td>
                  <td className="py-4 text-center" style={{ color: 'var(--gold-light)' }}>{row.unlimited}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-20">
          <h2 className="text-2xl text-center mb-10" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}>
            Pricing Questions
          </h2>
          <div className="flex flex-col gap-6 max-w-2xl mx-auto">
            {MINI_FAQ.map((item) => (
              <details key={item.q} className="group" style={{ borderBottom: '1px solid var(--gold-dim)', paddingBottom: '1.5rem' }}>
                <summary className="cursor-pointer text-base list-none flex items-center justify-between" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}>
                  {item.q}
                  <span style={{ color: 'var(--gold)' }} className="ml-4 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm leading-relaxed mt-4" style={{ color: 'rgba(248,245,238,0.6)' }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        <p className="text-center text-xs tracking-[0.15em] uppercase mb-16" style={{ color: 'rgba(248,245,238,0.4)' }}>
          Secure checkout via Stripe · Cancel Unlimited anytime · No card required for the free tier
        </p>

        <div className="text-center">
          <Link href="/dashboard" className="btn-gold inline-block px-10 py-4 text-sm tracking-[0.2em] uppercase" style={{ fontWeight: 600 }}>
            Start Free
          </Link>
        </div>
      </main>

      <footer className="px-8 py-6 text-center text-xs relative z-10" style={{ borderTop: '1px solid var(--gold-dim)', color: 'rgba(248,245,238,0.4)' }}>
        Daybase — Run your business, without the busywork · © {new Date().getFullYear()}
      </footer>
    </div>
  )
}
