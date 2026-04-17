import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Generate from './pages/Generate';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-500/30">
      <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="PortfolioGen" className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
          <span className="font-bold text-xl tracking-tight text-white/90">PortfolioGen</span>
        </div>
        <div>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
            GitHub
          </a>
        </div>
      </nav>

      <main className="flex-1 w-full flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
