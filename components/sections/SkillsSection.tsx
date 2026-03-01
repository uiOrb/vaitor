'use client'
import { Suspense, useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import ScrollReveal from '../ScrollReveal'
import CosmicBackground from './CosmicBackground'

const SkillsCanvas = dynamic(() => import('../SkillsCanvas'), { ssr: false })

const categories = [
    { name: 'Languages', color: '#818CF8', items: ['Python', 'TypeScript', 'Go', 'Bash'] },
    { name: 'Frameworks', color: '#6EE7B7', items: ['Next.js', 'React', 'Node.js', 'gRPC'] },
    { name: 'DevOps', color: '#FCD34D', items: ['Kubernetes', 'Docker', 'Terraform', 'GitHub Actions'] },
    { name: 'Cloud', color: '#60A5FA', items: ['Azure', 'AKS', 'Backstage', 'Azure Local'] },
]

export default function SkillsSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const [opacity, setOpacity] = useState(0)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!sectionRef.current) return
            const rect = sectionRef.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            sectionRef.current.style.setProperty('--mouse-x', `${x}px`)
            sectionRef.current.style.setProperty('--mouse-y', `${y}px`)
        }

        const handleMouseEnter = () => setOpacity(1)
        const handleMouseLeave = () => setOpacity(0)

        const el = sectionRef.current
        if (el) {
            el.addEventListener('mousemove', handleMouseMove)
            el.addEventListener('mouseenter', handleMouseEnter)
            el.addEventListener('mouseleave', handleMouseLeave)
        }

        return () => {
            if (el) {
                el.removeEventListener('mousemove', handleMouseMove)
                el.removeEventListener('mouseenter', handleMouseEnter)
                el.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    }, [])

    return (
        <section
            id="systems"
            ref={sectionRef}
            className="section spotlight-section"
            style={{
                background: '#050508',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '100vh',
            }}
        >
            <CosmicBackground />

            {/* Nebula Glows (Ambient) */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `
                        radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
                    `,
                    pointerEvents: 'none',
                }}
            />

            {/* Spotlight Overlay (Additional soft glow) */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.04), transparent 80%)`,
                    opacity: opacity,
                    transition: 'opacity 0.5s ease',
                    pointerEvents: 'none',
                }}
            />

            <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <ScrollReveal>
                        <p className="section-label">CHAPTER 03 · SYSTEMS ONLINE</p>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <h2>The stack that powers the mission.</h2>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <p
                            style={{
                                marginTop: '16px',
                                color: '#A1A1AA',
                                fontSize: '16px',
                                maxWidth: '480px',
                                margin: '16px auto 0',
                            }}
                        >
                            Hover over nodes to explore the constellation of technologies
                            that bring ideas to orbit.
                        </p>
                    </ScrollReveal>
                </div>

                {/* 3D Constellation Canvas */}
                <ScrollReveal delay={100}>
                    <div
                        className="skills-canvas-container"
                        style={{
                            width: '100%',
                            height: '500px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.06)',
                            background: 'rgba(9,9,11,0.8)',
                            position: 'relative',
                        }}
                    >
                        <Suspense
                            fallback={
                                <div
                                    style={{
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#A1A1AA',
                                        fontSize: '14px',
                                        letterSpacing: '0.1em',
                                    }}
                                >
                                    Loading constellation…
                                </div>
                            }
                        >
                            <SkillsCanvas />
                        </Suspense>
                    </div>
                </ScrollReveal>

                {/* Legend */}
                <ScrollReveal delay={200}>
                    <div
                        className="skills-legend"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            gap: '32px',
                            marginTop: '48px',
                        }}
                    >
                        {categories.map((cat) => (
                            <div
                                key={cat.name}
                                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                            >
                                <div
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: cat.color,
                                        boxShadow: `0 0 8px ${cat.color}`,
                                    }}
                                />
                                <span
                                    style={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '13px',
                                        color: '#A1A1AA',
                                        fontWeight: 500,
                                    }}
                                >
                                    {cat.name}
                                </span>
                                <span
                                    style={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '12px',
                                        color: 'rgba(161,161,170,0.5)',
                                    }}
                                >
                                    ({cat.items.join(', ')})
                                </span>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          .skills-canvas-container {
            height: 350px !important;
          }
          .skills-legend {
            gap: 16px !important;
            justify-content: flex-start !important;
          }
        }
      `}</style>
        </section>
    )
}
