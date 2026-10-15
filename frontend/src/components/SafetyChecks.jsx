import { ShieldAlert, ShieldCheck, Info } from 'lucide-react'

const RULES = [
  {
    id: 'fee',
    label: 'Upfront payment or registration fee',
    description:
      'Legitimate employers never ask candidates to pay to apply, register, or receive a starter kit.',
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
    description:
      'Sharing sensitive credentials, OTPs, or ID scans before a verified offer is a major fraud risk.',
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
    description:
      'Promises of very high weekly pay with no stated experience or skill requirements are a common fraud pattern.',
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
    description:
      'Using only WhatsApp, personal email addresses, or no traceable contact information can indicate a fraudulent posting.',
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
  return RULES.filter(r => r.patterns.some(p => p.test(text)))
}

export default function SafetyChecks({ jobText }) {
  const flags    = runChecks(jobText)
  const hasFlags = flags.length > 0

  return (
    <div className="card overflow-hidden animate-slide-up">

      {/* Header */}
      <div
        className="flex items-center gap-3 px-6 py-4"
        style={{ borderBottom: '1px solid #E2E8F0' }}
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={{
            background: hasFlags ? '#FEF2F2' : '#ECFDF5',
            color:      hasFlags ? '#DC2626' : '#10B981',
          }}
        >
          {hasFlags ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
        </div>
        <div>
          <h3 className="text-sm font-bold" style={{ color: '#0F172A' }}>
            Safety Checks
          </h3>
          <p className="text-xs" style={{ color: '#94A3B8' }}>
            Rule-based keyword analysis — independent of the ML model
          </p>
        </div>
      </div>

      <div className="px-6 py-5">

        {/* Methodology note */}
        <div
          className="mb-4 flex gap-2.5 rounded-lg px-4 py-3"
          style={{
            background: '#EFF6FF',
            border: '1px solid #BFDBFE',
          }}
        >
          <Info size={14} className="mt-0.5 shrink-0" style={{ color: '#3B82F6' }} />
          <p className="text-xs leading-5" style={{ color: '#1E40AF' }}>
            These checks scan for specific phrases associated with job fraud. They are{' '}
            <strong>separate from</strong> the ML prediction above. A flag here does not
            prove fraud — it highlights text worth investigating further.
          </p>
        </div>

        {hasFlags ? (
          <ul className="space-y-2.5">
            {flags.map(flag => (
              <li
                key={flag.id}
                className="flex gap-3 rounded-lg px-4 py-3"
                style={{
                  background: '#FFFBEB',
                  border: '1px solid #FDE68A',
                }}
              >
                <ShieldAlert
                  size={16}
                  className="mt-0.5 shrink-0"
                  style={{ color: '#D97706' }}
                />
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#78350F' }}>
                    {flag.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-5" style={{ color: '#92400E' }}>
                    {flag.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="flex gap-3 rounded-lg px-4 py-3"
            style={{
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
            }}
          >
            <ShieldCheck size={16} className="mt-0.5 shrink-0" style={{ color: '#10B981' }} />
            <p className="text-sm" style={{ color: '#065F46' }}>
              No specific red-flag phrases were detected. Continue to verify the employer
              through official channels.
            </p>
          </div>
        )}

        <p className="mt-4 text-xs leading-5" style={{ color: '#94A3B8' }}>
          These checks cover common fraud patterns but are not exhaustive. Absence of
          flags does not confirm a posting is genuine.
        </p>
      </div>
    </div>
  )
}
