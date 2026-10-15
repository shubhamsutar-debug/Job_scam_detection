import { ShieldAlert, ShieldCheck, Info } from 'lucide-react'

/**
 * Rule-based safety checks — completely independent of the ML model.
 * Each rule describes what it looks for and why it matters.
 * Only flags that are actually found in the submitted text are shown.
 */
const RULES = [
  {
    id: 'fee',
    label: 'Upfront payment or registration fee',
    description: 'Legitimate employers never ask candidates to pay to apply, register, or receive a starter kit.',
    patterns: [
      /registration fee/i,
      /starter kit fee/i,
      /pay(ment)? (to|before) (apply|start|register)/i,
      /upfront (fee|cost|payment)/i,
      /deposit required/i,
      /training fee/i,
      /\$\d+.*fee/i,
      /fee of \$/i,
    ],
  },
  {
    id: 'credentials',
    label: 'Request for bank details, OTPs, or identity documents',
    description: 'Sharing sensitive credentials, OTPs, or ID scans before a verified offer is a major fraud risk.',
    patterns: [
      /bank (account|details|number|credentials)/i,
      /otp/i,
      /one[\s-]time (password|pin|code)/i,
      /national id/i,
      /id (scan|copy|photo)/i,
      /passport (scan|copy|photo|number)/i,
      /social security/i,
      /ssn\b/i,
      /send.{0,30}(passport|id card|bank)/i,
    ],
  },
  {
    id: 'earnings',
    label: 'Unrealistic earnings guarantee',
    description: 'Promises of very high weekly pay with no stated experience or skill requirements are a common fraud pattern.',
    patterns: [
      /earn(ing)? up to \$[\d,]+\s*(per|a)\s*week/i,
      /make.{0,20}\$[\d,]+.{0,20}(day|week|month)/i,
      /guaranteed.{0,30}income/i,
      /unlimited earning/i,
      /passive income/i,
      /\$[\d,]+ (daily|weekly|per day|per week) (guarantee|guaranteed)/i,
      /no experience.{0,40}(earn|salary|\$[\d,]+)/i,
      /work from home.{0,30}\$[\d,]+/i,
    ],
  },
  {
    id: 'contact',
    label: 'Unverifiable or informal contact channel only',
    description: 'Using only WhatsApp, personal email addresses, or no traceable contact information can indicate a fraudulent posting.',
    patterns: [
      /whatsapp\s*[:\+\d]/i,
      /contact us on whatsapp/i,
      /gmail\.com|yahoo\.com|hotmail\.com|outlook\.com/i,
      /telegram\s*[:@]/i,
      /no website/i,
    ],
  },
]

function runChecks(text) {
  return RULES.filter(rule =>
    rule.patterns.some(pattern => pattern.test(text))
  )
}

export default function SafetyChecks({ jobText }) {
  const flags = runChecks(jobText)
  const hasFlags = flags.length > 0

  return (
    <div className="animate-slide-up rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${hasFlags ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {hasFlags ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
        </div>
        <div>
          <h3 className="font-extrabold text-slate-900">Safety Checks</h3>
          <p className="text-xs text-slate-400">Rule-based keyword analysis — independent of the ML model</p>
        </div>
      </div>

      <div className="px-6 py-5">
        {/* Methodology note */}
        <div className="mb-4 flex gap-2.5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
          <Info size={15} className="mt-0.5 shrink-0 text-blue-500" />
          <p className="text-xs leading-5 text-blue-700">
            These checks scan for specific phrases associated with job fraud. They are{' '}
            <strong>separate from</strong> the ML prediction above. A flag here does not
            prove fraud — it highlights text worth investigating further.
          </p>
        </div>

        {hasFlags ? (
          <ul className="space-y-3">
            {flags.map(flag => (
              <li
                key={flag.id}
                className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3"
              >
                <ShieldAlert size={17} className="mt-0.5 shrink-0 text-amber-600" />
                <div>
                  <p className="text-sm font-bold text-amber-900">{flag.label}</p>
                  <p className="mt-0.5 text-xs leading-5 text-amber-800">{flag.description}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
            <ShieldCheck size={17} className="mt-0.5 shrink-0 text-emerald-600" />
            <p className="text-sm text-emerald-800">
              No specific red-flag phrases were detected. Continue to verify the employer through official channels.
            </p>
          </div>
        )}

        <p className="mt-4 text-xs leading-5 text-slate-400">
          These checks cover common fraud patterns but are not exhaustive. Absence of flags does not confirm a posting is genuine.
        </p>
      </div>
    </div>
  )
}
