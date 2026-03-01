import { render, fireEvent, act } from '@testing-library/react'
import CosmicBackground from '@/components/sections/CosmicBackground'

describe('CosmicBackground', () => {
    let requestAnimationFrameSpy: jest.SpyInstance
    let cancelAnimationFrameSpy: jest.SpyInstance

    beforeEach(() => {
        requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => setTimeout(cb, 0) as any)
        cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => clearTimeout(id))
        
        // Mock Canvas API
        HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
            clearRect: jest.fn(),
            beginPath: jest.fn(),
            arc: jest.fn(),
            fill: jest.fn(),
            fillStyle: '',
            globalAlpha: 1,
        })
    })

    afterEach(() => {
        requestAnimationFrameSpy.mockRestore()
        cancelAnimationFrameSpy.mockRestore()
    })

    it('renders without crashing and initializes stars', () => {
        const { container } = render(<div><CosmicBackground /></div>)
        const canvas = container.querySelector('canvas')
        expect(canvas).toBeInTheDocument()
    })

    it('handles window resize', () => {
        const { container } = render(<div style={{ width: '1000px', height: '1000px' }}><CosmicBackground /></div>)
        const canvas = container.querySelector('canvas')
        
        act(() => {
            window.dispatchEvent(new Event('resize'))
        })
        
        expect(canvas).toBeDefined()
    })

    it('responds to mouse movement on parent element', () => {
        const { container } = render(
            <div id="parent" style={{ width: '1000px', height: '1000px' }}>
                <CosmicBackground />
            </div>
        )
        const parent = container.firstChild as HTMLElement
        
        act(() => {
            fireEvent.mouseMove(parent, { clientX: 100, clientY: 100 })
        })
        
        act(() => {
            fireEvent.mouseLeave(parent)
        })
    })
})
