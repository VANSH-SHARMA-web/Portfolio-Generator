<div align="center">
  <img src="https://raw.githubusercontent.com/VANSH-SHARMA-web/Portfolio-Generator/main/client/public/logo.png" alt="PortfolioGen Logo" width="120" />
  <h1>PortfolioGen 🚀</h1>
  <p><strong>A highly customizable, developer-focused portfolio generator and distribution platform built with React and TailwindCSS.</strong></p>
</div>

---

PortfolioGen brings portfolios to life instantly. Whether you need to quickly download a sleek, responsive portfolio as a ZIP file or deploy it directly to GitHub Pages with a single click, PortfolioGen gives you absolute control without requiring you to touch any code.

## ✨ Elite Features

- **🚀 1-Click GitHub Pages Deploy:** Securely insert your GitHub PAT and automatically deploy your portfolio to your `username.github.io` domain right from the browser. Watch the magic happen through our integrated Vercel-style deployment terminal!
- **📦 Instant Standalone Exports:** Download your generated portfolio as a complete source `.zip` archive or as a highly portable, framework-independent standalone `.html` file. 
- **🔄 Auto-Import GitHub Repos:** Use the integrated GitHub auto-importer to fetch your public repositories and append them instantly to your portfolio's projects section.
- **🎨 Premium Interchangeable Themes:** Toggle instantly between beautifully curated templates like **Modern** (deep dark, sleek gradient accents) and **Glass** (immersive translucent panels, ambient background blurs).
- **🌐 Social SEO Optimization:** Generating your portfolio gracefully injects `OpenGraph` elements `<meta property="og:...">` so that sharing your links on LinkedIn, Twitter, and Discord yields stunning rich-image cards out-of-the-box.
- **📝 Automated GitHub Profile README:** Hit a button and instantly map your generated portfolio state directly into beautifully formatted Markdown. Paste it straight into your GitHub profile `username/username` repository!
- **⚡ Real-Time Engine:** See modifications happen live. The desktop UI presents an intuitive side-by-side editing pane, while mobile users get a gracefully optimized Tab mode.

## 🛠️ Tech Stack

- **Frontend Environment**: Vite + React 19
- **Styling**: TailwindCSS v4
- **State Management**: Lifted React Hooks (`Generate.jsx` orchestration)
- **APIs Used**: GitHub REST API (Repositories fetching, Authenticated Repo creation, Blob pushing, and Pages triggers).
- **Tooling**: `jszip`, `file-saver`, `lucide-react`

## 📁 Repository Structure

```text
portfolio-generator/
│
├── client/                 # React Frontend Client
│   ├── public/             # Static assets (logo)
│   ├── src/
│   │   ├── components/     # UI tools (Form, GithubImporter, TemplateSelector, DeployModal)
│   │   ├── pages/          # Primary App Views (Home, Generate)
│   │   └── utils/          # Core engines (githubDeploy.js, exportPortfolio.js, markdownExport.js)
│   └── package.json
│
└── server/                 # (Phase 4 Placeholder) Future MongoDB Express Routes
```

## 🧑‍💻 Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VANSH-SHARMA-web/Portfolio-Generator.git
   cd Portfolio-Generator/client
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` on your browser to begin generating your portfolio!

---

*Phase 1 through Phase 3 have been successfully implemented. Designed flexibly to prepare for Phase 4 (NodeJS Backend APIs and Authenticated Saved States).*
