'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import SatelliteOrbitalScene from './three/SatelliteOrbitalScene'

export default function ExperienceCanvas() {
    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none'
        }}>
            <Canvas
                shadows
                gl={{ antialias: true, alpha: true }}
                style={{ width: '100%', height: '100%' }}
            >
                <Suspense fallback={null}>
                    <SatelliteOrbitalScene />
                </Suspense>
            </Canvas>
        </div>
    )
}
