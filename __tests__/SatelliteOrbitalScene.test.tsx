import { render } from '@testing-library/react'
import SatelliteOrbitalScene from '@/components/three/SatelliteOrbitalScene'

// Mock react-three-fiber and drei
jest.mock('@react-three/fiber', () => ({
    useFrame: jest.fn(),
    useThree: () => ({ 
        camera: { lookAt: jest.fn() }, 
        mouse: { x: 0, y: 0 }, 
        size: { width: 1000, height: 1000 },
        viewport: { width: 10, height: 10, factor: 1 }
    }),
}))

jest.mock('@react-three/drei', () => ({
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
        const { getAllByTestId, getByTestId } = render(<SatelliteOrbitalScene />)
        
        // Check for multiple trails (one for each satellite in the fleet)
        const trails = getAllByTestId('mock-trail')
        expect(trails.length).toBeGreaterThan(0)
        expect(getByTestId('mock-camera')).toBeInTheDocument()
    })
})
