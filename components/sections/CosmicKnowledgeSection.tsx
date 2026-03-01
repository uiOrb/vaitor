'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ScrollReveal from '../ScrollReveal'
import CosmicBackground from './CosmicBackground'

const SkillsCanvas = dynamic(() => import('../SkillsCanvas'), { ssr: false })

const categories = [
    { name: 'Languages', color: '#818CF8', items: ['Python', 'TypeScript', 'Go', 'Bash', 'PowerShell'] },
    { name: 'Frameworks', color: '#6EE7B7', items: ['Next.js', 'React', 'Node.js', 'gRPC'] },
    { name: 'DevOps', color: '#FCD34D', items: ['Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'ArgoCD', 'Helm', 'Azure DevOps'] },
    { name: 'Cloud', color: '#60A5FA', items: ['Azure', 'AWS', 'GCP'] },
    { name: 'Platform', color: '#A78BFA', items: ['Backstage', 'Port'] },
]

const certifications = [
    {
        id: 1,
        title: 'Certified Kubernetes Application Developer (CKAD)',
        org: 'Cloud Native Computing Foundation',
        badge: '/ckad.png',
        color: '#326CE5',
        experience: 'Mastered core Kubernetes concepts including pod design, networking, storage, and troubleshooting. The hands-on exam was a challenging journey through real-world cluster orchestration, solidifying my ability to deploy scalable cloud-native applications.',
    },
    {
        id: 2,
        title: 'Azure Developer Associate (AZ-204)',
        org: 'Microsoft',
        badge: '/azure_dev.png',
        color: '#008AD7',
        experience: 'Built deep expertise in Azure cloud services, from App Services and Azure Functions to Cosmos DB and event-based solutions. This certification validated my skills in architecting full-stack cloud applications within the Azure ecosystem.',
    },
    {
        id: 3,
        title: 'Google Cloud Digital Leader',
        org: 'Google Cloud',
        badge: '/gcp.png',
        color: '#4285F4',
        experience: 'Explored the breadth of Google Cloud Platform capabilities, focusing on data management, AI/ML offerings, and modernizing infrastructure. This path helped me understand how GCP accelerates digital transformation through its unique network and data solutions.',
    },
    {
        id: 4,
        title: 'AWS Certified Cloud Practitioner',
        org: 'Amazon Web Services',
        badge: '/aws.png',
        color: '#FF9900',
        experience: 'Gained a foundational understanding of the AWS Cloud, including global infrastructure, security, and core services like EC2, S3, and RDS. This was my entry point into the cloud cosmos, providing a broad view of AWS architecture.',
    },
]

function CertificationCard({ cert, index }: { cert: typeof certifications[0]; index: number }) {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <ScrollReveal delay={index * 150}>
            <div
                className="cert-card-container"
                onClick={() => setIsFlipped(!isFlipped)}
                style={{
                    perspective: '1000px',
                    width: '100%',
                    height: '360px',
                    cursor: 'pointer',
                }}
            >
                <motion.div
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backfaceVisibility: 'hidden',
                            background: 'rgba(24, 24, 27, 0.8)',
                            backdropFilter: 'blur(12px)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.06)',
                            padding: '32px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: '-20%',
                                right: '-20%',
                                width: '200px',
                                height: '200px',
                                background: `radial-gradient(circle, ${cert.color}15 0%, transparent 70%)`,
                                pointerEvents: 'none',
                            }}
                        />
                        <div style={{ position: 'relative', width: '140px', height: '140px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Image src={cert.badge} alt={cert.title} width={140} height={140} style={{ objectFit: 'contain' }} />
                        </div>
                        <div style={{ height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#F5F5F7', marginBottom: '6px', lineHeight: '1.3' }}>{cert.title}</h3>
                            <p style={{ fontSize: '12px', color: '#A1A1AA', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>{cert.org}</p>
                        </div>
                        <div style={{ marginTop: '16px', fontSize: '10px', color: cert.color, border: `1px solid ${cert.color}44`, padding: '4px 12px', borderRadius: '100px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tap to flip</div>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            background: 'rgba(30, 30, 38, 0.9)',
                            backdropFilter: 'blur(12px)',
                            borderRadius: '20px',
                            border: `1px solid ${cert.color}44`,
                            padding: '32px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                        }}
                    >
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h4 style={{ fontSize: '13px', fontWeight: 600, color: cert.color, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left' }}>Achievement Log</h4>
                            <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#D4D4D8', fontStyle: 'italic', fontFamily: 'DM Serif Display, serif', textAlign: 'left' }}>&ldquo;{cert.experience}&rdquo;</p>
                        </div>
                        <div style={{ marginTop: 'auto', paddingTop: '20px', display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6 }}>
                            <div style={{ width: '24px', height: '1px', background: cert.color, flexShrink: 0 }} />
                            <span style={{ fontSize: '9px', color: '#A1A1AA', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verification Signal Active</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </ScrollReveal>
    )
}

export default function CosmicKnowledgeSection() {
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
            ref={sectionRef}
            className="spotlight-section"
            style={{
                background: '#050508',
                position: 'relative',
                overflow: 'hidden',
                padding: 'var(--space-2xl) 0',
            }}
        >
            <CosmicBackground />

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
                    zIndex: 2,
                }}
            />

            {/* Ambient Nebula */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Mouse Spotlight */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.04), transparent 80%)`,
                    opacity: opacity,
                    transition: 'opacity 0.5s ease',
                    pointerEvents: 'none',
                }}
            />

            <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
                {/* 1. SKILLS SUB-SECTION */}
                <div id="systems" style={{ marginBottom: '160px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <ScrollReveal>
                            <p className="section-label">CHAPTER 03 · SYSTEMS ONLINE</p>
                        </ScrollReveal>
                        <ScrollReveal delay={100}>
                            <h2>The stack that powers the mission.</h2>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal delay={100}>
                        <div
                            className="skills-canvas-container"
                            style={{
                                width: '100%',
                                height: '500px',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.06)',
                                background: 'rgba(9,9,11,0.4)',
                                backdropFilter: 'blur(4px)',
                                position: 'relative',
                            }}
                        >
                            <Suspense fallback={<div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A1A1AA' }}>Loading constellation…</div>}>
                                <SkillsCanvas />
                            </Suspense>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div className="skills-legend" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '32px', marginTop: '48px' }}>
                            {categories.map((cat) => (
                                <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
                                    <span style={{ fontSize: '13px', color: '#A1A1AA', fontWeight: 500 }}>{cat.name}</span>
                                    <span style={{ fontSize: '12px', color: 'rgba(161,161,170,0.5)' }}>({cat.items.join(', ')})</span>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>

                {/* 2. CERTIFICATION SUB-SECTION */}
                <div id="archives">
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <ScrollReveal>
                            <p className="section-label">CHAPTER 04 · CREDENTIAL ARCHIVES</p>
                        </ScrollReveal>
                        <ScrollReveal delay={100}>
                            <h2>Validated skills. Tested in the field.</h2>
                        </ScrollReveal>
                    </div>

                    <div className="cert-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                        {certifications.map((cert, i) => (
                            <CertificationCard key={cert.id} cert={cert} index={i} />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes auroraSlide {
                    0% { background-position: 0% 0; }
                    100% { background-position: 200% 0; }
                }
                @media (max-width: 1200px) {
                    .cert-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 768px) {
                    .skills-canvas-container { height: 350px !important; }
                    .skills-legend { gap: 16px !important; justify-content: flex-start !important; }
                }
                @media (max-width: 640px) {
                    .cert-grid { grid-template-columns: 1fr !important; }
                    .cert-card-container { height: 340px !important; }
                }
            `}</style>
        </section>
    )
}
