# 🎯 Lotto Simulator

A full-stack lottery simulation app built with Next.js App Router, TypeScript, and Drizzle ORM. Simulates the “Fictional Five” (5/90) draw game with live statistics and jackpot logic.

⸻

### 🚀 Tech Stack

• Frontend: Next.js App Router, React, TypeScript, Tailwind CSS
• Backend: API Routes with Server-Sent Events (SSE) or WebSocket (socket.io)
• ORM: Drizzle ORM + NeonDB (PostgreSQL)

⸻

### 🧪 Features

• 5/90 lottery draw simulation
• Fixed or random player numbers
• Adjustable simulation speed (10ms–1000ms)
• Jackpot logic (simulation stops after win or 500 years)
• Real-time stats: ticket count, cost, years, hit distribution
• Session-based game state with cookie support

⸻

# 📦 Project Setup

# Install dependencies

```bash
npm install
```

# Create .env file

Example .env

```bash
DATABASE_URL="postgresql://..."
```

Drizzle DB setup

```bash
npm run db:push # Push schema to DB
```

Dev server

```bash
npm run dev
```

⸻

# 🗃️ Scripts

```json
"scripts": {
  "build:server": "tsc -p tsconfig.server.json",
  "dev": "node dist/server.js",
  "build": "next build",
  "start": "NODE_ENV=production node dist/server.js",
  "lint": "next lint",
  "format": "prettier --write \"**/*.{ts,tsx,css}\"",
  "db:generate": "npx drizzle-kit generate",
  "db:push": "npx drizzle-kit push --config=drizzle.config.ts",
  "test": "vitest",
  "test:e2e": "npx cypress open"
}
```

⸻

# 🌍 Deployment

This project is deployable to Railway.

[Demo 1](https://lotto-simulator-production.up.railway.app/)

⸻

# 📁 Project structure (simplified)

```bash
/lotto-simulator
├── src/
│   ├── app/
│   │   └── api/     → draw, simulate/stream, stats
│   ├── components/  → UI components (DrawPanel, SimulationStats, Slider etc.)
│   ├── lib/         → utils, db, session, socket, constants
│   └── types/       → SimulationResult
├── drizzle/         → schema.ts
├── public/          → favicon, assets
├── docs/            → architecture, screenshots
└── .env             → NeonDB connection string
```

⸻

# 🧪 Testing

## Unit tests (Vitest)

```bash
npm run test        # run all unit tests
```

## E2E tests (Cypress)

```bash
npm run dev         # run dev server (http://localhost:3000)
npm run test:e2e    # launch Cypress GUI
```

⸻

## 📜 License

MIT

⸻

Made with ❤️ for the Fictional Numbers Lottery Inc. (NASDAQ: FNLI)
