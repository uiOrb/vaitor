'use client'

import ScrollReveal from '../ScrollReveal'

export default function AboutSection() {
    return (
        <section
            id="origin"
            className="section"
            style={{
                background: 'linear-gradient(180deg, #09090B 0%, #0D0D1A 40%, #0D0D1A 60%, #09090B 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background glow */}
            <div
                style={{
                    position: 'absolute',
                    top: '30%',
                    right: '-5%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />

            <div className="section-inner">
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '96px',
                        alignItems: 'center',
                    }}
                    className="about-grid"
                >
                    {/* Left: Text */}
                    <div>
                        <ScrollReveal delay={0}>
                            <p className="section-label">CHAPTER 01 · ORIGIN</p>
                        </ScrollReveal>

                        <ScrollReveal delay={100}>
                            <h2
                                style={{
                                    marginBottom: '32px',
                                    maxWidth: '520px',
                                }}
                            >
                                Born from curiosity.{' '}
                                <span
                                    style={{
                                        fontFamily: 'DM Serif Display, serif',
                                        fontStyle: 'italic',
                                        color: '#818CF8',
                                    }}
                                >
                                    Built to engineer.
                                </span>
                            </h2>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <p
                                style={{
                                    fontSize: '18px',
                                    lineHeight: '1.9',
                                    color: '#A1A1AA',
                                    marginBottom: '24px',
                                }}
                            >
                                I&apos;m Reeve Lobo — a Infrastructure Specialist at IBM, based in Bengaluru, India.
                                My work sits at the intersection of infrastructure, cloud architecture, and intelligent
                                systems, where I turn complex problems into elegant solutions that scale.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <p
                                style={{
                                    fontSize: '18px',
                                    lineHeight: '1.9',
                                    color: '#A1A1AA',
                                    marginBottom: '32px',
                                }}
                            >
                                With a deep passion for Kubernetes, DevOps pipelines, and AI-driven platforms,
                                I believe in building technology that doesn&apos;t just function — it resonates.
                                Every system I design carries a story, a purpose, and a drive to go further.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <p
                                style={{
                                    fontSize: '18px',
                                    lineHeight: '1.9',
                                    color: '#A1A1AA',
                                    marginBottom: '40px',
                                }}
                            >
                                When I&apos;m not architecting hybrid cloud environments or crafting intelligent agents,
                                you&apos;ll find me exploring new languages, contributing to open source, and chasing
                                the horizon of what&apos;s technologically possible.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={500}>
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                <a
                                    href="https://linkedin.com/in/reevelobo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                >
                                    View LinkedIn
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                                <a
                                    href="https://github.com/reevelobo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                >
                                    GitHub
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right: Abstract sphere (CSS-based) */}
                    <ScrollReveal delay={200} style={{ display: 'flex', justifyContent: 'center' }}>
                        <div
                            style={{
                                position: 'relative',
                                width: '380px',
                                height: '380px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {/* Outer orbit ring */}
                            <div
                                style={{
                                    position: 'absolute',
                                    width: '340px',
                                    height: '340px',
                                    borderRadius: '50%',
                                    border: '1px solid rgba(99,102,241,0.15)',
                                    animation: 'orbitPulse 6s ease-in-out infinite',
                                }}
                            />
                            {/* Middle orbit ring */}
                            <div
                                style={{
                                    position: 'absolute',
                                    width: '260px',
                                    height: '260px',
                                    borderRadius: '50%',
                                    border: '1px solid rgba(129,140,248,0.2)',
                                    animation: 'orbitPulse2 4s ease-in-out infinite',
                                }}
                            />
                            {/* Sphere */}
                            <div
                                style={{
                                    width: '180px',
                                    height: '180px',
                                    borderRadius: '50%',
                                    background: 'radial-gradient(circle at 35% 35%, #4f46e5 0%, #1e1b4b 40%, #0a0a1a 100%)',
                                    boxShadow: '0 0 60px rgba(99,102,241,0.4), 0 0 120px rgba(99,102,241,0.15), inset 0 0 40px rgba(129,140,248,0.2)',
                                    animation: 'sphereFloat 8s ease-in-out infinite',
                                }}
                            />
                            {/* Orbiting dot */}
                            <div
                                style={{
                                    position: 'absolute',
                                    width: '340px',
                                    height: '340px',
                                    borderRadius: '50%',
                                    animation: 'orbitDot 8s linear infinite',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        left: '50%',
                                        transform: 'translateX(-50%) translateY(-4px)',
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: '#818CF8',
                                        boxShadow: '0 0 12px rgba(129,140,248,0.8)',
                                    }}
                                />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            <style jsx>{`
        @keyframes orbitPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.04); opacity: 1; }
        }
        @keyframes orbitPulse2 {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.4; }
          50% { transform: scale(1.06) rotate(180deg); opacity: 0.8; }
        }
        @keyframes sphereFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes orbitDot {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
        </section>
    )
}
