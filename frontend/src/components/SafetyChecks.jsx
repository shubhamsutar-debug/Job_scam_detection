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
    <div
      className="overflow-hidden animate-slide-up"
      style={{
        background: 'rgba(15,23,42,0.7)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-6 py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: hasFlags ? 'rgba(245,158,11,0.12)' : 'rgba(16,185,129,0.12)',
            border:     hasFlags ? '1px solid rgba(245,158,11,0.25)' : '1px solid rgba(16,185,129,0.25)',
          }}
        >
          {hasFlags
            ? <ShieldAlert size={18} style={{ color: '#F59E0B' }} />
            : <ShieldCheck size={18} style={{ color: '#10B981' }} />}
        </div>
        <div>
          <h3 className="text-sm font-bold" style={{ color: '#F1F5F9' }}>
            Safety Checks
          </h3>
          <p className="text-[11px]" style={{ color: '#475569' }}>
            Rule-based keyword analysis — independent of the ML model
          </p>
        </div>
        {hasFlags && (
          <div
            className="ml-auto rounded-full px-2.5 py-1 text-[10px] font-bold"
            style={{
              background: 'rgba(245,158,11,0.12)',
              border: '1px solid rgba(245,158,11,0.3)',
              color: '#FCD34D',
            }}
          >
            {flags.length} flag{flags.length > 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="px-6 py-5">

        {/* Methodology note */}
        <div
          className="mb-4 flex gap-2.5 rounded-xl px-4 py-3"
          style={{
            background: 'rgba(6,182,212,0.06)',
            border: '1px solid rgba(6,182,212,0.2)',
          }}
        >
          <Info size={14} className="mt-0.5 shrink-0" style={{ color: '#06B6D4' }} />
          <p className="text-xs leading-5" style={{ color: '#67E8F9' }}>
            These checks scan for specific phrases associated with job fraud. They are{' '}
            <strong style={{ color: '#22D3EE' }}>separate from</strong> the ML prediction above. A flag here does not
            prove fraud — it highlights text worth investigating further.
          </p>
        </div>

        {hasFlags ? (
          <ul className="space-y-2.5">
            {flags.map(flag => (
              <li
                key={flag.id}
                className="flex gap-3 rounded-xl px-4 py-3.5 animate-slide-up"
                style={{
                  background: 'rgba(245,158,11,0.07)',
                  border: '1px solid rgba(245,158,11,0.2)',
                }}
              >
                <ShieldAlert
                  size={16}
                  className="mt-0.5 shrink-0"
                  style={{ color: '#F59E0B' }}
                />
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#FCD34D' }}>
                    {flag.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-5" style={{ color: '#78350F', color: '#D97706' }}>
                    {flag.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="flex gap-3 rounded-xl px-4 py-3.5"
            style={{
              background: 'rgba(16,185,129,0.07)',
              border: '1px solid rgba(16,185,129,0.2)',
            }}
          >
            <ShieldCheck size={16} className="mt-0.5 shrink-0" style={{ color: '#10B981' }} />
            <p className="text-sm" style={{ color: '#6EE7B7' }}>
              No specific red-flag phrases were detected. Continue to verify the employer
              through official channels.
            </p>
          </div>
        )}

        <p className="mt-4 text-[11px] leading-5" style={{ color: '#334155' }}>
          These checks cover common fraud patterns but are not exhaustive. Absence of flags does not confirm a posting is genuine.
        </p>
      </div>
    </div>
  )
}
