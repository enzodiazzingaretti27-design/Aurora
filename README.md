# Aurora — Luxury Countryside Retreat Template

A cinematic single-page landing template for a fictional luxury estancia retreat near Mendoza, Argentina.

Built as a premium, editable brand presentation with:

- **Next.js App Router**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lenis smooth scrolling**
- **Multi-language selector**
- **Responsive editorial layout**

## Local development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Editable content

Most visible content lives in:

```text
src/app/page.tsx
```

Inside that file, edit:

- **Translations:** `copy`
- **Images:** `images`
- **Gallery labels:** `copy.en.gallery`, `copy.es.gallery`, `copy.pt.gallery`
- **Suites:** `copy.[language].suites`
- **Navigation:** `copy.[language].nav`

## Languages

The template includes:

- **English**
- **Spanish**
- **Portuguese**

The language selector is rendered in the navbar with flags.

## Brand customization

Global colors, typography helpers, grain overlay and base styles are in:

```text
src/app/globals.css
```

Fonts are configured in:

```text
src/app/layout.tsx
```

Current font pairing:

- **Cormorant Garamond**
- **Inter Tight**

## Production build

```bash
npm run build
npm run start
```

## Deployment

Recommended deploy target:

- **Vercel**

Build command:

```bash
npm run build
```

Output is handled automatically by Next.js.
