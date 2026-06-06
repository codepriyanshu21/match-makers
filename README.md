# TDC Matchmakers

Internal matchmaker dashboard built with TanStack Start, Vite, React, TypeScript, Supabase, and Cloudflare Workers.

## Features

- Client profile dashboard with biodata, notes, and match history
- AI-assisted match ranking and intro drafts
- Supabase auth and data access
- Cloudflare-ready production build

## Tech Choices

- TanStack Start for file-based routing, server functions, and app structure
- React and TypeScript for a type-safe UI and component logic
- Supabase for authentication and customer data storage
- Vite for fast local development and production builds
- Cloudflare Workers for deployment

## Matching Logic

- Candidate profiles are ranked by a local scoring system in `src/lib/matching.ts`
- The score considers profile compatibility signals such as age, location, religion, lifestyle, education, work, and preferences
- Matches are grouped into tiers so the most promising profiles appear first
- The matching results are used in the customer detail page to show suggested matches and score-based reasoning

## How AI Is Used

- AI generates short explanations for why a match is recommended
- AI drafts introductory emails for a selected match before sending
- AI requests run on the server through the app’s AI gateway helper
- The UI always lets the user review the generated text before confirming any action

## Assumptions Made

- Customer profile data is complete enough for ranking without additional user input
- Matching scores are advisory and do not replace human review
- Supabase credentials and Google Gemini credentials are available in the deployment environment
- Cloudflare serves the built app using the generated worker and static asset output

## Prerequisites

- Node.js 20 or newer
- npm
- Supabase project credentials
- Google Gemini API key for AI features

## Environment Variables

Create a `.env` file in the project root with the following values:

```dotenv
SUPABASE_URL=your_supabase_url
SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
GOOGLE_API_KEY=your_google_gemini_api_key
```

Keep secrets out of version control.

## Development

Install dependencies and start the local dev server:

```bash
npm install
npm run dev
```

## Build

Create a production build:

```bash
npm run build
```

The build generates client assets in `.output/public` and the server bundle in `.output/server` for Cloudflare-compatible deployment.

## Deploy to Cloudflare

This repo includes `wrangler.jsonc` for Cloudflare deployment.

1. Add your production environment variables in Cloudflare.
2. Make sure the project root is the folder containing this `README.md` and `package.json`.
3. Deploy with Wrangler:

```bash
npx wrangler deploy
```

## Scripts

- `npm run dev` - start the local development server
- `npm run build` - build for production
- `npm run preview` - preview the Vite build locally
- `npm run lint` - run ESLint
- `npm run format` - format the codebase with Prettier

## Project Notes

- `src/routes/__root.tsx` defines the app shell and top-level routing layout.
- `src/routes/README.md` documents TanStack Start file-based routing conventions.
- `wrangler.jsonc` configures Cloudflare deployment output and observability.