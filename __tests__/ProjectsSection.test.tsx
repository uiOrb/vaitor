import { render, screen, fireEvent } from '@testing-library/react'
import ProjectsSection from '@/components/sections/ProjectsSection'

// Use absolute path for mocking
jest.mock('@/components/ScrollReveal', () => ({ children }: any) => <div data-testid="scroll-reveal">{children}</div>)

// Mock Framer Motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
        span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    },
    useMotionValue: () => ({ set: jest.fn(), get: () => 0 }),
    useTransform: () => 0,
}))

describe('ProjectsSection', () => {
    it('renders and handles card interactions', () => {
        render(<ProjectsSection />)

        // Check titles
        expect(screen.getByText(/CHAPTER 05 · TRANSMISSIONS/i)).toBeInTheDocument()

        // Test hover on a project card (first one)
        const card = screen.getByText(/Intelligent Platform for Hybrid Azure Kubernetes/i).closest('div')
        if (card) {
            fireEvent.mouseEnter(card)
            fireEvent.mouseLeave(card)
            fireEvent.mouseMove(card, { clientX: 100, clientY: 100 })
        }

        // Test "View Mission" link hover
        const links = screen.getAllByText(/View Mission/i)
        fireEvent.mouseEnter(links[0])
        fireEvent.mouseLeave(links[0])
    })
})
