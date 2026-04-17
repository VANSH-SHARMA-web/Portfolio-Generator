import { useState } from 'react';
import { DownloadCloud, Loader2 } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function GithubImporter({ data, setData }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRepos = async () => {
    if (!username) return;
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
      if (!resp.ok) throw new Error('User not found or rate limit exceeded');
      const repos = await resp.json();
      
      const newProjects = repos.map((repo) => ({
        id: repo.id.toString() + Date.now(),
        title: repo.name.replace(/-/g, ' '),
        description: repo.description || 'No description provided.',
        link: repo.html_url
      }));

      // Append to existing projects or replace them (let's append to existing, pushing them to the top)
      setData(prev => ({
        ...prev,
        projects: [...newProjects, ...prev.projects]
      }));
      setUsername('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <GithubIcon className="w-5 h-5 text-white" />
        <h3 className="text-white font-medium">Auto-Import from GitHub</h3>
      </div>
      <p className="text-sm text-slate-400 mb-4">Fetch your latest 6 public repositories automatically.</p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <input 
          type="text" 
          value={username} 
          onChange={e => setUsername(e.target.value)}
          placeholder="GitHub Username" 
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
          onKeyDown={(e) => e.key === 'Enter' && fetchRepos()}
        />
        <button 
          onClick={fetchRepos}
          disabled={loading || !username}
          className="px-5 py-2.5 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <DownloadCloud className="w-4 h-4" />}
          Import
        </button>
      </div>
      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
    </div>
  );
}
