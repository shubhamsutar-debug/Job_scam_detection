import { ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <ShieldCheck size={17} strokeWidth={2.2} />
            </div>
            <span className="text-sm font-extrabold text-slate-800">
              JobShield <span className="text-indigo-600">AI</span>
            </span>
          </div>

          {/* Centre text */}
          <p className="text-center text-xs text-slate-400">
            Academic project — NLP &amp; Machine Learning · {new Date().getFullYear()}
          </p>

          {/* Right notice */}
          <p className="text-xs text-slate-400">
            AI-assisted screening · Verify all job offers independently
          </p>

        </div>
      </div>
    </footer>
  )
}
