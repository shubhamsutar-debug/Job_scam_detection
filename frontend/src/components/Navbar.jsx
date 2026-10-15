import { useState } from 'react'
import { ShieldCheck, Menu, X } from 'lucide-react'

const links = [
  { href: '#home',     label: 'Home' },
  { href: '#analyzer', label: 'Analyze Job' },
  { href: '#how',      label: 'How It Works' },
  { href: '#about',    label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-30"
      style={{
        background: 'rgba(255,255,255,0.97)',
        borderBottom: '1px solid #E2E8F0',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ── Logo ── */}
        <a href="#home" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
            style={{ background: '#4F46E5' }}
          >
            <ShieldCheck size={20} strokeWidth={2.5} />
          </div>
          <div>
            <p
              className="text-base font-extrabold leading-tight tracking-tight"
              style={{ color: '#0F172A' }}
            >
              JobShield <span style={{ color: '#4F46E5' }}>AI</span>
            </p>
            <p className="text-[11px] font-medium leading-none" style={{ color: '#94A3B8' }}>
              Fake job detection
            </p>
          </div>
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="rounded-md px-3.5 py-2 text-sm font-semibold transition-colors"
              style={{ color: '#64748B', textDecoration: 'none' }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#4F46E5'
                e.currentTarget.style.background = '#EEF2FF'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#64748B'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#analyzer"
            className="ml-3 inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white transition"
            style={{ background: '#4F46E5', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#4338CA')}
            onMouseLeave={e => (e.currentTarget.style.background = '#4F46E5')}
          >
            Analyze Job
          </a>
        </nav>

        {/* ── Mobile hamburger ── */}
        <button
          className="flex items-center justify-center rounded-md p-2 md:hidden"
          style={{ border: '1px solid #E2E8F0', color: '#64748B' }}
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <nav
          className="border-t px-4 pb-4 pt-2 md:hidden"
          style={{ borderColor: '#E2E8F0', background: '#FFFFFF' }}
          aria-label="Mobile navigation"
        >
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-semibold"
              style={{ color: '#334155', textDecoration: 'none' }}
            >
              {label}
            </a>
          ))}
          <a
            href="#analyzer"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg px-3 py-2.5 text-center text-sm font-bold text-white"
            style={{ background: '#4F46E5', textDecoration: 'none' }}
          >
            Analyze Job
          </a>
        </nav>
      )}
    </header>
  )
}
