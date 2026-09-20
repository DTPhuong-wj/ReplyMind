# Deploy ReplyMind to Cloudflare Pages

## Cloudflare Pages dashboard

Use these project settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: your deployment branch

Cloudflare Pages automatically runs the build on each push.

## Wrangler CLI

Authenticate once:

```bash
npx wrangler login
```

Build and deploy:

```bash
npm run deploy
```

The repository includes `wrangler.toml`, which points Cloudflare Pages to the Vite output directory.

## Local production check

```bash
npm run build
npm run preview
```

The frontend is a static Vite bundle. It does not require a server runtime or environment variables for the current mock-data experience.
