'use client'

import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Trail } from '@react-three/drei'
import * as THREE from 'three'

// Constants for orbital mechanics
const MU = 200 // Increased gravity for faster motion
const RADIUS = 22 // Larger radius
const DRIFT_STRENGTH = 0.001
const STATION_KEEPING_THRESHOLD = 0.5
const THRUSTER_STRENGTH = 0.15 // Faster thrusters

/**
 * Satellite Geometry (Procedural high-quality model)
 */
function SatelliteModel({ thrusterActive, alignment }: { thrusterActive: boolean, alignment: THREE.Vector3 }) {
    const group = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!group.current) return
        
        // 1. Attitude Control: Align model to velocity vector
        if (alignment.length() > 0.01) {
            const lookAtMatrix = new THREE.Matrix4()
            // eye, target, up
            lookAtMatrix.lookAt(new THREE.Vector3(0, 0, 0), alignment, new THREE.Vector3(0, 1, 0))
            const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix)
            group.current.quaternion.slerp(targetQuaternion, 0.1)
        }

        const t = state.clock.elapsedTime
        group.current.rotation.z += Math.sin(t * 0.5) * 0.002
    })

    return (
        <group ref={group}>
            {/* Main Body - Bus (Slightly larger) */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[1.5, 1.8, 1.5]} />
                <meshStandardMaterial color="#404040" metalness={0.9} roughness={0.1} />
            </mesh>
            
            {/* Gold Foil Wrapper - Very bright gold */}
            <mesh position={[0, 0, 0]} scale={[1.05, 1.05, 1.05]}>
                <boxGeometry args={[1.5, 1.2, 1.5]} />
                <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} emissive="#665500" emissiveIntensity={0.5} />
            </mesh>

            {/* Solar Panel Wings (Larger) */}
            <group position={[-0.8, 0, 0]}>
                <mesh position={[-2, 0, 0]}>
                    <boxGeometry args={[4, 1.2, 0.1]} />
                    <meshStandardMaterial color="#2563EB" metalness={0.8} roughness={0.2} emissive="#002266" />
                </mesh>
            </group>

            <group position={[0.8, 0, 0]}>
                <mesh position={[2, 0, 0]}>
                    <boxGeometry args={[4, 1.2, 0.1]} />
                    <meshStandardMaterial color="#2563EB" metalness={0.8} roughness={0.2} emissive="#002266" />
                </mesh>
            </group>

            {/* Main Antenna Dish */}
            <group position={[0, 0.9, 0]} rotation={[-Math.PI / 4, 0, 0]}>
                <mesh>
                    <sphereGeometry args={[0.6, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#D1D5DB" metalness={0.8} roughness={0.2} side={THREE.DoubleSide} />
                </mesh>
            </group>

            {/* Thruster Nozzles */}
            {[-0.5, 0.5].map((x, i) => (
                <group key={i} position={[x, -0.9, 0]}>
                    <mesh rotation={[Math.PI, 0, 0]}>
                        <cylinderGeometry args={[0.08, 0.15, 0.3]} />
                        <meshStandardMaterial color="#525252" metalness={1} />
                    </mesh>
                    {thrusterActive && (
                        <mesh position={[0, -0.3, 0]}>
                            <coneGeometry args={[0.12, 0.6, 8]} />
                            <meshBasicMaterial color="#60A5FA" transparent opacity={0.9} />
                        </mesh>
                    )}
                </group>
            ))}
        </group>
    )
}

/**
 * Main Orbital Satellite Engine
 */
export default function SatelliteOrbitalScene() {
    const groupRef = useRef<THREE.Group>(null)
    const center = useMemo(() => new THREE.Vector3(-18, 0, 0), [])
    const pos = useRef(new THREE.Vector3(center.x + RADIUS, 0, 0))
    const vel = useRef(new THREE.Vector3(0, 0, Math.sqrt(MU / RADIUS)))
    const targetPos = useRef(new THREE.Vector3().copy(pos.current))
    
    const [thrusterActive, setThrusterActive] = useState(false)
    const scrollOffset = useRef(0)
    
    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById('mission')
            if (!section) return
            
            const rect = section.getBoundingClientRect()
            const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
            scrollOffset.current = progress
        }
        
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [])

    useFrame((state, delta) => {
        const dt = Math.min(delta, 0.1)

        // 1. Target Tracking
        const arcRange = Math.PI * 0.7
        const targetAngle = (scrollOffset.current * arcRange) - arcRange / 2
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

        vel.current.add(gravity.multiplyScalar(dt))
        pos.current.add(new THREE.Vector3().copy(vel.current).multiplyScalar(dt))

        if (groupRef.current) {
            groupRef.current.position.copy(pos.current)
        }

        // Fixed camera framing looking at the center of the active area
        state.camera.lookAt(-8, 0, 0)

        if (thrusterActive !== thrusting) setThrusterActive(thrusting)
    })

    return (
        <>
            <ambientLight intensity={0.7} />
            <pointLight position={[30, 30, 30]} intensity={2.5} color="#FFFFFF" />
            <pointLight position={[-30, -15, -15]} intensity={1.5} color="#818CF8" />

            <group ref={groupRef}>
                <Trail
                    width={3}
                    length={20}
                    color={new THREE.Color('#818CF8')}
                    attenuation={(t) => t * t}
                >
                    <SatelliteModel thrusterActive={thrusterActive} alignment={vel.current} />
                </Trail>
            </group>

            <PerspectiveCamera makeDefault position={[12, 10, 35]} fov={40} />
        </>
    )
}
