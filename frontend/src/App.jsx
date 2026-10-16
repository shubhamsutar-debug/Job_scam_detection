import { useState, useRef } from 'react'
import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import HowItWorks    from './components/HowItWorks'
import AnalysisForm  from './components/AnalysisForm'
import ResultsPanel  from './components/ResultsPanel'
import PrivacyNotice from './components/PrivacyNotice'
import Footer        from './components/Footer'
import { Brain, Lock, GraduationCap, FileSearch, ShieldCheck, Bot } from 'lucide-react'

const API_URL   = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:5000/api/predict'
const MAX_CHARS = 20_000

export default function App() {
  const [jobText, setJobText] = useState('')
  const [result,  setResult]  = useState(null)
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [step,    setStep]    = useState(0)  // 0-3 loading sub-steps

  const analyzerRef = useRef(null)
  const resultsRef  = useRef(null)

  function handleChange(e) {
    setJobText(e.target.value)
    if (result) setResult(null)
    if (error)  setError('')
  }
  function handleClear() { setJobText(''); setResult(null); setError('') }
  function handleReset() {
    setJobText(''); setResult(null); setError('')
    setTimeout(() => analyzerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  async function handleSubmit() {
    const text = jobText.trim()
    if (!text) { setError('Please paste a job advertisement before analyzing.'); return }
    if (text.length > MAX_CHARS) { setError(`Text exceeds ${MAX_CHARS.toLocaleString()} characters.`); return }

    setLoading(true); setError(''); setResult(null); setStep(0)

    // Animate through steps visually while waiting for API
    const stepTimer = setInterval(() => setStep(s => (s < 3 ? s + 1 : s)), 700)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_text: text }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'Unexpected error.')
      clearInterval(stepTimer); setStep(3)
      setResult(data)
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
    } catch (err) {
      clearInterval(stepTimer)
      setError(
        err instanceof TypeError
          ? 'Cannot connect to the backend. Make sure Flask is running on port 5000.'
          : err.message,
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />

        {/* ── Analyzer ── */}
        <section
          id="analyzer"
          className="scroll-mt-20"
          ref={analyzerRef}
          style={{ background: '#F9FAFB', borderTop: '1px solid #E5E7EB', padding: '48px 0 64px' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}
              className="analyzer-grid"
            >
              {/* Left */}
              <AnalysisForm
                jobText={jobText}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onClear={handleClear}
                loading={loading}
                error={error}
              />

              {/* Right */}
              <div ref={resultsRef}>
                {loading  && <LoadingPlaceholder step={step} />}
                {!loading && !result && <EmptyPlaceholder />}
                {!loading && result  && (
                  <ResultsPanel result={result} jobText={jobText} onReset={handleReset} />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section
          id="about"
          className="scroll-mt-20"
          style={{ background: '#FFFFFF', borderTop: '1px solid #E5E7EB', padding: '56px 0' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', margin: 0 }}>
                About this project
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              <AboutCard icon={<GraduationCap size={20} />} color="#4F46E5" title="Academic project"
                body="JobShield AI is a student ML project demonstrating how NLP can detect fraudulent job advertisements." />
              <AboutCard icon={<Brain size={20} />} color="#059669" title="How it was built"
                body="Text is vectorized with TF-IDF and classified by a trained model. Both files are loaded by a Python Flask API." />
              <AboutCard icon={<Lock size={20} />} color="#D97706" title="Honest limitations"
                body="The classifier is a screening tool, not proof of fraud. Always verify employers before sharing personal information." />
            </div>
          </div>
        </section>

        <PrivacyNotice />
      </main>
      <Footer />

      {/* Responsive style for grid */}
      <style>{`
        @media (max-width: 768px) {
          .analyzer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

function AboutCard({ icon, color, title, body }) {
  return (
    <div
      className="card"
      style={{ padding: '22px 20px', borderRadius: 12, transition: 'transform 0.2s, box-shadow 0.2s' }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = ''
      }}
    >
      <div style={{
        width: 42, height: 42, borderRadius: 10,
        background: `${color}15`, border: `1.5px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color, marginBottom: 14,
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>{title}</h3>
      <p style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.7, margin: 0 }}>{body}</p>
    </div>
  )
}

function EmptyPlaceholder() {
  return (
    <div
      className="fade-in"
      style={{
        minHeight: 320,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#FFFFFF',
        border: '1.5px dashed #C7D2FE',
        borderRadius: 14,
        padding: '40px 24px', textAlign: 'center',
      }}
    >
      <div style={{
        width: 60, height: 60, borderRadius: 14,
        background: '#EEF2FF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#4F46E5', marginBottom: 16,
      }}>
        <FileSearch size={28} />
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>
        Ready to analyze
      </h3>
      <p style={{ fontSize: 13, color: '#9CA3AF', maxWidth: 260, lineHeight: 1.65, margin: 0 }}>
        Paste a job posting on the left and click{' '}
        <strong style={{ color: '#4F46E5' }}>Analyze Job</strong> to see results.
      </p>
    </div>
  )
}

/* Loading screen with step progress — matches image exactly */
const loadingSteps = [
  'Text Processing',
  'Feature Extraction',
  'Model Prediction',
  'Generating Results',
]

function LoadingPlaceholder({ step }) {
  return (
    <div
      className="fade-in"
      style={{
        minHeight: 320,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: 14,
        padding: '40px 24px', textAlign: 'center',
      }}
    >
      {/* Robot icon with spinning ring */}
      <div style={{ position: 'relative', width: 72, height: 72, marginBottom: 20 }}>
        <svg
          style={{ position: 'absolute', inset: 0, width: 72, height: 72 }}
          viewBox="0 0 72 72"
        >
          <circle cx="36" cy="36" r="32" fill="none" stroke="#E5E7EB" strokeWidth="3" />
          <circle
            cx="36" cy="36" r="32"
            fill="none" stroke="#4F46E5" strokeWidth="3"
            strokeDasharray={`${(step + 1) / 4 * 201} 201`}
            strokeLinecap="round"
            transform="rotate(-90 36 36)"
            style={{ transition: 'stroke-dasharray 0.5s ease' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Bot size={28} color="#4F46E5" />
        </div>
      </div>

      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#111827', margin: '0 0 6px' }}>
        Analyzing Job Posting...
      </h3>
      <p style={{ fontSize: 13, color: '#9CA3AF', margin: '0 0 28px', maxWidth: 280, lineHeight: 1.6 }}>
        Our AI model is processing the text using NLP and machine learning.
        This may take a few seconds.
      </p>

      {/* Step progress row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'nowrap' }}>
        {loadingSteps.map((label, i) => {
          const done    = i < step
          const current = i === step
          const pending = i > step
          return (
            <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
              {/* Step node */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div
                  style={{
                    width: 28, height: 28, borderRadius: '50%',
                    border: `2px solid ${done ? '#4F46E5' : current ? '#4F46E5' : '#E5E7EB'}`,
                    background: done ? '#4F46E5' : current ? '#EEF2FF' : '#F9FAFB',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.4s ease',
                    boxShadow: current ? '0 0 0 4px rgba(79,70,229,0.12)' : 'none',
                  }}
                >
                  {done
                    ? <ShieldCheck size={14} color="white" />
                    : current
                    ? <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4F46E5', animation: 'blink 1s infinite' }} />
                    : <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D1D5DB' }} />}
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: pending ? '#D1D5DB' : '#6B7280', whiteSpace: 'nowrap' }}>
                  {label}
                </span>
              </div>
              {/* Connector line */}
              {i < loadingSteps.length - 1 && (
                <div style={{
                  width: 28, height: 2, marginBottom: 20,
                  background: done ? '#4F46E5' : '#E5E7EB',
                  transition: 'background 0.4s ease',
                }} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
