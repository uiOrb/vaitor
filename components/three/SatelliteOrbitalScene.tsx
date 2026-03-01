'use client'

import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Trail } from '@react-three/drei'
import * as THREE from 'three'

// Constants for orbital mechanics
const MU = 200
const STATION_KEEPING_THRESHOLD = 0.5
const THRUSTER_STRENGTH = 0.15

/**
 * Satellite Geometry (Professional high-fidelity procedural model)
 */
function SatelliteModel({ 
    thrusterActive, 
    alignment, 
    isHovered,
    scale = 1
}: { 
    thrusterActive: boolean, 
    alignment: THREE.Vector3,
    isHovered: boolean,
    scale?: number
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
        <group ref={group} scale={[scale, scale, scale]}>
            {/* Main Bus - Octagonal core */}
            <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.8, 0.9, 2, 8]} />
                <meshStandardMaterial color="#27272A" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Scientific Instrument Deck */}
            <mesh position={[0, 1.1, 0]}>
                <boxGeometry args={[1.2, 0.4, 1.2]} />
                <meshStandardMaterial color="#3F3F46" metalness={0.8} roughness={0.3} />
            </mesh>
            
            {/* Gold Foil Wrap - Stronger Emissive for Visibility */}
            <mesh position={[0, -0.2, 0]} scale={[1.02, 1.02, 1.02]}>
                <cylinderGeometry args={[0.82, 0.82, 1.2, 8]} />
                <meshStandardMaterial 
                    color="#D4AF37" 
                    metalness={1} 
                    roughness={0.1} 
                    emissive="#FFD700" 
                    emissiveIntensity={0.6} 
                />
            </mesh>

            {/* High-Gain Antenna Array */}
            <group position={[0, 1.4, 0]}>
                <mesh rotation={[-Math.PI / 6, 0, 0]}>
                    <sphereGeometry args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI / 4]} />
                    <meshStandardMaterial color="#F5F5F7" metalness={0.9} roughness={0.1} side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[0, 0.4, 0.2]} rotation={[-Math.PI / 6, 0, 0]}>
                    <cylinderGeometry args={[0.02, 0.05, 0.4]} />
                    <meshStandardMaterial color="#A1A1AA" metalness={1} />
                </mesh>
            </group>

            {/* Advanced Solar Arrays - Bright Blue Emissive */}
            {[-1, 1].map((side) => (
                <group key={side} position={[side * 0.9, 0, 0]}>
                    <mesh rotation={[0, 0, Math.PI / 2]} position={[side * 0.5, 0, 0]}>
                        <cylinderGeometry args={[0.08, 0.05, 1]} />
                        <meshStandardMaterial color="#71717A" metalness={1} />
                    </mesh>
                    
                    <group position={[side * 2.5, 0, 0]}>
                        <mesh>
                            <boxGeometry args={[4, 1.4, 0.08]} />
                            <meshStandardMaterial color="#18181B" metalness={0.5} roughness={0.5} />
                        </mesh>
                        <mesh position={[0, 0, 0.05]}>
                            <planeGeometry args={[3.8, 1.2]} />
                            <meshStandardMaterial 
                                color="#2563EB" 
                                emissive="#3B82F6" 
                                emissiveIntensity={1.2} 
                                metalness={0.9} 
                                roughness={0.1} 
                            />
                        </mesh>
                    </group>
                </group>
            ))}

            {/* RCS Thrusters */}
            {[[-1, 1], [1, 1], [-1, -1], [1, -1]].map(([x, z], idx) => (
                <group key={idx} position={[x * 0.6, -0.8, z * 0.6]}>
                    <mesh>
                        <boxGeometry args={[0.2, 0.2, 0.2]} />
                        <meshStandardMaterial color="#3F3F46" />
                    </mesh>
                    {thrusterActive && (
                        <mesh position={[0, -0.2, 0]}>
                            <coneGeometry args={[0.08, 0.4, 8]} />
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
    const { size } = useThree()
    const groupRef = useRef<THREE.Group>(null)
    const lightRef = useRef<THREE.PointLight>(null)
    
    // Responsive settings
    const isMobile = size.width < 768
    const radius = isMobile ? 12 : 18
    const satScale = isMobile ? 0.7 : 1.2 // Increased scale
    const horizontalShift = isMobile ? -5 : -12
    
    const center = useMemo(() => new THREE.Vector3(horizontalShift, 0, 0), [horizontalShift])
    const pos = useRef(new THREE.Vector3(center.x + radius, 0, 0))
    const vel = useRef(new THREE.Vector3(0, 0, Math.sqrt(MU / radius)))
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

        // 1. Target Tracking
        const arcRange = isMobile ? Math.PI * 0.4 : Math.PI * 0.6
        const targetAngle = (scrollOffset.current * arcRange) - arcRange / 2
        const tx = center.x + Math.cos(targetAngle) * radius
        const tz = center.z + Math.sin(targetAngle) * radius
        targetPos.current.set(tx, 0, tz)

        // 2. Physics
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

        // 3. Update Visuals
        if (groupRef.current) {
            groupRef.current.position.copy(pos.current)
        }

        // 4. Satellite "Spotlight" Logic
        // As it scrolls near components, boost the light intensity
        if (lightRef.current) {
            lightRef.current.position.copy(pos.current).add(new THREE.Vector3(2, 5, 5))
            // Peak intensity when scroll is around 0.5 (center of experience section)
            const intensityMultiplier = 1 + Math.sin(scrollOffset.current * Math.PI) * 2
            lightRef.current.intensity = 15 * intensityMultiplier
        }

        // Responsive camera look-at
        state.camera.lookAt(isMobile ? -2 : -5, 0, 0)

        if (thrusterActive !== thrusting) setThrusterActive(thrusting)
    })

    return (
        <>
            <ambientLight intensity={1.5} /> {/* High base ambient light */}
            <pointLight position={[50, 50, 50]} intensity={4} color="#FFFFFF" />
            <pointLight position={[-50, -20, -20]} intensity={2} color="#818CF8" />
            
            {/* Dynamic Follow Light (The "Spotlight" that shines on it near components) */}
            <pointLight 
                ref={lightRef} 
                distance={40} 
                decay={2} 
                color="#FFFFFF" 
            />

            <group 
                ref={groupRef}
                onPointerOver={() => setIsHovered(true)}
                onPointerOut={() => setIsHovered(false)}
            >
                <Trail
                    width={isMobile ? 2 : 4}
                    length={20}
                    color={new THREE.Color('#818CF8')}
                    attenuation={(t) => t * t}
                >
                    <SatelliteModel 
                        thrusterActive={thrusterActive} 
                        alignment={vel.current} 
                        isHovered={isHovered}
                        scale={satScale}
                    />
                </Trail>
            </group>

            <PerspectiveCamera 
                makeDefault 
                position={isMobile ? [0, 5, 25] : [10, 8, 32]} 
                fov={isMobile ? 50 : 40} 
            />
        </>
    )
}
