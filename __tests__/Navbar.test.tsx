import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import Navbar from '@/components/Navbar'

describe('Navbar', () => {
    it('renders and handles interactions', async () => {
        render(
            <>
                <Navbar />
                <div id="mission">Mission Section</div>
            </>
        )

        // Brand click
        const brand = screen.getByText('VAITOR')
        // Mock window.scrollTo
        window.scrollTo = jest.fn()
        fireEvent.click(brand)
        expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })

        // Scroll effect
        act(() => {
            window.scrollY = 100
            window.dispatchEvent(new Event('scroll'))
        })
        
        // Mobile Menu
        const hamburger = screen.getByLabelText('Toggle menu')
        fireEvent.click(hamburger)
        
        const mobileLinks = screen.getAllByText('Mission')
        const mobileLink = mobileLinks[1] // Second one is in drawer
        
        await waitFor(() => {
            expect(mobileLink).toBeVisible()
        })
        
        // Mock scrollIntoView
        Element.prototype.scrollIntoView = jest.fn()
        fireEvent.click(mobileLink)
        expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
    })

    it('handles desktop link interactions', () => {
        render(<Navbar />)
        const link = screen.getAllByText('Mission')[0] // Desktop one
        
        fireEvent.mouseEnter(link)
        expect(link.style.color).toBe('rgb(245, 245, 247)')
        
        fireEvent.mouseLeave(link)
        expect(link.style.color).toBe('rgb(161, 161, 170)') // Default color
        
        fireEvent.click(link)
        fireEvent.mouseLeave(link)
    })
})
