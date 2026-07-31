// Knowledge base & intent matcher for PortGen AI Assistant

export const PORTGEN_KNOWLEDGE = {
  templates: [
    { name: "Modern", desc: "Sleek dark mode with cyan/slate gradients and clean card structures. Best for Full-Stack & Frontend engineers." },
    { name: "Glass", desc: "High-end glassmorphism with translucent frosted panels, glowing firefly particles, and smooth backdrop blurs." },
    { name: "Minimal", desc: "Monochrome elegance with high typographic precision, ideal for UI designers and minimalist developers." },
    { name: "NeoBrutalist", desc: "Vibrant retro neon accents, hard drop shadows, high contrast borders, and bold typography." },
    { name: "Claymorphic", desc: "Soft 3D inset shadows, tactile rounded cards, and vibrant pastel accents." },
    { name: "Creative", desc: "Dynamic animated gradient borders, floating pill badges, and interactive highlight sections." },
    { name: "NordicForest", desc: "Calming deep pine greens, warm muted tones, and subtle natural card elevation." },
    { name: "TerminalTheme", desc: "Hacker-style green text on pitch-black background with simulated command prompt interactions." }
  ],
  faq: [
    {
      keywords: ["deploy", "github pages", "host", "publish", "github token", "pat"],
      answer: "To deploy your portfolio to GitHub Pages:\n1. Click the **'Deploy to GitHub'** button in the header.\n2. Enter your GitHub Personal Access Token (PAT) with `repo` and `workflow` scopes.\n3. Enter your repository name (e.g., `my-portfolio`).\n4. Click **'Build & Deploy'**. PortGen automatically creates the repository, pushes the code, and configures GitHub Pages live!"
    },
    {
      keywords: ["import", "github repos", "fetch repos", "auto populate"],
      answer: "You can automatically import your top GitHub projects!\n1. Open the **Projects** section in the customizer form.\n2. Click **'Import from GitHub'**.\n3. Type your GitHub username to automatically pull titles, descriptions, star counts, and repository links."
    },
    {
      keywords: ["visitor count", "views", "counter", "analytics"],
      answer: "PortGen includes a live Visitor Counter widget! You can enable it in the **Analytics & Extras** tab of the customizer. It displays live page visits on your deployed site using lightweight, high-speed counting."
    },
    {
      keywords: ["export", "download", "zip", "html", "readme"],
      answer: "PortGen supports 3 export formats:\n• **Standalone HTML**: A single portable file with inline CSS.\n• **React Project (ZIP)**: Complete Vite + React + Tailwind project source code.\n• **Profile README**: Auto-compiled Markdown for your GitHub `username/username` profile README!"
    },
    {
      keywords: ["custom domain", "domain", "dns"],
      answer: "To use a custom domain (e.g. `yourname.com`):\n1. Deploy your site to GitHub Pages.\n2. Go to your GitHub repository settings -> Pages.\n3. Enter your custom domain in the **Custom domain** field.\n4. Add a `CNAME` or `A` record pointing to `username.github.io` in your DNS provider (e.g., Cloudflare, Namecheap)."
    },
    {
      keywords: ["template", "best template", "recommend"],
      answer: "Here is how to pick the right template:\n• **Modern**: Perfect for General Software Engineers.\n• **Glass / Creative**: Great for Frontend, Design Engineers & Web3 developers.\n• **Minimal**: Best for UI/UX Designers & Technical Authors.\n• **Terminal**: Awesome for DevOps, Backend, Cybersecurity & Systems Engineers."
    },
    {
      keywords: ["ai", "bio", "generate bio", "assistant"],
      answer: "Use our **AI Bio Generator** inside the General Info tab! Click 'Magic AI Bio', pick your tone (Professional, Creative, Tech-focused), and PortGen will craft a compelling developer introduction instantly."
    }
  ]
};

/**
 * Resolves user query using local knowledge base
 */
export function getAiResponse(userQuery) {
  const query = userQuery.toLowerCase().trim();

  // Check matching FAQ items
  for (const item of PORTGEN_KNOWLEDGE.faq) {
    if (item.keywords.some(k => query.includes(k))) {
      return item.answer;
    }
  }

  // General greetings
  if (query.match(/\b(hi|hello|hey|greetings|hola)\b/)) {
    return "Hello! 👋 I'm **PortBot**, your AI assistant for PortGen. Ask me anything about creating portfolios, choosing templates, GitHub Pages 1-click deployment, or visitor counter setup!";
  }

  if (query.includes("who made") || query.includes("author") || query.includes("creator")) {
    return "PortGen was designed and built by **Vansh Sharma**. You can check out his work on [GitHub](https://github.com/vansharmaweb) or connect on [LinkedIn](https://www.linkedin.com/in/vansharmaweb)!";
  }

  // Fallback response with helpful guide
  return "I'm here to help you build an impressive portfolio! You can ask me about:\n• 🚀 **Deploying to GitHub Pages**\n• 🎨 **Choosing & customizing templates**\n• 📦 **Exporting HTML, React ZIP & README**\n• 👁️ **Setting up the Visitor Counter**\n• 🤖 **Generating AI Bio & descriptions**\n\nWhat would you like to know?";
}
