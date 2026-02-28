'use client'

import { useRef, useEffect, ReactNode } from 'react'

interface ScrollRevealProps {
    children: ReactNode
    delay?: number
    className?: string
    style?: React.CSSProperties
}

export default function ScrollReveal({
    children,
    delay = 0,
    className = '',
    style = {},
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        el.style.opacity = '1'
                        el.style.transform = 'translateY(0)'
                    }, delay)
                    observer.unobserve(el)
                }
            },
            { threshold: 0.15 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [delay])

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: 0,
                transform: 'translateY(32px)',
                transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
                ...style,
            }}
        >
            {children}
        </div>
    )
}
