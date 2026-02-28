'use client'

import { Canvas } from '@react-three/fiber'
import { SkillsConstellation } from './three/SkillsConstellation'

export default function SkillsCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 12], fov: 65 }}
            style={{ width: '100%', height: '100%' }}
            gl={{ antialias: true, alpha: true }}
        >
            <color attach="background" args={['#09090B']} />
            <SkillsConstellation />
        </Canvas>
    )
}
