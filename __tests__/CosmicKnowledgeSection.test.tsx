import { render, screen } from '@testing-library/react'
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
})
