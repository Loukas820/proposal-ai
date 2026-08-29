'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProfile, downloadQuotePDF, CompanyProfile, QuoteLineItem } from '../../lib/storage'

function newItem(): QuoteLineItem {
  return { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), description: '', qty: 1, unitPrice: 0 }
}

export default function QuoteBuilderTool() {
  const [profile, setProfile] = useState<CompanyProfile>({ companyName: '', tagline: '', email: '', phone: '' })
  const [clientName, setClientName] = useState('')
  const [items, setItems] = useState<QuoteLineItem[]>([newItem()])
  const [taxRate, setTaxRate] = useState(0)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    setProfile(getProfile())
  }, [])

  const updateItem = (id: string, patch: Partial<QuoteLineItem>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  }

  const removeItem = (id: string) => {
    setItems((prev) => (prev.length > 1 ? prev.filter((item) => item.id !== id) : prev))
  }

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)
  const tax = subtotal * (taxRate / 100)
  const total = subtotal + tax
  const money = (n: number) => `$${n.toFixed(2)}`

  const handleDownload = () => {
    downloadQuotePDF(profile.companyName, profile.tagline, profile.email, profile.phone, clientName, items, taxRate, notes)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)' }}>
      <header className="nav-glass-light" style={{ borderBottom: '1px solid var(--hairline)' }}>
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl tracking-wide" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
            ProposalAI
          </Link>
          <nav className="flex gap-6 text-xs tracking-[0.2em] uppercase">
            <Link href="/dashboard" className="link-gold" style={{ color: 'var(--charcoal)' }}>Workspace</Link>
            <Link href="/tools" style={{ color: 'var(--gold)' }}>Tools</Link>
            <Link href="/history" className="link-gold" style={{ color: 'var(--charcoal)' }}>History</Link>
            <Link href="/settings" className="link-gold" style={{ color: 'var(--charcoal)' }}>Profile</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-8 py-12 fade-in-up">
        <Link href="/tools" className="text-xs tracking-[0.15em] uppercase link-gold" style={{ color: 'var(--gold)' }}>
          ← All Tools
        </Link>
        <h1 className="text-3xl mt-4 mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
          Quote Builder
        </h1>
        <p className="text-sm mb-10" style={{ color: 'rgba(34,38,47,0.6)' }}>
          Line items, tax, and total, calculated for you — export a branded quote as a PDF. Free with your account, no AI involved.
        </p>

        {!profile.companyName && (
          <div className="mb-8 px-5 py-4 text-sm" style={{ backgroundColor: 'var(--gold-dim)', border: '1px solid var(--gold)', color: 'var(--navy)' }}>
            Add your company details in{' '}
            <Link href="/settings" className="underline">
              Profile
            </Link>{' '}
            so quotes are branded automatically.
          </div>
        )}

        <label className="text-xs tracking-[0.2em] uppercase mb-2 block" style={{ color: 'var(--navy)' }}>
          Client Name (optional)
        </label>
        <input
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="e.g. Sarah Johnson"
          className="input-refined w-full px-4 py-3 text-sm mb-8 max-w-sm"
        />

        <div className="card p-0 overflow-hidden mb-6">
          <div className="grid grid-cols-[1fr_80px_120px_120px_40px] gap-0 text-xs tracking-[0.15em] uppercase px-5 py-3" style={{ backgroundColor: 'var(--parchment)', color: 'var(--navy)' }}>
            <div>Description</div>
            <div className="text-right">Qty</div>
            <div className="text-right">Unit Price</div>
            <div className="text-right">Amount</div>
            <div />
          </div>
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-[1fr_80px_120px_120px_40px] gap-0 items-center px-5 py-3" style={{ borderTop: '1px solid var(--hairline)' }}>
              <input
                value={item.description}
                onChange={(e) => updateItem(item.id, { description: e.target.value })}
                placeholder="e.g. Roof tear-off & replacement"
                className="text-sm px-2 py-1 border-0 outline-none bg-transparent"
              />
              <input
                type="number"
                min={0}
                value={item.qty}
                onChange={(e) => updateItem(item.id, { qty: Number(e.target.value) || 0 })}
                className="text-sm px-2 py-1 border-0 outline-none bg-transparent text-right"
              />
              <input
                type="number"
                min={0}
                step="0.01"
                value={item.unitPrice}
                onChange={(e) => updateItem(item.id, { unitPrice: Number(e.target.value) || 0 })}
                className="text-sm px-2 py-1 border-0 outline-none bg-transparent text-right"
              />
              <div className="text-sm text-right" style={{ color: 'var(--navy)' }}>
                {money(item.qty * item.unitPrice)}
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-sm text-right"
                style={{ color: 'rgba(34,38,47,0.35)' }}
                aria-label="Remove line item"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={() => setItems((prev) => [...prev, newItem()])}
            className="w-full text-xs tracking-[0.15em] uppercase py-3 link-gold"
            style={{ borderTop: '1px solid var(--hairline)', color: 'var(--gold)' }}
          >
            + Add Line Item
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1">
            <label className="text-xs tracking-[0.2em] uppercase mb-2 block" style={{ color: 'var(--navy)' }}>
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Payment terms, validity period, anything else the client should know..."
              className="input-refined w-full h-28 p-4 text-sm leading-relaxed"
            />
          </div>
          <div className="w-full md:w-64 shrink-0">
            <label className="text-xs tracking-[0.2em] uppercase mb-2 block" style={{ color: 'var(--navy)' }}>
              Tax Rate (%)
            </label>
            <input
              type="number"
              min={0}
              step="0.1"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
              className="input-refined w-full px-4 py-3 text-sm mb-4"
            />
            <div className="card p-4 text-sm">
              <div className="flex justify-between mb-1" style={{ color: 'rgba(34,38,47,0.6)' }}>
                <span>Subtotal</span><span>{money(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-3" style={{ color: 'rgba(34,38,47,0.6)' }}>
                <span>Tax</span><span>{money(tax)}</span>
              </div>
              <div className="flex justify-between text-base pt-3" style={{ borderTop: '1px solid var(--hairline)', color: 'var(--navy)', fontWeight: 600 }}>
                <span>Total</span><span>{money(total)}</span>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleDownload} className="btn-navy w-full py-3 text-sm tracking-[0.2em] uppercase" style={{ fontWeight: 600 }}>
          Download Quote PDF
        </button>
      </main>

      <footer className="px-8 py-6 text-center text-xs" style={{ borderTop: '1px solid var(--hairline)', color: 'rgba(34,38,47,0.4)' }}>
        ProposalAI — Precision proposal writing, powered by AI
      </footer>
    </div>
  )
}
