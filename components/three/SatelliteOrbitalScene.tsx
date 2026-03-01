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
            {/* Central Bus: Beveled Rectangular Prism (Graphite Gray Alloy) */}
            <group>
                {/* Main Hull */}
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[1.6, 2.2, 1.6]} />
                    <meshStandardMaterial 
                        color="#2D2D30" 
                        metalness={0.7} 
                        roughness={0.4} 
                        emissive="#000000"
                    />
                </mesh>
                {/* Chamfered Edges / Bevel Details */}
                {[[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]].map(([x, z], i) => (
                    <mesh key={i} position={[x, 0, z]}>
                        <cylinderGeometry args={[0.05, 0.05, 2.2, 8]} />
                        <meshStandardMaterial color="#1A1A1C" metalness={0.9} roughness={0.2} />
                    </mesh>
                ))}
                {/* Panel Seams & Fasteners (Subtle stippled cylinders) */}
                <mesh position={[0, 0, 0.81]}>
                    <planeGeometry args={[1.4, 2]} />
                    <meshBasicMaterial color="#111111" wireframe transparent opacity={0.1} />
                </mesh>
            </group>

            {/* Layered MLI Insulation (Gold/Kapton Foil blankets) */}
            <group position={[0, -0.4, 0]}>
                <mesh scale={[1.02, 0.6, 1.02]}>
                    <boxGeometry args={[1.6, 1, 1.6]} />
                    <meshStandardMaterial 
                        color="#D4AF37" 
                        metalness={1} 
                        roughness={0.3} 
                        emissive="#443300" 
                        emissiveIntensity={0.4}
                    />
                </mesh>
                {/* Slightly crinkled secondary layer */}
                <mesh scale={[1.03, 0.5, 1.03]} position={[0, -0.1, 0]}>
                    <octahedronGeometry args={[0.9, 2]} />
                    <meshStandardMaterial 
                        color="#B8860B" 
                        metalness={1} 
                        roughness={0.5} 
                        transparent 
                        opacity={0.8}
                    />
                </mesh>
            </group>

            {/* Articulated Solar Arrays */}
            {[-1, 1].map((side) => (
                <group key={side} position={[side * 0.8, 0, 0]}>
                    {/* Articulated Hinge & Actuator */}
                    <mesh rotation={[0, 0, Math.PI / 2]} position={[side * 0.2, 0, 0]}>
                        <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
                        <meshStandardMaterial color="#52525B" metalness={0.9} roughness={0.1} />
                    </mesh>
                    <mesh position={[side * 0.4, 0, 0.1]}>
                        <boxGeometry args={[0.1, 0.3, 0.2]} />
                        <meshStandardMaterial color="#3F3F46" />
                    </mesh>

                    {/* Main Array Structure */}
                    <group position={[side * 3.2, 0, 0]}>
                        {/* Panel Segments */}
                        {[[-1.5, 0], [1.5, 0]].map(([px, pz], idx) => (
                            <group key={idx} position={[px, pz, 0]}>
                                {/* Grid Foundation */}
                                <mesh>
                                    <boxGeometry args={[2.8, 1.8, 0.08]} />
                                    <meshStandardMaterial color="#0A0A0C" metalness={0.8} roughness={0.2} />
                                </mesh>
                                {/* Photovoltaic Cells (Deep Blue-Black) */}
                                <mesh position={[0, 0, 0.05]}>
                                    <planeGeometry args={[2.6, 1.6]} />
                                    <meshStandardMaterial 
                                        color="#020617" 
                                        emissive="#1E3A8A" 
                                        emissiveIntensity={0.8} 
                                        metalness={0.9} 
                                        roughness={0.05} 
                                    />
                                </mesh>
                                {/* Silver Conductor Lines */}
                                <mesh position={[0, 0, 0.06]}>
                                    <planeGeometry args={[2.6, 1.6]} />
                                    <meshBasicMaterial color="#E2E8F0" wireframe transparent opacity={0.2} />
                                </mesh>
                            </group>
                        ))}
                    </group>
                </group>
            ))}

            {/* Primary Communication Dish (Ceramic White Parabolic) */}
            <group position={[0, 1.1, 0.4]} rotation={[Math.PI / 6, 0, 0]}>
                {/* Gimbal Mount */}
                <mesh position={[0, -0.2, -0.2]}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#71717A" metalness={1} />
                </mesh>
                {/* Dish */}
                <mesh>
                    <sphereGeometry args={[0.9, 32, 32, 0, Math.PI * 2, 0, Math.PI / 6]} />
                    <meshStandardMaterial color="#F1F5F9" metalness={0.1} roughness={0.6} side={THREE.DoubleSide} />
                </mesh>
                {/* Central Feed Horn */}
                <mesh position={[0, 0.5, 0]}>
                    <cylinderGeometry args={[0.02, 0.08, 0.6]} />
                    <meshStandardMaterial color="#94A3B8" metalness={1} />
                </mesh>
            </group>

            {/* Optical Instruments (Telescope / Sensors) */}
            <group position={[0.5, 1.1, -0.5]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.3, 0.35, 0.8, 16]} />
                    <meshStandardMaterial color="#18181B" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Dark Lens with Anti-Reflective Coating */}
                <mesh position={[0, 0, -0.41]} rotation={[Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[0.25, 32]} />
                    <meshStandardMaterial 
                        color="#0F172A" 
                        emissive="#4C1D95" 
                        emissiveIntensity={0.5} 
                        metalness={1} 
                        roughness={0} 
                    />
                </mesh>
            </group>

            {/* Star Tracker Boxy Casings */}
            {[[-0.4, 0.4], [0.4, 0.4]].map(([x, y], i) => (
                <mesh key={i} position={[x, 1.1, -0.7]}>
                    <boxGeometry args={[0.2, 0.2, 0.2]} />
                    <meshStandardMaterial color="#3F3F46" />
                </mesh>
            ))}

            {/* Reaction Control System (RCS) Clusters */}
            {[[-0.8, 1.1, 0.8], [0.8, 1.1, 0.8], [-0.8, -1.1, 0.8], [0.8, -1.1, 0.8]].map((pos, i) => (
                <group key={i} position={pos}>
                    {/* Metallic Nozzles with scorched rims */}
                    <mesh rotation={[Math.PI / 4, 0, 0]}>
                        <cylinderGeometry args={[0.02, 0.08, 0.2]} />
                        <meshStandardMaterial color="#475569" metalness={1} roughness={0.3} />
                    </mesh>
                    {thrusterActive && (
                        <mesh position={[0, 0.1, 0.1]}>
                            <coneGeometry args={[0.05, 0.4, 8]} />
                            <meshBasicMaterial color="#60A5FA" transparent opacity={0.8} />
                        </mesh>
                    )}
                </group>
            ))}

            {/* External Wiring Harnesses (Subtle detail) */}
            <mesh position={[0.81, 0, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 1.8]} />
                <meshBasicMaterial color="#FFD700" />
            </mesh>
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
    const satScale = isMobile ? 0.7 : 1.2
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
        if (lightRef.current) {
            lightRef.current.position.copy(pos.current).add(new THREE.Vector3(2, 5, 5))
            const intensityMultiplier = 1 + Math.sin(scrollOffset.current * Math.PI) * 2
            lightRef.current.intensity = 15 * intensityMultiplier
        }

        // Responsive camera look-at
        state.camera.lookAt(isMobile ? -2 : -5, 0, 0)

        if (thrusterActive !== thrusting) setThrusterActive(thrusting)
    })

    return (
        <>
            <ambientLight intensity={1.5} />
            <pointLight position={[50, 50, 50]} intensity={4} color="#FFFFFF" />
            <pointLight position={[-50, -20, -20]} intensity={2} color="#818CF8" />
            
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
