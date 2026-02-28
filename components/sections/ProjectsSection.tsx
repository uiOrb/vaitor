'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import ScrollReveal from '../ScrollReveal'

const projects = [
    {
        id: 1,
        title: 'Intelligent Platform for Hybrid Azure Kubernetes',
        description:
            'AI-driven Infrastructure Developer Portal (IDP) combining Backstage with Azure AKS, enabling self-service infrastructure provisioning, GitOps automation, and cost visibility across hybrid environments.',
        tech: ['AKS', 'Backstage', 'Terraform', 'Azure', 'AI Agents', 'GitOps'],
        color: '#6366F1',
        status: 'In Development',
        link: '#',
    },
    {
        id: 2,
        title: 'gRPC Microservices Platform',
        description:
            'Production-grade gRPC service mesh with Python, featuring bidirectional streaming, service discovery, TLS authentication, and comprehensive observability with distributed tracing.',
        tech: ['gRPC', 'Python', 'Docker', 'Kubernetes', 'Prometheus'],
        color: '#6EE7B7',
        status: 'Completed',
        link: 'https://github.com/apiOrb/gRCP-crash-course',
    },
    {
        id: 3,
        title: 'DevOps AI Agent',
        description:
            'LangGraph-powered AI agent for DevOps automation — capable of reading infrastructure state, generating Terraform plans, analyzing logs, and executing remediation workflows via natural language.',
        tech: ['Python', 'LangGraph', 'Gemini', 'Azure', 'LangChain'],
        color: '#FCD34D',
        status: 'Completed',
        link: '#',
    },
    {
        id: 4,
        title: 'Go AI Agent Blog — GitHub Pages',
        description:
            'A cinematic, premium-designed blog post deployed to GitHub Pages via automated GitHub Actions CI/CD. Features dark-themed editorial design with OG tags and LinkedIn promotion strategy.',
        tech: ['Go', 'GitHub Pages', 'GitHub Actions', 'HTML/CSS'],
        color: '#60A5FA',
        status: 'Live',
        link: '#',
    },
    {
        id: 5,
        title: 'Azure Function App — Containerized Go Microservice',
        description:
            'Containerized Go microservice deployed as an Azure Function App using Terraform. Covers Docker image building, Azure Container Registry, and cross-region quota management.',
        tech: ['Go', 'Azure Functions', 'Docker', 'Terraform', 'ACR'],
        color: '#F472B6',
        status: 'Completed',
        link: '#',
    },
    {
        id: 6,
        title: 'VAITOR Portfolio',
        description:
            'This very site — a cinematic, scroll-driven 3D portfolio experience built with Next.js 14, Three.js galaxy scenes, Framer Motion animations, and a Node.js email backend.',
        tech: ['Next.js', 'Three.js', 'Framer Motion', 'Node.js', 'TypeScript'],
        color: '#A78BFA',
        status: 'Live',
        link: '#',
    },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useTransform(y, [-100, 100], [5, -5])
    const rotateY = useTransform(x, [-100, 100], [-5, 5])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current?.getBoundingClientRect()
        if (!rect) return
        x.set(e.clientX - rect.left - rect.width / 2)
        y.set(e.clientY - rect.top - rect.height / 2)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <ScrollReveal delay={index * 100}>
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformPerspective: 1000,
                    transformStyle: 'preserve-3d',
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
                <div
                    style={{
                        background: '#18181B',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '32px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'default',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${project.color}44`
                        e.currentTarget.style.boxShadow = `0 0 40px ${project.color}15, 0 -1px 0 0 ${project.color} inset`
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                        e.currentTarget.style.boxShadow = 'none'
                    }}
                >
                    {/* Top accent line */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '1px',
                            background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                        }}
                        className="card-top-accent"
                    />

                    {/* Status badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: `${project.color}18`,
                                border: `1px solid ${project.color}33`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 1L9.5 6H15L10.5 9.5L12 14L8 11L4 14L5.5 9.5L1 6H6.5L8 1Z"
                                    fill={project.color} opacity="0.8" />
                            </svg>
                        </div>
                        <span
                            style={{
                                fontSize: '10px',
                                fontWeight: 600,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: project.status === 'Live' ? '#22C55E' : project.status === 'In Development' ? '#FCD34D' : '#A1A1AA',
                                padding: '3px 8px',
                                borderRadius: '100px',
                                background: project.status === 'Live'
                                    ? 'rgba(34,197,94,0.1)'
                                    : project.status === 'In Development'
                                        ? 'rgba(252,211,77,0.1)'
                                        : 'rgba(161,161,170,0.1)',
                                border: `1px solid ${project.status === 'Live' ? 'rgba(34,197,94,0.25)' : project.status === 'In Development' ? 'rgba(252,211,77,0.25)' : 'rgba(161,161,170,0.2)'}`,
                            }}
                        >
                            {project.status}
                        </span>
                    </div>

                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#F5F5F7',
                            marginBottom: '12px',
                            lineHeight: '1.4',
                        }}
                    >
                        {project.title}
                    </h3>

                    <p
                        style={{
                            fontSize: '14px',
                            lineHeight: '1.75',
                            color: '#A1A1AA',
                            marginBottom: '24px',
                            flex: 1,
                        }}
                    >
                        {project.description}
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '6px',
                            marginBottom: '24px',
                        }}
                    >
                        {project.tech.map((tech) => (
                            <span key={tech} className="skill-tag">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            fontWeight: 500,
                            color: project.color,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            letterSpacing: '0.04em',
                            transition: 'gap 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.gap = '10px')}
                        onMouseLeave={(e) => (e.currentTarget.style.gap = '6px')}
                    >
                        View Mission
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </motion.div>
        </ScrollReveal>
    )
}

export default function ProjectsSection() {
    return (
        <section
            id="transmissions"
            className="section"
            style={{
                background: 'linear-gradient(180deg, #09090B 0%, #0D0D1A 50%, #09090B 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Aurora effect at top */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #6366F1, #818CF8, #A78BFA, transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'auroraSlide 6s linear infinite',
                }}
            />

            <div className="section-inner">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <ScrollReveal>
                        <p className="section-label">CHAPTER 04 · TRANSMISSIONS</p>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <h2>Work beamed out into the world.</h2>
                    </ScrollReveal>
                </div>

                {/* Cards grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '24px',
                    }}
                    className="projects-grid"
                >
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>

            <style jsx global>{`
        @keyframes auroraSlide {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }
        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    )
}
