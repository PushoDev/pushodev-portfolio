---
description: Repository Information Overview
alwaysApply: true
---

# Pushodev Portfolio Information

## Summary
A personal portfolio website for Luis A. Guisado Lavañino (Pushodev), a Full-Stack Developer from Cuba. Built as a modern single-page application with TypeScript, React, and a custom esbuild-based build system. Features bilingual support (Spanish/English), dark/light theme switching, and animated UI components including a typewriter effect, custom cursor, and aurora background.

## Structure
```
src/
  ├── components/         # Page sections and UI effects
  │   ├── Hero.tsx       # Landing with typewriter and orbits
  │   ├── Skills.tsx     # Tech stack showcase
  │   ├── Projects.tsx   # Filterable project grid
  │   ├── About.tsx      # Personal information
  │   ├── Contact.tsx    # Contact form
  │   ├── Footer.tsx     # Footer with social links
  │   ├── AuroraBackground.tsx
  │   ├── CustomCursor.tsx
  │   ├── TypewriterEffect.tsx
  │   ├── CountUp.tsx
  │   ├── WhatsAppButton.tsx
  │   ├── ScrollToTop.tsx
  │   └── ui/            # Shadcn-style UI components
  ├── contexts/          # Global state management
  │   ├── ThemeContext.tsx
  │   └── LanguageContext.tsx
  ├── hooks/             # Custom React hooks
  ├── lib/               # Utilities (cn helper)
  ├── pages/             # Route components (Home.tsx)
  ├── imgs/              # Image assets
  ├── App.tsx            # Main app component
  ├── main.tsx           # Entry point
  └── shadcn.css         # Theme variables
dist/                    # Production build output
scripts/
  └── build.mjs          # Custom esbuild build script
```

## Language & Runtime
**Language**: TypeScript  
**Target**: ES2017  
**Runtime**: Node.js (dev), Browser (client)  
**Package Manager**: npm  
**Build System**: esbuild (custom configuration via scripts/build.mjs)

## Dependencies

**Main Dependencies**:
- **React** (18.3.1) - UI framework
- **react-router** (7.5.3) - Client-side routing
- **Radix UI** - Component primitives (accordion, dialog, tabs, etc.)
- **Tailwind CSS** (3.4.17) - Utility-first CSS framework
- **motion** (12.17.0) - Advanced animations
- **react-hook-form** (7.56.1) + **zod** (3.24.3) - Form handling and validation
- **i18next** (25.1.2) + **react-i18next** (15.5.1) - Internationalization
- **lucide-react** (0.503.0) - Icon library
- **sonner** (2.0.3) - Toast notifications
- **recharts** (2.15.3) - Chart library
- **zustand** (5.0.5) - State management
- **date-fns** (3.6.0) - Date utilities
- **class-variance-authority** (0.7.1) - Component styling
- **clsx** (2.1.1) + **tailwind-merge** (3.2.0) - Class merging utilities

**Development Dependencies**:
- **esbuild** (0.25.4) - Bundler
- **esbuild-style-plugin** (1.6.3) - CSS processing
- **tailwindcss** (3.4.17) - CSS framework
- **autoprefixer** (10.4.21) - CSS vendor prefixes
- **postcss** (8.5.3) - CSS transformation
- **rimraf** (6.0.1) - Cross-platform file deletion
- **@types/react** (19.1.3) + **@types/react-dom** (19.1.3) - TypeScript types
- **tailwindcss-animate** (1.0.7) - Animation utilities

## Build & Installation

**Install dependencies**:
```bash
npm install
```

**Development**:
```bash
npm run dev
```
Starts esbuild in watch mode with live reload via Server-Sent Events on localhost. Hot reload triggered by file changes.

**Production Build**:
```bash
npm run build
```
Creates optimized, minified bundle in `dist/` folder with tree-shaking enabled.

## Main Files & Resources

**Entry Points**:
- **src/main.tsx** - React app entry point
- **index.html** - HTML template with SSE event listener for dev reload
- **dist/** - Production build output directory

**Configuration Files**:
- **tsconfig.json** - TypeScript compiler settings with `@/*` path alias
- **tailwind.config.js** - Tailwind theme with dark mode support and custom color variables
- **scripts/build.mjs** - Custom esbuild configuration with PostCSS/Tailwind processing

**Key Components**:
- **src/contexts/ThemeContext.tsx** - Light/dark theme management with localStorage persistence
- **src/contexts/LanguageContext.tsx** - Bilingual support (Spanish/English)
- **src/pages/Home.tsx** - Main page wrapping all sections
- **src/lib/utils.ts** - `cn()` utility for merging Tailwind classes

## Architecture Patterns

**State Management**: React Context API (Theme and Language contexts). Zustand and Zod validation libraries available but not currently used.

**Styling**: Tailwind CSS with CSS variable-based theming for light/dark modes. Components use `dark:` variants for theme-aware styling.

**Animations**: `motion` library for advanced animations with common patterns like fade-in on scroll and hover effects. Consistent animation durations (0.6-0.8s).

**UI Components**: Shadcn-style components built on Radix UI primitives, styled with Tailwind, using `cn()` utility for class composition.

**Form Handling**: React Hook Form available; validation uses Zod schema definitions.

**Internationalization**: i18next and react-i18next configured with translations defined in `LanguageContext.tsx` (no external translation files).

