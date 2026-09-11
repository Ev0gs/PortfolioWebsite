# portfolio-website

Personal portfolio — built with React, Vite, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS v4** — styling
- **Motion** — animations
- **anime.js** — typing effect (scrambleText)
- **lucide-react** + **lucide-animated** — icons
- **shadcn/ui** — component primitives

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable components (Navbar, Footer, Background...)
│   └── ui/            # shadcn + lucide-animated icons
├── sections/          # Page sections (Hero, About, Skills, Projects, Contact)
├── lib/               # Utilities
├── assets/            # Images and static files
├── index.css          # Global styles + Tailwind
└── main.tsx           # App entry point
```

## Deployment

Deployed on [Vercel](https://vercel.com). Every push to `main` triggers a new deployment.
