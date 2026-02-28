import { render, screen } from '@testing-library/react'
import ExperienceSection from '@/components/sections/ExperienceSection'

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
})
window.IntersectionObserver = mockIntersectionObserver

// Use absolute path for mocking
jest.mock('@/components/ScrollReveal', () => ({ children }: any) => <div data-testid="scroll-reveal">{children}</div>)

describe('ExperienceSection', () => {
    it('renders the experience entries correctly', () => {
        render(<ExperienceSection />)

        // Check for chapter title
        expect(screen.getByText(/CHAPTER 02 · MISSION LOG/i)).toBeInTheDocument()

        // Check for company names
        expect(screen.getAllByText(/IBM/i).length).toBeGreaterThan(0)

        // Check for roles
        expect(screen.getByText(/Software Developer/i)).toBeInTheDocument()
        expect(screen.getByText(/DevOps Engineer/i)).toBeInTheDocument()
    })
})
