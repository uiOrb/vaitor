'use client'

import React, { useRef, useEffect } from 'react'

interface Star {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    baseOpacity: number
    color: string
}

export default function CosmicBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: 0, y: 0, active: false })
    const starsRef = useRef<Star[]>([])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        const starCount = 300
        const gravityRadius = 250
        const gravityStrength = 0.005
        const friction = 0.98

        const initStars = () => {
            const { width, height } = canvas
            const stars: Star[] = []
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.2,
                    size: Math.random() * 1.5 + 0.5,
                    baseOpacity: Math.random() * 0.5 + 0.2,
                    color: Math.random() > 0.8 ? '#818CF8' : '#FFFFFF'
                })
            }
            starsRef.current = stars
        }

        const resize = () => {
            const parent = canvas.parentElement
            if (parent) {
                canvas.width = parent.clientWidth
                canvas.height = parent.clientHeight
                initStars()
            }
        }

        const animate = () => {
            if (!ctx) return
            const { width, height } = canvas
            ctx.clearRect(0, 0, width, height)

            starsRef.current.forEach((star) => {
                // 1. Natural Motion
                star.x += star.vx
                star.y += star.vy

                // 2. Gravitational Pull
                if (mouseRef.current.active) {
                    const dx = mouseRef.current.x - star.x
                    const dy = mouseRef.current.y - star.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < gravityRadius) {
                        const force = (gravityRadius - dist) / gravityRadius
                        star.vx += dx * force * gravityStrength
                        star.vy += dy * force * gravityStrength
                        
                        // Increase brightness on hover
                        star.baseOpacity = Math.min(1, star.baseOpacity + 0.05)
                    } else {
                        // Slowly return to base opacity
                        star.baseOpacity = Math.max(0.3, star.baseOpacity - 0.01)
                    }
                }

                // 3. Friction & Boundaries
                star.vx *= friction
                star.vy *= friction

                if (star.x < 0) star.x = width
                if (star.x > width) star.x = 0
                if (star.y < 0) star.y = height
                if (star.y > height) star.y = 0

                // 4. Draw
                ctx.beginPath()
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
                ctx.fillStyle = star.color
                ctx.globalAlpha = star.baseOpacity
                ctx.fill()
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        window.addEventListener('resize', resize)
        resize()
        animate()

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                active: true
            }
        }

        const handleMouseLeave = () => {
            mouseRef.current.active = false
        }

        const parent = canvas.parentElement
        if (parent) {
            parent.addEventListener('mousemove', handleMouseMove)
            parent.addEventListener('mouseleave', handleMouseLeave)
        }

        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animationFrameId)
            if (parent) {
                parent.removeEventListener('mousemove', handleMouseMove)
                parent.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    )
}
