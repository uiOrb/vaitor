'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../ScrollReveal'

function SignalWave() {
    const bars = 12
    return (
        <div
            className="signal-wave-container"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                height: '40px',
                marginBottom: '48px',
            }}
        >
            {Array.from({ length: bars }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        width: '3px',
                        borderRadius: '2px',
                        background: 'linear-gradient(180deg, #6366F1, #818CF8)',
                        animationName: 'signalWave',
                        animationDuration: `${0.8 + (i % 4) * 0.2}s`,
                        animationTimingFunction: 'ease-in-out',
                        animationIterationCount: 'infinite',
                        animationDelay: `${i * 0.08}s`,
                        height: `${20 + Math.sin(i * 0.7) * 14}px`,
                    }}
                />
            ))}
        </div>
    )
}

const socialLinks = [
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/reevelobo',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        label: 'GitHub',
        href: 'https://github.com/reevelobo',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        label: 'Email',
        href: 'mailto:reevelobo@outlook.com',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
]

export default function ContactSection() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMsg('')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Something went wrong')
            }

            setStatus('success')
        } catch (err) {
            setStatus('error')
            setErrorMsg(err instanceof Error ? err.message : 'Connection failed. Try again.')
        }
    }

    return (
        <section
            id="contact"
            className="section"
            style={{
                background: '#09090B',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background glow */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />

            <div className="section-inner">
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '80px',
                        alignItems: 'start',
                    }}
                    className="contact-grid"
                >
                    {/* Left panel */}
                    <div>
                        <ScrollReveal>
                            <p className="section-label">CHAPTER 06 · OPEN CHANNEL</p>
                        </ScrollReveal>

                        <ScrollReveal delay={100}>
                            <h2 style={{ marginBottom: '16px' }}>Establish contact.</h2>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <p
                                style={{
                                    fontFamily: 'DM Serif Display, serif',
                                    fontStyle: 'italic',
                                    fontSize: '20px',
                                    color: '#A1A1AA',
                                    marginBottom: '48px',
                                    lineHeight: '1.6',
                                }}
                            >
                                Send a transmission. I&apos;ll respond across any timezone.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <SignalWave />
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px',
                                            padding: '16px 20px',
                                            background: '#18181B',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255,255,255,0.06)',
                                            color: '#A1A1AA',
                                            textDecoration: 'none',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            transition: 'all 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'
                                            e.currentTarget.style.color = '#F5F5F7'
                                            e.currentTarget.style.background = '#1E1E26'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                                            e.currentTarget.style.color = '#A1A1AA'
                                            e.currentTarget.style.background = '#18181B'
                                        }}
                                    >
                                        <span style={{ color: '#818CF8' }}>{link.icon}</span>
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right: Form */}
                    <ScrollReveal delay={150}>
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="contact-form-success"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: '400px',
                                        textAlign: 'center',
                                        gap: '24px',
                                        padding: '48px',
                                        background: '#18181B',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(99,102,241,0.2)',
                                    }}
                                >
                                    {/* Animated checkmark */}
                                    <div
                                        style={{
                                            width: '72px',
                                            height: '72px',
                                            borderRadius: '50%',
                                            background: 'rgba(99,102,241,0.15)',
                                            border: '2px solid rgba(99,102,241,0.4)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            animation: 'successPop 0.5s ease-out',
                                        }}
                                    >
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                            <motion.path
                                                d="M8 16L13 21L24 11"
                                                stroke="#818CF8"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.6, delay: 0.2 }}
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 style={{ marginBottom: '8px', color: '#F5F5F7' }}>Transmission received.</h3>
                                        <p style={{ color: '#818CF8', fontSize: '15px' }}>Standing by for your signal.</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    className="contact-form"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '20px',
                                        padding: '40px',
                                        background: '#18181B',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                    }}
                                >
                                    <div>
                                        <label
                                            htmlFor="contact-name"
                                            style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                fontSize: '11px',
                                                fontWeight: 500,
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                color: '#A1A1AA',
                                            }}
                                        >
                                            Name
                                        </label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            required
                                            placeholder="Your name"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            className="form-field"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="contact-email"
                                            style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                fontSize: '11px',
                                                fontWeight: 500,
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                color: '#A1A1AA',
                                            }}
                                        >
                                            Email
                                        </label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            required
                                            placeholder="your@email.com"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className="form-field"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="contact-message"
                                            style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                fontSize: '11px',
                                                fontWeight: 500,
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                color: '#A1A1AA',
                                            }}
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="contact-message"
                                            required
                                            rows={5}
                                            placeholder="Your message…"
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            className="form-field"
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <div
                                            style={{
                                                padding: '12px 16px',
                                                borderRadius: '8px',
                                                background: 'rgba(239,68,68,0.1)',
                                                border: '1px solid rgba(239,68,68,0.2)',
                                                color: '#FCA5A5',
                                                fontSize: '14px',
                                            }}
                                        >
                                            {errorMsg}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="btn-primary"
                                        style={{
                                            justifyContent: 'center',
                                            marginTop: '4px',
                                            opacity: status === 'loading' ? 0.7 : 1,
                                        }}
                                    >
                                        {status === 'loading' ? (
                                            <>
                                                <span
                                                    style={{
                                                        width: '14px',
                                                        height: '14px',
                                                        border: '2px solid rgba(255,255,255,0.3)',
                                                        borderTop: '2px solid white',
                                                        borderRadius: '50%',
                                                        animation: 'spin 0.8s linear infinite',
                                                        display: 'inline-block',
                                                    }}
                                                />
                                                Transmitting…
                                            </>
                                        ) : (
                                            <>
                                                SEND TRANSMISSION
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M1 8L15 1L8 15L7 9L1 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </>
                                        )}
                                    </button>

                                    <p
                                        style={{
                                            fontSize: '12px',
                                            color: '#A1A1AA',
                                            textAlign: 'center',
                                            opacity: 0.6,
                                        }}
                                    >
                                        Transmitted directly to the void ship
                                    </p>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </ScrollReveal>
                </div>
            </div>

            <style jsx global>{`
        @keyframes successPop {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes signalWave {
          0%, 100% { transform: scaleY(1); opacity: 0.7; }
          50% { transform: scaleY(1.6); opacity: 1; }
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .contact-form {
            padding: 24px !important;
          }
          .contact-form-success {
            padding: 32px 24px !important;
          }
          .signal-wave-container {
            margin-bottom: 32px !important;
            overflow-x: auto;
            max-width: 100%;
          }
        }
      `}</style>
        </section>
    )
}
