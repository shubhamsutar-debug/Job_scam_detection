import { useRef } from 'react'
import { Search, RotateCcw, LoaderCircle, ClipboardPaste, AlertTriangle, Sparkles } from 'lucide-react'

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
  const fillPercent = Math.min((charCount / MAX_CHARS) * 100, 100)

  function loadExample() {
    onChange({ target: { value: EXAMPLE_TEXT } })
    setTimeout(() => textareaRef.current?.focus(), 50)
  }

  const counterColor = overLimit ? '#EF4444' : remaining < 1000 ? '#F59E0B' : '#475569'
  const progressColor = overLimit
    ? 'linear-gradient(90deg, #EF4444, #DC2626)'
    : remaining < 1000
    ? 'linear-gradient(90deg, #F59E0B, #EF4444)'
    : 'linear-gradient(90deg, #6C63FF, #06B6D4)'

  return (
    <div
      className="overflow-hidden animate-fade-in"
      style={{
        background: 'rgba(15, 23, 42, 0.7)',
        border: '1px solid rgba(108,99,255,0.2)',
        borderRadius: 20,
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* ── Card header ── */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-6 py-5"
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(108,99,255,0.05)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)',
              boxShadow: '0 4px 12px rgba(108,99,255,0.4)',
            }}
          >
            <Search size={18} color="white" />
          </div>
          <div>
            <h2 className="text-base font-bold" style={{ color: '#F1F5F9' }}>
              Analyze a Job Posting
            </h2>
            <p className="mt-0.5 text-xs" style={{ color: '#64748B' }}>
              Paste the full advertisement — title, description, requirements.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={loadExample}
          className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all"
          style={{
            background: 'rgba(108,99,255,0.1)',
            border: '1px solid rgba(108,99,255,0.2)',
            color: '#A5B4FC',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(108,99,255,0.2)'
            e.currentTarget.style.borderColor = 'rgba(108,99,255,0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(108,99,255,0.1)'
            e.currentTarget.style.borderColor = 'rgba(108,99,255,0.2)'
          }}
        >
          <ClipboardPaste size={12} />
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
          rows={13}
          maxLength={MAX_CHARS + 100}
          placeholder={
            'Paste the full job posting here…\n\nYou can copy text from:\n  • LinkedIn, Indeed, or any job portal\n  • A recruitment or company email\n  • A WhatsApp or chat message\n\nNo need to separate fields — paste it all as-is.'
          }
          aria-describedby="char-count-hint"
          className="w-full resize-y rounded-xl px-4 py-4 text-sm leading-7 outline-none transition-all duration-200"
          style={{
            border: overLimit
              ? '1.5px solid rgba(239,68,68,0.5)'
              : '1.5px solid rgba(148,163,184,0.1)',
            color: '#CBD5E1',
            background: 'rgba(8,11,20,0.6)',
            boxShadow: overLimit ? '0 0 0 3px rgba(239,68,68,0.1)' : undefined,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
          onFocus={e => {
            if (!overLimit) {
              e.currentTarget.style.border = '1.5px solid rgba(108,99,255,0.5)'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.1)'
            }
          }}
          onBlur={e => {
            e.currentTarget.style.border = overLimit
              ? '1.5px solid rgba(239,68,68,0.5)'
              : '1.5px solid rgba(148,163,184,0.1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />

        {/* Progress bar */}
        <div className="mt-3 space-y-1.5">
          <div
            style={{
              height: 3,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 99,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${fillPercent}%`,
                background: progressColor,
                borderRadius: 99,
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          </div>
          <div id="char-count-hint" className="flex items-center justify-between">
            <span className="text-[11px] font-medium" style={{ color: counterColor }}>
              {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} chars
              {overLimit && ' — over limit'}
            </span>
            {charCount > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="text-[11px] font-semibold transition-colors"
                style={{ color: '#475569' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#EF4444')}
                onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
                aria-label="Clear text area"
              >
                ✕ Clear
              </button>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mt-4 flex gap-3 rounded-xl px-4 py-3.5 text-sm animate-slide-up"
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#FCA5A5',
            }}
          >
            <AlertTriangle size={16} className="mt-0.5 shrink-0" style={{ color: '#EF4444' }} />
            <p>{error}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            id="analyze-btn"
            onClick={onSubmit}
            disabled={loading || isEmpty || overLimit}
            className="btn-primary flex-1 py-3.5 text-sm"
            style={{ borderRadius: 12 }}
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" size={16} />
                Analyzing…
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Analyze Job
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClear}
            disabled={loading}
            className="btn-ghost py-3.5 text-sm px-5"
            style={{ borderRadius: 12 }}
          >
            <RotateCcw size={14} />
            Clear
          </button>
        </div>

        <p className="mt-4 text-[11px] leading-5" style={{ color: '#334155' }}>
          🔒 Text is sent only to the local Flask API on your machine and is not stored or transmitted elsewhere.
        </p>
      </div>
    </div>
  )
}
