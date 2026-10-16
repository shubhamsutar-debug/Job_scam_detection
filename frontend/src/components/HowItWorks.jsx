import { ClipboardPaste, ScanSearch, ShieldCheck, ArrowRight } from 'lucide-react'

const steps = [
  {
    n: 1,
    icon: <ClipboardPaste size={24} />,
    title: 'Paste the Job',
    desc: 'Submit the complete job advertisement in a single text box.',
  },
  {
    n: 2,
    icon: <ScanSearch size={24} />,
    title: 'AI Analysis',
    desc: 'Our AI model analyzes the text using machine learning.',
  },
  {
    n: 3,
    icon: <ShieldCheck size={24} />,
    title: 'Review Guidance',
    desc: 'Get the prediction and important safety recommendations.',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="scroll-mt-20"
      style={{ background: '#FFFFFF', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 800,
              color: '#111827',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            How It Works
          </h2>
          <p style={{ marginTop: 10, fontSize: 15, color: '#6B7280', maxWidth: 400, margin: '10px auto 0' }}>
            Analyze any job advertisement in three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 0,
            flexWrap: 'wrap',
            position: 'relative',
          }}
        >
          {steps.map(({ n, icon, title, desc }, i) => (
            <div
              key={n}
              style={{ display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}
            >
              {/* Step card */}
              <div
                className="slide-up"
                style={{
                  width: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '0 12px',
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                {/* Number badge */}
                <div
                  style={{
                    width: 44, height: 44,
                    borderRadius: '50%',
                    background: '#4F46E5',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 14,
                    boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
                    flexShrink: 0,
                  }}
                >
                  {n}
                </div>

                {/* Icon box */}
                <div
                  style={{
                    width: 56, height: 56,
                    borderRadius: 14,
                    background: '#EEF2FF',
                    border: '1.5px solid #C7D2FE',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#4F46E5',
                    marginBottom: 14,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.08)'
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(79,70,229,0.2)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {icon}
                </div>

                <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 6px' }}>
                  {title}
                </p>
                <p style={{ fontSize: 12.5, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                  {desc}
                </p>
              </div>

              {/* Arrow connector */}
              {i < steps.length - 1 && (
                <div
                  style={{
                    paddingTop: 20,
                    color: '#D1D5DB',
                    flexShrink: 0,
                  }}
                >
                  <ArrowRight size={20} />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
