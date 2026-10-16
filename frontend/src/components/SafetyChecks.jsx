import { ShieldAlert, ShieldCheck, Info } from 'lucide-react'

const RULES = [
  {
    id: 'fee',
    label: 'Requests for upfront payment',
    shortDesc: 'The posting mentions a registration fee.',
    description: 'Legitimate employers never ask candidates to pay to apply or register.',
    icon: '🚫',
    color: '#DC2626', bg: '#FEF2F2', border: '#FECACA',
    patterns: [
      /registration fee/i, /starter kit fee/i,
      /pay(ment)? (to|before) (apply|start|register)/i,
      /upfront (fee|cost|payment)/i, /deposit required/i,
      /training fee/i, /\$\d+.*fee/i, /fee of \$/i,
      /₹\d+.*fee/i, /fee of ₹/i,
    ],
  },
  {
    id: 'credentials',
    label: 'Asks for sensitive information',
    shortDesc: 'Requests for Aadhaar card or bank details found.',
    description: 'Sharing bank details, ID scans, or OTPs before a verified offer is a major risk.',
    icon: '⚠',
    color: '#DC2626', bg: '#FEF2F2', border: '#FECACA',
    patterns: [
      /bank (account|details|number|credentials)/i,
      /otp/i, /one[\s-]time (password|pin|code)/i,
      /national id/i, /id (scan|copy|photo)/i,
      /passport (scan|copy|photo|number)/i,
      /social security/i, /ssn\b/i,
      /aadhaar/i, /aadhar/i,
      /send.{0,30}(passport|id card|bank)/i,
    ],
  },
  {
    id: 'earnings',
    label: 'Unrealistic high salary',
    shortDesc: 'Salary appears unusually high for the role.',
    description: 'Promises of very high pay with no experience required are a common fraud pattern.',
    icon: '⚠',
    color: '#D97706', bg: '#FFFBEB', border: '#FDE68A',
    patterns: [
      /earn(ing)? up to/i,
      /₹[\d,]+ per month/i,
      /\$[\d,]+ per (week|month)/i,
      /guaranteed.{0,30}income/i,
      /unlimited earning/i,
      /passive income/i,
      /no experience.{0,40}(earn|salary)/i,
      /work from home.{0,20}₹/i,
    ],
  },
  {
    id: 'contact',
    label: 'Vague company information',
    shortDesc: 'Limited or unclear employer details.',
    description: 'No verifiable company name, address, or official contact information found.',
    icon: '⚠',
    color: '#D97706', bg: '#FFFBEB', border: '#FDE68A',
    patterns: [
      /whatsapp\s*[:\+\d]/i,
      /contact us on whatsapp/i,
      /gmail\.com|yahoo\.com|hotmail\.com|outlook\.com/i,
      /telegram\s*[:@]/i,
      /apply now and get selected immediately/i,
      /no experience needed/i,
      /get selected immediately/i,
    ],
  },
]

function runChecks(text) {
  return RULES.filter(r => r.patterns.some(p => p.test(text)))
}

export default function SafetyChecks({ jobText }) {
  const flags    = runChecks(jobText)
  const hasFlags = flags.length > 0

  if (!hasFlags) return (
    <div
      className="slide-up-delay-2"
      style={{
        background: '#F0FDF4',
        border: '1px solid #A7F3D0',
        borderRadius: 12,
        padding: '16px 18px',
        display: 'flex', gap: 10,
      }}
    >
      <ShieldCheck size={18} color="#059669" style={{ flexShrink: 0, marginTop: 1 }} />
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#065F46', margin: '0 0 3px' }}>
          No red flags detected
        </p>
        <p style={{ fontSize: 12, color: '#047857', margin: 0, lineHeight: 1.6 }}>
          No specific fraud phrases found. Still verify the employer independently.
        </p>
      </div>
    </div>
  )

  return (
    <div className="slide-up-delay-2">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: 0 }}>
          Safety Indicators
        </p>
        <span style={{ fontSize: 11, color: '#6B7280' }}>Rule-based checks (based on content)</span>
      </div>

      {/* 2×2 grid — matching image layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10,
        }}
      >
        {/* Always show all 4 slots; shade unflagged ones lightly */}
        {RULES.map(rule => {
          const flagged = flags.some(f => f.id === rule.id)
          return (
            <div
              key={rule.id}
              className="slide-up"
              style={{
                background: flagged ? rule.bg : '#FAFAFA',
                border: `1px solid ${flagged ? rule.border : '#E5E7EB'}`,
                borderRadius: 10,
                padding: '12px 14px',
                display: 'flex',
                gap: 10,
                opacity: flagged ? 1 : 0.55,
                transition: 'opacity 0.3s',
              }}
            >
              <div
                style={{
                  width: 28, height: 28,
                  borderRadius: '50%',
                  background: flagged ? `${rule.color}18` : '#F3F4F6',
                  border: `1.5px solid ${flagged ? rule.color : '#D1D5DB'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 13,
                }}
              >
                {flagged
                  ? <ShieldAlert size={13} color={rule.color} />
                  : <ShieldCheck size={13} color="#9CA3AF" />}
              </div>
              <div>
                <p style={{ fontSize: 12.5, fontWeight: 700, color: flagged ? '#111827' : '#9CA3AF', margin: '0 0 2px' }}>
                  {rule.label}
                </p>
                <p style={{ fontSize: 11.5, color: flagged ? '#6B7280' : '#9CA3AF', margin: 0, lineHeight: 1.5 }}>
                  {flagged ? rule.shortDesc : 'Not detected'}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 8, textAlign: 'right' }}>
        These are rule-based checks, independent of the ML model.
      </p>
    </div>
  )
}
