# hello — Loft starter (Node + Hono + SQLite)

Runs on [Loft](https://paas.beslic.me). Push to `main` and GitHub Actions tests, builds, pushes to GHCR and deploys by digest; the live URL is `https://<name>.beslic.me`.

- `src/app.ts`: routes; `GET /health` must touch the database
- `src/migrate.ts`: expand-only migrations, run by Loft before each deploy
- `paas.yaml`: the Loft manifest
- Local run: `npm ci && DATA_DIR=./data npm run migrate && DATA_DIR=./data npm start`

Setup: set `name`, `image` and `repo` in `paas.yaml`, create the app on Loft (`create_app`), push to `main`. No secrets: GitHub Actions proves it is this repo with an OIDC token, and Loft pulls the private image with its own read-only token.
