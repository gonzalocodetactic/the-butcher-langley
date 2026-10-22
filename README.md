# The Butcher Langley

thebutcherlangley.com rebuilt on Next.js + Payload CMS 3, hosted on Vercel.

## Local setup

1. `cp .env.example .env` and fill in the values.
2. `npm install`
3. `npm run dev`, then open http://localhost:3000 (site) and http://localhost:3000/admin (CMS).

## Database migrations

Production uses migrations, not the dev schema push. Vercel runs `npm run ci` (migrate, then build).

- After changing collections, globals or fields: `npm run migrate:create <name>` and commit `src/migrations/`. Set `BLOB_READ_WRITE_TOKEN` (any non-empty value works) when creating a migration: the Blob storage plugin adds a media column only when it is enabled.
- Never point `npm run dev` or a seed script without `NODE_ENV=production` at the production database: in dev mode Payload pushes the schema directly and later migrations stop running cleanly.
