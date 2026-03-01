import '@testing-library/jest-dom'

// Mock IntersectionObserver
class MockIntersectionObserver {
    observe = jest.fn()
    disconnect = jest.fn()
    unobserve = jest.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
})

Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
})

// Mock Canvas getContext
HTMLCanvasElement.prototype.getContext = jest.fn((contextId: string) => {
    if (contextId === '2d') {
        return {
            clearRect: jest.fn(),
            beginPath: jest.fn(),
            arc: jest.fn(),
            fill: jest.fn(),
            fillText: jest.fn(),
            measureText: jest.fn(() => ({ width: 0 })),
            save: jest.fn(),
            restore: jest.fn(),
            translate: jest.fn(),
            rotate: jest.fn(),
            scale: jest.fn(),
        } as unknown as CanvasRenderingContext2D
    }
    return null
}) as any
