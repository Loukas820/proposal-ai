'use client'
import type { ReactNode } from 'react'

// Lightweight Markdown-ish renderer for AI-generated proposal text.
// Deliberately dependency-free: handles the small set of Markdown the
// generation prompt is instructed to use (#### headings, **bold**,
// bullet lists, horizontal rules, paragraphs) and renders it as a
// properly typeset document instead of dumping raw asterisks/hashes.

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={`${keyPrefix}-${i}`} style={{ color: 'var(--navy)' }}>
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={`${keyPrefix}-${i}`}>{part}</span>
  })
}

export default function ProposalView({ text }: { text: string }) {
  if (!text) return null

  const lines = text.replace(/\r\n/g, '\n').split('\n')
  const blocks: ReactNode[] = []
  let listBuffer: string[] = []

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return
    blocks.push(
      <ul key={key} className="pl-5 mb-4 flex flex-col gap-1.5" style={{ listStyle: 'disc' }}>
        {listBuffer.map((item, i) => (
          <li key={i} className="pl-1">
            {renderInline(item, `${key}-li-${i}`)}
          </li>
        ))}
      </ul>
    )
    listBuffer = []
  }

  lines.forEach((raw, idx) => {
    const line = raw.trim()
    const key = `b-${idx}`

    if (!line) {
      flushList(`${key}-list`)
      return
    }

    if (/^-{3,}$/.test(line)) {
      flushList(`${key}-list`)
      blocks.push(<hr key={key} className="my-6" style={{ borderColor: 'var(--hairline)' }} />)
      return
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/)
    if (heading) {
      flushList(`${key}-list`)
      const level = heading[1].length
      const content = heading[2].replace(/\*\*/g, '')
      const size = level <= 2 ? 'text-xl' : level === 3 ? 'text-lg' : 'text-base'
      blocks.push(
        <div
          key={key}
          className={`${size} mt-6 mb-2`}
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)', fontWeight: 600 }}
        >
          {content}
        </div>
      )
      return
    }

    if (/^[*-]\s+/.test(line)) {
      listBuffer.push(line.replace(/^[*-]\s+/, ''))
      return
    }

    flushList(`${key}-list`)
    blocks.push(
      <p key={key} className="mb-3 leading-relaxed">
        {renderInline(line, key)}
      </p>
    )
  })

  flushList('final-list')

  return <div>{blocks}</div>
}
