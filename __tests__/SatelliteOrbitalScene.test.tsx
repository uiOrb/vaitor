import { render } from '@testing-library/react'
import SatelliteOrbitalScene from '@/components/three/SatelliteOrbitalScene'

// Mock react-three-fiber and drei
jest.mock('@react-three/fiber', () => ({
    useFrame: jest.fn(),
    useThree: () => ({ camera: {}, mouse: { x: 0, y: 0 }, size: { width: 1000, height: 1000 } }),
}))

jest.mock('@react-three/drei', () => ({
    Float: ({ children }: any) => <div data-testid="mock-float">{children}</div>,
    PerspectiveCamera: () => <div data-testid="mock-camera" />,
    Trail: ({ children }: any) => <div data-testid="mock-trail">{children}</div>,
}))

// Mock THREE to avoid WebGL context issues and complex object creation
jest.mock('three', () => {
    const THREE = jest.requireActual('three')
    return {
        ...THREE,
        WebGLRenderer: jest.fn().mockImplementation(() => ({
            setSize: jest.fn(),
            render: jest.fn(),
            dispose: jest.fn(),
            domElement: document.createElement('canvas'),
        })),
    }
})

describe('SatelliteOrbitalScene', () => {
    it('renders the satellite scene components', () => {
        // We mock the whole scene or its children to avoid WebGL issues in JSDOM
        const { getByTestId } = render(<SatelliteOrbitalScene />)
        
        // Check for mocked components from drei
        expect(getByTestId('mock-trail')).toBeInTheDocument()
        expect(getByTestId('mock-float')).toBeInTheDocument()
    })
})
