# GEMINI.md - VAITOR Portfolio

This document provides essential context and instructions for AI agents working on the **VAITOR** project, a cinematic portfolio for Reeve Lobo, Software Developer at IBM.

## Project Overview

VAITOR is a high-performance, visually immersive portfolio website built with **Next.js 14**, **Three.js**, and **Tailwind CSS**. It features complex 3D backgrounds, custom shaders, and sophisticated animations to create a "cinematic journey through code, craft, and cosmos."

### Core Technologies
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (with extensive custom theme and animations)
- **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations:** Framer Motion
- **Testing:** Jest, React Testing Library
- **Backend/Forms:** Nodemailer, Mailtrap (for contact API)
- **Analytics:** Vercel Analytics & Speed Insights

## Building and Running

### Development
```bash
npm run dev
```
Starts the development server on `http://localhost:3000`.

### Production
```bash
npm run build
npm run start
```
Builds the application for production and starts the server.

### Testing
```bash
npm run test           # Run all tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Generate test coverage report
```

### Linting
```bash
npm run lint
```

## Directory Structure

- `app/`: Next.js App Router structure, including global layout, fonts, and API routes (e.g., `api/contact`).
- `components/`: React components.
  - `sections/`: High-level page sections (Hero, About, Projects, etc.).
  - `three/`: Three.js specific scenes and shader components (e.g., `ColorBends`, `SkillsConstellation`).
- `public/`: Static assets, including site images and logos.
- `__tests__/`: Comprehensive test suite corresponding to components and API routes.

## Development Conventions

### Coding Style
- **TypeScript:** Strict typing is preferred. Use `interface` or `type` for component props.
- **Styling:** Use Tailwind CSS for most styling. Complex 3D-related styles or animations may use inline styles or CSS-in-JS via `styled-jsx` if necessary.
- **Components:** Functional components with `use client` directive where client-side interactivity (Three.js, Framer Motion, Hooks) is required.
- **Performance:** Utilize `next/dynamic` for heavy client-side components (like Three.js scenes) to optimize initial page load.

### Testing Practices
- **Jest & RTL:** Every major component should have a corresponding test in `__tests__/`.
- **API Testing:** API routes (like the contact form) should be tested using `node-mocks-http`.

### Deployment
- The project is configured for deployment on **Vercel**, utilizing Vercel's analytics and speed insight tools.
- Metadata is managed in `app/layout.tsx`.
