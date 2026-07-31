import { useMemo } from 'react';
import { Eye, ShieldCheck, Sparkles, Download } from 'lucide-react';

export default function ReadinessScorecard({ data, setData }) {
  const audit = useMemo(() => {
    let score = 0;
    const checks = [];

    if (data.name?.trim()) {
      score += 15;
      checks.push({ label: 'Full Name added', passed: true });
    } else {
      checks.push({ label: 'Add Full Name', passed: false });
    }

    if (data.role?.trim()) {
      score += 15;
      checks.push({ label: 'Developer Role defined', passed: true });
    } else {
      checks.push({ label: 'Set your Role/Title', passed: false });
    }

    if (data.about?.trim() && data.about.length > 30) {
      score += 20;
      checks.push({ label: 'Detailed Bio', passed: true });
    } else {
      checks.push({ label: 'Write a detailed bio (or use AI)', passed: false });
    }

    if (data.skills?.filter(Boolean).length >= 3) {
      score += 20;
      checks.push({ label: 'At least 3 Skills listed', passed: true });
    } else {
      checks.push({ label: 'Add 3+ skills', passed: false });
    }

    if (data.projects?.length >= 2) {
      score += 20;
      checks.push({ label: '2+ Featured Projects', passed: true });
    } else {
      checks.push({ label: 'Add at least 2 projects', passed: false });
    }

    if (data.github || data.linkedin || data.email) {
      score += 10;
      checks.push({ label: 'Contact/Social links present', passed: true });
    } else {
      checks.push({ label: 'Add GitHub, LinkedIn or Email', passed: false });
    }

    return { score: Math.min(100, score), checks };
  }, [data]);

  // Quick PDF Resume compilation handler
  const handleDownloadResumePdf = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return alert("Please allow popups to download PDF resume");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${data.name || 'Developer'} - Resume</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; padding: 40px; line-height: 1.5; max-width: 800px; margin: 0 auto; }
          h1 { margin: 0 0 4px 0; font-size: 28px; color: #0f172a; }
          .role { font-size: 16px; font-weight: 600; color: #2563eb; margin-bottom: 12px; }
          .contact { font-size: 12px; color: #64748b; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; }
          .section-title { font-size: 14px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; color: #334155; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-top: 24px; margin-bottom: 12px; }
          .about { font-size: 13px; color: #334155; margin-bottom: 16px; }
          .skill-pill { display: inline-block; background: #f1f5f9; color: #0f172a; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 500; margin-right: 6px; margin-bottom: 6px; border: 1px solid #e2e8f0; }
          .project { margin-bottom: 14px; }
          .project-title { font-size: 14px; font-weight: bold; color: #0f172a; }
          .project-desc { font-size: 12px; color: #475569; margin-top: 2px; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        <h1>${data.name || 'Your Name'}</h1>
        <div className="role">${data.role || 'Software Engineer'}</div>
        <div className="contact">
          ${data.email ? `Email: ${data.email} | ` : ''}
          ${data.phone ? `Phone: ${data.phone} | ` : ''}
          ${data.github ? `GitHub: ${data.github} | ` : ''}
          ${data.linkedin ? `LinkedIn: ${data.linkedin}` : ''}
        </div>

        <div className="section-title">Professional Summary</div>
        <div className="about">${data.about || 'Experienced developer passionate about building modern web applications.'}</div>

        <div className="section-title">Technical Skills</div>
        <div>
          ${(data.skills || []).map(s => `<span class="skill-pill">${s}</span>`).join('')}
        </div>

        <div className="section-title">Featured Projects</div>
        ${(data.projects || []).map(p => `
          <div class="project">
            <div class="project-title">${p.title} ${p.link ? `(${p.link})` : ''}</div>
            <div class="project-desc">${p.description}</div>
          </div>
        `).join('')}
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
      {/* Header & Score gauge */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Portfolio Readiness Score
          </h3>
          <p className="text-xs text-slate-400">Optimization & completeness meter</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className={`text-xl font-extrabold font-mono ${audit.score >= 80 ? 'text-emerald-400' : audit.score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
              {audit.score}%
            </span>
          </div>
          <button
            onClick={handleDownloadResumePdf}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-bold text-slate-950 rounded-lg shadow transition-all"
            title="Download ATS PDF Resume matching portfolio data"
          >
            <Download className="w-3.5 h-3.5" /> Resume PDF
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${audit.score >= 80 ? 'bg-emerald-400' : audit.score >= 50 ? 'bg-amber-400' : 'bg-red-400'}`}
          style={{ width: `${audit.score}%` }}
        />
      </div>

      {/* Checkbox pills */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {audit.checks.map((chk, i) => (
          <div key={i} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${chk.passed ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300' : 'bg-slate-800/50 border-slate-700/60 text-slate-400'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${chk.passed ? 'bg-emerald-400' : 'bg-slate-500'}`} />
            <span className="truncate">{chk.label}</span>
          </div>
        ))}
      </div>

      {/* Visitor Counter & AI Option Toggles */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white transition-colors">
          <input
            type="checkbox"
            checked={data.showVisitorCounter !== false}
            onChange={(e) => setData(prev => ({ ...prev, showVisitorCounter: e.target.checked }))}
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
          />
          <Eye className="w-3.5 h-3.5 text-cyan-400" /> Show Visitor Counter on Portfolio
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white transition-colors">
          <input
            type="checkbox"
            checked={data.showAiAssistant !== false}
            onChange={(e) => setData(prev => ({ ...prev, showAiAssistant: e.target.checked }))}
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-purple-500 focus:ring-purple-500"
          />
          <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Enable AI Chatbot on Portfolio
        </label>
      </div>
    </div>
  );
}
