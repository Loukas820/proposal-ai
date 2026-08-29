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
const ACCOUNT_EMAIL_KEY = 'proposalai_account_email'

export function getAccountEmail(): string {
  if (typeof window === 'undefined') return ''
  return window.localStorage.getItem(ACCOUNT_EMAIL_KEY) || ''
}

export function saveAccountEmail(email: string) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(ACCOUNT_EMAIL_KEY, email)
}

export function clearAccountEmail() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(ACCOUNT_EMAIL_KEY)
}

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

export type QuoteLineItem = {
  id: string
  description: string
  qty: number
  unitPrice: number
}

export function downloadQuotePDF(
  companyName: string,
  tagline: string,
  email: string,
  phone: string,
  clientName: string,
  items: QuoteLineItem[],
  taxRate: number,
  notes: string
) {
  const w = window.open('', '_blank')
  if (!w) return

  const escape = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)
  const tax = subtotal * (taxRate / 100)
  const total = subtotal + tax
  const money = (n: number) => `$${n.toFixed(2)}`

  const metaParts = [tagline, email, phone].filter(Boolean).join(' &nbsp;·&nbsp; ')

  const rows = items
    .map(
      (item) => `
        <tr>
          <td>${escape(item.description || 'Untitled item')}</td>
          <td class="num">${item.qty}</td>
          <td class="num">${money(item.unitPrice)}</td>
          <td class="num">${money(item.qty * item.unitPrice)}</td>
        </tr>`
    )
    .join('')

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Quote</title>
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
        .meta { color: #666; font-size: 12px; margin-bottom: 8px; }
        .client { font-size: 13px; margin-bottom: 32px; color: #333; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px; }
        th, td { text-align: left; padding: 10px 8px; border-bottom: 1px solid #ddd; }
        th { text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; color: #666; }
        .num { text-align: right; }
        .totals { width: 260px; margin-left: auto; font-size: 13px; }
        .totals div { display: flex; justify-content: space-between; padding: 4px 0; }
        .totals .grand { font-size: 16px; font-weight: bold; border-top: 2px solid #22262f; margin-top: 6px; padding-top: 10px; }
        .notes { margin-top: 32px; font-size: 12px; color: #555; white-space: pre-wrap; }
        @media print { body { padding: 0; } }
      </style>
    </head>
    <body>
      <h1>${escape(companyName || 'Quote')}</h1>
      <div class="meta">${metaParts}</div>
      ${clientName ? `<div class="client">Prepared for: <strong>${escape(clientName)}</strong></div>` : ''}
      <table>
        <thead>
          <tr><th>Description</th><th class="num">Qty</th><th class="num">Unit Price</th><th class="num">Amount</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="totals">
        <div><span>Subtotal</span><span>${money(subtotal)}</span></div>
        <div><span>Tax (${taxRate}%)</span><span>${money(tax)}</span></div>
        <div class="grand"><span>Total</span><span>${money(total)}</span></div>
      </div>
      ${notes ? `<div class="notes">${escape(notes)}</div>` : ''}
    </body>
    </html>
  `

  w.document.write(html)
  w.document.close()
  w.focus()
  setTimeout(() => w.print(), 300)
}
