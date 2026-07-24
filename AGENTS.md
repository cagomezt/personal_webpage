# AGENTS.md

## Project: Carlos Gomez Personal Webpage

### Tech Stack
- **Frontend:** React 18 + TypeScript + Vite
- **UI Framework:** Bootstrap 5 + React Bootstrap
- **Icons:** Font Awesome 7.0.0 (via CDN)
- **PDF Generation:** jsPDF
- **Routing:** React Router DOM v7
- **Hosting:** GitHub Pages (static site, no backend)

### Repository Rules

#### Deployment
- **NEVER** push to `main` branch — the user does that manually
- **ALWAYS** run `.\deploy.ps1` after finishing a task to deploy to `gh-pages`
- `deploy.ps1` builds the project and pushes built files to the `gh-pages` branch
- GitHub Pages serves from the `gh-pages` branch
- Site URL: https://cagomezt.github.io/personal_webpage/

#### Privacy
- **NEVER** expose personal contact info (email, phone, address) in the codebase
- Only LinkedIn (https://www.linkedin.com/in/cagomezt/) and GitHub (https://github.com/cagomezt) links are allowed
- If personal data is accidentally committed, rewrite git history before pushing

#### Git Hygiene
- `node_modules/` and `dist/` are gitignored — never commit them
- `deploy.ps1` is an exception — it lives in the repo root and is committed
- Make commits locally on `main`; deploy via `deploy.ps1`

#### Content
- All achievements follow the **Google XYZ framework**: "Accomplished [X], as measured by [Y], by doing [Z]"
- CV data is in `src/data/cv.json`
- Achievements data is in `src/data/achievements.json`
- The site has downloadable PDF and Markdown CV generators (`src/utils/cvGenerator.ts`)

#### Layout
- Left sidebar navigation (fixed, 260px wide)
- Gradient background (black → dark grey) on sidebar
- Circular profile photo at top of sidebar
- Sidebar contains: photo, name, menu, skills/education/languages, contact links
- Main content area on the right

### Build Commands
```bash
npm run dev      # Development server
npm run build    # Production build to dist/
npm run deploy   # Build + gh-pages (BROKEN on Windows — use deploy.ps1 instead)
```

### Known Issues
- `npm run deploy` (gh-pages npm package) fails on Windows with `ENAMETOOLONG`
- Use `.\deploy.ps1` instead for deployment from Windows