# THEHYNO Studio

A cinematic bilingual portfolio prototype for THEHYNO Studio and the separate personal practice of Poriya Heydarinia.

## Included

- Full-viewport cinematic entry with real supplied motion
- English and Persian with full RTL layout
- Separate Studio and Personal Work collections
- Distinct Acting, Theatre, Directing, Personal Visual Work, AI Art, Photography, and Aerial categories
- Project viewer, responsive mobile menu, motion-reduction support, and keyboard-friendly controls
- Direct phone, WhatsApp, and Instagram calls to action
- GitHub Pages deployment workflow

## Local development

```bash
pnpm install
pnpm run dev
```

Production checks:

```bash
pnpm run typecheck
pnpm run build
pnpm run test:sites
```

## Content configuration

The bilingual copy, contact configuration, services, and project collections live near the top of `src/App.tsx`. Replace the temporary system font tokens in `src/styles.css` when the final typefaces are selected.

The Instagram link is configured for `@thehyno`. Add the confirmed Telegram URL alongside the other contact values before the final public release.

## Free GitHub Pages publishing

1. Create a GitHub repository and push this folder to its `main` branch.
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the source.
3. The included workflow builds and publishes the site automatically on every push to `main`.

This repository contains a frontend-only contact flow. Phone, WhatsApp, and Instagram links work without a server, which keeps the public version free to host. Add a serverless form endpoint only if stored enquiries or email delivery are needed later.
