import { useRef } from 'react'
import { Search, Trash2, LoaderCircle, Info, Lock } from 'lucide-react'

const MAX_CHARS = 5000   /* match image counter style */

const EXAMPLE_TEXT = `We are hiring Remote Data Entry Executives!

Earn ₹50,000 per month working from home. No prior experience needed.

Responsibilities:
- Simple data entry work
- 2-3 hours per day

Requirements:
- Basic computer knowledge
- Must pay a registration fee of ₹999 to start
- Share your Aadhaar card and bank details for verification

Apply now and get selected immediately!`

export default function AnalysisForm({ jobText, onChange, onSubmit, onClear, loading, error }) {
  const textareaRef = useRef(null)
  const charCount   = jobText.length
  const overLimit   = charCount > MAX_CHARS
  const isEmpty     = jobText.trim().length === 0

  function loadExample() {
    onChange({ target: { value: EXAMPLE_TEXT } })
    setTimeout(() => textareaRef.current?.focus(), 50)
  }

  return (
    <div className="fade-in">
      {/* Page heading */}
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111827', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
        Analyze a Job Posting
      </h1>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24 }}>
        Paste the complete job advertisement to check for potential warning signs.
      </p>

      {/* Card */}
      <div className="card" style={{ borderRadius: 14, overflow: 'hidden' }}>

        {/* Card header */}
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 18px',
            borderBottom: '1px solid #E5E7EB',
            background: '#FAFAFA',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Search size={16} color="#4F46E5" />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>
              Job Advertisement
            </span>
          </div>
          <button
            type="button"
            onClick={onClear}
            disabled={isEmpty}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 12, fontWeight: 600, color: isEmpty ? '#D1D5DB' : '#6B7280',
              background: 'none', border: 'none', cursor: isEmpty ? 'default' : 'pointer',
              padding: '4px 8px', borderRadius: 6,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => { if (!isEmpty) e.currentTarget.style.color = '#DC2626' }}
            onMouseLeave={e => { e.currentTarget.style.color = isEmpty ? '#D1D5DB' : '#6B7280' }}
          >
            <Trash2 size={13} />
            Clear Text
          </button>
        </div>

        {/* Textarea */}
        <div style={{ padding: '0 0 0 0' }}>
          <label htmlFor="job-text" className="sr-only">Paste job advertisement</label>
          <textarea
            id="job-text"
            ref={textareaRef}
            value={jobText}
            onChange={onChange}
            rows={12}
            placeholder={
              'Paste the full job posting here.\n\nYou can copy text from LinkedIn, Indeed,\na recruitment email, or WhatsApp message.\n\nNo need to separate fields — paste it all.'
            }
            style={{
              width: '100%',
              resize: 'vertical',
              border: 'none',
              borderBottom: '1px solid #E5E7EB',
              outline: 'none',
              padding: '16px 18px',
              fontSize: 13.5,
              lineHeight: 1.7,
              color: '#111827',
              background: '#FFFFFF',
              fontFamily: 'Inter, sans-serif',
            }}
            onFocus={e => (e.currentTarget.style.background = '#FAFEFF')}
            onBlur={e => (e.currentTarget.style.background = '#FFFFFF')}
          />
        </div>

        {/* Counter row */}
        <div
          style={{
            padding: '10px 18px',
            display: 'flex', justifyContent: 'flex-end',
            background: '#FAFAFA',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: overLimit ? '#DC2626' : '#9CA3AF',
            }}
          >
            {charCount}/{MAX_CHARS} characters
          </span>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              margin: '0 18px 0',
              padding: '10px 14px',
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: 8,
              display: 'flex', gap: 8, alignItems: 'flex-start',
              marginTop: 12, marginBottom: 4,
            }}
          >
            <Info size={15} color="#DC2626" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 13, color: '#7F1D1D', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Info + privacy row */}
        <div style={{ padding: '14px 18px', display: 'flex', gap: 10, flexWrap: 'wrap' }}>

          {/* Tips box */}
          <div
            style={{
              flex: '1 1 200px',
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: 10,
              padding: '12px 14px',
              display: 'flex', gap: 10,
            }}
          >
            <Info size={15} color="#3B82F6" style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#1E40AF', margin: '0 0 5px' }}>
                Tips for better results:
              </p>
              <ul style={{ margin: 0, padding: '0 0 0 14px', fontSize: 11.5, color: '#1D4ED8', lineHeight: 1.7 }}>
                <li>Paste the complete job advertisement</li>
                <li>Include all details such as requirements, benefits, and company info</li>
                <li>Do not modify the text</li>
              </ul>
            </div>
          </div>

          {/* Privacy box */}
          <div
            style={{
              flex: '1 1 160px',
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: 10,
              padding: '12px 14px',
              display: 'flex', gap: 10,
            }}
          >
            <Lock size={15} color="#059669" style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#065F46', margin: '0 0 4px' }}>
                Your privacy is important
              </p>
              <p style={{ fontSize: 11.5, color: '#047857', margin: 0, lineHeight: 1.6 }}>
                Your data is analyzed only for this prediction and is not stored.
              </p>
            </div>
          </div>
        </div>

        {/* Analyze button */}
        <div style={{ padding: '4px 18px 18px' }}>
          <button
            type="button"
            onClick={() => { if (!isEmpty && !overLimit) onSubmit() }}
            disabled={loading || isEmpty || overLimit}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: 15,
              borderRadius: 10,
              letterSpacing: '0.01em',
            }}
          >
            {loading ? (
              <>
                <LoaderCircle className="spin-slow" size={18} />
                Analyzing…
              </>
            ) : (
              <>
                <Search size={17} />
                Analyze Job
              </>
            )}
          </button>
        </div>
      </div>

      {/* Load example link */}
      <p style={{ marginTop: 10, fontSize: 12, color: '#9CA3AF', textAlign: 'center' }}>
        Want to test?{' '}
        <button
          type="button"
          onClick={loadExample}
          style={{
            background: 'none', border: 'none', padding: 0,
            color: '#4F46E5', fontWeight: 600, cursor: 'pointer', fontSize: 12,
            textDecoration: 'underline',
          }}
        >
          Load a sample fraudulent job
        </button>
      </p>
    </div>
  )
}
