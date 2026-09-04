'use client'
import Link from 'next/link'

const EFFECTIVE_DATE = 'September 4, 2026'

const SECTIONS = [
  {
    title: '1. Information You Provide',
    body: `When you use Daybase, you may enter your company profile (business name, tagline, contact email, and phone number), the details of a job, appointment, client, or bid request you're asking Daybase to write about, and an account email used to track your plan and usage. This information is stored locally in your web browser — not in a Daybase database. We don't see or have access to it unless it's sent to generate content or process a payment, as described below.`,
  },
  {
    title: '2. Information Sent to Third-Party Services',
    body: `To provide the Service, some information is shared with the third parties that power it:

AI Generation — the request details and company profile information you submit are sent to Google's Gemini AI model at the moment you generate content, so it can write your draft. This data is used only to generate your response and is subject to Google's own data-handling practices for its API services.

Payments & Billing — your account email is sent to Stripe, Inc. to create a customer record and track your plan (free, per-proposal, or unlimited) and usage. Stripe handles all payment details directly — Daybase never receives or stores your card number. Stripe's use of your information is governed by Stripe's own privacy policy.

We don't sell your information to anyone, and we don't use it for advertising.`,
  },
  {
    title: '3. What We Don’t Collect',
    body: `Daybase doesn't currently use cookies, analytics tools, or tracking scripts. We don't maintain user accounts, passwords, or a central database of your business information or generated content — it lives in your browser, not on our servers. If we add analytics or similar tools in the future to help improve the Service, we'll update this policy first.`,
  },
  {
    title: '4. Your Control Over Your Data',
    body: `Because your profile and history are stored in your own browser, you're always in control: clearing your browser's site data or local storage for Daybase deletes this information immediately and completely, since we never kept a separate copy. Keep in mind this also means switching browsers or devices, or clearing your cache, will remove your saved information — there's currently no cloud sync or backup, so download anything you want to keep as a PDF.`,
  },
  {
    title: '5. Data Retention',
    body: `We don't retain a copy of your business information or generated content on our servers at all — see above. Stripe retains billing records as required for payment processing and tax and legal compliance, according to its own policies.`,
  },
  {
    title: '6. Children’s Privacy',
    body: `Daybase is a business tool intended for adults running a business. It's not directed at, and we don't knowingly collect information from, anyone under 18.`,
  },
  {
    title: '7. Changes to This Policy',
    body: `As Daybase grows — for example, if we introduce optional cloud accounts, analytics, or new integrations — this policy will be updated to reflect exactly what changes. We'll update the effective date above whenever that happens.`,
  },
  {
    title: '8. Contact',
    body: `Questions about your data or this policy? Reach us at support@daybase.io.`,
  },
]

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)' }}>
      <header className="nav-glass-light" style={{ borderBottom: '1px solid var(--hairline)' }}>
        <div className="max-w-3xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl tracking-wide"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}
          >
            Daybase
          </Link>
          <nav className="flex gap-6 text-xs tracking-[0.2em] uppercase">
            <Link href="/terms" className="link-gold" style={{ color: 'var(--charcoal)' }}>Terms</Link>
            <Link href="/pricing" className="link-gold" style={{ color: 'var(--charcoal)' }}>Pricing</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto px-8 py-16 fade-in-up">
        <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
          Legal
        </div>
        <h1 className="text-4xl mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
          Privacy Policy
        </h1>
        <p className="text-sm mb-6" style={{ color: 'rgba(34,38,47,0.5)' }}>
          Effective {EFFECTIVE_DATE}
        </p>
        <p className="text-sm leading-relaxed mb-14" style={{ color: 'rgba(34,38,47,0.68)' }}>
          Daybase is built around a simple principle: keep as little of your data as possible, and keep what&apos;s necessary as close to you as possible. Here&apos;s exactly what that means in practice.
        </p>

        <div className="flex flex-col gap-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
                {s.title}
              </h2>
              <p
                className="text-sm leading-relaxed whitespace-pre-line"
                style={{ color: 'rgba(34,38,47,0.68)' }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer
        className="px-8 py-6 text-center text-xs"
        style={{ borderTop: '1px solid var(--hairline)', color: 'rgba(34,38,47,0.4)' }}
      >
        <Link href="/terms" className="link-gold uppercase tracking-[0.15em]">Terms of Service</Link>
        <span className="mx-3">·</span>
        Daybase — Run your business, without the busywork
      </footer>
    </div>
  )
}
