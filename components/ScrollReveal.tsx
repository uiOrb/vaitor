'use client'

import { useRef, useEffect, ReactNode, forwardRef, useImperativeHandle } from 'react'

interface ScrollRevealProps {
    children: ReactNode
    delay?: number
    className?: string
    style?: React.CSSProperties
}

const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(({
    children,
    delay = 0,
    className = '',
    style = {},
}, ref) => {
    const internalRef = useRef<HTMLDivElement>(null)
    
    // Support external ref if provided
    useImperativeHandle(ref, () => internalRef.current!)

    useEffect(() => {
        const el = internalRef.current
        // el is always defined here if rendered
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
            ref={internalRef}
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
})

ScrollReveal.displayName = 'ScrollReveal'

export default ScrollReveal
