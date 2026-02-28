'use client'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer
            style={{
                background: '#09090B',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                padding: '40px 32px',
            }}
        >
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    textAlign: 'center',
                }}
            >
                {/* Brand */}
                <div
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: '12px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(245,245,247,0.3)',
                    }}
                >
                    VAITOR
                </div>

                {/* Links */}
                <div
                    style={{
                        display: 'flex',
                        gap: '32px',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    <a
                        href="https://linkedin.com/in/reevelobo"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '12px',
                            color: '#A1A1AA',
                            textDecoration: 'none',
                            transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F7')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/reevelobo"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '12px',
                            color: '#A1A1AA',
                            textDecoration: 'none',
                            transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F7')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
                    >
                        GitHub
                    </a>
                    <a
                        href="mailto:reevelobo@outlook.com"
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '12px',
                            color: '#A1A1AA',
                            textDecoration: 'none',
                            transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F7')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
                    >
                        Email
                    </a>
                </div>

                {/* Copyright */}
                <p
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        color: 'rgba(161,161,170,0.45)',
                        letterSpacing: '0.04em',
                    }}
                >
                    VAITOR · Reeve Lobo · © {year}
                </p>

                {/* Tagline */}
                <p
                    style={{
                        fontFamily: 'DM Serif Display, serif',
                        fontStyle: 'italic',
                        fontSize: '13px',
                        color: 'rgba(129,140,248,0.35)',
                    }}
                >
                    Signal end.
                </p>
            </div>
        </footer>
    )
}
