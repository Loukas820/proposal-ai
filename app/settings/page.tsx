'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProfile, saveProfile, CompanyProfile } from '../lib/storage'

export default function Settings() {
  const [profile, setProfile] = useState<CompanyProfile>({
    companyName: '',
    tagline: '',
    email: '',
    phone: '',
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setProfile(getProfile())
  }, [])

  const handleSave = () => {
    saveProfile(profile)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)' }}>
      <header className="nav-glass-light" style={{ borderBottom: '1px solid var(--hairline)' }}>
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl tracking-wide"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}
          >
            ProposalAI
          </Link>
          <nav className="flex gap-6 text-xs tracking-[0.2em] uppercase">
            <Link href="/dashboard" className="link-gold" style={{ color: 'var(--charcoal)' }}>Workspace</Link>
            <Link href="/tools" className="link-gold" style={{ color: 'var(--charcoal)' }}>Tools</Link>
            <Link href="/history" className="link-gold" style={{ color: 'var(--charcoal)' }}>History</Link>
            <Link href="/resources" className="link-gold" style={{ color: 'var(--charcoal)' }}>Free Guide</Link>
            <Link href="/settings" style={{ color: 'var(--gold)' }}>Profile</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-8 py-12 fade-in-up">
        <h1
          className="text-3xl mb-2"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}
        >
          Company Profile
        </h1>
        <p className="text-sm mb-10" style={{ color: 'rgba(34,38,47,0.6)' }}>
          Saved on this device. Every proposal you generate will be written on
          behalf of this company automatically.
        </p>

        <div className="card p-8 flex flex-col gap-6">
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--navy)' }}>
              Company Name
            </label>
            <input
              type="text"
              value={profile.companyName}
              onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
              placeholder="e.g. Acme Consulting"
              className="input-refined w-full p-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--navy)' }}>
              What You Do
            </label>
            <input
              type="text"
              value={profile.tagline}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              placeholder="e.g. Marketing strategy for boutique brands"
              className="input-refined w-full p-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--navy)' }}>
              Contact Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              placeholder="you@company.com"
              className="input-refined w-full p-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--navy)' }}>
              Contact Phone
            </label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className="input-refined w-full p-3 text-sm"
            />
          </div>

          <button
            onClick={handleSave}
            className="btn-navy mt-2 py-3 text-sm tracking-[0.2em] uppercase"
            style={{ fontWeight: 600 }}
          >
            {saved ? 'Saved ✓' : 'Save Profile'}
          </button>
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
