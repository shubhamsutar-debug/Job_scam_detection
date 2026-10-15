import { ArrowRight, ShieldCheck, Zap, Brain } from 'lucide-react'

const pills = [
  { icon: <ShieldCheck size={13} />, text: 'ML-powered screening' },
  { icon: <Brain size={13} />,       text: 'NLP text analysis' },
  { icon: <Zap size={13} />,         text: 'Instant results' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white border-b border-slate-100"
    >
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 70% 50%, rgba(99,102,241,0.07) 0%, transparent 60%), ' +
            'radial-gradient(circle at 20% 80%, rgba(139,92,246,0.05) 0%, transparent 50%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">

          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
            <ShieldCheck size={13} />
            Academic NLP &amp; Machine Learning Project
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
            Spot fraudulent job{' '}
            <span className="text-indigo-600">postings</span>{' '}
            before you apply.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
            Paste any job advertisement — from a job portal, email, or
            WhatsApp message — and let the AI screen it for signs of fraud in
            seconds.
          </p>

          {/* Feature pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {pills.map(({ icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                <span className="text-indigo-500">{icon}</span>
                {text}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#analyzer"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700 focus-visible:outline-indigo-600"
            >
              Analyze a job posting <ArrowRight size={16} />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              How it works
            </a>
          </div>

          <p className="mt-5 text-xs text-slate-400">
            Results are screening indicators only — always verify independently.
          </p>
        </div>
      </div>
    </section>
  )
}
