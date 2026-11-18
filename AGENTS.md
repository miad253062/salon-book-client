<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SalonBook client

Next.js 16.4.6 + React 19 + TypeScript (strict) App Router app. Course project; the backend is a sibling repo at `../salon-book-server` (Express 5, ESM, plain `index.js`, its own `.env`). This client currently has no API calls and no env vars — wire new API base URLs through `NEXT_PUBLIC_*` env vars when needed.

## Commands

- `npm run dev` — dev server (Turbopack).
- `npm run lint` — ESLint flat config (`eslint.config.mjs`), runs repo-wide.
- `npx tsc --noEmit` — typecheck (there is no npm script for it).
- `npm run build` — production build.
- There are no tests and no CI; verification is `npm run lint` → `npx tsc --noEmit` → `npm run build`.

## Gotchas

- Typecheck depends on generated Next types (`.next/types`, `.next/dev/types`, both gitignored): `LayoutProps<...>` in layouts is declared there. On a fresh clone, run `npm run dev` or `npm run build` once before `npx tsc --noEmit`.
- Type errors pointing at `.next/*/types/validator.ts` ("file is not a module", `__InvalidParamMatchingKeys`) mean a file under `src/app` is empty or has no default export — fix the route file, never the generated file.
- Tailwind v4 is CSS-first: only `@import "tailwindcss";` in `src/app/globals.css`, no `tailwind.config`/`postcss.config`. It is wired via the `@tailwindcss/turbopack` loader rule in `next.config.ts`, so builds must run on Turbopack — don't add a PostCSS config.
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts` + `babel-plugin-react-compiler` dep).

## Structure

- Everything lives in `src/app`; there is no `src/components`. Shared components go in `src/app/components/`, images in `src/app/assets/`. Auth pages use the `(auth)` route group.
- Path alias `@/*` → `./src/*` (defined in `tsconfig.json`).
- Layouts use the generated global type `LayoutProps<"/route">` instead of an inline `{ children }` prop type.
