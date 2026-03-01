import { render } from '@testing-library/react'
import SpaceCanvas from '@/components/SpaceCanvas'

// Mock react-three-fiber
jest.mock('@react-three/fiber', () => ({
    Canvas: ({ children }: any) => <div data-testid="mock-canvas">{children}</div>,
    useFrame: jest.fn(),
    useThree: () => ({ camera: {}, mouse: { x: 0, y: 0 } }),
}))

// Mock drei
jest.mock('@react-three/drei', () => ({
    Float: ({ children }: any) => <div data-testid="mock-float">{children}</div>,
    PerspectiveCamera: () => <div data-testid="mock-camera" />,
}))

// Mock the heavy 3D scenes
jest.mock('@/components/three/SpaceScene', () => ({
    StarField: () => <div data-testid="star-field">StarField</div>,
    GalaxyParticles: () => <div data-testid="galaxy">Galaxy</div>,
    Planet: () => <div data-testid="planet">Planet</div>,
}))

describe('SpaceCanvas', () => {
    it('renders without crashing', () => {
        render(<SpaceCanvas />)
    })
})
