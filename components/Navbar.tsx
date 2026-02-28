'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
    { label: 'Origin', href: '#origin' },
    { label: 'Mission', href: '#mission' },
    { label: 'Systems', href: '#systems' },
    { label: 'Transmissions', href: '#transmissions' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')

    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 50)
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    const scrollTo = (id: string) => {
        const el = document.querySelector(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
        setActiveSection(id)
    }

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 32px',
                    background: 'rgba(9,9,11,0.80)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderBottom: scrolled
                        ? '1px solid rgba(255,255,255,0.05)'
                        : '1px solid transparent',
                    transition: 'border-color 0.3s ease',
                }}
            >
                {/* Brand */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: '13px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#F5F5F7',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    VAITOR
                </button>

                {/* Desktop links */}
                <div
                    style={{
                        display: 'flex',
                        gap: '40px',
                        alignItems: 'center',
                    }}
                    className="nav-desktop"
                >
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => scrollTo(link.href)}
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 400,
                                fontSize: '14px',
                                color: activeSection === link.href ? '#818CF8' : '#A1A1AA',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'color 0.3s ease',
                                letterSpacing: '0.02em',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F7')}
                            onMouseLeave={(e) =>
                            (e.currentTarget.style.color =
                                activeSection === link.href ? '#818CF8' : '#A1A1AA')
                            }
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                {/* Hamburger */}
                <button
                    className="nav-hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'none',
                        flexDirection: 'column',
                        gap: '5px',
                        padding: '4px',
                    }}
                    aria-label="Toggle menu"
                >
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            style={{
                                display: 'block',
                                width: '22px',
                                height: '1.5px',
                                background: '#F5F5F7',
                                borderRadius: '1px',
                                transition: 'all 0.3s ease',
                                transform:
                                    menuOpen && i === 0
                                        ? 'translateY(6.5px) rotate(45deg)'
                                        : menuOpen && i === 2
                                            ? 'translateY(-6.5px) rotate(-45deg)'
                                            : menuOpen && i === 1
                                                ? 'scaleX(0)'
                                                : 'none',
                            }}
                        />
                    ))}
                </button>
            </motion.nav>

            {/* Mobile Drawer */}
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                        position: 'fixed',
                        top: '64px',
                        left: 0,
                        right: 0,
                        zIndex: 99,
                        background: 'rgba(9,9,11,0.97)',
                        backdropFilter: 'blur(20px)',
                        padding: '24px 32px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}
                >
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => scrollTo(link.href)}
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '18px',
                                fontWeight: 500,
                                color: '#F5F5F7',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                textAlign: 'left',
                                padding: '8px 0',
                                borderBottom: '1px solid rgba(255,255,255,0.04)',
                            }}
                        >
                            {link.label}
                        </button>
                    ))}
                </motion.div>
            )}

            <style jsx global>{`
        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-hamburger {
            display: flex !important;
          }
        }
      `}</style>
        </>
    )
}
