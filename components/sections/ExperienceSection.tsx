'use client'

import { useRef, useEffect } from 'react'
import ScrollReveal from '../ScrollReveal'

const experiences = [
    {
        id: 1,
        role: 'DevSecOps Engineer',
        company: 'IBM',
        period: '2025 — Present',
        location: 'Bengaluru, India',
        description:
            'I’m a DevSecOps engineer focused on building secure, resilient delivery systems that scale in production. With a deep understanding of application code and runtime behavior, I design CI/CD pipelines that embed security by default using Azure Pipelines, SonarQube, and OWASP ZAP. My work ensures vulnerabilities are detected early, releases stay fast, and production remains stable—balancing security, performance, and reliability without friction.',
        tags: ['Azure Pipelines', 'SonarQube', 'OWASP ZAP', 'Azure', 'GitOps'],
        current: true,
    },
    {
        id: 2,
        role: 'Associate Software Engineer - Development',
        company: 'Kyndryl',
        period: '2022 — 2025',
        location: 'Bengaluru, India',
        description:
            'Designed and maintained CI/CD pipelines for microservices deployments. Built containerized services with Docker, automated infrastructure provisioning with Terraform, and established monitoring and observability stacks for production workloads.',
        tags: ['Docker', 'Github', 'Github Actions', 'Azure Pipelines', 'Terraform', 'Python', 'Monitoring', 'Kubernetes', 'AKS', 'Azure', 'Linux', 'Powershell', 'bash', 'Azure', 'Cloud Migration', 'Architecture', 'Enterprise', 'Managed Services', 'Azure Local'],
        current: false,
    },
]

function TimelineItem({
    exp,
    index,
}: {
    exp: (typeof experiences)[0]
    index: number
}) {
    const isLeft = index % 2 === 0

    return (
        <ScrollReveal
            delay={index * 150}
            style={{
                display: 'flex',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                paddingLeft: isLeft ? '0' : '50%',
                paddingRight: isLeft ? '50%' : '0',
                position: 'relative',
                marginBottom: '64px',
            }}
            className="timeline-item-wrapper"
        >
            {/* Card */}
            <div
                className="experience-card"
                style={{
                    background: '#18181B',
                    borderRadius: '16px',
                    border: exp.current
                        ? '1px solid rgba(99,102,241,0.3)'
                        : '1px solid rgba(255,255,255,0.06)',
                    padding: '32px',
                    maxWidth: '420px',
                    width: '100%',
                    borderLeft: exp.current
                        ? '4px solid #6366F1'
                        : '4px solid rgba(255,255,255,0.05)',
                    position: 'relative',
                }}
            >
                {exp.current && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            padding: '3px 10px',
                            borderRadius: '100px',
                            background: 'rgba(99,102,241,0.15)',
                            border: '1px solid rgba(99,102,241,0.3)',
                            fontSize: '10px',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: '#818CF8',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        <span
                            style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: '#22C55E',
                                display: 'block',
                                animation: 'livePulse 2s ease-in-out infinite',
                            }}
                        />
                        Current
                    </div>
                )}

                <div
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#818CF8',
                        marginBottom: '8px',
                    }}
                >
                    {exp.period}
                </div>

                <h3
                    style={{
                        fontSize: '22px',
                        fontWeight: 600,
                        color: '#F5F5F7',
                        marginBottom: '4px',
                    }}
                >
                    {exp.role}
                </h3>

                <p
                    style={{
                        fontSize: '14px',
                        color: '#A1A1AA',
                        marginBottom: '16px',
                        letterSpacing: '0.02em',
                    }}
                >
                    {exp.company} · {exp.location}
                </p>

                <p
                    style={{
                        fontSize: '15px',
                        lineHeight: '1.75',
                        color: '#A1A1AA',
                        marginBottom: '24px',
                    }}
                >
                    {exp.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {exp.tags.map((tag) => (
                        <span key={tag} className="skill-tag">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Timeline dot connector */}
            <div
                style={{
                    position: 'absolute',
                    top: '32px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: exp.current ? '#6366F1' : '#27272A',
                    border: '2px solid',
                    borderColor: exp.current ? '#818CF8' : 'rgba(255,255,255,0.1)',
                    boxShadow: exp.current ? '0 0 16px rgba(99,102,241,0.5)' : 'none',
                    zIndex: 1,
                }}
                className="timeline-dot"
            />
        </ScrollReveal>
    )
}

export default function ExperienceSection() {
    const lineRef = useRef<SVGLineElement>(null)

    useEffect(() => {
        if (!lineRef.current) return
        const line = lineRef.current
        const totalLength = 1000
        line.style.strokeDasharray = String(totalLength)
        line.style.strokeDashoffset = String(totalLength)

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    line.style.transition = 'stroke-dashoffset 2.5s cubic-bezier(0.22, 1, 0.36, 1)'
                    line.style.strokeDashoffset = '0'
                    observer.disconnect()
                }
            },
            { threshold: 0.05 }
        )
        observer.observe(line)
        return () => observer.disconnect()
    }, [])

    return (
        <section
            id="mission"
            className="section"
            style={{ background: '#09090B', position: 'relative', overflow: 'hidden' }}
        >
            {/* Background glow */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '-10%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />

            <div className="section-inner">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <ScrollReveal>
                        <p className="section-label">CHAPTER 02 · MISSION LOG</p>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <h2>Every role. A new orbit.</h2>
                    </ScrollReveal>
                </div>

                {/* Timeline */}
                <div style={{ position: 'relative' }}>
                    {/* SVG center line */}
                    <svg
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            transform: 'translateX(-50%)',
                            height: '100%',
                            width: '2px',
                            zIndex: 0,
                        }}
                    >
                        <line
                            ref={lineRef}
                            x1="1"
                            y1="0"
                            x2="1"
                            y2="1000"
                            stroke="rgba(99,102,241,0.3)"
                            strokeWidth="1"
                            className="timeline-line"
                        />
                    </svg>

                    {experiences.map((exp, i) => (
                        <TimelineItem key={exp.id} exp={exp} index={i} />
                    ))}
                </div>
            </div>

            <style jsx global>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .timeline-item-wrapper {
            padding-left: 24px !important;
            padding-right: 0 !important;
            justify-content: flex-start !important;
          }
          .experience-card {
            padding: 24px !important;
          }
          .timeline-dot {
            left: 0 !important;
            transform: translateX(-50%) !important;
          }
          svg {
            left: 0 !important;
            transform: none !important;
          }
        }
      `}</style>
        </section>
    )
}
