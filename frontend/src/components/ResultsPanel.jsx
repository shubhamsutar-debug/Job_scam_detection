import { useState } from 'react'
import { ShieldCheck, ShieldAlert, AlertTriangle, ChevronDown, ChevronUp, RotateCcw, Home } from 'lucide-react'
import SafetyChecks from './SafetyChecks'

const GENUINE_STEPS = [
  'Verify the company exists via its official website — not via a link in the ad.',
  "Confirm the job appears on the company's official careers page.",
  'Research the employer on LinkedIn and professional networks.',
  'Never pay any fee or share sensitive info before a verified written offer.',
]

const FRAUD_STEPS = [
  'Do not pay any registration, training, or starter-kit fee — legitimate employers never charge candidates.',
  'Do not share bank details, Aadhaar, ID scans, or OTPs with this contact.',
  'Report the posting to the platform where you found it.',
  'If you already shared sensitive info, contact your bank and relevant authorities immediately.',
]

function SubmittedText({ jobText }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ marginTop: 16 }}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 12, fontWeight: 600, color: '#6B7280',
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 0, transition: 'color 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#4F46E5')}
        onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
      >
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {open ? 'Hide' : 'View'} submitted text
      </button>
      {open && (
        <div
          className="slide-up"
          style={{
            marginTop: 8, padding: '12px 14px',
            background: '#F9FAFB', border: '1px solid #E5E7EB',
            borderRadius: 8,
          }}
        >
          <pre
            style={{
              maxHeight: 180, overflow: 'auto',
              whiteSpace: 'pre-wrap', fontSize: 12,
              color: '#6B7280', fontFamily: 'Inter, sans-serif',
              margin: 0, lineHeight: 1.6,
            }}
          >
            {jobText}
          </pre>
        </div>
      )}
    </div>
  )
}

export default function ResultsPanel({ result, jobText, onReset }) {
  const fraudulent = result.prediction === 1

  const accentColor  = fraudulent ? '#DC2626' : '#059669'
  const accentBg     = fraudulent ? '#FEF2F2' : '#ECFDF5'
  const accentBorder = fraudulent ? '#FECACA' : '#A7F3D0'

  return (
    <div className="slide-up">

      {/* ── Prediction Result ── */}
      <div
        style={{
          background: accentBg,
          border: `1px solid ${accentBorder}`,
          borderRadius: 14,
          padding: '20px 22px',
          marginBottom: 16,
        }}
      >
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: accentColor, marginBottom: 10 }}>
          Prediction Result
        </p>

        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Left: verdict */}
          <div style={{ flex: '1 1 220px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div
                style={{
                  width: 44, height: 44,
                  borderRadius: '50%',
                  background: `${accentColor}18`,
                  border: `2px solid ${accentColor}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {fraudulent
                  ? <AlertTriangle size={22} color={accentColor} />
                  : <ShieldCheck size={22} color={accentColor} />}
              </div>
              <h2
                style={{
                  fontSize: 22, fontWeight: 900,
                  color: accentColor,
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                {result.label}
              </h2>
            </div>
            <p style={{ fontSize: 13, color: fraudulent ? '#7F1D1D' : '#065F46', lineHeight: 1.65, margin: 0 }}>
              {fraudulent
                ? 'Our model has flagged this job posting as potentially fraudulent based on the content analysis.'
                : 'Our model indicates this job posting shows patterns consistent with genuine postings.'}
            </p>
          </div>

          {/* Right: Important notice */}
          <div
            style={{
              flex: '0 0 auto', minWidth: 180, maxWidth: 220,
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: 10,
              padding: '12px 14px',
            }}
          >
            <p style={{ fontSize: 12, fontWeight: 700, color: accentColor, margin: '0 0 5px' }}>
              Important
            </p>
            <p style={{ fontSize: 11.5, color: '#6B7280', margin: 0, lineHeight: 1.6 }}>
              This is a model prediction and not a definitive proof. Always verify the employer independently.
            </p>
          </div>
        </div>

        <SubmittedText jobText={jobText} />
      </div>

      {/* ── Safety Indicators ── */}
      <SafetyChecks jobText={jobText} />

      {/* ── Guidance ── */}
      <div
        className="slide-up-delay-3"
        style={{
          marginTop: 16,
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: 14,
          padding: '18px 20px',
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>
          {fraudulent ? 'What to do now' : 'Recommended next steps'}
        </p>
        <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
          {(fraudulent ? FRAUD_STEPS : GENUINE_STEPS).map((step, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13 }}>
              <span
                style={{
                  width: 22, height: 22,
                  borderRadius: '50%',
                  background: fraudulent ? '#FEE2E2' : '#D1FAE5',
                  color: accentColor,
                  fontSize: 11, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 1,
                }}
              >
                {i + 1}
              </span>
              <span style={{ color: '#374151', lineHeight: 1.65 }}>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Action buttons ── */}
      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <button
          type="button"
          onClick={onReset}
          className="btn-ghost"
          style={{ flex: 1, padding: '12px 16px', fontSize: 13.5, borderRadius: 9 }}
        >
          <RotateCcw size={15} />
          Analyze Another Job
        </button>
        <a
          href="#home"
          className="btn-ghost"
          style={{ flex: 1, padding: '12px 16px', fontSize: 13.5, borderRadius: 9, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          <Home size={15} />
          Back to Home
        </a>
      </div>
    </div>
  )
}
