# ⚡ ExpertHub — Platform for Corporate Trainers, Coaches, Consultants & AI Trainers

**ExpertHub** is a modern, high-performance web application and public intelligence platform designed to discover, gather, and showcase top-tier **Corporate Trainers**, **Corporate Coaches**, **Executive Coaches**, **Consultants**, and **AI Trainers**.

It gathers public information from web sources (websites, LinkedIn, YouTube, Podcasts) to auto-synthesize rich executive profiles with corporate client histories, video keynotes, podcast features, and direct inquiry channels.

---

## 🚀 Key Features

1. **5 Core Expert Categories**:
   - **Corporate Trainer**: Team resilience, Agile scaling, cross-functional performance.
   - **Corporate Coach**: Culture redesign, emotional intelligence, workplace wellness.
   - **Executive Coach**: C-Suite onboarding, executive presence, boardroom influence.
   - **Consultant**: Digital transformation, go-to-market execution, operational scaling.
   - **AI Trainer**: Enterprise GenAI adoption, LLM integration strategy, prompt engineering.

2. **Automated Public Source Profile Gatherer (Scraper Engine)**:
   - Input any website URL, LinkedIn profile link, YouTube channel, or expert name.
   - Built-in Node.js scraper parses OpenGraph metadata, social media links, podcast feeds, and client mentions (e.g. Google, Microsoft, Accenture, McKinsey, NVIDIA).

3. **Rich Profile Cards & Modal View**:
   - Short bio, verified credentials, rating/reviews count, location, fee range.
   - Client history chips (Google, AWS, Deloitte, Meta, etc.).
   - Interactive modal with embedded YouTube Keynote videos and Podcast links.
   - Direct corporate inquiry / consultation request form.
   - Profile claim & verification workflow.

4. **Vercel Free Plan + Serverless Node + Free Database Setup**:
   - Configured with `vercel.json` for 1-click Vercel Free Tier hosting.
   - Node API running on Vercel Serverless Functions (`/api`).
   - Database layer configured for **Neon Postgres / Vercel Postgres Free Tier**.

---

## 🛠️ Tech Stack

- **Frontend**: Angular 19 (Standalone Components, Signals, Reactive State, Glassmorphism CSS design system).
- **Backend API**: Node.js, Express, Cheerio (Public Data Scraper & HTML Metadata Extractor).
- **Deployment**: Vercel (Free Tier ready with `vercel.json`).
- **Database**: Serverless PostgreSQL (Neon / Vercel Postgres free tier) or local store.

---

## 📁 Repository Structure

```
.
├── frontend/                     # Angular 19 Client App
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── profile-detail-modal/
│   │   │   │   ├── scraper-studio/
│   │   │   │   ├── add-profile-modal/
│   │   │   │   └── vercel-guide/
│   │   │   ├── models/           # TypeScript interfaces (ExpertProfile, InquiryForm)
│   │   │   ├── services/         # ExpertService (API integration)
│   │   │   ├── app.ts            # Main component logic
│   │   │   └── app.html          # Main layout view
│   │   └── styles.css            # Modern dark glassmorphism design system
├── server/                       # Node.js API Server
│   ├── index.js                  # Express API server endpoints
│   ├── scraper.js                # Public data gathering & scraper engine
│   └── initialData.js            # Pre-seeded expert dataset
├── api/
│   └── index.js                  # Vercel serverless function entrypoint
└── vercel.json                   # Vercel deployment routing configuration
```

---

## 🚦 Local Development Instructions

### 1. Start the Node.js API Server
```bash
cd server
npm install
npm run dev
# Running at http://localhost:4000
```

### 2. Start the Angular Frontend
```bash
cd frontend
npm install
npx ng serve --port 4200
# Running at http://localhost:4200
```

---

## ☁️ Deploying to Vercel (Free Tier)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of ExpertHub"
   ```

2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Import your GitHub repository. Vercel automatically detects `vercel.json`.

3. **Provision Free Postgres Database**:
   - In Vercel Project Dashboard ➔ **Storage** ➔ **Connect Database** ➔ Choose **Neon Postgres (Free)** or **Vercel Postgres (Free)**.
   - Set the environment variable `DATABASE_URL` or `POSTGRES_URL`.
   - Deploy! Your Angular frontend and Node serverless functions will be live on Vercel's global CDN.
