import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock next/dynamic
jest.mock('next/dynamic', () => (func: any) => {
    const Component = () => <div data-testid="hero">Hero</div>
    Component.displayName = 'DynamicHero'
    return Component
})

// Mocking all sub-components to isolate Home layout
jest.mock('@/components/LoadingScreen', () => () => <div data-testid="loading-screen">Loading</div>)
jest.mock('@/components/Navbar', () => () => <div data-testid="navbar">Navbar</div>)
// Note: HeroSection is handled by next/dynamic mock above if it matches the first dynamic call
jest.mock('@/components/sections/AboutSection', () => () => <div data-testid="about">About</div>)
jest.mock('@/components/sections/ExperienceSection', () => () => <div data-testid="experience">Experience</div>)
jest.mock('@/components/sections/CosmicKnowledgeSection', () => () => <div data-testid="cosmic-knowledge">Cosmic Knowledge</div>)
jest.mock('@/components/sections/ProjectsSection', () => () => <div data-testid="projects">Projects</div>)
jest.mock('@/components/sections/ContactSection', () => () => <div data-testid="contact">Contact</div>)
jest.mock('@/components/sections/Footer', () => () => <div data-testid="footer">Footer</div>)

describe('Home Page', () => {
    it('renders the main layout sections', () => {
        render(<Home />)

        expect(screen.getByTestId('loading-screen')).toBeInTheDocument()
        expect(screen.getByTestId('navbar')).toBeInTheDocument()
        expect(screen.getByTestId('hero')).toBeInTheDocument()
        expect(screen.getByTestId('about')).toBeInTheDocument()
        expect(screen.getByTestId('experience')).toBeInTheDocument()
        expect(screen.getByTestId('cosmic-knowledge')).toBeInTheDocument()
        expect(screen.getByTestId('projects')).toBeInTheDocument()
        expect(screen.getByTestId('contact')).toBeInTheDocument()
        expect(screen.getByTestId('footer')).toBeInTheDocument()
    })
})
