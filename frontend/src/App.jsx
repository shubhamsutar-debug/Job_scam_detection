import { useState, useRef } from 'react'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import HowItWorks   from './components/HowItWorks'
import AnalysisForm from './components/AnalysisForm'
import ResultsPanel from './components/ResultsPanel'
import PrivacyNotice from './components/PrivacyNotice'
import Footer       from './components/Footer'
import { Brain, Lock, GraduationCap, FileSearch } from 'lucide-react'

const API_URL  = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:5000/api/predict'
const MAX_CHARS = 20_000

/* ── Root component ───────────────────────────────────────────────────── */
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
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <Navbar />

      <main>
        <Hero />

        {/* ── Analyzer ─────────────────────────────────────────────── */}
        <section
          id="analyzer"
          className="scroll-mt-20 py-16 sm:py-20"
          ref={analyzerRef}
          style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Section heading */}
            <div className="mb-10 text-center">
              <p className="section-label">Job screening</p>
              <h2
                className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl"
                style={{ color: '#0F172A' }}
              >
                Paste. Analyze. Decide.
              </h2>
              <p
                className="mx-auto mt-2 max-w-lg text-sm leading-7"
                style={{ color: '#64748B' }}
              >
                No need to fill in separate fields. Paste the full job text
                and the system handles the rest.
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

        {/* ── About ────────────────────────────────────────────────── */}
        <section
          id="about"
          className="scroll-mt-20 py-16 sm:py-20"
          style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="section-label">About</p>
              <h2
                className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl"
                style={{ color: '#0F172A' }}
              >
                About this project
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <AboutCard
                icon={<GraduationCap size={20} />}
                title="Academic project"
                body="JobShield AI is a student machine learning project demonstrating how NLP can be applied to a real-world classification problem — detecting fraudulent job advertisements."
              />
              <AboutCard
                icon={<Brain size={20} />}
                title="How it was built"
                body="Text was vectorized using TF-IDF and a supervised classifier was trained on labelled job postings. The model files are loaded by a Python Flask API and applied on demand."
              />
              <AboutCard
                icon={<Lock size={20} />}
                title="Honest limitations"
                body="The classifier is a screening tool, not proof of fraud. It may produce false positives or miss sophisticated scams. Always verify employers independently before sharing personal information."
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

/* ── Helper sub-components ────────────────────────────────────────────── */

function AboutCard({ icon, title, body }) {
  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
      }}
    >
      <div
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
        style={{ background: '#EEF2FF', color: '#4F46E5' }}
      >
        {icon}
      </div>
      <h3 className="font-bold" style={{ color: '#0F172A' }}>
        {title}
      </h3>
      <p className="mt-2 text-sm leading-7" style={{ color: '#64748B' }}>
        {body}
      </p>
    </div>
  )
}

function EmptyPlaceholder() {
  return (
    <div
      className="flex min-h-[320px] flex-col items-center justify-center rounded-xl px-6 py-12 text-center"
      style={{
        background: '#FFFFFF',
        border: '1.5px dashed #E2E8F0',
      }}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: '#F1F5F9', color: '#94A3B8' }}
      >
        <FileSearch size={26} />
      </div>
      <h3
        className="mt-4 font-bold"
        style={{ color: '#0F172A' }}
      >
        Ready to analyze
      </h3>
      <p
        className="mt-2 max-w-xs text-sm leading-6"
        style={{ color: '#94A3B8' }}
      >
        Paste a job posting on the left and click{' '}
        <strong style={{ color: '#4F46E5' }}>Analyze Job</strong> to see the
        prediction here.
      </p>
    </div>
  )
}

function LoadingPlaceholder() {
  return (
    <div
      className="flex min-h-[320px] flex-col items-center justify-center rounded-xl px-6 py-12 text-center"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
      }}
    >
      {/* Spinner */}
      <svg
        className="animate-spin"
        style={{ width: 40, height: 40, color: '#4F46E5' }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="Analyzing"
      >
        <circle
          className="opacity-25"
          cx="12" cy="12" r="10"
          stroke="currentColor" strokeWidth="3"
        />
        <path
          className="opacity-80"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <p
        className="mt-5 font-bold"
        style={{ color: '#0F172A' }}
      >
        Analyzing job posting…
      </p>
      <p
        className="mt-1.5 text-sm"
        style={{ color: '#94A3B8' }}
      >
        The ML model is processing your text
      </p>
    </div>
  )
}
