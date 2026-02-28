'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const duration = 2500
        const interval = 30
        const steps = duration / interval
        let current = 0

        const timer = setInterval(() => {
            current++
            const eased = Math.min(100, Math.round((1 - Math.pow(1 - current / steps, 3)) * 100))
            setProgress(eased)

            if (current >= steps) {
                clearInterval(timer)
                setTimeout(() => setIsVisible(false), 400)
            }
        }, interval)

        return () => clearInterval(timer)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: '#09090B',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '32px',
                    }}
                >
                    {/* Wordmark */}
                    <motion.div
                        initial={{ opacity: 0, letterSpacing: '0.8em' }}
                        animate={{ opacity: 1, letterSpacing: '0.3em' }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 700,
                            fontSize: '14px',
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            color: '#F5F5F7',
                        }}
                    >
                        VAITOR
                    </motion.div>

                    {/* Progress bar */}
                    <div style={{ width: '120px', position: 'relative' }}>
                        <div
                            style={{
                                height: '1px',
                                background: 'rgba(255,255,255,0.08)',
                                borderRadius: '2px',
                                overflow: 'hidden',
                            }}
                        >
                            <motion.div
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #6366F1, #818CF8)',
                                    borderRadius: '2px',
                                }}
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1, ease: 'linear' }}
                            />
                        </div>
                        {/* Counter */}
                        <div
                            style={{
                                marginTop: '12px',
                                textAlign: 'center',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '11px',
                                fontWeight: 500,
                                letterSpacing: '0.1em',
                                color: '#A1A1AA',
                                fontVariantNumeric: 'tabular-nums',
                            }}
                        >
                            {String(progress).padStart(3, '0')}%
                        </div>
                    </div>

                    {/* Subtle tagline */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: progress > 50 ? 0.4 : 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            position: 'absolute',
                            bottom: '48px',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '11px',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: '#A1A1AA',
                        }}
                    >
                        Initializing signal…
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
