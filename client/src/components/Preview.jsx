import { useState } from 'react';
import ModernTemplate from './PortfolioTemplates/Modern';
import GlassTemplate from './PortfolioTemplates/Glass';
import TemplateSelector from './TemplateSelector';
import DeployModal from './DeployModal';
import { Download, Rocket, FileCode2, Code } from 'lucide-react';
import { exportPortfolio, exportStandaloneHtml } from '../utils/exportPortfolio';
import { exportReadme } from '../utils/markdownExport';

export default function Preview({ data, currentTheme, setCurrentTheme }) {
  const [isExporting, setIsExporting] = useState(false);
  const [showDeploy, setShowDeploy] = useState(false);

  const handleExportZip = async () => {
    setIsExporting(true);
    try {
      await exportPortfolio(data, currentTheme);
    } catch(err) {
      console.error(err);
      alert('Failed to export. Check console.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportHtml = () => {
    exportStandaloneHtml(data, currentTheme);
  };

  const handleExportReadme = () => {
    exportReadme(data);
  };

  return (
    <div className="w-full h-full pb-20 lg:pb-0 overflow-y-auto relative">
      <TemplateSelector currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
      
      {/* Export Actions Header */}
      <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
        
        <div className="flex bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-full overflow-hidden shadow-2xl">
          <button onClick={handleExportHtml} title="Download Standalone HTML" className="p-2.5 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors border-r border-slate-700">
            <Code className="w-4 h-4" />
          </button>
          <button onClick={handleExportReadme} title="Copy GitHub Profile README" className="p-2.5 hover:bg-slate-800 text-slate-300 hover:text-purple-400 transition-colors border-r border-slate-700">
            <FileCode2 className="w-4 h-4" />
          </button>
          <button onClick={handleExportZip} title="Download Source ZIP" disabled={isExporting} className="p-2.5 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors disabled:opacity-50">
            <Download className={`w-4 h-4 ${isExporting ? 'animate-bounce' : ''}`} />
          </button>
        </div>

        <button
          onClick={() => setShowDeploy(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white px-5 py-2 rounded-full font-bold shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
        >
          <Rocket className="w-4 h-4" />
          <span className="hidden sm:inline">1-Click Deploy</span>
        </button>

      </div>

      <div className="pt-24 lg:pt-0 min-h-full">
        {currentTheme === 'modern' && <ModernTemplate data={data} />}
        {currentTheme === 'glass' && <GlassTemplate data={data} />}
      </div>

      <DeployModal 
        isOpen={showDeploy} 
        onClose={() => setShowDeploy(false)} 
        data={data} 
        currentTheme={currentTheme} 
      />
    </div>
  );
}
