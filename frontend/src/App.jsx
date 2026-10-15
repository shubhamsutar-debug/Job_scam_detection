import { useState, useRef } from 'react'
import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import HowItWorks    from './components/HowItWorks'
import AnalysisForm  from './components/AnalysisForm'
import ResultsPanel  from './components/ResultsPanel'
import PrivacyNotice from './components/PrivacyNotice'
import Footer        from './components/Footer'
import {
  Brain, Lock, GraduationCap, FileSearch, Sparkles,
  Cpu, Shield, Search,
} from 'lucide-react'

const API_URL  = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:5000/api/predict'
const MAX_CHARS = 20_000

/* ── Root component ─────────────────────────────────────────────────── */
export default function App() {
  const [jobText, setJobText] = useState('')
  const [result,  setResult]  = useState(null)
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const analyzerRef = useRef(null)
  const resultsRef  = useRef(null)

  function handleChange(e) {
    setJobText(e.target.value)
    if (result) setResult(null)
    if (error)  setError('')
  }

  function handleClear() {
    setJobText('')
    setResult(null)
    setError('')
  }

  function handleReset() {
    setJobText('')
    setResult(null)
    setError('')
    setTimeout(
      () => analyzerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      50,
    )
  }

  async function handleSubmit() {
    const text = jobText.trim()
    if (!text) {
      setError('Please paste a job advertisement before analyzing.')
      return
    }
    if (text.length > MAX_CHARS) {
      setError(`The text exceeds the ${MAX_CHARS.toLocaleString()}-character limit. Please shorten it.`)
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ job_text: text }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'The server returned an unexpected error.')
      setResult(data)
      setTimeout(
        () => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        80,
      )
    } catch (err) {
      setError(
        err instanceof TypeError
          ? 'Cannot connect to the backend. Make sure the Flask server is running on port 5000.'
          : err.message,
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#080B14' }}>
      <Navbar />

      <main>
        <Hero />

        {/* ── Analyzer section ─────────────────────────────────────────── */}
        <section
          id="analyzer"
          className="scroll-mt-20 py-20 sm:py-24 relative"
          ref={analyzerRef}
          style={{
            background: 'rgba(8,11,20,0.9)',
            borderTop: '1px solid rgba(108,99,255,0.1)',
            borderBottom: '1px solid rgba(108,99,255,0.1)',
          }}
        >
          {/* Background glow */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
            width: 800, height: 400,
            background: 'radial-gradient(ellipse, rgba(108,99,255,0.06) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Section heading */}
            <div className="mb-14 text-center">
              <div className="mb-5 flex justify-center">
                <span className="section-label">
                  <Search size={11} strokeWidth={3} />
                  Job screening
                </span>
              </div>
              <h2
                className="text-3xl font-extrabold tracking-tight sm:text-4xl"
                style={{ color: '#F1F5F9' }}
              >
                Paste.{' '}
                <span className="gradient-text">Analyze.</span>{' '}
                Decide.
              </h2>
              <p
                className="mx-auto mt-4 max-w-lg text-sm leading-7"
                style={{ color: '#64748B' }}
              >
                No need to fill in separate fields. Paste the full job text
                and the AI handles the rest — instantly.
              </p>
            </div>

            {/* Two-column grid */}
            <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
              <AnalysisForm
                jobText={jobText}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onClear={handleClear}
                loading={loading}
                error={error}
              />

              <div ref={resultsRef}>
                {loading  && <LoadingPlaceholder />}
                {!loading && !result && <EmptyPlaceholder />}
                {!loading && result  && (
                  <ResultsPanel
                    result={result}
                    jobText={jobText}
                    onReset={handleReset}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <HowItWorks />

        {/* ── About section ─────────────────────────────────────────────── */}
        <section
          id="about"
          className="scroll-mt-20 py-20 sm:py-24 relative"
          style={{
            background: 'rgba(13,20,36,0.9)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div aria-hidden="true" style={{
            position: 'absolute', bottom: 0, left: '-5%',
            width: 450, height: 450,
            background: 'radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <div className="mb-5 flex justify-center">
                <span className="section-label">About</span>
              </div>
              <h2
                className="text-3xl font-extrabold tracking-tight sm:text-4xl"
                style={{ color: '#F1F5F9' }}
              >
                About this project
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-7" style={{ color: '#64748B' }}>
                Built as an academic demonstration of how NLP and machine learning can be
                applied to a real-world problem.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <AboutCard
                icon={<GraduationCap size={20} />}
                title="Academic project"
                body="JobShield AI is a student machine learning project demonstrating how NLP can be applied to a real-world classification problem — detecting fraudulent job advertisements."
                color="#6C63FF"
                colorBg="rgba(108,99,255,0.1)"
                colorBorder="rgba(108,99,255,0.2)"
              />
              <AboutCard
                icon={<Brain size={20} />}
                title="How it was built"
                body="Text was vectorized using TF-IDF and a supervised classifier was trained on labelled job postings. The model files are loaded by a Python Flask API and applied on demand."
                color="#06B6D4"
                colorBg="rgba(6,182,212,0.1)"
                colorBorder="rgba(6,182,212,0.2)"
              />
              <AboutCard
                icon={<Lock size={20} />}
                title="Honest limitations"
                body="The classifier is a screening tool, not proof of fraud. It may produce false positives or miss sophisticated scams. Always verify employers independently before sharing personal information."
                color="#10B981"
                colorBg="rgba(16,185,129,0.1)"
                colorBorder="rgba(16,185,129,0.2)"
              />
            </div>
          </div>
        </section>

        <PrivacyNotice />
      </main>

      <Footer />
    </div>
  )
}

/* ── Helper sub-components ─────────────────────────────────────────── */

function AboutCard({ icon, title, body, color, colorBg, colorBorder }) {
  return (
    <div
      className="transition-all duration-300"
      style={{
        background: 'rgba(15,23,42,0.7)',
        border: `1px solid ${colorBorder}`,
        borderRadius: 20,
        padding: '28px 24px',
        backdropFilter: 'blur(16px)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${colorBorder}`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
        style={{
          background: colorBg,
          border: `1px solid ${colorBorder}`,
          color,
          boxShadow: `0 4px 12px ${color}20`,
        }}
      >
        {icon}
      </div>
      <h3 className="font-bold text-base" style={{ color: '#F1F5F9' }}>
        {title}
      </h3>
      <p className="mt-2.5 text-sm leading-7" style={{ color: '#64748B' }}>
        {body}
      </p>
    </div>
  )
}

function EmptyPlaceholder() {
  return (
    <div
      className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl px-6 py-14 text-center animate-fade-in"
      style={{
        background: 'rgba(15,23,42,0.5)',
        border: '1.5px dashed rgba(108,99,255,0.2)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Animated icon */}
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl animate-pulse-slow"
        style={{
          background: 'rgba(108,99,255,0.1)',
          border: '1px solid rgba(108,99,255,0.2)',
          color: '#6C63FF',
        }}
      >
        <FileSearch size={28} />
      </div>
      <h3
        className="mt-5 font-bold text-base"
        style={{ color: '#F1F5F9' }}
      >
        Ready to analyze
      </h3>
      <p
        className="mt-2.5 max-w-xs text-sm leading-6"
        style={{ color: '#475569' }}
      >
        Paste a job posting on the left and click{' '}
        <strong style={{ color: '#A5B4FC' }}>Analyze Job</strong> to see the
        prediction here.
      </p>

      {/* Decorative dots */}
      <div className="mt-8 flex gap-2">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="animate-pulse-slow h-1.5 w-1.5 rounded-full"
            style={{
              background: 'rgba(108,99,255,0.4)',
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function LoadingPlaceholder() {
  return (
    <div
      className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl px-6 py-14 text-center animate-fade-in"
      style={{
        background: 'rgba(15,23,42,0.7)',
        border: '1px solid rgba(108,99,255,0.2)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Multi-ring spinner */}
      <div className="relative flex items-center justify-center" style={{ width: 72, height: 72 }}>
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            border: '2px solid transparent',
            borderTopColor: '#6C63FF',
            borderRightColor: 'rgba(108,99,255,0.3)',
          }}
        />
        <div
          className="absolute rounded-full animate-spin"
          style={{
            inset: 8,
            border: '2px solid transparent',
            borderTopColor: '#06B6D4',
            borderLeftColor: 'rgba(6,182,212,0.3)',
            animationDirection: 'reverse',
            animationDuration: '0.8s',
          }}
        />
        <Sparkles size={20} style={{ color: '#6C63FF' }} />
      </div>

      <p
        className="mt-6 font-bold text-base"
        style={{ color: '#F1F5F9' }}
      >
        Analyzing job posting…
      </p>
      <p
        className="mt-2 text-sm"
        style={{ color: '#475569' }}
      >
        The ML model is processing your text
      </p>

      {/* Progress dots */}
      <div className="mt-6 flex gap-1.5">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className="animate-pulse-slow rounded-full"
            style={{
              width: i === 1 || i === 2 ? 20 : 8,
              height: 4,
              background: i === 0
                ? 'linear-gradient(90deg, #6C63FF, #8B5CF6)'
                : 'rgba(108,99,255,0.2)',
              borderRadius: 99,
              animationDelay: `${i * 0.2}s`,
              transition: 'width 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
