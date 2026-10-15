import { useState } from 'react'
import {
  ShieldCheck, ShieldAlert, AlertTriangle,
  ChevronDown, ChevronUp, RotateCcw, ArrowRight, CheckCircle2,
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

/* ── Next-steps list ─────────────────────────────────────────────────── */
function NextSteps({ fraudulent }) {
  const steps = fraudulent ? FRAUD_STEPS : GENUINE_STEPS
  return (
    <ol className="space-y-2.5">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3 text-sm">
          <span
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold"
            style={{
              background: fraudulent ? '#FECACA' : '#ECFDF5',
              color:      fraudulent ? '#7F1D1D' : '#065F46',
            }}
          >
            {i + 1}
          </span>
          <span style={{ color: fraudulent ? '#7F1D1D' : '#334155' }}>{step}</span>
        </li>
      ))}
    </ol>
  )
}

/* ── Collapsible submitted text ─────────────────────────────────────── */
function SubmittedText({ jobText }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold transition-colors"
        style={{ color: '#334155', background: 'transparent' }}
        onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <span>View submitted text</span>
        {open
          ? <ChevronUp size={15} style={{ color: '#94A3B8' }} />
          : <ChevronDown size={15} style={{ color: '#94A3B8' }} />}
      </button>
      {open && (
        <div style={{ borderTop: '1px solid #E2E8F0', padding: '12px 16px' }}>
          <pre
            className="max-h-48 overflow-y-auto whitespace-pre-wrap font-sans text-xs leading-6"
            style={{ color: '#64748B' }}
          >
            {jobText}
          </pre>
        </div>
      )}
    </div>
  )
}

/* ── Main component ─────────────────────────────────────────────────── */
export default function ResultsPanel({ result, jobText, onReset }) {
  const fraudulent = result.prediction === 1

  const verdictBg     = fraudulent ? '#FEF2F2'  : '#ECFDF5'
  const verdictBorder = fraudulent ? '#FECACA'  : '#A7F3D0'
  const verdictIcon   = fraudulent ? '#DC2626'  : '#10B981'
  const verdictIconBg = fraudulent ? '#FEE2E2'  : '#D1FAE5'
  const verdictLabel  = fraudulent ? '#DC2626'  : '#10B981'
  const verdictTitle  = fraudulent ? '#7F1D1D'  : '#065F46'
  const verdictBody   = fraudulent ? '#991B1B'  : '#064E3B'
  const tagBg         = fraudulent ? '#FEE2E2'  : '#D1FAE5'
  const tagBorder     = fraudulent ? '#FECACA'  : '#A7F3D0'
  const tagText       = fraudulent ? '#7F1D1D'  : '#065F46'
  const noticeBg      = fraudulent ? '#FEE2E2'  : '#D1FAE5'
  const noticeBorder  = fraudulent ? '#FECACA'  : '#A7F3D0'
  const noticeText    = fraudulent ? '#7F1D1D'  : '#065F46'

  return (
    <div className="space-y-4 animate-slide-up">

      {/* ── Verdict card ── */}
      <div
        className="overflow-hidden rounded-xl"
        style={{ background: verdictBg, border: `1px solid ${verdictBorder}` }}
      >
        <div className="px-6 py-5">

          {/* Icon + label row */}
          <div className="flex items-start gap-4">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
              style={{ background: verdictIconBg, color: verdictIcon }}
            >
              {fraudulent
                ? <ShieldAlert size={24} strokeWidth={2} />
                : <ShieldCheck size={24} strokeWidth={2} />}
            </div>
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-widest"
                style={{ color: verdictLabel }}
              >
                {fraudulent ? 'Warning indicator' : 'Positive indicator'}
              </p>
              <h3
                className="mt-0.5 text-xl font-extrabold leading-tight"
                style={{ color: verdictTitle }}
              >
                {result.label}
              </h3>
            </div>
          </div>

          {/* Explanation */}
          <p
            className="mt-4 text-sm leading-6"
            style={{ color: verdictBody }}
          >
            {fraudulent
              ? 'The ML classifier flagged this posting as potentially fraudulent based on patterns in the text. This is an automated screening result — review the safety checks and guidance below before taking any action.'
              : 'The ML classifier found patterns consistent with genuine job postings. This does not guarantee legitimacy — use the guidance below to verify the employer independently.'}
          </p>

          {/* Model output tag */}
          <div
            className="mt-4 inline-flex items-center gap-2 rounded-md px-3 py-1.5"
            style={{
              background: tagBg,
              border: `1px solid ${tagBorder}`,
              color: tagText,
            }}
          >
            <span className="text-xs font-semibold">Model output:</span>
            <code className="font-mono text-xs">
              prediction = {result.prediction} — {result.label}
            </code>
          </div>
        </div>

        {/* Notice strip */}
        <div
          className="flex gap-2.5 px-6 py-3"
          style={{
            background: noticeBg,
            borderTop: `1px solid ${noticeBorder}`,
          }}
        >
          <AlertTriangle size={13} className="mt-0.5 shrink-0" style={{ color: verdictIcon }} />
          <p className="text-xs leading-5" style={{ color: noticeText }}>
            {result.notice}
          </p>
        </div>
      </div>

      {/* ── Safety checks ── */}
      <SafetyChecks jobText={jobText} />

      {/* ── Guidance ── */}
      <div className="card px-6 py-5 animate-slide-up">
        <div className="mb-4 flex items-center gap-2">
          <CheckCircle2 size={17} style={{ color: '#4F46E5' }} />
          <h3 className="text-sm font-bold" style={{ color: '#0F172A' }}>
            {fraudulent ? 'What to do now' : 'Still worth verifying'}
          </h3>
        </div>
        <NextSteps fraudulent={fraudulent} />
      </div>

      {/* ── Submitted text + reset ── */}
      <div className="card space-y-4 px-6 py-5 animate-slide-up">
        <SubmittedText jobText={jobText} />
        <button
          type="button"
          onClick={onReset}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition-colors"
          style={{
            background: '#EEF2FF',
            border: '1px solid #C7D2FE',
            color: '#4F46E5',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#E0E7FF')}
          onMouseLeave={e => (e.currentTarget.style.background = '#EEF2FF')}
        >
          <RotateCcw size={15} />
          Analyze another job posting
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
