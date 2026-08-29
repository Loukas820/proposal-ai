export type CompanyProfile = {
  companyName: string
  tagline: string
  email: string
  phone: string
}

export type HistoryEntry = {
  id: string
  createdAt: string
  rfp: string
  proposal: string
  companyName: string
}

const PROFILE_KEY = 'proposalai_profile'
const HISTORY_KEY = 'proposalai_history'

export function getProfile(): CompanyProfile {
  if (typeof window === 'undefined') {
    return { companyName: '', tagline: '', email: '', phone: '' }
  }
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY)
    if (!raw) return { companyName: '', tagline: '', email: '', phone: '' }
    return JSON.parse(raw)
  } catch {
    return { companyName: '', tagline: '', email: '', phone: '' }
  }
}

export function saveProfile(profile: CompanyProfile) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function addHistoryEntry(entry: Omit<HistoryEntry, 'id' | 'createdAt'>) {
  if (typeof window === 'undefined') return
  const history = getHistory()
  const newEntry: HistoryEntry = {
    ...entry,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    createdAt: new Date().toISOString(),
  }
  const updated = [newEntry, ...history].slice(0, 100)
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
}

export function deleteHistoryEntry(id: string) {
  if (typeof window === 'undefined') return
  const history = getHistory().filter((h) => h.id !== id)
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export function downloadProposalPDF(companyName: string, tagline: string, email: string, phone: string, proposal: string) {
  const w = window.open('', '_blank')
  if (!w) return

  const escape = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

  const metaParts = [tagline, email, phone].filter(Boolean).join(' &nbsp;·&nbsp; ')

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Proposal</title>
      <style>
        body {
          font-family: Georgia, 'Times New Roman', serif;
          color: #22262f;
          padding: 64px 72px;
          max-width: 760px;
          margin: 0 auto;
        }
        h1 {
          font-size: 24px;
          letter-spacing: 0.02em;
          border-bottom: 2px solid #b8944f;
          padding-bottom: 16px;
          margin-bottom: 8px;
        }
        .meta {
          color: #666;
          font-size: 12px;
          margin-bottom: 40px;
        }
        .body {
          white-space: pre-wrap;
          line-height: 1.7;
          font-size: 14px;
        }
        @media print {
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <h1>${escape(companyName || 'Proposal')}</h1>
      <div class="meta">${metaParts}</div>
      <div class="body">${escape(proposal)}</div>
    </body>
    </html>
  `

  w.document.write(html)
  w.document.close()
  w.focus()
  setTimeout(() => w.print(), 300)
}
