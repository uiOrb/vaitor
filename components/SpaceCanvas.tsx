'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef, useEffect } from 'react'
import { StarField, GalaxyParticles, Planet } from '@/components/three/SpaceScene'

function CameraController() {
    const { camera, mouse } = useThree()
    const scrollRef = useRef(0)
    const targetZ = useRef(30)
    const targetRotX = useRef(0)

    useEffect(() => {
        const handleScroll = () => {
            const maxScroll = document.body.scrollHeight - window.innerHeight
            scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useFrame((state) => {
        // Scroll-driven position
        const sc = scrollRef.current
        const zPos = 30 - sc * 110 // Deeper zoom
        const xRot = -sc * 0.4

        // Smooth lerp for camera
        camera.position.z += (zPos - camera.position.z) * 0.05
        camera.rotation.x += (xRot - camera.rotation.x) * 0.05

        // Subtle mouse tilt for "floaty" space feel
        camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05
        camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05
    })

    return null
}

export default function SpaceCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 30], fov: 75 }}
            style={{ width: '100%', height: '100%' }}
            gl={{ antialias: true, alpha: false, stencil: false }}
        >
            <color attach="background" args={['#09090B']} />

            {/* Ambient Base */}
            <ambientLight intensity={0.6} />

            {/* The Sun / Primary Light Source for Planet */}
            <pointLight position={[25, 15, 15]} intensity={3.5} color="#ffffff" castShadow />
            <pointLight position={[-20, -15, -40]} intensity={2.0} color="#6366F1" />

            <Suspense fallback={null}>
                <StarField />
                <GalaxyParticles />
                <Planet />
                <CameraController />
            </Suspense>
        </Canvas>
    )
}
