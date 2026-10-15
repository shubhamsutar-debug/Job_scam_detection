import { ArrowRight, ShieldCheck, Brain, Zap } from 'lucide-react'

const pills = [
  { icon: <ShieldCheck size={13} />, text: 'ML-powered screening' },
  { icon: <Brain size={13} />,       text: 'NLP text analysis' },
  { icon: <Zap size={13} />,         text: 'Instant results' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}
    >
      {/* Very subtle background tint — one soft radial, nothing more */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 65% 40%, rgba(79,70,229,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-2xl">

          {/* Badge */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{
              background: '#EEF2FF',
              border: '1px solid #C7D2FE',
              color: '#4F46E5',
            }}
          >
            <ShieldCheck size={12} strokeWidth={2.5} />
            Academic NLP &amp; Machine Learning Project
          </div>

          {/* Headline */}
          <h1
            className="text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl"
            style={{ color: '#0F172A' }}
          >
            Spot fraudulent job{' '}
            <span style={{ color: '#4F46E5' }}>postings</span>{' '}
            before you apply.
          </h1>

          {/* Sub-heading */}
          <p
            className="mt-5 max-w-xl text-[1.0625rem] leading-7"
            style={{ color: '#64748B' }}
          >
            Paste any job advertisement — from a portal, recruitment email, or
            WhatsApp message — and let the AI screen it for fraud indicators in
            seconds.
          </p>

          {/* Feature pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {pills.map(({ icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  color: '#64748B',
                }}
              >
                <span style={{ color: '#4F46E5' }}>{icon}</span>
                {text}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#analyzer"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-colors"
              style={{ background: '#4F46E5', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#4338CA')}
              onMouseLeave={e => (e.currentTarget.style.background = '#4F46E5')}
            >
              Analyze a job posting <ArrowRight size={15} />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                color: '#334155',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#CBD5E1'
                e.currentTarget.style.background = '#F8FAFC'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#E2E8F0'
                e.currentTarget.style.background = '#FFFFFF'
              }}
            >
              How it works
            </a>
          </div>

          <p className="mt-5 text-xs" style={{ color: '#94A3B8' }}>
            Results are screening indicators only — always verify employers independently.
          </p>
        </div>
      </div>
    </section>
  )
}
