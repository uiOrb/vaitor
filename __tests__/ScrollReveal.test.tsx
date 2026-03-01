import { render, screen, act } from '@testing-library/react'
import React from 'react'
import ScrollReveal from '@/components/ScrollReveal'

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
})
window.IntersectionObserver = mockIntersectionObserver

describe('ScrollReveal', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('renders children and animates on intersection', () => {
        let intersectCallback: any
        const mockObserver = jest.fn((callback) => {
            intersectCallback = callback
            return {
                observe: jest.fn(),
                disconnect: jest.fn(),
                unobserve: jest.fn(),
            }
        })
        window.IntersectionObserver = mockObserver as any

        render(
            <ScrollReveal delay={500}>
                <div>Test Content</div>
            </ScrollReveal>
        )

        const content = screen.getByText('Test Content')
        const container = content.parentElement as HTMLElement

        // Trigger non-intersecting first (coverage)
        act(() => {
            intersectCallback([{ isIntersecting: false, target: container }])
        })
        expect(container.style.opacity).toBe('0')

        // Trigger intersection
        act(() => {
            intersectCallback([{ isIntersecting: true, target: container }])
        })

        // Fast forward time
        act(() => {
            jest.advanceTimersByTime(500)
        })

        // Final state
        expect(container.style.opacity).toBe('1')
        expect(container.style.transform).toBe('translateY(0)')
    })

    it('forwards ref correctly', () => {
        const ref = React.createRef<HTMLDivElement>()
        render(
            <ScrollReveal ref={ref}>
                <div>Ref Content</div>
            </ScrollReveal>
        )
        expect(ref.current).toBeInstanceOf(HTMLDivElement)
        expect(ref.current?.textContent).toBe('Ref Content')
    })
})
