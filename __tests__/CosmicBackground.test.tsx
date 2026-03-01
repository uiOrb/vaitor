import { render, fireEvent, act } from '@testing-library/react'
import CosmicBackground from '@/components/sections/CosmicBackground'

describe('CosmicBackground', () => {
    beforeEach(() => {
        jest.useFakeTimers()
        
        // Mock RAF on window
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            return setTimeout(() => cb(Date.now()), 16) as unknown as number
        })
        
        jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
            clearTimeout(id)
        })
    })

    afterEach(() => {
        jest.useRealTimers()
        jest.restoreAllMocks()
    })

    it('renders and handles mouse interactions and boundaries', () => {
        const { container, unmount } = render(
            <div style={{ width: 500, height: 500 }}>
                <CosmicBackground />
            </div>
        )

        const canvas = container.querySelector('canvas')
        const parent = canvas?.parentElement

        if (parent) {
            act(() => {
                window.dispatchEvent(new Event('resize'))
            })

            fireEvent.mouseMove(parent, { clientX: 100, clientY: 100 })
            
            // Advance lots of time to trigger boundary checks
            act(() => {
                jest.advanceTimersByTime(100000)
            })
            
            fireEvent.mouseLeave(parent)
        }
        
        expect(canvas).toBeInTheDocument()
        
        unmount()
    })
})
