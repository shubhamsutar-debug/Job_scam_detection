import { Github, Heart } from 'lucide-react'

const footerLinks = [
  { href: '#home',     label: 'Home' },
  { href: '#analyzer', label: 'Analyze' },
  { href: '#how',      label: 'How It Works' },
  { href: '#about',    label: 'About' },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: 'rgba(8,11,20,0.95)',
        borderTop: '1px solid rgba(108,99,255,0.15)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Top row */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="relative flex items-center justify-center"
              style={{ width: 40, height: 40 }}
            >
              <div
                style={{
                  position: 'absolute', inset: 0, borderRadius: 10,
                  background: 'linear-gradient(135deg, rgba(108,99,255,0.25), rgba(6,182,212,0.15))',
                  filter: 'blur(4px)',
                }}
              />
              <img
                src="/logo.png"
                alt="JobShield AI logo"
                style={{ width: 36, height: 36, objectFit: 'contain', position: 'relative', zIndex: 1 }}
              />
            </div>
            <div>
              <p className="text-sm font-extrabold" style={{ color: '#F1F5F9' }}>
                JobShield{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #6C63FF, #06B6D4)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >AI</span>
              </p>
              <p className="text-[11px]" style={{ color: '#334155' }}>
                Safer Job Searches. Brighter Futures.
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm transition-colors"
                style={{ color: '#475569', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#A5B4FC')}
                onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div
          className="my-8"
          style={{ height: 1, background: 'rgba(255,255,255,0.05)' }}
        />

        {/* Bottom row */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-xs text-center" style={{ color: '#334155' }}>
            Academic project — NLP &amp; Machine Learning · {new Date().getFullYear()}
          </p>

          <div className="flex items-center gap-1.5 text-xs" style={{ color: '#334155' }}>
            <span>Built with</span>
            <Heart size={11} style={{ color: '#6C63FF', fill: '#6C63FF' }} />
            <span>for safer job searches</span>
          </div>

          <p className="text-xs" style={{ color: '#334155' }}>
            AI-assisted screening · Always verify independently
          </p>
        </div>
      </div>
    </footer>
  )
}
