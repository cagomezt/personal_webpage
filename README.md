# Carlos Gomez - Personal Webpage

A professional CV and achievements portfolio built with React, TypeScript, and Vite.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Single Page Application**: Fast navigation between Home, CV, Achievements, and Contact pages
- **Consolidated Content**: Merged duplicate CV versions and achievement files into a clean, unified presentation
- **Modern Tech Stack**: React 18, TypeScript, Vite, React Router

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: CSS3 with modern features (Grid, Flexbox, Variables)

## 📁 Project Structure

```
personal_webpage/
├── src/
│   ├── components/     # Reusable React components
│   ├── data/          # Consolidated CV and achievements data (JSON)
│   ├── pages/         # Page components (Home, CV, Achievements, Contact)
│   ├── App.tsx        # Main application component
│   ├── main.tsx       # Entry point
│   └── index.css      # Global styles
├── public/            # Static assets
└── dist/              # Production build (generated)
```

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to GitHub Pages or any static hosting service.

## 📝 Content Updates

The website content is stored in JSON files for easy editing:

- **CV Data**: `src/data/cv.json` - Personal info, experience, education, skills
- **Achievements**: `src/data/achievements.json` - Yearly accomplishments and impact

To update your CV or add new achievements, simply edit these JSON files and rebuild.

## 🌐 Deployment

This project is configured for GitHub Pages with the base path `/personal_webpage/`.

To deploy:

1. Push your changes to the `main` branch
2. Enable GitHub Pages in repository settings:
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `dist` folder (if using GitHub Actions) OR build locally and push `dist` to `gh-pages` branch

## 📧 Contact

- Email: teshima@gmail.com
- LinkedIn: /cagomezt
- GitHub: /cagomezt