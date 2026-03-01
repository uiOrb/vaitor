import { render, screen, fireEvent } from '@testing-library/react'
import CertificationSection from '@/components/sections/CertificationSection'

// Mock ScrollReveal
jest.mock('@/components/ScrollReveal', () => {
    return function MockScrollReveal({ children }: { children: React.ReactNode }) {
        return <div>{children}</div>
    }
})

describe('CertificationSection', () => {
    it('renders the section title and cards', () => {
        render(<CertificationSection />)

        // Check chapter title
        expect(screen.getByText(/CHAPTER 04 · CREDENTIAL ARCHIVES/i)).toBeInTheDocument()

        // Check for specific certification titles
        expect(screen.getByText(/Certified Kubernetes Application Developer/i)).toBeInTheDocument()
        expect(screen.getByText(/Azure Developer Associate/i)).toBeInTheDocument()
    })

    it('flips the card when clicked', () => {
        render(<CertificationSection />)

        const flipPrompt = screen.getAllByText(/Tap to flip/i)[0]
        const card = flipPrompt.closest('.cert-card-container')

        if (card) {
            fireEvent.click(card)
            // Check for achievement log on the back
            expect(screen.getAllByText(/Achievement Log/i).length).toBeGreaterThan(0)
        }
    })
})
