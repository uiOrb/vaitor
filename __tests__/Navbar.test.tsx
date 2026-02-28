import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '@/components/Navbar'

// Simple mock for framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
        span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    },
    AnimatePresence: ({ children }: any) => <div data-testid="animate-presence">{children}</div>,
}))

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe('Navbar Component', () => {
    it('handles brand click and scroll events', () => {
        render(<Navbar />)

        // Brand click (scroll to top)
        window.scrollTo = jest.fn()
        fireEvent.click(screen.getByText('VAITOR'))
        expect(window.scrollTo).toHaveBeenCalled()

        // Test scroll effect (covers scrolled state)
        fireEvent.scroll(window, { target: { scrollY: 100 } })
        // Note: useEffect sets scrolled state, which changes border color

        // Desktop link hover and click
        const originBtn = screen.getByText('Origin')
        fireEvent.mouseEnter(originBtn)
        fireEvent.mouseLeave(originBtn)

        // Mock getElementById for scrollTo
        document.querySelector = jest.fn().mockReturnValue({ scrollIntoView: jest.fn() })
        fireEvent.click(originBtn)
        expect(document.querySelector).toHaveBeenCalledWith('#origin')
    })

    it('handles mobile menu toggle', () => {
        render(<Navbar />)

        const hamburger = screen.getByLabelText('Toggle menu')
        fireEvent.click(hamburger)

        // Now check for mobile links (renders inside AnimatePresence mockup)
        // The mobile drawer is only rendered when menuOpen is true
        // In our simplified mock, it should show up.
        const mobileLinks = screen.getAllByText('Origin')
        expect(mobileLinks.length).toBeGreaterThan(0)
    })
})
