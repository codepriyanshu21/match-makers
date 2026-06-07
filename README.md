# TDC Matchmakers

Internal matchmaker dashboard built with TanStack Start, Vite, React, TypeScript, Supabase, and Vercel.

## Features

- Client profile dashboard with biodata, notes, and match history
- AI-assisted match ranking and intro drafts
- Supabase auth and data access
- Vercel-ready production build

## Tech Choices

- TanStack Start for file-based routing, server functions, and app structure
- React and TypeScript for a type-safe UI and component logic
- Supabase for authentication and customer data storage
- Vite for fast local development and production builds
- Vercel for deployment

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

## Authentication

- The app uses Supabase email and password authentication
- Open the `/auth` page to either sign in or create a new account
- On the login tab, enter your email and password, then submit to access the dashboard
- On the signup tab, enter the same details to create an account; the app signs the user in after registration
- After login, the session is stored by Supabase and attached to server function requests automatically
- If a user already has a session, the auth page redirects them to `/dashboard`

## Assumptions Made

- Customer profile data is complete enough for ranking without additional user input
- Matching scores are advisory and do not replace human review
- Supabase credentials and Google Gemini credentials are available in the deployment environment
- Vercel serves the built app using the generated Nitro output

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

The build generates client assets and server output for Vercel deployment.

## Deploy to Vercel

Nitro is configured for Vercel output.

1. Add your production environment variables in Vercel.
2. Make sure the project root is the folder containing this `README.md` and `package.json`.
3. Set the build command to `npm run build`.
4. Use `.vercel/output` as the output directory if you set it manually.
5. Deploy from your connected GitHub repository.

## Scripts

- `npm run dev` - start the local development server
- `npm run build` - build for production
- `npm run preview` - preview the Vite build locally
- `npm run lint` - run ESLint
- `npm run format` - format the codebase with Prettier

## Project Notes

- `src/routes/__root.tsx` defines the app shell and top-level routing layout.
- `src/routes/README.md` documents TanStack Start file-based routing conventions.
- `wrangler.jsonc` is only relevant if you also deploy this project to Cloudflare.