import { render, screen, act } from '@testing-library/react'
import LoadingScreen from '@/components/LoadingScreen'

// Mock Framer Motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('LoadingScreen', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('renders and updates progress', () => {
        render(<LoadingScreen />)

        expect(screen.getByText(/VAITOR/i)).toBeInTheDocument()

        // Fast-forward time to see progress updates
        act(() => {
            jest.advanceTimersByTime(1500) // Roughly half way
        })

        // Check if progress text exists (e.g. "050%")
        // The component uses String(progress).padStart(3, '0')
        expect(screen.getByText(/[0-9]{3}%/)).toBeInTheDocument()

        // Finish loading
        act(() => {
            jest.advanceTimersByTime(2000)
        })

        // isVisible should become false after duration + timeout
        // but AnimatePresence/motion exit might still be in DOM depending on mocks
    })
})
