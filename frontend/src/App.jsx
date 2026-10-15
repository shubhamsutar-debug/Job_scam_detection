import { useState, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import AnalysisForm from './components/AnalysisForm'
import ResultsPanel from './components/ResultsPanel'
import PrivacyNotice from './components/PrivacyNotice'
import Footer from './components/Footer'
import { Brain, Lock, GraduationCap } from 'lucide-react'

// Keep URL configurable — set VITE_API_URL in a .env file to override
const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:5000/api/predict'

const MAX_CHARS = 20_000

export default function App() {
  const [jobText, setJobText]   = useState('')
  const [result, setResult]     = useState(null)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

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
    // Scroll back to the form
    setTimeout(() => analyzerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
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

      if (!response.ok) {
        throw new Error(data.error ?? 'The server returned an unexpected error.')
      }

      setResult(data)
      // Scroll to results after a brief paint cycle
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)

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
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main>
        <Hero />

        {/* ── Analyzer section ─────────────────────────────────────── */}
        <section
          id="analyzer"
          className="scroll-mt-20 py-16 sm:py-20"
          ref={analyzerRef}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="mb-8 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                Job screening
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Paste. Analyze. Decide.
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-slate-500">
                No need to fill in separate fields. Paste the full job text and the system handles the rest.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
              {/* Left — input form */}
              <AnalysisForm
                jobText={jobText}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onClear={handleClear}
                loading={loading}
                error={error}
              />

              {/* Right — results or placeholder */}
              <div ref={resultsRef}>
                {loading && <LoadingPlaceholder />}

                {!loading && !result && <EmptyPlaceholder />}

                {!loading && result && (
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

        {/* ── About section ────────────────────────────────────────── */}
        <section
          id="about"
          className="scroll-mt-20 py-16 sm:py-20 bg-white"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">About</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                About this project
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <AboutCard
                icon={<GraduationCap size={22} />}
                title="Academic project"
                body="JobShield AI is a student machine learning project that demonstrates how NLP can be applied to a real-world classification problem — detecting fraudulent job advertisements."
              />
              <AboutCard
                icon={<Brain size={22} />}
                title="How it was built"
                body="The model was trained on a labelled dataset of job postings. Text was vectorized using TF-IDF and a supervised classifier was trained to distinguish genuine from fraudulent postings. The model files are loaded by a Python Flask API."
              />
              <AboutCard
                icon={<Lock size={22} />}
                title="Honest limitations"
                body="The classifier is a screening tool, not a proof of fraud. It may produce false positives or miss sophisticated scams. Always verify employers through official channels before sharing personal information or accepting an offer."
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

/* ── Small helper components ────────────────────────────────────────────── */

function AboutCard({ icon, title, body }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
        {icon}
      </div>
      <h3 className="font-extrabold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-500">{body}</p>
    </div>
  )
}

function EmptyPlaceholder() {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="mt-4 font-extrabold text-slate-800">Ready to analyze</h3>
      <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
        Paste a job posting on the left and click <strong>Analyze Job</strong> to see the prediction here.
      </p>
    </div>
  )
}

function LoadingPlaceholder() {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
      <svg
        className="h-10 w-10 animate-spin text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="Analyzing"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <p className="mt-5 font-extrabold text-slate-800">Analyzing job posting…</p>
      <p className="mt-1.5 text-sm text-slate-400">The ML model is processing your text</p>
    </div>
  )
}
