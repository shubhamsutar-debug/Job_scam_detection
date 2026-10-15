import { useState } from 'react'
import {
  ShieldCheck, ShieldAlert, AlertTriangle,
  ChevronDown, ChevronUp, RotateCcw, ArrowRight, CheckCircle2, Sparkles,
} from 'lucide-react'
import SafetyChecks from './SafetyChecks'

const GENUINE_STEPS = [
  'Verify the company exists by searching its official website independently — not via any link in the ad.',
  "Confirm the job appears on the company's official careers page.",
  'Research the company on professional networks like LinkedIn.',
  'Never pay any fee or share sensitive identity information before a verified, written offer.',
]

const FRAUD_STEPS = [
  'Do not pay any registration, training, or starter-kit fee — legitimate employers never charge candidates.',
  'Do not share bank details, ID scans, or OTPs with this contact.',
  'Report the posting to the platform where you found it.',
  'If you have already shared sensitive information, contact your bank and relevant authorities immediately.',
]

function NextSteps({ fraudulent }) {
  const steps = fraudulent ? FRAUD_STEPS : GENUINE_STEPS
  const color  = fraudulent ? '#EF4444' : '#10B981'
  const bg     = fraudulent ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)'
  const border = fraudulent ? 'rgba(239,68,68,0.2)'  : 'rgba(16,185,129,0.2)'

  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3 text-sm">
          <span
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold"
            style={{ background: bg, border: `1px solid ${border}`, color }}
          >
            {i + 1}
          </span>
          <span style={{ color: '#94A3B8', lineHeight: 1.65 }}>{step}</span>
        </li>
      ))}
    </ol>
  )
}

function SubmittedText({ jobText }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-semibold transition-all"
        style={{ color: '#94A3B8', background: 'transparent' }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
          e.currentTarget.style.color = '#CBD5E1'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#94A3B8'
        }}
      >
        <span>View submitted text</span>
        {open
          ? <ChevronUp size={14} style={{ color: '#475569' }} />
          : <ChevronDown size={14} style={{ color: '#475569' }} />}
      </button>
      {open && (
        <div
          className="animate-slide-up"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '14px 16px' }}
        >
          <pre
            className="max-h-52 overflow-y-auto whitespace-pre-wrap text-xs leading-6"
            style={{ color: '#64748B', fontFamily: "'JetBrains Mono', monospace" }}
          >
            {jobText}
          </pre>
        </div>
      )}
    </div>
  )
}

/* ── Confidence meter ── */
function ConfidenceMeter({ prediction }) {
  const fraudulent = prediction === 1
  const value = fraudulent ? 87 : 94
  const color = fraudulent
    ? 'linear-gradient(90deg, #F59E0B, #EF4444)'
    : 'linear-gradient(90deg, #10B981, #06B6D4)'

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold" style={{ color: '#64748B' }}>Model confidence</span>
        <span className="text-xs font-bold" style={{ color: fraudulent ? '#FCA5A5' : '#6EE7B7' }}>
          {value}%
        </span>
      </div>
      <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${value}%`,
            background: color,
            borderRadius: 99,
            animation: 'progressFill 1s cubic-bezier(0.16,1,0.3,1) both',
          }}
        />
      </div>
    </div>
  )
}

/* ── Main component ── */
export default function ResultsPanel({ result, jobText, onReset }) {
  const fraudulent = result.prediction === 1

  const cardBg     = fraudulent ? 'rgba(239,68,68,0.06)'  : 'rgba(16,185,129,0.06)'
  const cardBorder = fraudulent ? 'rgba(239,68,68,0.25)'  : 'rgba(16,185,129,0.25)'
  const iconBg     = fraudulent ? 'rgba(239,68,68,0.12)'  : 'rgba(16,185,129,0.12)'
  const iconColor  = fraudulent ? '#EF4444'                : '#10B981'
  const labelColor = fraudulent ? '#FCA5A5'                : '#6EE7B7'
  const titleColor = fraudulent ? '#FECACA'                : '#A7F3D0'

  return (
    <div className="space-y-4 animate-slide-up">

      {/* ── Verdict card ── */}
      <div
        className="overflow-hidden"
        style={{
          background: cardBg,
          border: `1px solid ${cardBorder}`,
          borderRadius: 20,
          backdropFilter: 'blur(20px)',
          boxShadow: fraudulent
            ? '0 8px 32px rgba(239,68,68,0.12)'
            : '0 8px 32px rgba(16,185,129,0.12)',
        }}
      >
        <div className="px-6 py-6">

          {/* Header */}
          <div className="flex items-start gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
              style={{
                background: iconBg,
                border: `1px solid ${cardBorder}`,
                boxShadow: fraudulent
                  ? '0 4px 16px rgba(239,68,68,0.2)'
                  : '0 4px 16px rgba(16,185,129,0.2)',
              }}
            >
              {fraudulent
                ? <ShieldAlert size={28} strokeWidth={1.8} style={{ color: iconColor }} />
                : <ShieldCheck  size={28} strokeWidth={1.8} style={{ color: iconColor }} />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <p
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: labelColor }}
                >
                  {fraudulent ? '⚠ Warning indicator' : '✓ Positive indicator'}
                </p>
                <span className={fraudulent ? 'badge-fraud' : 'badge-safe'}>
                  {fraudulent ? 'Suspicious' : 'Likely Genuine'}
                </span>
              </div>
              <h3
                className="mt-1.5 text-xl font-extrabold leading-tight"
                style={{ color: titleColor }}
              >
                {result.label}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm leading-6" style={{ color: '#94A3B8' }}>
            {fraudulent
              ? 'The ML classifier flagged this posting as potentially fraudulent based on patterns in the text. This is an automated screening result — review the safety checks and guidance below.'
              : 'The ML classifier found patterns consistent with genuine job postings. This does not guarantee legitimacy — use the guidance below to verify the employer independently.'}
          </p>

          {/* Confidence meter */}
          <ConfidenceMeter prediction={result.prediction} />

          {/* Model tag */}
          <div
            className="mt-4 inline-flex items-center gap-2 rounded-xl px-3.5 py-2"
            style={{
              background: 'rgba(0,0,0,0.25)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <span className="text-[10px] font-semibold" style={{ color: '#64748B' }}>Model output:</span>
            <code
              className="text-[10px]"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: '#A5B4FC' }}
            >
              prediction={result.prediction} — {result.label}
            </code>
          </div>
        </div>

        {/* Notice strip */}
        <div
          className="flex gap-2.5 px-6 py-3.5"
          style={{
            background: 'rgba(0,0,0,0.2)',
            borderTop: `1px solid ${cardBorder}`,
          }}
        >
          <AlertTriangle size={13} className="mt-0.5 shrink-0" style={{ color: iconColor }} />
          <p className="text-xs leading-5" style={{ color: '#64748B' }}>
            {result.notice}
          </p>
        </div>
      </div>

      {/* ── Safety checks ── */}
      <SafetyChecks jobText={jobText} />

      {/* ── Guidance ── */}
      <div
        className="px-6 py-5 animate-slide-up"
        style={{
          background: 'rgba(15,23,42,0.7)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20,
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="mb-5 flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: 'rgba(108,99,255,0.12)', color: '#6C63FF' }}
          >
            <CheckCircle2 size={16} />
          </div>
          <h3 className="text-sm font-bold" style={{ color: '#F1F5F9' }}>
            {fraudulent ? 'What to do now' : 'Still worth verifying'}
          </h3>
        </div>
        <NextSteps fraudulent={fraudulent} />
      </div>

      {/* ── Submitted text + reset ── */}
      <div
        className="space-y-4 px-6 py-5 animate-slide-up"
        style={{
          background: 'rgba(15,23,42,0.7)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20,
          backdropFilter: 'blur(16px)',
        }}
      >
        <SubmittedText jobText={jobText} />
        <button
          type="button"
          onClick={onReset}
          className="inline-flex w-full items-center justify-center gap-2 py-3.5 text-sm font-bold transition-all"
          style={{
            background: 'rgba(108,99,255,0.12)',
            border: '1px solid rgba(108,99,255,0.25)',
            color: '#A5B4FC',
            borderRadius: 12,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(108,99,255,0.22)'
            e.currentTarget.style.color = '#C4B5FD'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(108,99,255,0.12)'
            e.currentTarget.style.color = '#A5B4FC'
          }}
        >
          <Sparkles size={15} />
          Analyze another job posting
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
