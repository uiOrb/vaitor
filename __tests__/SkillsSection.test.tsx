import { render, screen } from '@testing-library/react'
import SkillsSection from '@/components/sections/SkillsSection'

// Mock dynamic component
jest.mock('next/dynamic', () => () => {
    const DynamicComponent = () => <div data-testid="mock-canvas">Skills Canvas</div>
    DynamicComponent.displayName = 'DynamicComponent'
    return DynamicComponent
})

// Use absolute path for mocking
jest.mock('@/components/ScrollReveal', () => ({ children }: any) => <div data-testid="scroll-reveal">{children}</div>)

describe('SkillsSection', () => {
    it('renders correctly with technology categories', () => {
        render(<SkillsSection />)

        // Check for chapter title
        expect(screen.getByText(/CHAPTER 03 · SYSTEMS ONLINE/i)).toBeInTheDocument()

        // Check for categories
        expect(screen.getByText(/Languages/i)).toBeInTheDocument()
        expect(screen.getByText(/Frameworks/i)).toBeInTheDocument()
        expect(screen.getByText(/DevOps/i)).toBeInTheDocument()
        expect(screen.getByText(/Cloud/i)).toBeInTheDocument()
    })
})
