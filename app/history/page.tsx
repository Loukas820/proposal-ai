'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getHistory, deleteHistoryEntry, downloadProposalPDF, getProfile, HistoryEntry } from '../lib/storage'
import ProposalView from '../components/ProposalView'

export default function History() {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [selected, setSelected] = useState<HistoryEntry | null>(null)

  useEffect(() => {
    setHistory(getHistory())
  }, [])

  const handleDelete = (id: string) => {
    deleteHistoryEntry(id)
    setHistory(getHistory())
    if (selected?.id === id) setSelected(null)
  }

  const handleDownload = (entry: HistoryEntry) => {
    const profile = getProfile()
    downloadProposalPDF(entry.companyName || profile.companyName, profile.tagline, profile.email, profile.phone, entry.proposal)
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
            Daybase
          </Link>
          <nav className="flex gap-6 text-xs tracking-[0.2em] uppercase">
            <Link href="/dashboard" className="link-gold" style={{ color: 'var(--charcoal)' }}>Workspace</Link>
            <Link href="/tools" className="link-gold" style={{ color: 'var(--charcoal)' }}>Tools</Link>
            <Link href="/history" style={{ color: 'var(--gold)' }}>History</Link>
            <Link href="/resources" className="link-gold" style={{ color: 'var(--charcoal)' }}>Free Guide</Link>
            <Link href="/settings" className="link-gold" style={{ color: 'var(--charcoal)' }}>Profile</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-8 py-12 fade-in-up">
        <h1
          className="text-3xl mb-2"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}
        >
          Proposal History
        </h1>
        <p className="text-sm mb-10" style={{ color: 'rgba(34,38,47,0.6)' }}>
          Saved on this device. Click any entry to view or download it again.
        </p>

        {history.length === 0 ? (
          <div className="card p-10 text-sm text-center" style={{ color: 'rgba(34,38,47,0.5)' }}>
            No proposals generated yet. Head to the Workspace to create your first one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              {history.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => setSelected(entry)}
                  className={`card card-hover text-left p-4 ${selected?.id === entry.id ? '' : ''}`}
                  style={{
                    backgroundColor: selected?.id === entry.id ? '#ffffff' : 'var(--parchment)',
                    borderColor: selected?.id === entry.id ? 'var(--gold)' : 'var(--hairline)',
                  }}
                >
                  <div className="text-xs mb-1" style={{ color: 'var(--gold)' }}>
                    {new Date(entry.createdAt).toLocaleString()}
                  </div>
                  <div className="text-sm line-clamp-2" style={{ color: 'var(--charcoal)' }}>
                    {entry.rfp.slice(0, 140)}{entry.rfp.length > 140 ? '…' : ''}
                  </div>
                </button>
              ))}
            </div>

            <div>
              {selected ? (
                <div>
                  <div className="doc-paper h-96 p-6 text-sm leading-relaxed overflow-y-auto mb-4">
                    <ProposalView text={selected.proposal} />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDownload(selected)}
                      className="btn-navy flex-1 py-3 text-sm tracking-[0.2em] uppercase"
                      style={{ fontWeight: 600 }}
                    >
                      Download PDF
                    </button>
                    <button
                      onClick={() => handleDelete(selected.id)}
                      className="btn-outline px-6 py-3 text-sm tracking-[0.2em] uppercase"
                      style={{ color: 'var(--charcoal)', borderColor: 'var(--hairline)' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="h-96 flex items-center justify-center text-sm"
                  style={{ border: '1px dashed var(--hairline)', color: 'rgba(34,38,47,0.4)' }}
                >
                  Select a proposal to view it
                </div>
              )}
            </div>
          </div>
        )}
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
