import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactSection from '@/components/sections/ContactSection'

// Mock ScrollReveal
jest.mock('@/components/ScrollReveal', () => ({ children }: any) => <div data-testid="scroll-reveal">{children}</div>)

// Mock Framer Motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
        path: ({ children, ...props }: any) => <path {...props}>{children}</path>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}))

// Mock fetch
global.fetch = jest.fn()

describe('ContactSection', () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear()
        jest.spyOn(console, 'error').mockImplementation(() => {})
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('renders the form correctly', () => {
        render(<ContactSection />)
        expect(screen.getByText('Establish contact.')).toBeInTheDocument()
    })

    it('handles successful submission', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        })

        render(<ContactSection />)
        
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } })
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } })
        fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } })
        
        fireEvent.click(screen.getByText('SEND TRANSMISSION'))
        
        await waitFor(() => expect(screen.getByText('Transmitting…')).toBeInTheDocument())
        await waitFor(() => expect(screen.getByText('Transmission received.')).toBeInTheDocument())
    })

    it('handles API error submission', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: 'Server error' }),
        })

        render(<ContactSection />)
        
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } })
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } })
        fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } })

        fireEvent.click(screen.getByText('SEND TRANSMISSION'))
        
        await waitFor(() => expect(screen.getByText('Server error')).toBeInTheDocument())
    })

    it('handles default API error submission', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({}), // No error message
        })

        render(<ContactSection />)
        
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } })
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } })
        fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } })

        fireEvent.click(screen.getByText('SEND TRANSMISSION'))
        
        await waitFor(() => expect(screen.getByText('Something went wrong')).toBeInTheDocument())
    })

    it('handles network exception', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

        render(<ContactSection />)
        
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } })
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } })
        fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } })

        fireEvent.click(screen.getByText('SEND TRANSMISSION'))
        
        await waitFor(() => expect(screen.getByText('Network error')).toBeInTheDocument())
    })
    
    it('handles unknown exception', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce('Unknown error')

        render(<ContactSection />)
        
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } })
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } })
        fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } })

        fireEvent.click(screen.getByText('SEND TRANSMISSION'))
        
        await waitFor(() => expect(screen.getByText('Connection failed. Try again.')).toBeInTheDocument())
    })
})
