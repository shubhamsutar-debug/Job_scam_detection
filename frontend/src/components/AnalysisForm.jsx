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
  const charCount   = jobText.length
  const remaining   = MAX_CHARS - charCount
  const overLimit   = remaining < 0
  const isEmpty     = jobText.trim().length === 0

  function loadExample() {
    onChange({ target: { value: EXAMPLE_TEXT } })
    setTimeout(() => textareaRef.current?.focus(), 50)
  }

  const counterColor = overLimit
    ? '#DC2626'
    : remaining < 1000
    ? '#D97706'
    : '#94A3B8'

  return (
    <div className="card overflow-hidden">

      {/* ── Card header ── */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-6 py-5"
        style={{ borderBottom: '1px solid #E2E8F0' }}
      >
        <div>
          <h2 className="text-base font-bold" style={{ color: '#0F172A' }}>
            Analyze a Job Posting
          </h2>
          <p className="mt-0.5 text-sm" style={{ color: '#64748B' }}>
            Paste the full advertisement — title, description, requirements, and benefits.
          </p>
        </div>
        <button
          type="button"
          onClick={loadExample}
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors"
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            color: '#64748B',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#EEF2FF')}
          onMouseLeave={e => (e.currentTarget.style.background = '#F8FAFC')}
        >
          <ClipboardPaste size={13} />
          Load example
        </button>
      </div>

      {/* ── Body ── */}
      <div className="px-6 py-5">

        {/* Textarea */}
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
          className="w-full resize-y rounded-lg px-4 py-3.5 text-sm leading-7 outline-none transition"
          style={{
            border: overLimit ? '1.5px solid #DC2626' : '1.5px solid #E2E8F0',
            color: '#334155',
            background: '#FFFFFF',
            boxShadow: overLimit
              ? '0 0 0 3px rgba(220,38,38,0.08)'
              : undefined,
          }}
          onFocus={e => {
            if (!overLimit) e.currentTarget.style.border = '1.5px solid #4F46E5'
            e.currentTarget.style.boxShadow = overLimit
              ? '0 0 0 3px rgba(220,38,38,0.08)'
              : '0 0 0 3px rgba(79,70,229,0.1)'
          }}
          onBlur={e => {
            e.currentTarget.style.border = overLimit
              ? '1.5px solid #DC2626'
              : '1.5px solid #E2E8F0'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />

        {/* Counter row */}
        <div
          id="char-count-hint"
          className="mt-2 flex items-center justify-between"
        >
          <span
            className="text-xs font-medium"
            style={{ color: counterColor }}
          >
            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
            {overLimit && ' — over limit'}
          </span>
          {charCount > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs font-semibold transition-colors"
              style={{ color: '#94A3B8' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#DC2626')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
              aria-label="Clear text area"
            >
              Clear text
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mt-4 flex gap-3 rounded-lg px-4 py-3 text-sm"
            style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#7F1D1D',
            }}
          >
            <AlertTriangle size={17} className="mt-0.5 shrink-0" style={{ color: '#DC2626' }} />
            <p>{error}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading || isEmpty || overLimit}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold text-white transition-colors"
            style={{
              background: loading || isEmpty || overLimit ? '#A5B4FC' : '#4F46E5',
              cursor: loading || isEmpty || overLimit ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={e => {
              if (!e.currentTarget.disabled) e.currentTarget.style.background = '#4338CA'
            }}
            onMouseLeave={e => {
              if (!e.currentTarget.disabled) e.currentTarget.style.background = '#4F46E5'
            }}
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" size={16} />
                Analyzing…
              </>
            ) : (
              <>
                <Search size={16} />
                Analyze Job
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClear}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              color: '#64748B',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
            }}
            onMouseEnter={e => {
              if (!e.currentTarget.disabled) e.currentTarget.style.background = '#F8FAFC'
            }}
            onMouseLeave={e => {
              if (!e.currentTarget.disabled) e.currentTarget.style.background = '#FFFFFF'
            }}
          >
            <RotateCcw size={14} />
            Clear
          </button>
        </div>

        <p className="mt-4 text-xs leading-5" style={{ color: '#94A3B8' }}>
          Text is sent only to the local Flask API on your machine and is not stored or transmitted elsewhere.
        </p>
      </div>
    </div>
  )
}
