import { ClipboardPaste, ScanSearch, BookOpenCheck } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: <ClipboardPaste size={22} />,
    title: 'Paste the job posting',
    description:
      'Copy the full text of any job advertisement — title, description, requirements, benefits — and paste it into the text area. No manual field separation needed.',
  },
  {
    number: '02',
    icon: <ScanSearch size={22} />,
    title: 'AI analysis',
    description:
      'The text is sent to a Python Flask API that transforms it using a TF-IDF vectorizer and runs it through a trained machine learning classifier.',
  },
  {
    number: '03',
    icon: <BookOpenCheck size={22} />,
    title: 'Review the guidance',
    description:
      'You receive a classification result, rule-based safety checks, and practical next steps to help you make an informed decision.',
  },
]

const techCards = [
  {
    term: 'TF-IDF',
    full: 'Term Frequency — Inverse Document Frequency',
    description:
      'A classic NLP technique that converts text into a numerical vector by measuring how important each word is within the document compared to the full dataset. Rare but relevant words score higher.',
  },
  {
    term: 'Classifier',
    full: 'Trained ML model',
    description:
      'A supervised machine learning model trained on labelled job postings. It learns which language patterns appear more often in fraudulent ads, then applies that knowledge to new text.',
  },
  {
    term: 'Safety checks',
    full: 'Rule-based keyword analysis',
    description:
      'A separate, transparent layer that scans for specific red-flag phrases — fee requests, credential demands — independently of the ML model. Both results are shown side by side.',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="scroll-mt-20 py-16 sm:py-20"
      style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="section-label">How it works</p>
          <h2
            className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl"
            style={{ color: '#0F172A' }}
          >
            Three steps to a safer job search
          </h2>
          <p
            className="mx-auto mt-3 max-w-xl text-sm leading-7"
            style={{ color: '#64748B' }}
          >
            The system combines a trained text classifier with transparent
            rule-based checks so you always understand why a result was produced.
          </p>
        </div>

        {/* Steps */}
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map(({ number, icon, title, description }) => (
            <li key={number} className="card p-6">
              <div className="mb-5 flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-lg text-white"
                  style={{ background: '#4F46E5' }}
                >
                  {icon}
                </div>
                <span
                  className="text-3xl font-black"
                  style={{ color: '#E2E8F0' }}
                >
                  {number}
                </span>
              </div>
              <h3 className="font-bold" style={{ color: '#0F172A' }}>
                {title}
              </h3>
              <p
                className="mt-2 text-sm leading-6"
                style={{ color: '#64748B' }}
              >
                {description}
              </p>
            </li>
          ))}
        </ol>

        {/* Technology explainer */}
        <div className="mt-12">
          <h3
            className="mb-5 text-center text-base font-bold"
            style={{ color: '#0F172A' }}
          >
            Understanding the technology
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {techCards.map(({ term, full, description }) => (
              <div key={term} className="card p-5">
                <div
                  className="mb-3 inline-block rounded-md px-2.5 py-1 text-xs font-bold"
                  style={{
                    background: '#EEF2FF',
                    color: '#4F46E5',
                    border: '1px solid #C7D2FE',
                  }}
                >
                  {term}
                </div>
                <p
                  className="text-xs font-semibold"
                  style={{ color: '#94A3B8' }}
                >
                  {full}
                </p>
                <p
                  className="mt-2 text-sm leading-6"
                  style={{ color: '#64748B' }}
                >
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
