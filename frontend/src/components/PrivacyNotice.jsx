import { Lock, CheckCircle2 } from 'lucide-react'

const items = [
  'Text is sent only to the Flask API running locally on your machine (127.0.0.1:5000). It is not transmitted to any external server.',
  'No submitted text is stored, logged persistently, or used to retrain the model.',
  'The safety-check analysis runs entirely inside your browser and never leaves your device.',
  'No cookies, tracking pixels, or analytics scripts are used in this application.',
]

export default function PrivacyNotice() {
  return (
    <section style={{ background: '#F9FAFB', borderTop: '1px solid #E5E7EB', padding: '48px 0' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="card"
          style={{ maxWidth: 600, margin: '0 auto', padding: '24px 28px', borderRadius: 14 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 36, height: 36, borderRadius: 8,
                background: '#EEF2FF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Lock size={17} color="#4F46E5" />
            </div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: 0 }}>Privacy notice</h2>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: 10 }}>
                <CheckCircle2 size={15} color="#059669" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: 13, color: '#6B7280', margin: 0, lineHeight: 1.65 }}>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
