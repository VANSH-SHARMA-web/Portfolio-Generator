import { Layout } from 'lucide-react';

export default function TemplateSelector({ currentTheme, setCurrentTheme }) {
  const themes = [
    { id: 'modern', name: 'Modern', description: 'Deep dark, gradient accents.' },
    { id: 'glass', name: 'Glassmorphism', description: 'Translucent panels, aesthetic blur.' }
  ];

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-700 p-2 rounded-full shadow-2xl">
      <div className="p-2 text-slate-400">
        <Layout className="w-4 h-4" />
      </div>
      <div className="h-4 w-px bg-slate-700 mx-1"></div>
      {themes.map(theme => (
        <button
          key={theme.id}
          onClick={() => setCurrentTheme(theme.id)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            currentTheme === theme.id 
              ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          {theme.name}
        </button>
      ))}
    </div>
  );
}
