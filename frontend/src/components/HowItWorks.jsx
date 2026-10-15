import { ClipboardPaste, ScanSearch, BookOpenCheck, Cpu, Database, Shield } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: <ClipboardPaste size={22} />,
    title: 'Paste the job posting',
    description:
      'Copy the full text of any job advertisement — title, description, requirements, benefits — and paste it into the text area. No manual field separation needed.',
    color: '#6C63FF',
    colorBg: 'rgba(108,99,255,0.1)',
    colorBorder: 'rgba(108,99,255,0.25)',
  },
  {
    number: '02',
    icon: <ScanSearch size={22} />,
    title: 'AI analysis',
    description:
      'The text is sent to a Python Flask API that transforms it using a TF-IDF vectorizer and runs it through a trained machine learning classifier.',
    color: '#06B6D4',
    colorBg: 'rgba(6,182,212,0.1)',
    colorBorder: 'rgba(6,182,212,0.25)',
  },
  {
    number: '03',
    icon: <BookOpenCheck size={22} />,
    title: 'Review the guidance',
    description:
      'You receive a classification result, rule-based safety checks, and practical next steps to help you make an informed decision.',
    color: '#10B981',
    colorBg: 'rgba(16,185,129,0.1)',
    colorBorder: 'rgba(16,185,129,0.25)',
  },
]

const techCards = [
  {
    icon: <Database size={18} />,
    term: 'TF-IDF',
    full: 'Term Frequency — Inverse Document Frequency',
    description:
      'A classic NLP technique that converts text into a numerical vector by measuring how important each word is within the document compared to the full dataset.',
    color: '#6C63FF',
    colorBg: 'rgba(108,99,255,0.08)',
  },
  {
    icon: <Cpu size={18} />,
    term: 'Classifier',
    full: 'Trained ML Model',
    description:
      'A supervised machine learning model trained on labelled job postings. It learns which language patterns appear more often in fraudulent ads, then applies that to new text.',
    color: '#06B6D4',
    colorBg: 'rgba(6,182,212,0.08)',
  },
  {
    icon: <Shield size={18} />,
    term: 'Safety Checks',
    full: 'Rule-based Keyword Analysis',
    description:
      'A separate, transparent layer that scans for specific red-flag phrases — fee requests, credential demands — independently of the ML model. Both results shown side by side.',
    color: '#10B981',
    colorBg: 'rgba(16,185,129,0.08)',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="scroll-mt-20 py-20 sm:py-24 relative overflow-hidden"
      style={{ background: 'rgba(13, 20, 36, 0.8)' }}
    >
      {/* Background accent */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '10%', right: '-5%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mb-5 flex justify-center">
            <span className="section-label">
              How it works
            </span>
          </div>
          <h2
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            style={{ color: '#F1F5F9' }}
          >
            Three steps to a{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #06B6D4, #10B981)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              safer job search
            </span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-sm leading-7"
            style={{ color: '#64748B' }}
          >
            The system combines a trained text classifier with transparent rule-based checks
            so you always understand why a result was produced.
          </p>
        </div>

        {/* Steps — with connector line */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute top-10 left-0 right-0 hidden md:block"
            style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.3), rgba(6,182,212,0.3), transparent)' }}
          />

          <ol className="grid gap-6 md:grid-cols-3">
            {steps.map(({ number, icon, title, description, color, colorBg, colorBorder }) => (
              <li
                key={number}
                className="relative overflow-hidden transition-all duration-300 group"
                style={{
                  background: 'rgba(15,23,42,0.7)',
                  border: `1px solid ${colorBorder}`,
                  borderRadius: 20,
                  padding: '28px 24px',
                  backdropFilter: 'blur(16px)',
                  boxShadow: `0 4px 24px rgba(0,0,0,0.3)`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${colorBorder}`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'
                }}
              >
                {/* Number watermark */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute', top: 16, right: 20,
                    fontSize: 64, fontWeight: 900, lineHeight: 1,
                    color: `${color}10`,
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    userSelect: 'none',
                  }}
                >
                  {number}
                </span>

                <div className="mb-5 flex items-center gap-3 relative">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background: colorBg,
                      border: `1px solid ${colorBorder}`,
                      color,
                      boxShadow: `0 4px 12px ${color}25`,
                    }}
                  >
                    {icon}
                  </div>
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-extrabold"
                    style={{ background: colorBg, border: `1px solid ${colorBorder}`, color }}
                  >
                    {number}
                  </div>
                </div>

                <h3 className="font-bold text-base" style={{ color: '#F1F5F9' }}>
                  {title}
                </h3>
                <p className="mt-2.5 text-sm leading-6" style={{ color: '#64748B' }}>
                  {description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Technology explainer */}
        <div className="mt-16">
          <h3
            className="mb-8 text-center text-lg font-bold"
            style={{ color: '#94A3B8' }}
          >
            Understanding the technology
          </h3>
          <div className="grid gap-5 sm:grid-cols-3">
            {techCards.map(({ icon, term, full, description, color, colorBg }) => (
              <div
                key={term}
                className="transition-all duration-300"
                style={{
                  background: 'rgba(15,23,42,0.6)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16,
                  padding: '20px',
                  backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${color}30`
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ background: colorBg, color }}
                  >
                    {icon}
                  </div>
                  <div
                    className="rounded-lg px-3 py-1 text-[11px] font-bold"
                    style={{ background: colorBg, color, border: `1px solid ${color}25` }}
                  >
                    {term}
                  </div>
                </div>
                <p className="text-[11px] font-semibold mb-2" style={{ color: '#475569' }}>
                  {full}
                </p>
                <p className="text-sm leading-6" style={{ color: '#64748B' }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
