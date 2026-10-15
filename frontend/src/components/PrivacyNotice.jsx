import { Lock } from 'lucide-react'

export default function PrivacyNotice() {
  return (
    <section
      className="py-10"
      style={{ background: 'rgba(8,11,20,0.6)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-col items-center gap-4 rounded-2xl px-6 py-6 text-center sm:flex-row sm:text-left"
          style={{
            background: 'rgba(108,99,255,0.05)',
            border: '1px solid rgba(108,99,255,0.15)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{ background: 'rgba(108,99,255,0.12)', color: '#6C63FF' }}
          >
            <Lock size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: '#A5B4FC' }}>
              🔒 Your privacy is protected
            </p>
            <p className="mt-1 text-xs leading-5" style={{ color: '#475569' }}>
              Text submitted for analysis is sent only to the locally running Flask API on your machine.
              No data is stored, logged, or transmitted to any third-party server. This tool operates entirely locally.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
