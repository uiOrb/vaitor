'use client'

import { Suspense, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const SpaceCanvas = dynamic(() => import('@/components/SpaceCanvas'), { ssr: false })
const ColorBends = dynamic(() => import('@/components/three/ColorBends'), { ssr: false })

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null)

    const scrollToNext = () => {
        const next = document.getElementById('origin')
        if (next) next.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            ref={sectionRef}
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                background: '#09090B',
            }}
            aria-label="Hero"
        >
            {/* ColorBends Background Shader */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.6 }}>
                <ColorBends
                    colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
                    rotation={0}
                    speed={0.15}
                    scale={1.2}
                    frequency={0.8}
                    warpStrength={1.2}
                    mouseInfluence={1.5}
                    parallax={1.0}
                    noise={0.15}
                    transparent
                />
            </div>

            {/* 3D Background Canvas */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
                <Suspense fallback={null}>
                    <SpaceCanvas />
                </Suspense>
            </div>

            {/* Gradient overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 2,
                    background:
                        'radial-gradient(ellipse at center, rgba(9,9,11,0.05) 0%, rgba(9,9,11,0.4) 70%, rgba(9,9,11,0.8) 100%)',
                }}
            />

            {/* Content */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '0 24px',
                }}
            >
                {/* Top wordmark */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 3.0, ease: [0.22, 1, 0.36, 1] }}
                    className="hero-wordmark"
                    style={{
                        position: 'absolute',
                        top: '80px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: '12px',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: 'rgba(245,245,247,0.5)',
                    }}
                >
                    VAITOR
                </motion.div>

                {/* Signal origin label */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 3.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        fontSize: '11px',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#818CF8',
                        marginBottom: '24px',
                    }}
                >
                    SIGNAL ORIGIN · BENGALURU, INDIA
                </motion.p>

                {/* Hero H1 */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0, delay: 3.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: 'clamp(36px, 7vw, 88px)',
                        letterSpacing: '-0.04em',
                        lineHeight: 1.05,
                        color: '#F5F5F7',
                        maxWidth: '900px',
                        margin: '0 auto 24px',
                    }}
                >
                    SOFTWARE DEVELOPER.
                    <br />
                    <span
                        style={{
                            background: 'linear-gradient(135deg, #818CF8 0%, #6366F1 50%, #A78BFA 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        EXPLORER.
                    </span>
                    {' '}BUILDER.
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 3.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontFamily: 'DM Serif Display, serif',
                        fontStyle: 'italic',
                        fontSize: 'clamp(18px, 2.5vw, 26px)',
                        color: '#A1A1AA',
                        marginBottom: '48px',
                        maxWidth: '600px',
                    }}
                >
                    A journey through code, craft, and cosmos.
                </motion.p>

                {/* CTA */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 3.6, ease: [0.22, 1, 0.36, 1] }}
                    onClick={scrollToNext}
                    className="btn-primary"
                    style={{ letterSpacing: '0.06em' }}
                    id="hero-cta"
                >
                    ENTER THE SIGNAL
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.button>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 4.0 }}
                    style={{
                        position: 'absolute',
                        bottom: '36px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                    }}
                    onClick={scrollToNext}
                >
                    <span
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '10px',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: '#A1A1AA',
                            opacity: 0.6,
                        }}
                    >
                        Scroll
                    </span>
                    {/* Animated orbit ring */}
                    <div
                        style={{
                            width: '24px',
                            height: '24px',
                            border: '1px solid rgba(129,140,248,0.4)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            animation: 'scrollBounce 2s ease-in-out infinite',
                        }}
                    >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M5 2L5 8M2.5 5.5L5 8L7.5 5.5" stroke="#818CF8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.5; }
        }
        @media (max-width: 768px) {
          .hero-wordmark {
            top: 60px !important;
          }
          h1 {
            line-height: 1.2 !important;
          }
        }
      `}</style>
        </section>
    )
}
