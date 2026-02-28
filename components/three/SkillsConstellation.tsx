'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Line } from '@react-three/drei'
import * as THREE from 'three'

interface SkillNode {
    id: string
    label: string
    position: [number, number, number]
    category: 'Languages' | 'Frameworks' | 'DevOps' | 'Cloud'
}

const skillNodes: SkillNode[] = [
    // Languages
    { id: 'python', label: 'Python', position: [-4, 1.5, 0], category: 'Languages' },
    { id: 'typescript', label: 'TypeScript', position: [-2.5, 3, 0], category: 'Languages' },
    { id: 'go', label: 'Go', position: [-5.5, -0.5, 0], category: 'Languages' },
    { id: 'bash', label: 'Bash', position: [-3.5, -2, 0], category: 'Languages' },

    // Frameworks
    { id: 'nextjs', label: 'Next.js', position: [0, 2.5, 0], category: 'Frameworks' },
    { id: 'react', label: 'React', position: [1.5, 1, 0], category: 'Frameworks' },
    { id: 'nodejs', label: 'Node.js', position: [0.5, -1.5, 0], category: 'Frameworks' },
    { id: 'grpc', label: 'gRPC', position: [-1, -3, 0], category: 'Frameworks' },

    // DevOps
    { id: 'kubernetes', label: 'Kubernetes', position: [3.5, 2, 0], category: 'DevOps' },
    { id: 'docker', label: 'Docker', position: [5, 0.5, 0], category: 'DevOps' },
    { id: 'terraform', label: 'Terraform', position: [4, -1.5, 0], category: 'DevOps' },
    { id: 'github-actions', label: 'GitHub Actions', position: [2.5, -2.5, 0], category: 'DevOps' },

    // Cloud
    { id: 'azure', label: 'Azure', position: [1.5, 3.5, 0], category: 'Cloud' },
    { id: 'aks', label: 'AKS', position: [5.5, 2.5, 0], category: 'Cloud' },
    { id: 'backstage', label: 'Backstage', position: [6.5, -0.5, 0], category: 'Cloud' },
]

const categoryColors: Record<string, string> = {
    Languages: '#818CF8',
    Frameworks: '#6EE7B7',
    DevOps: '#FCD34D',
    Cloud: '#60A5FA',
}

const connections: [number, number][] = [
    [0, 1], [0, 2], [0, 3],       // Python connections
    [4, 5], [4, 6], [5, 6],       // Framework web cluster
    [6, 7], [3, 7],               // Node/gRPC/bash
    [8, 9], [8, 10], [9, 10],     // K8s/Docker/Terraform
    [10, 11], [7, 11],            // Terraform/GitHub Actions
    [12, 4], [12, 8],             // Azure → Next.js, K8s
    [13, 8], [14, 9],             // AKS → K8s, Backstage → Docker
    [1, 4], [2, 9],               // TS → Next.js, Go → Docker
]

function SkillNodeMesh({ node }: { node: SkillNode }) {
    const ref = useRef<THREE.Mesh>(null)
    const [hovered, setHovered] = useState(false)

    useFrame(() => {
        if (ref.current) {
            const targetScale = hovered ? 1.4 : 1.0
            ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
        }
    })

    const color = categoryColors[node.category]

    return (
        <mesh
            ref={ref}
            position={node.position}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
        >
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={hovered ? 1.2 : 0.5}
                roughness={0.2}
                metalness={0.8}
            />
            {hovered && (
                <>
                    <pointLight color={color} intensity={2} distance={2} />
                    <Html distanceFactor={10} center>
                        <div
                            style={{
                                background: 'rgba(9,9,11,0.95)',
                                border: `1px solid ${color}44`,
                                borderRadius: '8px',
                                padding: '6px 12px',
                                color: '#F5F5F7',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '12px',
                                fontWeight: 500,
                                whiteSpace: 'nowrap',
                                pointerEvents: 'none',
                                boxShadow: `0 0 16px ${color}33`,
                            }}
                        >
                            {node.label}
                            <div
                                style={{
                                    fontSize: '10px',
                                    color: color,
                                    marginTop: '2px',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {node.category}
                            </div>
                        </div>
                    </Html>
                </>
            )}
        </mesh>
    )
}

export function SkillsConstellation() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((_, dt) => {
        if (groupRef.current) {
            groupRef.current.rotation.z += dt * 0.015
        }
    })

    return (
        <>
            <ambientLight intensity={0.6} />
            <pointLight position={[0, 0, 5]} intensity={1} color="#818CF8" />

            <group ref={groupRef}>
                {/* Connection lines */}
                {connections.map(([a, b], i) => (
                    <Line
                        key={i}
                        points={[skillNodes[a].position, skillNodes[b].position]}
                        color="#818CF8"
                        opacity={0.2}
                        transparent
                        lineWidth={0.5}
                    />
                ))}

                {/* Skill nodes */}
                {skillNodes.map((node) => (
                    <SkillNodeMesh key={node.id} node={node} />
                ))}
            </group>
        </>
    )
}
