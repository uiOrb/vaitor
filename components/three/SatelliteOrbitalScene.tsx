'use client'

import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Trail, Float } from '@react-three/drei'
import * as THREE from 'three'
import { StarField } from './SpaceScene'

// Constants for orbital mechanics
const MU = 150 
const STATION_KEEPING_THRESHOLD = 0.3
const THRUSTER_STRENGTH = 0.12

/**
 * Ultra-Detailed Procedural Mars
 */
function Mars({ radius }: { radius: number }) {
    const marsRef = useRef<THREE.Group>(null)
    const surfaceRef = useRef<THREE.Mesh>(null)
    
    // Generate procedural "rocks" and "craters" once
    const surfaceFeatures = useMemo(() => {
        const features = []
        // Add pebbles/rocks
        for (let i = 0; i < 40; i++) {
            const phi = Math.acos(-1 + (2 * i) / 40)
            const theta = Math.sqrt(40 * Math.PI) * phi
            const x = Math.cos(theta) * Math.sin(phi)
            const y = Math.sin(theta) * Math.sin(phi)
            const z = Math.cos(phi)
            
            const scale = 0.05 + Math.random() * 0.15
            features.push({
                pos: new THREE.Vector3(x, y, z).multiplyScalar(radius),
                scale: [scale, scale * (0.5 + Math.random()), scale],
                rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
                type: 'rock'
            })
        }
        // Add a few larger craters (depressions)
        for (let i = 0; i < 8; i++) {
            const phi = Math.random() * Math.PI
            const theta = Math.random() * Math.PI * 2
            features.push({
                pos: new THREE.Vector3(
                    Math.sin(phi) * Math.cos(theta),
                    Math.sin(phi) * Math.sin(theta),
                    Math.cos(phi)
                ).multiplyScalar(radius - 0.02),
                scale: [0.4 + Math.random() * 0.6, 0.1, 0.4 + Math.random() * 0.6],
                rotation: [phi, theta, 0],
                type: 'crater'
            })
        }
        return features
    }, [radius])

    useFrame((state, delta) => {
        if (marsRef.current) {
            marsRef.current.rotation.y += delta * 0.05
        }
    })

    return (
        <group ref={marsRef}>
            {/* Main Surface with high segments for light response */}
            <mesh ref={surfaceRef} castShadow receiveShadow>
                <sphereGeometry args={[radius, 128, 128]} />
                <meshStandardMaterial 
                    color="#AA4A30" // Desaturated Rust
                    roughness={0.9} // Chalky/Matte
                    metalness={0.05}
                    emissive="#220800"
                    emissiveIntensity={0.1}
                />
            </mesh>

            {/* Geological Features: Rocks and Craters */}
            {surfaceFeatures.map((f, i) => (
                <group key={i} position={f.pos} rotation={f.rotation as any}>
                    {f.type === 'rock' ? (
                        <mesh scale={f.scale as any}>
                            <dodecahedronGeometry args={[1, 0]} />
                            <meshStandardMaterial color="#7C3A2D" roughness={1} />
                        </mesh>
                    ) : (
                        <mesh scale={f.scale as any} rotation={[Math.PI / 2, 0, 0]}>
                            <torusGeometry args={[1, 0.05, 8, 32]} />
                            <meshStandardMaterial color="#5C2A1F" roughness={1} transparent opacity={0.4} />
                        </mesh>
                    )}
                </group>
            ))}
            
            {/* Thin Atmosphere (Dusty Haze) */}
            <mesh scale={[1.05, 1.05, 1.05]}>
                <sphereGeometry args={[radius, 64, 64]} />
                <meshStandardMaterial 
                    color="#E27B58"
                    transparent 
                    opacity={0.1}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Far Dusty Haze / Glow */}
            <mesh scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[radius, 32, 32]} />
                <meshStandardMaterial 
                    color="#C1440E"
                    transparent 
                    opacity={0.03}
                    side={THREE.BackSide}
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
    const randomRotationSpeed = useMemo(() => 0.1 + Math.random() * 0.2, [])

    useFrame((state, delta) => {
        if (!group.current) return
        if (isHovered) {
            rotationSpeed.current = THREE.MathUtils.lerp(rotationSpeed.current, 15, delta * 5)
            group.current.rotation.y += rotationSpeed.current * delta
            group.current.rotation.z += rotationSpeed.current * 0.5 * delta
        } else {
            rotationSpeed.current = THREE.MathUtils.lerp(rotationSpeed.current, 0, delta * 2)
            if (rotationSpeed.current > 0.01) group.current.rotation.y += rotationSpeed.current * delta
            group.current.rotateOnAxis(randomRotationAxis, randomRotationSpeed * delta)
        }
    })

    return (
        <group ref={group} scale={[scale, scale, scale]}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[1.6, 2.2, 1.6]} />
                <meshStandardMaterial color="#2D2D30" metalness={0.7} roughness={0.4} />
            </mesh>
            <group position={[0, -0.4, 0]}>
                <mesh scale={[1.02, 0.6, 1.02]}>
                    <boxGeometry args={[1.6, 1, 1.6]} />
                    <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.3} emissive="#443300" emissiveIntensity={0.4} />
                </mesh>
            </group>
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
            <group position={[0, 1.1, 0.4]} rotation={[Math.PI / 6, 0, 0]}>
                <mesh>
                    <sphereGeometry args={[0.9, 32, 32, 0, Math.PI * 2, 0, Math.PI / 6]} />
                    <meshStandardMaterial color="#F1F5F9" metalness={0.1} roughness={0.6} side={THREE.DoubleSide} />
                </mesh>
            </group>
            {[[-0.8, 1.1, 0.8], [0.8, 1.1, 0.8], [-0.8, -1.1, 0.8], [0.8, -1.1, 0.8]].map((p, i) => (
                <group key={i} position={p}>
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
function OrbitalSatellite({ center, radius, offset, scale, scrollOffset, isMobile }: any) {
    const groupRef = useRef<THREE.Group>(null)
    const pos = useRef(new THREE.Vector3(center.x + radius, 0, 0))
    const vel = useRef(new THREE.Vector3(0, 0, Math.sqrt(MU / radius)))
    const targetPos = useRef(new THREE.Vector3())
    const [thrusterActive, setThrusterActive] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useFrame((_state, delta) => {
        const dt = Math.min(delta, 0.1)
        const arcRange = isMobile ? Math.PI * 0.6 : Math.PI * 1.0
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

        if (groupRef.current) groupRef.current.position.copy(pos.current)
        if (thrusterActive !== thrusting) setThrusterActive(thrusting)
    })

    return (
        <group ref={groupRef} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
            <Trail width={scale * 4} length={8} color={new THREE.Color('#818CF8')} attenuation={(t) => t * t}>
                <SatelliteModel thrusterActive={thrusterActive} alignment={vel.current} isHovered={isHovered} scale={scale} />
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
    
    // Mars is 3x smaller than previous version (prev was 5 mobile / 8 desktop)
    const marsRadius = isMobile ? 1.6 : 2.6
    const radius = isMobile ? 8 : 12 // Orbit reduced to match smaller Mars
    const center = useMemo(() => new THREE.Vector3(0, 0, 0), [])
    const satScale = isMobile ? 0.06 : 0.12

    const fleet = useMemo(() => [
        { id: 1, offset: 0, scale: satScale },
        { id: 2, offset: -0.6, scale: satScale * 0.8 },
        { id: 3, offset: 0.6, scale: satScale * 0.8 },
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
            <ambientLight intensity={0.8} />
            <pointLight position={[50, 50, 50]} intensity={2.5} color="#FFFFFF" />
            <pointLight position={[-20, 10, -20]} intensity={1.5} color="#E27B58" />
            
            <StarField />
            
            {/* Ultra-Detailed Miniature Mars */}
            <Mars radius={marsRadius} />

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
                position={isMobile ? [0, 6, 20] : [0, 8, 30]} 
                fov={40} 
            />
        </>
    )
}
