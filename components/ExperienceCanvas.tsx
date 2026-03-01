'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import SatelliteOrbitalScene from './three/SatelliteOrbitalScene'

export default function ExperienceCanvas() {
    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none'
        }}>
            <Canvas
                shadows
                gl={{ antialias: true, alpha: true }}
                camera={{ position: [0, 5, 20], fov: 50 }}
            >
                <Suspense fallback={null}>
                    <SatelliteOrbitalScene />
                </Suspense>
            </Canvas>
        </div>
    )
}
