import { ArrowRight, Code2, LayoutTemplate, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-6 py-20 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-sm font-medium text-cyan-400 mb-8 w-fit shadow-inner">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        MVP Version 1.0 Live
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-tight">
        Build your developer portfolio <br className="hidden md:block" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">in seconds.</span>
      </h1>
      
      <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
        Input your skills, projects, and details. Get a premium, live-previewed portfolio website tailored for engineers and designers.
      </p>

      <button
        onClick={() => navigate('/generate')}
        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-all focus:outline-none focus:ring-4 focus:ring-cyan-500/30 overflow-hidden shadow-xl shadow-white/10"
      >
        <span className="relative z-10 flex items-center gap-2">
          Start Generating <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full max-w-4xl text-left">
        <FeatureCard 
          icon={<Zap className="w-6 h-6 text-yellow-400" />}
          title="Instant Preview"
          description="See changes in real-time as you type your details. No compilation needed."
        />
        <FeatureCard 
          icon={<LayoutTemplate className="w-6 h-6 text-purple-400" />}
          title="Premium Templates"
          description="Professionally designed themes that impress recruiters and clients instantly."
        />
        <FeatureCard 
          icon={<Code2 className="w-6 h-6 text-cyan-400" />}
          title="Developer First"
          description="Optimized for GitHub projects, technical skills, and clean aesthetics."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700 hover:border-slate-600 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 shadow-inner">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
