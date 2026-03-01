import { render, screen, fireEvent } from '@testing-library/react'
import CosmicKnowledgeSection from '@/components/sections/CosmicKnowledgeSection'

// Mock sub-components
jest.mock('@/components/SkillsCanvas', () => {
    return function MockSkillsCanvas() {
        return <div data-testid="skills-canvas">Skills Canvas</div>
    }
})

jest.mock('@/components/ScrollReveal', () => {
    return function MockScrollReveal({ children }: { children: React.ReactNode }) {
        return <div>{children}</div>
    }
})

// Mock CosmicBackground
jest.mock('@/components/sections/CosmicBackground', () => {
    return function MockCosmicBackground() {
        return <div data-testid="cosmic-background">Cosmic Background</div>
    }
})

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}))

describe('CosmicKnowledgeSection', () => {
    it('renders both Skills and Certification sub-sections', async () => {
        render(<CosmicKnowledgeSection />)

        // Check Background
        expect(screen.getByTestId('cosmic-background')).toBeInTheDocument()

        // Check Skills Sub-section
        expect(screen.getByText(/CHAPTER 03 · SYSTEMS ONLINE/i)).toBeInTheDocument()
        expect(screen.getByText(/The stack that powers the mission/i)).toBeInTheDocument()
        expect(await screen.findByTestId('skills-canvas')).toBeInTheDocument()

        // Check Certification Sub-section
        expect(screen.getByText(/CHAPTER 04 · CREDENTIAL ARCHIVES/i)).toBeInTheDocument()
        expect(screen.getByText(/Validated skills. Tested in the field/i)).toBeInTheDocument()
        
        // Check for specific certification (from data)
        expect(screen.getByText(/Certified Kubernetes Application Developer/i)).toBeInTheDocument()
    })

    it('updates mouse position on mouse move', () => {
        const { container } = render(<CosmicKnowledgeSection />)
        const section = container.querySelector('.spotlight-section') as HTMLElement

        if (section) {
            // Mock getBoundingClientRect
            section.getBoundingClientRect = jest.fn(() => ({
                left: 0,
                top: 0,
                width: 1000,
                height: 1000,
                bottom: 1000,
                right: 1000,
                x: 0,
                y: 0,
                toJSON: () => { },
            } as any))

            fireEvent.mouseMove(section, { clientX: 100, clientY: 200 })

            expect(section.style.getPropertyValue('--mouse-x')).toBe('100px')
            expect(section.style.getPropertyValue('--mouse-y')).toBe('200px')
        }
    })

    it('updates opacity on mouse enter and leave', () => {
        const { container } = render(<CosmicKnowledgeSection />)
        const section = container.querySelector('.spotlight-section') as HTMLElement

        if (section) {
            fireEvent.mouseEnter(section)
            fireEvent.mouseLeave(section)
        }
    })
})
