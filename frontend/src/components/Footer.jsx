import { ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #E2E8F0', background: '#FFFFFF' }}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
              style={{ background: '#4F46E5' }}
            >
              <ShieldCheck size={16} strokeWidth={2.5} />
            </div>
            <span className="text-sm font-extrabold" style={{ color: '#0F172A' }}>
              JobShield <span style={{ color: '#4F46E5' }}>AI</span>
            </span>
          </div>

          {/* Centre */}
          <p className="text-xs text-center" style={{ color: '#94A3B8' }}>
            Academic project — NLP &amp; Machine Learning · {new Date().getFullYear()}
          </p>

          {/* Right */}
          <p className="text-xs" style={{ color: '#94A3B8' }}>
            AI-assisted screening · Verify all job offers independently
          </p>

        </div>
      </div>
    </footer>
  )
}
