import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactSection from '@/components/sections/ContactSection'

// Use absolute path for mocking
jest.mock('@/components/ScrollReveal', () => ({ children }: any) => <div data-testid="scroll-reveal">{children}</div>)

// Mock Framer Motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
        form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
        path: ({ children, ...props }: any) => <path {...props}>{children}</path>,
    },
    AnimatePresence: ({ children }: any) => <div data-testid="animate-presence">{children}</div>,
}))

// Mock fetch
global.fetch = jest.fn()

describe('ContactSection', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders the contact form and labels', () => {
        render(<ContactSection />)

        expect(screen.getByText(/CHAPTER 05 · OPEN CHANNEL/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Message/i)).toBeInTheDocument()
    })

    it('submits the form successfully', async () => {
        ; (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        })

        render(<ContactSection />)

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } })
        fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello!' } })

        fireEvent.click(screen.getByText(/SEND TRANSMISSION/i))

        await waitFor(() => {
            expect(screen.getByText(/Transmission received/i)).toBeInTheDocument()
        })
    })
})
