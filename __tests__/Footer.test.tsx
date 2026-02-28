import { render, screen, fireEvent } from '@testing-library/react'
import Footer from '@/components/sections/Footer'

describe('Footer', () => {
    it('renders and handles hover events', () => {
        render(<Footer />)

        // Check for brand name
        const brandElements = screen.getAllByText(/VAITOR/i)
        expect(brandElements.length).toBeGreaterThan(0)

        // Test hover on social links to cover onMouseEnter/onMouseLeave
        const linkedIn = screen.getByText(/LinkedIn/i)
        const github = screen.getByText(/GitHub/i)
        const email = screen.getByText(/Email/i)

        fireEvent.mouseEnter(linkedIn)
        fireEvent.mouseLeave(linkedIn)

        fireEvent.mouseEnter(github)
        fireEvent.mouseLeave(github)

        fireEvent.mouseEnter(email)
        fireEvent.mouseLeave(email)

        // Check for copyright and current year
        const year = new Date().getFullYear()
        expect(screen.getByText(new RegExp(`Reeve Lobo · © ${year}`, 'i'))).toBeInTheDocument()
    })
})
