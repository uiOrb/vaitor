'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * StarField: Renders a distant field of stars with procedural twinkles.
 */
export function StarField() {
    const ref = useRef<THREE.Points>(null)

    const { positions, sizes, opacities } = useMemo(() => {
        const count = 12000
        const positions = new Float32Array(count * 3)
        const sizes = new Float32Array(count)
        const opacities = new Float32Array(count)
        for (let i = 0; i < count; i++) {
            const r = 300 + Math.random() * 500
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            positions[i * 3 + 2] = r * Math.cos(phi)
            sizes[i] = 0.5 + Math.random() * 2.0 // Brighter/Bigger
            opacities[i] = 0.3 + Math.random() * 0.7
        }
        return { positions, sizes, opacities }
    }, [])

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.004
            ref.current.rotation.x += delta * 0.001

            // Twinkle effect (subtle)
            const mat = ref.current.material as THREE.PointsMaterial
            mat.opacity = 0.8 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
        }
    })

    const geo = useMemo(() => {
        const g = new THREE.BufferGeometry()
        g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        g.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
        return g
    }, [positions, sizes])

    return (
        <points ref={ref} geometry={geo}>
            <pointsMaterial
                size={1.1}
                color="#ffffff"
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    )
}

/**
 * AsteroidField: Randomly flying rock models in 3D space.
 */
export function GalaxyParticles() {
    const count = 60
    const meshRef = useRef<THREE.InstancedMesh>(null!)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const asteroids = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            temp.push({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * 80,
                    (Math.random() - 0.5) * 40,
                    (Math.random() - 0.5) * 60 - 20
                ),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.05
                ),
                rotation: new THREE.Vector3(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                ),
                rotVel: new THREE.Vector3(
                    Math.random() * 0.02,
                    Math.random() * 0.02,
                    Math.random() * 0.02
                ),
                scale: 0.4 + Math.random() * 1.2
            })
        }
        return temp
    }, [])

    useFrame((state, delta) => {
        asteroids.forEach((ast, i) => {
            // Chaotic drift
            ast.position.add(ast.velocity)
            ast.rotation.x += ast.rotVel.x
            ast.rotation.y += ast.rotVel.y

            // Bounds wrapping
            if (ast.position.x > 50) ast.position.x = -50
            if (ast.position.x < -50) ast.position.x = 50
            if (ast.position.y > 30) ast.position.y = -30
            if (ast.position.y < -30) ast.position.y = 30
            if (ast.position.z > 20) ast.position.z = -60
            if (ast.position.z < -60) ast.position.z = 20

            dummy.position.copy(ast.position)
            dummy.rotation.set(ast.rotation.x, ast.rotation.y, ast.rotation.z)
            dummy.scale.setScalar(ast.scale)
            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow>
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
                color="#2D3748" // Slightly darker base
                roughness={0.8}
                metalness={0.4} // Higher metalness for highlights
                emissive="#1A202C" // Subtle dark glow
                emissiveIntensity={0.2}
            />
        </instancedMesh>
    )
}

/**
 * High-definition Earth model with layers.
 */
export function Planet() {
    const earthRef = useRef<THREE.Mesh>(null!)
    const cloudsRef = useRef<THREE.Mesh>(null!)

    useFrame((_, delta) => {
        if (earthRef.current) earthRef.current.rotation.y += delta * 0.04
        if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.06
    })

    const EarthShader = {
        uniforms: {
            time: { value: 0 },
            colorOcean: { value: new THREE.Color('#1E3A8A') },
            colorLand: { value: new THREE.Color('#065F46') },
            lightDirection: { value: new THREE.Vector3(1, 1, 1).normalize() }
        },
        vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform vec3 colorOcean;
      uniform vec3 colorLand;
      uniform vec3 lightDirection;

      float hash(vec3 p) {
        return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453123);
      }

      float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f*f*(3.0-2.0*f);
        return mix(mix(mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)), f.x),
                       mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
                   mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
                       mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y), f.z);
      }

      void main() {
        float n = noise(vNormal * 4.0);
        vec3 baseColor = (n > 0.55) ? colorLand : colorOcean;
        float diff = max(dot(vNormal, normalize(lightDirection)), 0.1);
        float rim = pow(1.0 - max(dot(vNormal, vec3(0,0,1)), 0.0), 2.5);
        vec3 ambient = baseColor * 0.2;
        vec3 atmosphere = vec3(0.4, 0.7, 1.0) * rim * 0.8;
        gl_FragColor = vec4(baseColor * diff + ambient + atmosphere, 1.0);
      }
    `
    }

    return (
        <group position={[10, -5, -20]} rotation={[0.4, 0, 0]}>
            <mesh ref={earthRef}>
                <sphereGeometry args={[7, 64, 64]} />
                <shaderMaterial
                    args={[EarthShader]}
                    uniforms-colorOcean-value={new THREE.Color('#1E3A8A')}
                    uniforms-colorLand-value={new THREE.Color('#065F46')}
                />
            </mesh>
            <mesh ref={cloudsRef}>
                <sphereGeometry args={[7.2, 64, 64]} />
                <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.15}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
            <mesh>
                <sphereGeometry args={[7.6, 64, 64]} />
                <meshBasicMaterial
                    color="#3B82F6"
                    transparent
                    opacity={0.06}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    )
}
