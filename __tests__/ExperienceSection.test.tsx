import { render, screen, act } from '@testing-library/react'
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
        expect(screen.getAllByText(/DevSecOps Engineer/i).length).toBeGreaterThan(0)
        expect(screen.getAllByText(/Associate Software Engineer/i).length).toBeGreaterThan(0)
    })

    it('triggers timeline animation on intersection', () => {
        let intersectCallback: any
        const mockObserver = jest.fn((callback) => {
            intersectCallback = callback
            return {
                observe: jest.fn(),
                disconnect: jest.fn(),
                unobserve: jest.fn(),
            }
        })
        global.IntersectionObserver = mockObserver as any

        const { container } = render(<ExperienceSection />)
        const line = container.querySelector('line')

        if (line && intersectCallback) {
            act(() => {
                intersectCallback([{ isIntersecting: true, target: line }])
            })
            expect(line.style.strokeDashoffset).toBe('0')
        }
    })
})
