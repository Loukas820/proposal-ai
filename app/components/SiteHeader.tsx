'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const SERVICE_LINKS = [
  {
    href: '/services#front-desk',
    label: 'Your Front Desk',
    blurb: 'Calls, appointments & inbound requests',
  },
  {
    href: '/services#get-found',
    label: 'Get Found & Stay In Touch',
    blurb: 'Outreach, follow-ups & review requests',
  },
  {
    href: '/services#back-office',
    label: 'Back Office',
    blurb: 'Proposals, quotes & contracts',
  },
]

export default function SiteHeader({ active }: { active?: 'services' | 'pricing' }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <header className="nav-glass-light" style={{ borderBottom: '1px solid var(--hairline)', position: 'relative', zIndex: 30 }}>
      <nav className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl tracking-wide"
          style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--navy)' }}
        >
          Daybase
        </Link>

        <div className="flex items-center gap-8">
          <div ref={wrapRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="text-sm tracking-widest uppercase flex items-center gap-1.5"
              style={{
                color: open || active === 'services' ? 'var(--navy)' : 'var(--gold)',
                fontWeight: active === 'services' ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              Services
              <span
                aria-hidden="true"
                style={{
                  fontSize: '0.6em',
                  display: 'inline-block',
                  transform: open ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.15s ease',
                }}
              >
                ▾
              </span>
            </button>

            {open && (
              <div
                className="absolute top-full mt-3"
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '320px',
                  backgroundColor: 'var(--cream)',
                  border: '1px solid var(--hairline)',
                  boxShadow: '0 16px 40px rgba(11,18,32,0.14)',
                  padding: '0.5rem',
                }}
              >
                {SERVICE_LINKS.map((s, i) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3"
                    style={{
                      borderBottom: i < SERVICE_LINKS.length - 1 ? '1px solid var(--hairline)' : 'none',
                    }}
                  >
                    <div className="text-sm" style={{ color: 'var(--navy)', fontWeight: 600 }}>
                      {s.label}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(27,30,38,0.55)' }}>
                      {s.blurb}
                    </div>
                  </Link>
                ))}
                <div className="px-4 pt-2 pb-1">
                  <Link
                    href="/tools"
                    onClick={() => setOpen(false)}
                    className="link-navy text-xs tracking-[0.15em] uppercase"
                  >
                    Browse All Tools →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/pricing"
            className="text-sm tracking-widest uppercase"
            style={{ color: active === 'pricing' ? 'var(--navy)' : 'var(--gold)', fontWeight: active === 'pricing' ? 600 : 400 }}
          >
            Pricing
          </Link>
          <Link href="/resources" className="link-navy text-sm tracking-widest uppercase">
            Free Guide
          </Link>
          <Link href="/dashboard" className="link-navy text-sm tracking-widest uppercase">
            Enter →
          </Link>
        </div>
      </nav>
    </header>
  )
}
