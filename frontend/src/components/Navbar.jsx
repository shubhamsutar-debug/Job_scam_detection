import { useState } from 'react'
import { ShieldCheck, Menu, X } from 'lucide-react'

const links = [
  { href: '#home',      label: 'Home' },
  { href: '#analyzer',  label: 'Analyze Job' },
  { href: '#how',       label: 'How It Works' },
  { href: '#about',     label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 focus-visible:rounded-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
            <ShieldCheck size={22} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-[17px] font-extrabold leading-tight tracking-tight text-slate-900">
              JobShield <span className="text-indigo-600">AI</span>
            </p>
            <p className="text-[11px] leading-none text-slate-400 font-medium">Fake job detection</p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-indigo-600 focus-visible:text-indigo-600"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 md:hidden"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav
          className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden"
          aria-label="Mobile navigation"
        >
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
