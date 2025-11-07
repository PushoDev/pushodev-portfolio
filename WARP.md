# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Luis A. Guisado Lavañino (Pushodev), a Full-Stack Developer from Cuba. The project is a single-page application built with React, TypeScript, and custom animations, featuring bilingual support (Spanish/English) and dark/light theme switching.

## Build System & Development Commands

This project uses a **custom esbuild-based build system** (not Vite, Create React App, or Next.js):

- **Development server**: `npm run dev` - Starts esbuild in watch mode with live reload via Server-Sent Events
- **Production build**: `npm run build` - Creates optimized production bundle in `dist/` folder

The build script is located at `scripts/build.mjs` and handles:
- TypeScript compilation with JSX automatic runtime
- Tailwind CSS processing with PostCSS and Autoprefixer
- File copying and bundling
- Development server with hot reload

**Note**: There are no test scripts defined in this project.

## Architecture Overview

### Context-Based State Management

The application uses React Context API for global state:

1. **ThemeContext** (`src/contexts/ThemeContext.tsx`):
   - Manages light/dark theme switching
   - Persists theme preference to localStorage
   - Toggles `dark` class on document element

2. **LanguageContext** (`src/contexts/LanguageContext.tsx`):
   - Manages bilingual support (Spanish/English)
   - Provides translation function `t(key)` throughout app
   - All translation strings are defined in-context (no external i18n files)

### Component Structure

The app follows a **single-page component architecture**:

- **Entry point**: `src/main.tsx` → `src/App.tsx`
- **Routing**: Uses `react-router` v7 with HashRouter (single route to Home page)
- **Main page**: `src/pages/Home.tsx` - Wraps all sections with ThemeProvider and LanguageProvider
- **Page sections** (in `src/components/`):
  - `Hero.tsx` - Landing section with typewriter effect and animated orbitals
  - `Skills.tsx` - Tech stack showcase
  - `Projects.tsx` - Filterable project grid with categories (all/web/mobile/desktop)
  - `About.tsx` - Personal information
  - `Contact.tsx` - Contact form
  - `Footer.tsx` - Footer with social links
- **UI effects**:
  - `AuroraBackground.tsx` - Animated gradient background
  - `CustomCursor.tsx` - Custom cursor follow effect
  - `TypewriterEffect.tsx` - Animated text typing
  - `CountUp.tsx` - Number counter animation
- **Floating actions**:
  - `WhatsAppButton.tsx` - Sticky WhatsApp contact button
  - `ScrollToTop.tsx` - Return to top button

### UI Component Library

Located in `src/components/ui/` - Shadcn-style components using Radix UI primitives:
- Built with Radix UI headless components
- Styled with Tailwind CSS using the `cn()` utility from `src/lib/utils.ts`
- Follows shadcn/ui patterns for consistency

### Styling System

- **Framework**: Tailwind CSS v3
- **Theme**: Custom color system using CSS variables (defined in HSL format)
  - Supports light/dark mode via `darkMode: ['class']` configuration
  - Theme variables: `--background`, `--foreground`, `--primary`, `--secondary`, etc.
  - Custom sidebar colors, chart colors, and border radius tokens
- **Animations**: 
  - `tailwindcss-animate` plugin for built-in animations
  - `motion` library (formerly Framer Motion) for advanced animations
  - Custom keyframes for accordion animations

### Path Aliases

TypeScript and bundler are configured with path alias:
- `@/*` → `./src/*`

Use this when importing: `import { Button } from '@/components/ui/button'`

## Key Patterns to Follow

### Translation Usage

Always use the `t()` function from LanguageContext for any user-facing text:

```typescript
import { useLanguage } from '@/contexts/LanguageContext';

const { t, language } = useLanguage();
// Usage: t('nav.home') → "Inicio" or "Home"
```

If adding new translatable strings, define them in both `es` and `en` objects in `src/contexts/LanguageContext.tsx`.

### Theme-Aware Styling

Use Tailwind's dark mode variant for all color values that should change with theme:

```typescript
className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
```

### Animation Patterns

Components use the `motion` library extensively:
- Wrap elements with `<motion.div>` for animations
- Common patterns: fade-in on scroll with `useInView`, hover scale effects
- Consistent animation durations (0.6-0.8s) for cohesion

### Component Conventions

- All components are functional components with TypeScript
- Use `React.FC` type annotation
- Motion animations typically have stagger delays for list items
- Glassmorphism effect pattern: `backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 border border-white/20`

## Development Notes

- **No environment variables** are currently used in the project
- **No testing framework** is configured
- **No linting/formatting scripts** defined (no ESLint or Prettier commands)
- **Images**: Some component images are hosted externally (pub-cdn.sider.ai URLs)
- **Icons**: Uses `lucide-react` for all icons
- **Forms**: React Hook Form with Zod validation available (libraries installed)
- **State management**: Zustand is installed but currently only Context API is used

## File Organization

```
src/
  ├── components/     # Page sections and UI effects
  │   └── ui/        # Shadcn-style reusable UI primitives
  ├── contexts/      # Global state (Theme, Language)
  ├── hooks/         # Custom React hooks
  ├── lib/           # Utility functions (cn helper)
  ├── pages/         # Route components (currently only Home)
  ├── imgs/          # Image assets
  └── main.tsx       # App entry point
```

## Custom Build Script Behavior

When modifying `scripts/build.mjs`:
- Entry points are `src/main.tsx` and `index.html`
- JSX transform is set to automatic (no React import needed)
- `.html` files are copied, `.png` files are processed as file assets
- Development mode includes SSE-based live reload (EventSource in index.html)
- Production mode minifies and removes sourcemaps
