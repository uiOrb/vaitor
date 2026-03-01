'use client'

import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Trail, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Constants for orbital mechanics
const MU = 250 // Slightly increased for the mass of Mars
const STATION_KEEPING_THRESHOLD = 0.5
const THRUSTER_STRENGTH = 0.15

/**
 * Procedural Mars Model
 */
function Mars({ radius }: { radius: number }) {
    const marsRef = useRef<THREE.Mesh>(null)
    
    useFrame((state, delta) => {
        if (marsRef.current) {
            marsRef.current.rotation.y += delta * 0.1 // Realistic slow rotation
        }
    })

    return (
        <group>
            {/* Mars Surface */}
            <mesh ref={marsRef}>
                <sphereGeometry args={[radius, 64, 64]} />
                <meshStandardMaterial 
                    color="#C1440E" // Martian Rust Red
                    roughness={0.8}
                    metalness={0.1}
                    emissive="#441100"
                    emissiveIntensity={0.2}
                />
            </mesh>
            
            {/* Atmosphere / Glow */}
            <mesh scale={[1.02, 1.02, 1.02]}>
                <sphereGeometry args={[radius, 32, 32]} />
                <meshStandardMaterial 
                    color="#E27B58"
                    transparent 
                    opacity={0.15}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Subtle Surface Detail (Procedural shadows/craters) */}
            <mesh rotation={[0.5, 0.5, 0.5]}>
                <sphereGeometry args={[radius + 0.01, 32, 32]} />
                <meshStandardMaterial 
                    color="#8B3103"
                    transparent
                    opacity={0.3}
                    wireframe
                />
            </mesh>
        </group>
    )
}

/**
 * Satellite Geometry (Professional high-fidelity procedural model)
 */
const SatelliteModel = React.memo(({ 
    thrusterActive, 
    alignment, 
    isHovered,
    scale = 1
}: { 
    thrusterActive: boolean, 
    alignment: THREE.Vector3,
    isHovered: boolean,
    scale?: number
}) => {
    const group = useRef<THREE.Group>(null)
    const rotationSpeed = useRef(0)
    const randomRotationAxis = useMemo(() => new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(), [])
    const randomRotationSpeed = useMemo(() => 0.1 + Math.random() * 0.3, [])

    useFrame((state, delta) => {
        if (!group.current) return
        
        if (isHovered) {
            rotationSpeed.current = THREE.MathUtils.lerp(rotationSpeed.current, 15, delta * 5)
            group.current.rotation.y += rotationSpeed.current * delta
            group.current.rotation.z += rotationSpeed.current * 0.5 * delta
        } else {
            rotationSpeed.current = THREE.MathUtils.lerp(rotationSpeed.current, 0, delta * 2)
            if (rotationSpeed.current > 0.01) {
                group.current.rotation.y += rotationSpeed.current * delta
            }
            group.current.rotateOnAxis(randomRotationAxis, randomRotationSpeed * delta)
        }
    })

    return (
        <group ref={group} scale={[scale, scale, scale]}>
            {/* Central Bus */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[1.6, 2.2, 1.6]} />
                <meshStandardMaterial color="#2D2D30" metalness={0.7} roughness={0.4} />
            </mesh>
            
            {/* Gold Foil */}
            <group position={[0, -0.4, 0]}>
                <mesh scale={[1.02, 0.6, 1.02]}>
                    <boxGeometry args={[1.6, 1, 1.6]} />
                    <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.3} emissive="#443300" emissiveIntensity={0.4} />
                </mesh>
            </group>

            {/* Solar Arrays */}
            {[-1, 1].map((side) => (
                <group key={side} position={[side * 0.8, 0, 0]}>
                    <mesh rotation={[0, 0, Math.PI / 2]} position={[side * 0.2, 0, 0]}>
                        <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
                        <meshStandardMaterial color="#52525B" metalness={0.9} roughness={0.1} />
                    </mesh>
                    <group position={[side * 3.2, 0, 0]}>
                        <mesh>
                            <boxGeometry args={[2.8, 1.8, 0.08]} />
                            <meshStandardMaterial color="#0A0A0C" metalness={0.8} roughness={0.2} />
                        </mesh>
                        <mesh position={[0, 0, 0.05]}>
                            <planeGeometry args={[2.6, 1.6]} />
                            <meshStandardMaterial color="#020617" emissive="#1E3A8A" emissiveIntensity={0.8} metalness={0.9} roughness={0.05} />
                        </mesh>
                    </group>
                </group>
            ))}

            {/* Communication Dish */}
            <group position={[0, 1.1, 0.4]} rotation={[Math.PI / 6, 0, 0]}>
                <mesh>
                    <sphereGeometry args={[0.9, 32, 32, 0, Math.PI * 2, 0, Math.PI / 6]} />
                    <meshStandardMaterial color="#F1F5F9" metalness={0.1} roughness={0.6} side={THREE.DoubleSide} />
                </mesh>
            </group>

            {/* Thrusters */}
            {[[-0.8, 1.1, 0.8], [0.8, 1.1, 0.8], [-0.8, -1.1, 0.8], [0.8, -1.1, 0.8]].map((pos, i) => (
                <group key={i} position={pos}>
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
        </group>
    )
})
SatelliteModel.displayName = 'SatelliteModel'

/**
 * Individual Satellite Instance in Orbit
 */
function OrbitalSatellite({ 
    center, 
    radius, 
    offset, 
    scale, 
    scrollOffset, 
    isMobile 
}: { 
    center: THREE.Vector3, 
    radius: number, 
    offset: number, 
    scale: number, 
    scrollOffset: React.MutableRefObject<number>,
    isMobile: boolean
}) {
    const groupRef = useRef<THREE.Group>(null)
    const pos = useRef(new THREE.Vector3(center.x + radius, 0, 0))
    const vel = useRef(new THREE.Vector3(0, 0, Math.sqrt(MU / radius)))
    const targetPos = useRef(new THREE.Vector3())
    const [thrusterActive, setThrusterActive] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useFrame((_state, delta) => {
        const dt = Math.min(delta, 0.1)

        const arcRange = isMobile ? Math.PI * 0.5 : Math.PI * 0.8
        const targetAngle = (scrollOffset.current * arcRange) - (arcRange / 2) + offset
        
        const tx = center.x + Math.cos(targetAngle) * radius
        const tz = center.z + Math.sin(targetAngle) * radius
        targetPos.current.set(tx, 0, tz)

        const rVec = new THREE.Vector3().copy(pos.current).sub(center)
        const rMag = Math.max(rVec.length(), 1)
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

        if (thrusterActive !== thrusting) setThrusterActive(thrusting)
    })

    return (
        <group 
            ref={groupRef}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
        >
            <Trail width={scale * 5} length={10} color={new THREE.Color('#818CF8')} attenuation={(t) => t * t}>
                <SatelliteModel 
                    thrusterActive={thrusterActive} 
                    alignment={vel.current} 
                    isHovered={isHovered}
                    scale={scale}
                />
            </Trail>
        </group>
    )
}

/**
 * Main Orbital Satellite Engine
 */
export default function SatelliteOrbitalScene() {
    const { size } = useThree()
    const scrollOffset = useRef(0)
    
    const isMobile = size.width < 768
    // Increased orbital radius to make room for Mars
    const radius = isMobile ? 14 : 22
    const center = useMemo(() => new THREE.Vector3(0, 0, 0), [])
    
    // Scale reduced significantly (~7x smaller from previous 1.2 -> 0.17)
    const satScale = isMobile ? 0.1 : 0.18

    const fleet = useMemo(() => [
        { id: 1, offset: 0, scale: satScale },
        { id: 2, offset: -0.5, scale: satScale * 0.8 },
        { id: 3, offset: 0.5, scale: satScale * 0.8 },
    ], [satScale])
    
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

    useFrame((state) => {
        state.camera.lookAt(0, 0, 0)
    })

    return (
        <>
            <ambientLight intensity={1.2} />
            <pointLight position={[50, 50, 50]} intensity={3} color="#FFFFFF" />
            <pointLight position={[-50, -20, -20]} intensity={2} color="#818CF8" />
            
            {/* Centerpiece: Mars */}
            <Mars radius={isMobile ? 5 : 8} />

            {/* Satellite Fleet */}
            {fleet.map((sat) => (
                <OrbitalSatellite 
                    key={sat.id}
                    center={center}
                    radius={radius}
                    offset={sat.offset}
                    scale={sat.scale}
                    scrollOffset={scrollOffset}
                    isMobile={isMobile}
                />
            ))}

            <PerspectiveCamera 
                makeDefault 
                position={isMobile ? [0, 10, 35] : [0, 15, 45]} 
                fov={40} 
            />
        </>
    )
}
