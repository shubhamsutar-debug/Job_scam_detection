import { Lock } from 'lucide-react'

export default function PrivacyNotice() {
  return (
    <section className="bg-slate-50 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-sm sm:px-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <Lock size={17} />
            </div>
            <h2 className="font-extrabold text-slate-900">Privacy notice</h2>
          </div>
          <ul className="space-y-2.5 text-sm leading-6 text-slate-600">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
              The text you submit is sent only to the Flask API running locally on your machine (<code className="rounded bg-slate-100 px-1 text-xs font-mono">127.0.0.1:5000</code>). It is not transmitted to any external server.
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
              No submitted text is stored, logged persistently, or used to retrain the model.
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
              The safety-check analysis runs entirely inside your browser and never leaves your device.
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
              No cookies, tracking pixels, or analytics scripts are used in this application.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
