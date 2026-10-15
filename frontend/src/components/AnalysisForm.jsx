import { useRef } from 'react'
import { Search, RotateCcw, LoaderCircle, ClipboardPaste, AlertTriangle } from 'lucide-react'

const MAX_CHARS = 20_000

const EXAMPLE_TEXT = `Job Title: Remote Data Entry Specialist

Company: GlobalWork Solutions

We are looking for enthusiastic individuals to join our remote data entry team. No experience required — full training provided. Earn up to $5,000 per week working from home at your own pace.

Responsibilities:
- Enter data from provided spreadsheets
- Respond to emails from clients
- Attend weekly video briefings

Requirements:
- A working computer and internet connection
- Willingness to learn
- Must be 18 or older

Benefits:
- Flexible hours — work whenever you like
- Weekly pay via bank transfer
- Paid holidays after 3 months

To apply, send your CV and a registration fee of $50 to secure your starter kit. Contact us on WhatsApp: +1-555-0100.`

export default function AnalysisForm({ jobText, onChange, onSubmit, onClear, loading, error }) {
  const textareaRef = useRef(null)
  const charCount = jobText.length
  const remaining = MAX_CHARS - charCount
  const overLimit = remaining < 0
  const isEmpty = jobText.trim().length === 0

  function loadExample() {
    onChange({ target: { value: EXAMPLE_TEXT } })
    setTimeout(() => textareaRef.current?.focus(), 50)
  }

  const charColor = overLimit
    ? 'text-red-600 font-bold'
    : remaining < 1000
    ? 'text-amber-600 font-semibold'
    : 'text-slate-400'

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Card header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-5">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">Analyze a Job Posting</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Paste the full job advertisement below — title, description, requirements, and benefits.
          </p>
        </div>
        <button
          type="button"
          onClick={loadExample}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 focus-visible:outline-indigo-600"
        >
          <ClipboardPaste size={14} />
          Load example
        </button>
      </div>

      <div className="px-6 py-5">
        {/* Textarea */}
        <div className="relative">
          <label htmlFor="job-text" className="sr-only">
            Paste your job advertisement here
          </label>
          <textarea
            id="job-text"
            ref={textareaRef}
            value={jobText}
            onChange={onChange}
            rows={14}
            maxLength={MAX_CHARS + 100}
            placeholder={
              'Paste the full job posting here.\n\n' +
              'You can copy text from:\n' +
              '  • LinkedIn, Indeed, or any job portal\n' +
              '  • A recruitment or company email\n' +
              '  • A WhatsApp or chat message\n\n' +
              'No need to separate fields — paste it all as-is.'
            }
            aria-describedby="char-count-hint"
            className={[
              'w-full resize-y rounded-xl border px-4 py-3.5 text-sm leading-7 text-slate-800',
              'placeholder:text-slate-400 outline-none transition',
              'focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50',
              overLimit ? 'border-red-400 ring-4 ring-red-50' : 'border-slate-200',
            ].join(' ')}
          />
        </div>

        {/* Character counter + clear */}
        <div id="char-count-hint" className="mt-2 flex items-center justify-between">
          <span className={`text-xs ${charColor}`}>
            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
            {overLimit && ' — over limit'}
          </span>
          {charCount > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs font-semibold text-slate-400 hover:text-red-500 transition"
              aria-label="Clear text area"
            >
              Clear text
            </button>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="mt-4 flex gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <AlertTriangle size={18} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading || isEmpty || overLimit}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-indigo-600"
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" size={17} />
                Analyzing…
              </>
            ) : (
              <>
                <Search size={17} />
                Analyze Job
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClear}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 focus-visible:outline-indigo-600"
          >
            <RotateCcw size={15} />
            Clear
          </button>
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-400">
          Text is sent only to the local Flask API running on your machine and is not stored or transmitted elsewhere.
        </p>
      </div>
    </div>
  )
}
