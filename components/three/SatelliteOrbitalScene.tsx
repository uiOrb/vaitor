'use client'

import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Trail } from '@react-three/drei'
import * as THREE from 'three'

// Constants for orbital mechanics
const MU = 200
const RADIUS = 20
const STATION_KEEPING_THRESHOLD = 0.5
const THRUSTER_STRENGTH = 0.15

/**
 * Satellite Geometry (Professional high-fidelity procedural model)
 */
function SatelliteModel({ 
    thrusterActive, 
    alignment, 
    isHovered 
}: { 
    thrusterActive: boolean, 
    alignment: THREE.Vector3,
    isHovered: boolean
}) {
    const group = useRef<THREE.Group>(null)
    const rotationSpeed = useRef(0)

    useFrame((state, delta) => {
        if (!group.current) return
        
        // 1. Attitude Control: Align model to velocity vector
        if (alignment.length() > 0.01 && !isHovered) {
            const lookAtMatrix = new THREE.Matrix4()
            lookAtMatrix.lookAt(new THREE.Vector3(0, 0, 0), alignment, new THREE.Vector3(0, 1, 0))
            const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix)
            group.current.quaternion.slerp(targetQuaternion, 0.1)
        }

        // 2. Hover Effect: Rapid rotation
        if (isHovered) {
            rotationSpeed.current = THREE.MathUtils.lerp(rotationSpeed.current, 15, delta * 5)
            group.current.rotation.y += rotationSpeed.current * delta
            group.current.rotation.z += rotationSpeed.current * 0.5 * delta
        } else {
            rotationSpeed.current = THREE.MathUtils.lerp(rotationSpeed.current, 0, delta * 2)
            if (rotationSpeed.current > 0.01) {
                group.current.rotation.y += rotationSpeed.current * delta
            }
            
            // Subtle idle animation
            const t = state.clock.elapsedTime
            group.current.rotation.z += Math.sin(t * 0.5) * 0.002
        }
    })

    return (
        <group ref={group}>
            {/* Main Bus - Octagonal core for high-tech look */}
            <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.8, 0.9, 2, 8]} />
                <meshStandardMaterial color="#27272A" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Scientific Instrument Deck */}
            <mesh position={[0, 1.1, 0]}>
                <boxGeometry args={[1.2, 0.4, 1.2]} />
                <meshStandardMaterial color="#3F3F46" metalness={0.8} roughness={0.3} />
            </mesh>
            
            {/* Multi-Layer Insulation (MLI) Gold Foil Wrap (Segmented) */}
            <mesh position={[0, -0.2, 0]} scale={[1.02, 1.02, 1.02]}>
                <cylinderGeometry args={[0.82, 0.82, 1.2, 8]} />
                <meshStandardMaterial 
                    color="#D4AF37" 
                    metalness={1} 
                    roughness={0.15} 
                    emissive="#443300" 
                    emissiveIntensity={0.2} 
                />
            </mesh>

            {/* High-Gain Antenna Array */}
            <group position={[0, 1.4, 0]}>
                {/* Main Parabolic Dish */}
                <mesh rotation={[-Math.PI / 6, 0, 0]}>
                    <sphereGeometry args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI / 4]} />
                    <meshStandardMaterial color="#A1A1AA" metalness={0.9} roughness={0.1} side={THREE.DoubleSide} />
                </mesh>
                {/* Feed Horn Assembly */}
                <mesh position={[0, 0.4, 0.2]} rotation={[-Math.PI / 6, 0, 0]}>
                    <cylinderGeometry args={[0.02, 0.05, 0.4]} />
                    <meshStandardMaterial color="#52525B" metalness={1} />
                </mesh>
                <mesh position={[0, 0.6, 0.3]} rotation={[-Math.PI / 6, 0, 0]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshStandardMaterial color="#D4AF37" metalness={1} />
                </mesh>
            </group>

            {/* Low-Gain Omni-directional Antennas */}
            <mesh position={[0.5, -1, 0.5]}>
                <cylinderGeometry args={[0.01, 0.01, 0.8]} />
                <meshStandardMaterial color="#71717A" />
            </mesh>
            <mesh position={[-0.5, -1, -0.5]}>
                <cylinderGeometry args={[0.01, 0.01, 0.8]} />
                <meshStandardMaterial color="#71717A" />
            </mesh>

            {/* Advanced Solar Arrays */}
            {[-1, 1].map((side) => (
                <group key={side} position={[side * 0.9, 0, 0]}>
                    {/* Structural Boom / Truss */}
                    <mesh rotation={[0, 0, Math.PI / 2]} position={[side * 0.5, 0, 0]}>
                        <cylinderGeometry args={[0.08, 0.05, 1]} />
                        <meshStandardMaterial color="#52525B" metalness={1} />
                    </mesh>
                    
                    {/* Main Panel Panels with structural ribbing */}
                    <group position={[side * 2.5, 0, 0]}>
                        {/* Panel Background */}
                        <mesh>
                            <boxGeometry args={[4, 1.4, 0.08]} />
                            <meshStandardMaterial color="#18181B" metalness={0.5} roughness={0.5} />
                        </mesh>
                        {/* Photovoltaic Cells (Blue-ish Tint) */}
                        <mesh position={[0, 0, 0.05]}>
                            <planeGeometry args={[3.8, 1.2]} />
                            <meshStandardMaterial 
                                color="#1E3A8A" 
                                emissive="#001133" 
                                emissiveIntensity={0.5} 
                                metalness={0.9} 
                                roughness={0.1} 
                            />
                        </mesh>
                        {/* Grid/Honeycomb Detail */}
                        <mesh position={[0, 0, 0.06]}>
                            <planeGeometry args={[3.8, 1.2]} />
                            <meshBasicMaterial color="#60A5FA" wireframe transparent opacity={0.3} />
                        </mesh>
                    </group>
                </group>
            ))}

            {/* Star Tracker / Optical Sensors */}
            <group position={[0.4, 1.1, -0.4]} rotation={[0, Math.PI / 4, 0]}>
                <mesh>
                    <cylinderGeometry args={[0.1, 0.1, 0.2]} />
                    <meshStandardMaterial color="#18181B" metalness={1} />
                </mesh>
                <mesh position={[0, 0.11, 0]}>
                    <circleGeometry args={[0.08, 16]} />
                    <meshBasicMaterial color="#000000" />
                </mesh>
            </group>

            {/* RCS (Reaction Control System) Thruster Clusters */}
            {[[-1, 1], [1, 1], [-1, -1], [1, -1]].map(([x, z], idx) => (
                <group key={idx} position={[x * 0.6, -0.8, z * 0.6]}>
                    {/* Thruster Block */}
                    <mesh>
                        <boxGeometry args={[0.2, 0.2, 0.2]} />
                        <meshStandardMaterial color="#3F3F46" />
                    </mesh>
                    {/* Nozzles */}
                    <mesh position={[0, -0.15, 0]} rotation={[Math.PI, 0, 0]}>
                        <cylinderGeometry args={[0.02, 0.05, 0.15]} />
                        <meshStandardMaterial color="#52525B" metalness={1} />
                    </mesh>
                    {thrusterActive && (
                        <mesh position={[0, -0.3, 0]}>
                            <coneGeometry args={[0.05, 0.3, 8]} />
                            <meshBasicMaterial color="#60A5FA" transparent opacity={0.8} />
                        </mesh>
                    )}
                </group>
            ))}

            {/* Main Propulsion Engine Nozzle */}
            <group position={[0, -1.1, 0]}>
                <mesh rotation={[Math.PI, 0, 0]}>
                    <cylinderGeometry args={[0.1, 0.3, 0.4]} />
                    <meshStandardMaterial color="#27272A" metalness={1} />
                </mesh>
                {thrusterActive && (
                    <mesh position={[0, -0.4, 0]}>
                        <coneGeometry args={[0.2, 0.8, 16]} />
                        <meshBasicMaterial color="#93C5FD" transparent opacity={0.6} />
                    </mesh>
                )}
            </group>
        </group>
    )
}

/**
 * Main Orbital Satellite Engine
 */
export default function SatelliteOrbitalScene() {
    const groupRef = useRef<THREE.Group>(null)
    const center = useMemo(() => new THREE.Vector3(-15, 0, 0), [])
    const pos = useRef(new THREE.Vector3(center.x + RADIUS, 0, 0))
    const vel = useRef(new THREE.Vector3(0, 0, Math.sqrt(MU / RADIUS)))
    const targetPos = useRef(new THREE.Vector3().copy(pos.current))
    
    const [thrusterActive, setThrusterActive] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
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

        const arcRange = Math.PI * 0.55
        const targetAngle = (scrollOffset.current * arcRange) - arcRange / 2
        const tx = center.x + Math.cos(targetAngle) * RADIUS
        const tz = center.z + Math.sin(targetAngle) * RADIUS
        targetPos.current.set(tx, 0, tz)

        const rVec = new THREE.Vector3().copy(pos.current).sub(center)
        const rMag = rVec.length()
        const gravity = rVec.normalize().multiplyScalar(-MU / (rMag * rMag))
        
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

        state.camera.lookAt(-5, 0, 0)

        if (thrusterActive !== thrusting) setThrusterActive(thrusting)
    })

    return (
        <>
            <ambientLight intensity={0.7} />
            <pointLight position={[30, 30, 30]} intensity={2.5} color="#FFFFFF" />
            <pointLight position={[-30, -15, -15]} intensity={1.5} color="#818CF8" />

            <group 
                ref={groupRef}
                onPointerOver={() => setIsHovered(true)}
                onPointerOut={() => setIsHovered(false)}
            >
                <Trail
                    width={2.5}
                    length={15}
                    color={new THREE.Color('#818CF8')}
                    attenuation={(t) => t * t}
                >
                    <SatelliteModel 
                        thrusterActive={thrusterActive} 
                        alignment={vel.current} 
                        isHovered={isHovered}
                    />
                </Trail>
            </group>

            <PerspectiveCamera makeDefault position={[10, 8, 32]} fov={40} />
        </>
    )
}
