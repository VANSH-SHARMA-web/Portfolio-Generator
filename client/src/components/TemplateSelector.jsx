import { Layout } from 'lucide-react';

export default function TemplateSelector({ currentTheme, setCurrentTheme }) {
  const themes = [
    { id: 'modern',   name: 'Modern',    description: 'Deep dark, gradient accents.' },
    { id: 'glass',    name: 'Glass',     description: 'Translucent panels, blur.' },
    { id: 'minimal',  name: 'Minimal',   description: 'Clean typography-first layout.' },
    { id: 'terminal', name: 'Terminal',  description: 'Hacker-style CLI aesthetic.' },
    { id: 'creative', name: 'Creative',  description: 'Bold gradients & colors.' },
  ];

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-700 p-1.5 rounded-full shadow-2xl">
      <div className="p-2 text-slate-400">
        <Layout className="w-4 h-4" />
      </div>
      <div className="h-4 w-px bg-slate-700 mx-0.5" />
      {themes.map(theme => (
        <button
          key={theme.id}
          onClick={() => setCurrentTheme(theme.id)}
          title={theme.description}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
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
