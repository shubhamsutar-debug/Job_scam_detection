import { ArrowRight, ShieldCheck, Lock, Users } from 'lucide-react'

const features = [
  { icon: <ShieldCheck size={16} />, text: 'Detect suspicious job postings' },
  { icon: <Lock size={16} />,        text: 'Protect your personal information' },
  { icon: <Users size={16} />,       text: 'Make informed career decisions' },
]

/* Small mock card shown in the illustration */
function MockCard({ label, color, icon, style }) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: `2px solid ${color}30`,
        borderRadius: 12,
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        minWidth: 140,
        ...style,
      }}
    >
      <div
        style={{
          width: 28, height: 28,
          borderRadius: '50%',
          background: `${color}15`,
          border: `1.5px solid ${color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          fontSize: 13,
          color,
        }}
      >
        {icon}
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: color === '#059669' ? '#065F46' : '#7F1D1D' }}>
        {label}
      </span>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* ── Left: copy ── */}
          <div className="fade-in">
            {/* Badge */}
            <div className="mb-6 inline-block">
              <span className="pill-label">AI-Powered Job Safety</span>
            </div>

            {/* Headline — matches image exactly */}
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 900,
                lineHeight: 1.12,
                letterSpacing: '-0.03em',
                color: '#111827',
                margin: 0,
              }}
            >
              Know the Risk<br />
              Before{' '}
              <span style={{ color: '#4F46E5' }}>You Apply.</span>
            </h1>

            <p
              style={{
                marginTop: 20,
                fontSize: 15,
                lineHeight: 1.75,
                color: '#6B7280',
                maxWidth: 460,
              }}
            >
              Analyze job advertisements using AI and identify potentially
              fraudulent postings. Stay safe from recruitment scams and make
              smarter career decisions.
            </p>

            {/* CTA buttons */}
            <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="#analyzer"
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: 15, borderRadius: 9, textDecoration: 'none' }}
              >
                Analyze a Job
                <ArrowRight size={16} />
              </a>
              <a
                href="#how"
                className="btn-ghost"
                style={{ padding: '12px 24px', fontSize: 15, borderRadius: 9, textDecoration: 'none' }}
              >
                How It Works
              </a>
            </div>

            {/* Feature list */}
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {features.map(({ icon, text }) => (
                <div
                  key={text}
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <div
                    style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: '#EEF2FF',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#4F46E5', flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: illustration ── */}
          <div
            className="hidden lg:flex slide-in-right"
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', width: 420, height: 340 }}>

              {/* Main mock job posting card */}
              <div
                className="float"
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 240,
                  background: '#FFFFFF',
                  border: '1.5px solid #E5E7EB',
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  zIndex: 2,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: '#EEF2FF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <ShieldCheck size={16} color="#4F46E5" />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>Job Posting</span>
                </div>
                {/* Skeleton lines */}
                {[80, 100, 60, 90, 70].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      height: 8,
                      width: `${w}%`,
                      background: i === 0 ? '#E0E7FF' : '#F3F4F6',
                      borderRadius: 4,
                      marginBottom: 7,
                    }}
                  />
                ))}
                {/* Shield watermark */}
                <div style={{
                  position: 'absolute',
                  bottom: 12, right: 12,
                  opacity: 0.06,
                }}>
                  <ShieldCheck size={56} color="#4F46E5" />
                </div>
              </div>

              {/* Genuine badge — top right */}
              <div style={{ position: 'absolute', top: 20, right: 0, zIndex: 3 }}>
                <MockCard
                  label="Likely Genuine"
                  color="#059669"
                  icon={<ShieldCheck size={13} />}
                />
              </div>

              {/* Fraud badge — bottom left */}
              <div style={{ position: 'absolute', bottom: 20, left: 0, zIndex: 3 }}>
                <MockCard
                  label="Potential Fraud"
                  color="#DC2626"
                  icon="⚠"
                />
              </div>

              {/* Magnifier accent */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 30, right: 20,
                  width: 56, height: 56,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(79,70,229,0.4)',
                  zIndex: 3,
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" width={26} height={26}>
                  <circle cx="11" cy="11" r="6" stroke="white" strokeWidth="2.5"/>
                  <path d="M20 20l-3-3" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Decorative dots */}
              {[
                { top: 10, left: 40 },
                { top: 60, right: 20 },
                { bottom: 60, left: 30 },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="pulse-dot"
                  style={{
                    position: 'absolute',
                    width: 8, height: 8,
                    borderRadius: '50%',
                    background: '#C7D2FE',
                    animationDelay: `${i * 0.6}s`,
                    ...pos,
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
