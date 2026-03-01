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

// Mock dynamic components to avoid Three.js/Canvas issues in JSDOM
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (...args: any[]) => {
    const Component = () => <div data-testid="mock-dynamic-component" />
    return Component
  },
}))

// Mock ExperienceCanvas specifically if needed, though dynamic mock might cover it
jest.mock('@/components/ExperienceCanvas', () => () => <div data-testid="experience-canvas" />)

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
