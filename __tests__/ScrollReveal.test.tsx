import { render, screen } from '@testing-library/react'
import ScrollReveal from '@/components/ScrollReveal'

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
})
window.IntersectionObserver = mockIntersectionObserver

// Mock Framer Motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    useInView: () => true,
}))

describe('ScrollReveal', () => {
    it('renders children when in view', () => {
        render(
            <ScrollReveal>
                <div data-testid="child">Revealed</div>
            </ScrollReveal>
        )

        expect(screen.getByTestId('child')).toBeInTheDocument()
        expect(screen.getByText(/Revealed/i)).toBeInTheDocument()
    })
})
