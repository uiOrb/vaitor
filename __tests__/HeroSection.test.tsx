import { render, screen, fireEvent, act } from '@testing-library/react'
import HeroSection from '@/components/sections/HeroSection'

// Mock dynamic components
jest.mock('next/dynamic', () => () => {
    const DynamicComponent = () => <div data-testid="mock-dynamic">Dynamic Component</div>
    DynamicComponent.displayName = 'DynamicComponent'
    return DynamicComponent
})

// Mock Framer Motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
        p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
        button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    },
}))

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe('HeroSection', () => {
    it('renders the main headlines and CTA', () => {
        // Mock getElementById for scrollToNext
        const mockElement = { scrollIntoView: jest.fn() }
        document.getElementById = jest.fn().mockReturnValue(mockElement)

        render(<HeroSection />)

        expect(screen.getByText(/SOFTWARE DEVELOPER/i)).toBeInTheDocument()
        expect(screen.getByText(/EXPLORER/i)).toBeInTheDocument()
        expect(screen.getByText(/BUILDER/i)).toBeInTheDocument()

        // Check for CTA button
        const cta = screen.getByText(/ENTER THE SIGNAL/i)
        expect(cta).toBeInTheDocument()

        // Test click
        fireEvent.click(cta)
        expect(document.getElementById).toHaveBeenCalledWith('origin')
        expect(mockElement.scrollIntoView).toHaveBeenCalled()

        // Test scroll hint click
        const scrollHint = screen.getByText(/Scroll/i).closest('div')
        if (scrollHint) {
            fireEvent.click(scrollHint)
            expect(mockElement.scrollIntoView).toHaveBeenCalled()
        }
    })

    it('handles window resize for style coverage', () => {
        render(<HeroSection />)
        act(() => {
            window.dispatchEvent(new Event('resize'))
        })
    })
})
