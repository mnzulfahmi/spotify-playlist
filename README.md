# Music portfolio

A Vite + React + TypeScript implementation of the interactive music portfolio component.

## Project conventions

- Reusable UI components: `src/components/ui`
- App-specific composed components: `src/components`
- Global Tailwind 4 styles: `src/index.css`
- `@/` resolves to `src/`

The shadcn alias `@/components/ui` maps to `src/components/ui`, so this is the standard `/components/ui` structure inside a Vite app that uses a `src` directory. Keeping reusable UI there lets the shadcn CLI find and compose components consistently.

## Run locally

```bash
npm install
npm run dev
```

To recreate the setup in another empty folder, run:

```bash
npm create vite@latest . -- --template react-ts
npm install tailwindcss @tailwindcss/vite tw-animate-css gsap lucide-react
npx shadcn@latest init
```

Choose `src/index.css` for global styles and `@/components/ui` for UI components when prompted.
