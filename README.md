# Portfolio Website Generator

A highly customizable, developer-focused portfolio generator built with React and TailwindCSS. Phase 1 (MVP) allows users to generate visually stunning portfolios instantly through a real-time preview dashboard.

## Folder Structure

```
portfolio-generator/
│
├── client/                 # React Frontend (Active in Phase 1)
│   ├── src/
│   │   ├── components/     # Reusable UI components (Form, Preview)
│   │   ├── pages/          # Full page layouts (Home, Generate)
│   │   ├── App.jsx         # Router Config
│   │   └── main.jsx        # App entry point
│   └── package.json
│
└── server/                 # Backend (Prepared for Phase 3)
    ├── routes/
    ├── controllers/
    └── models/
```

## Running Locally

1. **Navigate to the client directory**:
   ```bash
   cd portfolio-generator/client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. Open your browser and visit the local dashboard URL.

## Features (Phase 1 MVP)
- **Live Preview Split-View:** Desktop users can see layout updates in real time. Mobile users get convenient Tab views.
- **Deep Dark Theme (`Modern` template):** A sleek Vercel/Linear style default layout designed specifically for developers.
- **Dynamic Fields:** Manage an expanding list of nested skills and project details seamlessly.

## Phase 2 Improvements Roadmap (Suggested)
- **Template Switching:** Introduce a `TemplateSelector` to let developers transition their portfolios between entirely new designs (e.g. `Minimal.jsx` or vibrant themes) instantly.
- **HTML/ZIP Payload Download:** Combine client state and pre-compiled template structures to generate a downloaded `.zip` output.
- **GitHub Automatic Sync:** Allow users to fetch repositories based on a username lookup using the GitHub Graph API. This eliminates the need to manually enter project details.
