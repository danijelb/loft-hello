# hello — Loft starter (Node + Hono + SQLite)

Runs on [Loft](https://paas.beslic.me). Push to `main` and GitHub Actions tests, builds, pushes to GHCR and deploys by digest; the live URL is `https://<name>.beslic.me`.

- `src/app.ts`: routes; `GET /health` must touch the database
- `src/migrate.ts`: expand-only migrations, run by Loft before each deploy
- `paas.yaml`: the Loft manifest
- Local run: `npm ci && DATA_DIR=./data npm run migrate && DATA_DIR=./data npm start`

One-time setup: create the app on Loft, add the returned token as the repo secret `LOFT_DEPLOY_TOKEN`, and after the first push make the GHCR package public (package settings → visibility).
