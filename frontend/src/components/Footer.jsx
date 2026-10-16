import { ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E5E7EB' }}>
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        style={{
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 28, height: 28, borderRadius: 6,
              background: '#4F46E5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ShieldCheck size={15} color="white" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#111827' }}>
            JobShield <span style={{ color: '#4F46E5' }}>AI</span>
          </span>
        </div>

        <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0, textAlign: 'center' }}>
          Academic NLP &amp; Machine Learning Project · {new Date().getFullYear()}
        </p>

        <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>
          Always verify job offers independently
        </p>
      </div>
    </footer>
  )
}
