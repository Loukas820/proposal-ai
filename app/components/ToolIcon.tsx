export type IconName =
  | 'sparkle'
  | 'megaphone'
  | 'link'
  | 'receipt'
  | 'search'
  | 'calendar'
  | 'phone'
  | 'mail'
  | 'star'
  | 'pencil'
  | 'swap'
  | 'document'

export default function ToolIcon({ name, className }: { name: IconName; className?: string }) {
  const common = {
    width: '1em',
    height: '1em',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  }

  switch (name) {
    case 'sparkle':
      return (
        <svg {...common}>
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
        </svg>
      )
    case 'megaphone':
      return (
        <svg {...common}>
          <path d="M3 11v2a2 2 0 002 2h1l3 5V4L6 9H5a2 2 0 00-2 2z" />
          <path d="M14 8a4 4 0 010 8" />
          <path d="M18 5a8 8 0 010 14" />
        </svg>
      )
    case 'link':
      return (
        <svg {...common}>
          <path d="M9 15l6-6" />
          <path d="M11 6l1-1a4 4 0 115.5 5.5l-1.5 1.5" />
          <path d="M13 18l-1 1a4 4 0 11-5.5-5.5l1.5-1.5" />
        </svg>
      )
    case 'receipt':
      return (
        <svg {...common}>
          <path d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5V3z" />
          <path d="M9 8h6M9 12h6M9 16h3" />
        </svg>
      )
    case 'search':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M20 20l-4.5-4.5" />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
          <path d="M3.5 9.5h17M8 3v4M16 3v4" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...common}>
          <path d="M5 4h3.2l1.3 4.5-2 1.6a12 12 0 006.4 6.4l1.6-2 4.5 1.3V19a2 2 0 01-2.2 2A16 16 0 013 6.2 2 2 0 015 4z" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...common}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
          <path d="M4 6.5l8 6.5 8-6.5" />
        </svg>
      )
    case 'star':
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 3.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7L12 3.5z" />
        </svg>
      )
    case 'pencil':
      return (
        <svg {...common}>
          <path d="M4 20l1-4.5L15.5 5 19 8.5 8.5 19 4 20z" />
          <path d="M13 7l4 4" />
        </svg>
      )
    case 'swap':
      return (
        <svg {...common}>
          <path d="M4 8h13M17 8l-3-3M17 8l-3 3" />
          <path d="M20 16H7M7 16l3 3M7 16l3-3" />
        </svg>
      )
    case 'document':
      return (
        <svg {...common}>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v4h4" />
          <path d="M9.5 12h5M9.5 15.5h5" />
        </svg>
      )
  }
}
