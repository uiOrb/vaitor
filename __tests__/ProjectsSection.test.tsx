import { render, screen, fireEvent, forwardRef } from '@testing-library/react'
import ProjectsSection from '@/components/sections/ProjectsSection'

// Use absolute path for mocking with forwardRef to avoid ref warnings
jest.mock('@/components/ScrollReveal', () => {
    const { forwardRef } = require('react')
    return forwardRef(({ children }: any, ref: any) => (
        <div data-testid="scroll-reveal" ref={ref}>{children}</div>
    ))
})

// Mock Framer Motion with forwardRef for motion.div
jest.mock('framer-motion', () => {
    const { forwardRef } = require('react')
    return {
        motion: {
            div: forwardRef(({ children, whileHover, ...props }: any, ref: any) => (
                <div {...props} ref={ref}>{children}</div>
            )),
            h2: forwardRef(({ children, ...props }: any, ref: any) => (
                <h2 {...props} ref={ref}>{children}</h2>
            )),
            span: forwardRef(({ children, ...props }: any, ref: any) => (
                <span {...props} ref={ref}>{children}</span>
            )),
        },
        useMotionValue: () => ({ set: jest.fn(), get: () => 0 }),
        useTransform: () => 0,
    }
})

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
