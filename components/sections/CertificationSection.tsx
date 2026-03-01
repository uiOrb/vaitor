'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../ScrollReveal'
import Image from 'next/image'

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
                    {/* Front Side */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backfaceVisibility: 'hidden',
                            background: '#18181B',
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
                        {/* Background glow */}
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

                        <div
                            style={{
                                position: 'relative',
                                width: '140px',
                                height: '140px',
                                marginBottom: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                src={cert.badge}
                                alt={cert.title}
                                width={140}
                                height={140}
                                style={{ objectFit: 'contain' }}
                            />
                        </div>

                        <div style={{ height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3
                                style={{
                                    fontSize: '17px',
                                    fontWeight: 600,
                                    color: '#F5F5F7',
                                    marginBottom: '6px',
                                    lineHeight: '1.3',
                                }}
                            >
                                {cert.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: '12px',
                                    color: '#A1A1AA',
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                    fontWeight: 500,
                                }}
                            >
                                {cert.org}
                            </p>
                        </div>

                        <div
                            style={{
                                marginTop: '16px',
                                fontSize: '10px',
                                color: cert.color,
                                border: `1px solid ${cert.color}44`,
                                padding: '4px 12px',
                                borderRadius: '100px',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                            }}
                        >
                            Tap to flip
                        </div>
                    </div>

                    {/* Back Side */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            background: '#1E1E26',
                            borderRadius: '20px',
                            border: `1px solid ${cert.color}44`,
                            padding: '32px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                        }}
                    >
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h4
                                style={{
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    color: cert.color,
                                    marginBottom: '16px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    textAlign: 'left',
                                }}
                            >
                                Achievement Log
                            </h4>
                            <p
                                style={{
                                    fontSize: '15px',
                                    lineHeight: '1.6',
                                    color: '#D4D4D8',
                                    fontStyle: 'italic',
                                    fontFamily: 'DM Serif Display, serif',
                                    textAlign: 'left',
                                }}
                            >
                                &ldquo;{cert.experience}&rdquo;
                            </p>
                        </div>
                        
                        <div
                            style={{
                                marginTop: 'auto',
                                paddingTop: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                opacity: 0.6,
                            }}
                        >
                            <div style={{ width: '24px', height: '1px', background: cert.color, flexShrink: 0 }} />
                            <span style={{ fontSize: '9px', color: '#A1A1AA', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Verification Signal Active
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </ScrollReveal>
    )
}

export default function CertificationSection() {
    return (
        <section
            id="archives"
            className="section"
            style={{
                background: '#09090B',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Ambient subtle light */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    height: '80%',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.03) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />

            <div className="section-inner">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <ScrollReveal>
                        <p className="section-label">CHAPTER 03 · CREDENTIAL ARCHIVES</p>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <h2>Validated skills. Tested in the field.</h2>
                    </ScrollReveal>
                </div>

                {/* Grid */}
                <div
                    className="cert-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '24px',
                    }}
                >
                    {certifications.map((cert, i) => (
                        <CertificationCard key={cert.id} cert={cert} index={i} />
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @media (max-width: 1200px) {
                    .cert-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                @media (max-width: 640px) {
                    .cert-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .cert-card-container {
                        height: 340px !important;
                    }
                }
            `}</style>
        </section>
    )
}
