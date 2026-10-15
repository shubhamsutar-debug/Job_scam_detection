import { ClipboardPaste, ScanSearch, BookOpenCheck } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: <ClipboardPaste size={24} />,
    title: 'Paste the job posting',
    description:
      'Copy the full text of any job advertisement — title, description, requirements, benefits — and paste it into the text area. No manual field separation needed.',
  },
  {
    number: '02',
    icon: <ScanSearch size={24} />,
    title: 'AI analysis',
    description:
      'The text is sent to a Python Flask API that transforms it using a TF-IDF vectorizer and runs it through a trained machine learning classifier.',
  },
  {
    number: '03',
    icon: <BookOpenCheck size={24} />,
    title: 'Review the guidance',
    description:
      'You receive a classification result, a set of rule-based safety checks, and practical next steps to help you make an informed decision.',
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
      'A supervised machine learning model trained on labelled job postings. It learns which patterns of language appear more often in fraudulent ads, then applies that knowledge to new text.',
  },
  {
    term: 'Safety checks',
    full: 'Rule-based keyword analysis',
    description:
      'A separate, transparent layer that scans for specific red-flag phrases — like requests for fees or sensitive credentials — independently of the ML model. Both results are shown side by side.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">How it works</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Three steps to a safer job search
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
            The system combines a trained text classifier with transparent rule-based checks so you always understand why a result was produced.
          </p>
        </div>

        {/* Steps */}
        <ol className="relative grid gap-6 md:grid-cols-3">
          {steps.map(({ number, icon, title, description }, i) => (
            <li key={number} className="relative">
              {/* connector line on md+ */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-7 left-full hidden w-full border-t-2 border-dashed border-slate-200 md:block"
                  style={{ width: 'calc(100% - 56px)', left: '56px' }}
                />
              )}
              <div className="relative z-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-100">
                    {icon}
                  </div>
                  <span className="text-3xl font-black text-slate-100">{number}</span>
                </div>
                <h3 className="font-extrabold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Tech explanation */}
        <div className="mt-12">
          <h3 className="mb-5 text-center text-lg font-extrabold text-slate-800">
            Understanding the technology
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {techCards.map(({ term, full, description }) => (
              <div
                key={term}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 inline-block rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-700">
                  {term}
                </div>
                <p className="text-xs font-semibold text-slate-400">{full}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
