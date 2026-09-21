# Everyday Tech LLC

Websites, apps, and AI integrations for small businesses — plus custom development for managed service providers.

## Stack

- **Next.js** (App Router) on **Vercel**
- **Supabase** (Postgres, Auth, Storage)

## Local development

```bash
cp .env.local.example .env.local
# fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm install
npm run dev
```

## Project structure

- `src/app/(marketing)` — public landing site
- `src/app/(auth)` — login (Phase B)
- `src/app/(portal)` — customer projects (Phase B)
- `src/app/(admin)` — pipeline / CRM (Phase B)
