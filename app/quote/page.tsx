'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PublicQuoteRequest() {
  const [to, setTo] = useState('')
  const [biz, setBiz] = useState('')
  const [ready, setReady] = useState(false)

  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setTo(params.get('to') || '')
    setBiz(params.get('biz') || 'this business')
    setReady(true)
  }, [])

  const handleSubmit = () => {
    if (!name || !message) {
      alert('Please enter your name and a short message about what you need.')
      return
    }
    const subject = encodeURIComponent(`New quote request from ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nContact: ${contact || 'not provided'}\n\nWhat they need:\n${message}`
    )
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
    setSent(true)
  }

  if (!ready) return null

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)' }}>
      <header style={{ borderBottom: '1px solid var(--hairline)' }}>
        <div className="max-w-3xl mx-auto px-8 py-6">
          <Link href="/" className="text-xl tracking-wide" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
            Daybase
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-lg w-full mx-auto px-8 py-16 fade-in-up">
        {!to ? (
          <div className="card p-8 text-center text-sm" style={{ color: 'rgba(34,38,47,0.5)' }}>
            This quote request link is invalid or incomplete — ask the business for their current link.
          </div>
        ) : (
          <>
            <h1 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>
              Request a Quote
            </h1>
            <p className="text-sm mb-10" style={{ color: 'rgba(34,38,47,0.6)' }}>
              Sending a request to <strong style={{ color: 'var(--navy)' }}>{biz}</strong>. Fill this out and it&apos;ll open your email app to send it directly.
            </p>

            <label className="text-xs tracking-[0.2em] uppercase mb-2 block" style={{ color: 'var(--navy)' }}>
              Your Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-refined w-full px-4 py-3 text-sm mb-6"
            />

            <label className="text-xs tracking-[0.2em] uppercase mb-2 block" style={{ color: 'var(--navy)' }}>
              Email or Phone
            </label>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="How should they reach you back?"
              className="input-refined w-full px-4 py-3 text-sm mb-6"
            />

            <label className="text-xs tracking-[0.2em] uppercase mb-2 block" style={{ color: 'var(--navy)' }}>
              What Do You Need?
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Briefly describe the job or service you're looking for..."
              className="input-refined w-full h-32 p-4 text-sm leading-relaxed mb-8"
            />

            <button onClick={handleSubmit} className="btn-navy w-full py-3 text-sm tracking-[0.2em] uppercase" style={{ fontWeight: 600 }}>
              Send Request
            </button>

            {sent && (
              <p className="text-xs text-center mt-4" style={{ color: 'rgba(34,38,47,0.5)' }}>
                Your email app should have opened with this request ready to send. If nothing happened, email {to} directly.
              </p>
            )}
          </>
        )}
      </main>

      <footer className="px-8 py-6 text-center text-xs" style={{ borderTop: '1px solid var(--hairline)', color: 'rgba(34,38,47,0.4)' }}>
        Powered by{' '}
        <Link href="/" className="link-gold" style={{ color: 'var(--gold)' }}>
          Daybase
        </Link>
      </footer>
    </div>
  )
}
