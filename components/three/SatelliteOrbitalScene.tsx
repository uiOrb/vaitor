'use client'

import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Constants for orbital mechanics
const MU = 100 // Gravitational parameter for our "earth" (off-screen)
const RADIUS = 18 // Slightly larger radius for better framing
const DRIFT_STRENGTH = 0.001 // Simulated orbital drift
const STATION_KEEPING_THRESHOLD = 0.5 // Distance before auto-correction
const THRUSTER_STRENGTH = 0.08

/**
 * Satellite Geometry (Procedural high-quality model)
 */
function SatelliteModel({ thrusterActive, alignment }: { thrusterActive: boolean, alignment: THREE.Vector3 }) {
    const group = useRef<THREE.Group>(null)
    const solarWingL = useRef<THREE.Group>(null)
    const solarWingR = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!group.current) return
        
        // 1. Attitude Control: Align model to velocity vector
        if (alignment.length() > 0.01) {
            const lookAtMatrix = new THREE.Matrix4()
            // Satellite "forward" is Y up in Three.js default if we use lookAt, 
            // but we want it to look "ahead" along velocity.
            lookAtMatrix.lookAt(new THREE.Vector3(0, 0, 0), alignment, new THREE.Vector3(0, 1, 0))
            const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix)
            group.current.quaternion.slerp(targetQuaternion, 0.05)
        }

        // 2. Subtle reaction wheel jitter
        const t = state.clock.elapsedTime
        group.current.rotation.x += Math.sin(t * 0.5) * 0.0005
        group.current.rotation.z += Math.cos(t * 0.3) * 0.0005
    })

    return (
        <group ref={group}>
            {/* Main Body - Bus */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[1, 1.2, 1]} />
                <meshStandardMaterial color="#27272A" metalness={0.9} roughness={0.1} />
            </mesh>
            
            {/* Gold Foil Wrapper */}
            <mesh position={[0, 0, 0]} scale={[1.05, 1.05, 1.05]}>
                <boxGeometry args={[1, 0.8, 1]} />
                <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} emissive="#443300" emissiveIntensity={0.2} />
            </mesh>

            {/* Solar Panel Wings */}
            <group ref={solarWingL} position={[-0.5, 0, 0]}>
                <mesh position={[-1.5, 0, 0]}>
                    <boxGeometry args={[3, 0.8, 0.05]} />
                    <meshStandardMaterial color="#1E3A8A" metalness={0.8} roughness={0.2} emissive="#001133" />
                </mesh>
                <mesh position={[-1.5, 0, 0.03]}>
                    <planeGeometry args={[2.9, 0.7]} />
                    <meshBasicMaterial color="#60A5FA" wireframe transparent opacity={0.2} />
                </mesh>
            </group>

            <group ref={solarWingR} position={[0.5, 0, 0]}>
                <mesh position={[1.5, 0, 0]}>
                    <boxGeometry args={[3, 0.8, 0.05]} />
                    <meshStandardMaterial color="#1E3A8A" metalness={0.8} roughness={0.2} emissive="#001133" />
                </mesh>
                <mesh position={[1.5, 0, 0.03]}>
                    <planeGeometry args={[2.9, 0.7]} />
                    <meshBasicMaterial color="#60A5FA" wireframe transparent opacity={0.2} />
                </mesh>
            </group>

            {/* Main Antenna Dish */}
            <group position={[0, 0.6, 0]} rotation={[-Math.PI / 4, 0, 0]}>
                <mesh>
                    <sphereGeometry args={[0.4, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#A1A1AA" metalness={0.8} roughness={0.3} side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[0, 0.5, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.6]} />
                    <meshStandardMaterial color="#52525B" />
                </mesh>
            </group>

            {/* Thruster Nozzles */}
            {[-0.4, 0.4].map((x, i) => (
                <group key={i} position={[x, -0.6, 0]}>
                    <mesh rotation={[Math.PI, 0, 0]}>
                        <cylinderGeometry args={[0.05, 0.1, 0.2]} />
                        <meshStandardMaterial color="#3F3F46" metalness={1} />
                    </mesh>
                    {thrusterActive && (
                        <mesh position={[0, -0.2, 0]}>
                            <coneGeometry args={[0.08, 0.4, 8]} />
                            <meshBasicMaterial color="#60A5FA" transparent opacity={0.8} />
                        </mesh>
                    )}
                </group>
            ))}
        </group>
    )
}

export default function SatelliteOrbitalScene() {
    const pos = useRef(new THREE.Vector3(RADIUS, 0, 0))
    const vel = useRef(new THREE.Vector3(0, 0, Math.sqrt(MU / RADIUS)))
    const targetPos = useRef(new THREE.Vector3().copy(pos.current))
    
    const [thrusterActive, setThrusterActive] = useState(false)
    const [scrollOffset, setScrollOffset] = useState(0)
    
    const center = useMemo(() => new THREE.Vector3(-15, 0, 0), [])

    useEffect(() => {
        const handleScroll = () => {
            const scrollableHeight = document.body.scrollHeight - window.innerHeight
            const sc = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0
            setScrollOffset(sc)
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useFrame((_state, delta) => {
        const dt = Math.min(delta, 0.1)

        // 1. Target Tracking
        // Map scroll to 120 degree arc
        const targetAngle = (scrollOffset * Math.PI * 0.6) - Math.PI / 3
        const tx = center.x + Math.cos(targetAngle) * RADIUS
        const tz = center.z + Math.sin(targetAngle) * RADIUS
        targetPos.current.set(tx, 0, tz)

        // 2. Physics Integration
        const rVec = new THREE.Vector3().copy(pos.current).sub(center)
        const rMag = rVec.length()
        const gravity = rVec.normalize().multiplyScalar(-MU / (rMag * rMag))
        
        // 3. Thruster Logic
        const distToTarget = pos.current.distanceTo(targetPos.current)
        let thrusting = false
        
        if (distToTarget > STATION_KEEPING_THRESHOLD) {
            thrusting = true
            const direction = new THREE.Vector3().copy(targetPos.current).sub(pos.current).normalize()
            vel.current.add(direction.multiplyScalar(THRUSTER_STRENGTH * dt))
        }

        vel.current.x += (Math.random() - 0.5) * DRIFT_STRENGTH
        vel.current.z += (Math.random() - 0.5) * DRIFT_STRENGTH

        vel.current.add(gravity.multiplyScalar(dt))
        pos.current.add(new THREE.Vector3().copy(vel.current).multiplyScalar(dt))

        if (thrusterActive !== thrusting) setThrusterActive(thrusting)
    })

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[20, 20, 20]} intensity={2} color="#FFFFFF" />
            <pointLight position={[-20, -10, -10]} intensity={1} color="#6366F1" />

            <group position={[pos.current.x, pos.current.y, pos.current.z]}>
                <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                    <SatelliteModel thrusterActive={thrusterActive} alignment={vel.current} />
                </Float>
            </group>

            <PerspectiveCamera makeDefault position={[10, 15, 30]} fov={40} />
        </>
    )
}
