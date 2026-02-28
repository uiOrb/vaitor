import { render, screen } from '@testing-library/react'
import AboutSection from '@/components/sections/AboutSection'

// Use absolute path for mocking to match the component's import or resolve correctly
jest.mock('@/components/ScrollReveal', () => ({ children }: any) => <div data-testid="scroll-reveal">{children}</div>)

describe('AboutSection', () => {
    it('renders correctly with title and description', () => {
        render(<AboutSection />)

        // Check for major headings - matching the exact text in components/sections/AboutSection.tsx
        expect(screen.getByText(/CHAPTER 01 · ORIGIN/i)).toBeInTheDocument()
        expect(screen.getByText(/Born from curiosity/i)).toBeInTheDocument()

        // Check for biography content
        expect(screen.getByText(/I'm Reeve Lobo/i)).toBeInTheDocument()
        expect(screen.getByText(/Software Developer at IBM/i)).toBeInTheDocument()
    })
})
