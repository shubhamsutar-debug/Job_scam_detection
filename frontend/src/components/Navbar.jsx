import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const links = [
  { href: '#home',     label: 'Home' },
  { href: '#analyzer', label: 'Analyze' },
  { href: '#how',      label: 'How It Works' },
  { href: '#about',    label: 'About' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(8, 11, 20, 0.92)'
          : 'rgba(8, 11, 20, 0.6)',
        borderBottom: scrolled
          ? '1px solid rgba(108,99,255,0.2)'
          : '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ── Logo ── */}
        <a href="#home" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
          <div
            className="relative flex items-center justify-center"
            style={{ width: 44, height: 44 }}
          >
            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-xl animate-glow-pulse"
              style={{
                background: 'linear-gradient(135deg, rgba(108,99,255,0.3), rgba(6,182,212,0.2))',
                borderRadius: 12,
                filter: 'blur(6px)',
              }}
            />
            <img
              src="/logo.png"
              alt="JobShield AI logo"
              style={{ width: 40, height: 40, objectFit: 'contain', position: 'relative', zIndex: 1 }}
            />
          </div>
          <div>
            <p
              className="text-[15px] font-extrabold leading-tight tracking-tight"
              style={{ color: '#F1F5F9' }}
            >
              JobShield <span
                style={{
                  background: 'linear-gradient(90deg, #6C63FF, #06B6D4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >AI</span>
            </p>
            <p className="text-[10px] font-medium leading-none" style={{ color: '#475569' }}>
              Safer Job Searches
            </p>
          </div>
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200"
              style={{ color: '#94A3B8', textDecoration: 'none' }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#F1F5F9'
                e.currentTarget.style.background = 'rgba(108,99,255,0.12)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#94A3B8'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {label}
            </a>
          ))}

          <a
            href="#analyzer"
            className="btn-primary ml-3 px-5 py-2.5 text-sm"
            style={{ textDecoration: 'none', borderRadius: 12 }}
          >
            <span style={{ fontSize: 14 }}>⚡</span>
            Analyze Job
          </a>
        </nav>

        {/* ── Mobile hamburger ── */}
        <button
          className="flex items-center justify-center rounded-xl p-2.5 md:hidden transition-all"
          style={{
            border: '1px solid rgba(108,99,255,0.25)',
            background: 'rgba(108,99,255,0.08)',
            color: '#94A3B8',
          }}
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
          className="border-t px-4 pb-5 pt-3 md:hidden animate-slide-up"
          style={{
            borderColor: 'rgba(108,99,255,0.15)',
            background: 'rgba(8,11,20,0.98)',
            backdropFilter: 'blur(24px)',
          }}
          aria-label="Mobile navigation"
        >
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold mb-1 transition-all"
              style={{ color: '#CBD5E1', textDecoration: 'none' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(108,99,255,0.1)'
                e.currentTarget.style.color = '#F1F5F9'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#CBD5E1'
              }}
            >
              {label}
              <ChevronDown size={14} style={{ color: '#475569', transform: 'rotate(-90deg)' }} />
            </a>
          ))}
          <a
            href="#analyzer"
            onClick={() => setOpen(false)}
            className="btn-primary mt-3 w-full py-3 text-sm"
            style={{ textDecoration: 'none', borderRadius: 12 }}
          >
            ⚡ Analyze Job
          </a>
        </nav>
      )}
    </header>
  )
}
