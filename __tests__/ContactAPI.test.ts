import { POST } from '@/app/api/contact/route'

// Mock MailtrapClient
jest.mock('mailtrap', () => {
    return {
        MailtrapClient: jest.fn().mockImplementation(() => {
            return {
                send: jest.fn().mockResolvedValue({ success: true }),
            }
        }),
    }
})

// Mock NextResponse
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn().mockImplementation((data, init) => ({
            status: init?.status || 200,
            json: async () => data,
        })),
    },
}))

describe('Contact API Route', () => {
    const OLD_ENV = process.env

    beforeEach(() => {
        jest.clearAllMocks()
        process.env = { ...OLD_ENV }
        process.env.MAILTRAP_TOKEN = 'test-token'
    })

    afterAll(() => {
        process.env = OLD_ENV
    })

    const mockRequest = (body: any) => ({
        json: async () => body,
    } as any)

    it('returns 400 if required fields are missing', async () => {
        const req = mockRequest({ name: 'Test' })
        const response = await POST(req)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toContain('required')
    })

    it('returns 500 if MAILTRAP_TOKEN is missing', async () => {
        delete process.env.MAILTRAP_TOKEN
        const req = mockRequest({ name: 'Test', email: 'test@example.com', message: 'Hello' })
        const response = await POST(req)
        const data = await response.json()

        expect(response.status).toBe(500)
        expect(data.error).toContain('not configured')
    })

    it('returns 200 on successful email sent', async () => {
        const req = mockRequest({ name: 'Test', email: 'test@example.com', message: 'Hello' })
        const response = await POST(req)
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data.success).toBe(true)
    })

    it('returns 500 if Mailtrap fails', async () => {
        const { MailtrapClient } = require('mailtrap')
        ;(MailtrapClient as jest.Mock).mockImplementationOnce(() => ({
            send: jest.fn().mockRejectedValue(new Error('SMTP Error')),
        }))

        const req = mockRequest({ name: 'Test', email: 'test@example.com', message: 'Hello' })
        const response = await POST(req)
        const data = await response.json()

        expect(response.status).toBe(500)
        expect(data.error).toContain('Failed to send')
    })
})
