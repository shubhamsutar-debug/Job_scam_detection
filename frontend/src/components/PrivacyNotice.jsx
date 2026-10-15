import { Lock, CheckCircle2 } from 'lucide-react'

const items = [
  'Text is sent only to the Flask API running locally on your machine (127.0.0.1:5000). It is not transmitted to any external server.',
  'No submitted text is stored, logged persistently, or used to retrain the model.',
  'The safety-check analysis runs entirely inside your browser and never leaves your device.',
  'No cookies, tracking pixels, or analytics scripts are used in this application.',
]

export default function PrivacyNotice() {
  return (
    <section
      className="py-12"
      style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-2xl rounded-xl px-6 py-6 sm:px-8"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.06)',
          }}
        >
          {/* Header */}
          <div className="mb-5 flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ background: '#EEF2FF', color: '#4F46E5' }}
            >
              <Lock size={16} strokeWidth={2.5} />
            </div>
            <h2 className="font-bold" style={{ color: '#0F172A' }}>
              Privacy notice
            </h2>
          </div>

          {/* Items */}
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex gap-3">
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0"
                  style={{ color: '#10B981' }}
                />
                <p className="text-sm leading-6" style={{ color: '#64748B' }}>
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
