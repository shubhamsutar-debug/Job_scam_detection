import { useState } from 'react'
import {
  ShieldCheck, ShieldAlert, CheckCircle2, AlertTriangle,
  ChevronDown, ChevronUp, RotateCcw, ArrowRight,
} from 'lucide-react'
import SafetyChecks from './SafetyChecks'

const GENUINE_STEPS = [
  'Verify the company exists by searching its official website independently (not via the link in the ad).',
  'Confirm the job appears on the company\'s official careers page.',
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
  const heading = fraudulent
    ? 'What to do now'
    : 'Still worth verifying'

  return (
    <div className={`rounded-xl border p-4 ${fraudulent ? 'border-red-100 bg-red-50' : 'border-slate-100 bg-slate-50'}`}>
      <h4 className={`mb-3 text-xs font-bold uppercase tracking-wider ${fraudulent ? 'text-red-700' : 'text-slate-600'}`}>
        {heading}
      </h4>
      <ol className="space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-2.5 text-sm">
            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold ${fraudulent ? 'bg-red-200 text-red-800' : 'bg-slate-200 text-slate-700'}`}>
              {i + 1}
            </span>
            <span className={fraudulent ? 'text-red-900' : 'text-slate-700'}>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function SubmittedText({ jobText }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-slate-200">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 transition rounded-xl"
      >
        <span>View submitted text</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && (
        <div className="border-t border-slate-100 px-4 py-3">
          <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap text-xs leading-6 text-slate-500 font-sans">
            {jobText}
          </pre>
        </div>
      )}
    </div>
  )
}

export default function ResultsPanel({ result, jobText, onReset }) {
  const fraudulent = result.prediction === 1

  return (
    <div className="animate-slide-up space-y-5">
      {/* Main verdict card */}
      <div className={`rounded-2xl border shadow-sm ${fraudulent ? 'border-red-200 bg-red-50' : 'border-emerald-200 bg-emerald-50'}`}>
        <div className="px-6 py-5">
          {/* Icon + label */}
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm ${fraudulent ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>
              {fraudulent ? <ShieldAlert size={26} /> : <ShieldCheck size={26} />}
            </div>
            <div>
              <p className={`text-xs font-bold uppercase tracking-widest ${fraudulent ? 'text-red-500' : 'text-emerald-600'}`}>
                {fraudulent ? 'Warning indicator' : 'Positive indicator'}
              </p>
              <h3 className={`mt-0.5 text-2xl font-extrabold ${fraudulent ? 'text-red-800' : 'text-emerald-800'}`}>
                {result.label}
              </h3>
            </div>
          </div>

          {/* Explanation */}
          <p className={`mt-4 text-sm leading-6 ${fraudulent ? 'text-red-800' : 'text-emerald-800'}`}>
            {fraudulent
              ? 'The ML classifier flagged this posting as potentially fraudulent based on patterns in the text. This is an automated screening result — review the safety checks and next steps below before taking any action.'
              : 'The ML classifier found patterns consistent with genuine job postings. This does not guarantee legitimacy — use the guidance below to verify the employer independently.'}
          </p>

          {/* Model output detail */}
          <div className={`mt-4 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-mono ${fraudulent ? 'border-red-200 bg-red-100 text-red-700' : 'border-emerald-200 bg-emerald-100 text-emerald-700'}`}>
            <span className="font-sans font-semibold">Model output:</span>
            prediction = {result.prediction} — {result.label}
          </div>
        </div>

        {/* Notice banner */}
        <div className={`flex gap-2.5 border-t px-6 py-3 ${fraudulent ? 'border-red-200 bg-red-100/60' : 'border-emerald-200 bg-emerald-100/60'}`}>
          <AlertTriangle size={14} className={`mt-0.5 shrink-0 ${fraudulent ? 'text-red-500' : 'text-emerald-600'}`} />
          <p className={`text-xs leading-5 ${fraudulent ? 'text-red-700' : 'text-emerald-700'}`}>
            {result.notice}
          </p>
        </div>
      </div>

      {/* Safety checks */}
      <SafetyChecks jobText={jobText} />

      {/* Next steps */}
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm animate-slide-up">
        <h3 className="mb-4 font-extrabold text-slate-900">Guidance</h3>
        <NextSteps fraudulent={fraudulent} />
      </div>

      {/* Submitted text collapsible + analyze another */}
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm space-y-4 animate-slide-up">
        <SubmittedText jobText={jobText} />

        <button
          type="button"
          onClick={onReset}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-100 focus-visible:outline-indigo-600"
        >
          <RotateCcw size={16} />
          Analyze another job posting
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}
