import { ArrowRight, ShieldCheck, Brain, Zap, TrendingUp, Users, Award } from 'lucide-react'
import { useEffect, useRef } from 'react'

const stats = [
  { icon: <TrendingUp size={16} />, value: '98.2%', label: 'Detection Accuracy' },
  { icon: <Users size={16} />, value: '50K+', label: 'Jobs Analyzed' },
  { icon: <Award size={16} />, value: '<0.5s', label: 'Response Time' },
]

const pills = [
  { icon: <ShieldCheck size={12} />, text: 'ML-powered screening' },
  { icon: <Brain size={12} />,       text: 'NLP text analysis' },
  { icon: <Zap size={12} />,         text: 'Instant results' },
]

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    const W = canvas.parentElement.offsetWidth
    const H = canvas.parentElement.offsetHeight
    canvas.width = W
    canvas.height = H

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * W
        this.y = Math.random() * H
        this.size = Math.random() * 1.5 + 0.3
        this.speed = Math.random() * 0.3 + 0.1
        this.opacity = Math.random() * 0.5 + 0.1
        this.color = Math.random() > 0.5 ? '108,99,255' : '6,182,212'
      }
      update() {
        this.y -= this.speed
        this.opacity -= 0.001
        if (this.y < 0 || this.opacity <= 0) this.reset()
      }
      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = `rgba(${this.color},1)`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle())

    function animate() {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => { p.update(); p.draw() })
      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <section
      id="home"
      className="relative overflow-hidden mesh-bg"
      style={{ minHeight: '88vh', display: 'flex', alignItems: 'center' }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      />

      {/* Gradient orbs */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-20%', left: '-10%',
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-15%', right: '-5%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28" style={{ zIndex: 1, width: '100%' }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT COLUMN */}
          <div className="animate-fade-in">

            {/* Badge */}
            <div className="mb-8 inline-flex">
              <span className="section-label">
                <ShieldCheck size={11} strokeWidth={3} />
                Academic NLP &amp; Machine Learning Project
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: '#F1F5F9' }}
            >
              Spot fraudulent{' '}
              <span className="gradient-text">job postings</span>{' '}
              <br />before you apply.
            </h1>

            {/* Sub */}
            <p
              className="mt-6 text-[1.05rem] leading-8 max-w-xl"
              style={{ color: '#94A3B8' }}
            >
              Paste any job advertisement — from a portal, recruitment email, or WhatsApp —
              and let our AI screen it for fraud indicators in{' '}
              <strong style={{ color: '#CBD5E1' }}>under a second</strong>.
            </p>

            {/* Feature pills */}
            <div className="mt-7 flex flex-wrap gap-2.5">
              {pills.map(({ icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold"
                  style={{
                    background: 'rgba(108,99,255,0.1)',
                    border: '1px solid rgba(108,99,255,0.25)',
                    color: '#A5B4FC',
                  }}
                >
                  <span style={{ color: '#6C63FF' }}>{icon}</span>
                  {text}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#analyzer"
                className="btn-primary px-7 py-3.5 text-sm"
                style={{ textDecoration: 'none', borderRadius: 14 }}
              >
                Analyze a job posting
                <ArrowRight size={16} />
              </a>
              <a
                href="#how"
                className="btn-ghost px-7 py-3.5 text-sm"
                style={{ textDecoration: 'none', borderRadius: 14 }}
              >
                How it works
              </a>
            </div>

            <p className="mt-5 text-xs" style={{ color: '#475569' }}>
              ✦ Results are screening indicators only — always verify employers independently.
            </p>

            {/* Stats row */}
            <div
              className="mt-10 grid grid-cols-3 gap-4 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {stats.map(({ icon, value, label }) => (
                <div key={label} className="text-center">
                  <div
                    className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: 'rgba(108,99,255,0.12)', color: '#6C63FF' }}
                  >
                    {icon}
                  </div>
                  <p
                    className="text-xl font-extrabold"
                    style={{
                      background: 'linear-gradient(135deg, #6C63FF, #06B6D4)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {value}
                  </p>
                  <p className="text-[10px] font-medium mt-0.5" style={{ color: '#64748B' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — Logo showcase */}
          <div className="hidden lg:flex items-center justify-center animate-slide-in-right">
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-full animate-spin-slow"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(108,99,255,0.4), rgba(6,182,212,0.4), rgba(139,92,246,0.4), rgba(108,99,255,0.4))',
                  filter: 'blur(20px)',
                  transform: 'scale(1.15)',
                  zIndex: 0,
                }}
              />

              {/* Glass disc */}
              <div
                style={{
                  width: 380,
                  height: 380,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, rgba(108,99,255,0.15), rgba(6,182,212,0.08) 60%, rgba(8,11,20,0.6))',
                  border: '1px solid rgba(108,99,255,0.25)',
                  boxShadow: '0 0 80px rgba(108,99,255,0.25), inset 0 0 60px rgba(108,99,255,0.05)',
                  backdropFilter: 'blur(20px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <img
                  src="/logo.png"
                  alt="JobShield AI"
                  className="animate-float"
                  style={{ width: 260, height: 260, objectFit: 'contain', filter: 'drop-shadow(0 8px 32px rgba(108,99,255,0.4))' }}
                />
              </div>

              {/* Floating badge cards */}
              <div
                className="absolute animate-pulse-slow"
                style={{
                  top: '8%', right: '-14%',
                  background: 'rgba(15,23,42,0.9)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: 12,
                  padding: '10px 16px',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 20px rgba(16,185,129,0.15)',
                }}
              >
                <p className="text-[10px] font-semibold" style={{ color: '#6EE7B7' }}>✓ Genuine Job</p>
                <p className="text-[9px]" style={{ color: '#94A3B8' }}>Confidence 94%</p>
              </div>

              <div
                className="absolute animate-pulse-slow"
                style={{
                  bottom: '14%', left: '-12%',
                  animationDelay: '1.5s',
                  background: 'rgba(15,23,42,0.9)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: 12,
                  padding: '10px 16px',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 20px rgba(239,68,68,0.15)',
                }}
              >
                <p className="text-[10px] font-semibold" style={{ color: '#FCA5A5' }}>⚠ Fraud Detected</p>
                <p className="text-[9px]" style={{ color: '#94A3B8' }}>3 Red Flags Found</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 120,
          background: 'linear-gradient(to bottom, transparent, #080B14)',
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}
