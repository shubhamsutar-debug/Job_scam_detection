import { useState } from 'react'
import { ShieldCheck, Menu, X } from 'lucide-react'

const links = [
  { href: '#home',  label: 'Home' },
  { href: '#how',   label: 'How It Works' },
  { href: '#about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
          <div
            style={{
              width: 36, height: 36,
              background: '#4F46E5',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ShieldCheck size={20} color="white" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
            JobShield <span style={{ color: '#4F46E5' }}>AI</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="nav-link"
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 600,
                color: '#6B7280',
                textDecoration: 'none',
                transition: 'color 0.15s, background 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#4F46E5'
                e.currentTarget.style.background = '#EEF2FF'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#6B7280'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#analyzer"
            className="btn-primary"
            style={{ padding: '8px 20px', fontSize: 14, borderRadius: 8, textDecoration: 'none', marginLeft: 12 }}
          >
            Analyze a Job
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 8, borderRadius: 8,
            border: '1px solid #E5E7EB',
            background: 'transparent',
            color: '#6B7280',
            cursor: 'pointer',
          }}
          className="md:hidden"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="fade-in md:hidden"
          style={{
            background: '#FFFFFF',
            borderTop: '1px solid #E5E7EB',
            padding: '8px 16px 16px',
          }}
        >
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block', padding: '10px 12px',
                fontSize: 14, fontWeight: 600,
                color: '#374151', textDecoration: 'none',
                borderRadius: 8,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F3F4F6')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {label}
            </a>
          ))}
          <a
            href="#analyzer"
            onClick={() => setOpen(false)}
            className="btn-primary"
            style={{
              display: 'flex', width: '100%', padding: '12px',
              marginTop: 8, fontSize: 14, borderRadius: 8, textDecoration: 'none',
            }}
          >
            Analyze a Job
          </a>
        </div>
      )}
    </header>
  )
}
