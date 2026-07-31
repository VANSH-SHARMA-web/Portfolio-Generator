import { useState, useEffect } from 'react';

/**
 * VisitorCounter component
 * Supports themes: 'compact', 'glass', 'terminal', 'neo'
 */
export default function VisitorCounter({ theme = 'compact', pageId = 'portgen_main', label = 'Site Visitors' }) {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const storageKey = `pv_count_${pageId}`;

    const updateVisitorCount = async () => {
      // Get locally stored count as instant baseline
      const cached = localStorage.getItem(storageKey);
      let localVal = cached ? parseInt(cached, 10) : 100;

      // Session guard to avoid double counting on re-renders
      const sessionKey = `pv_session_${pageId}`;
      if (!sessionStorage.getItem(sessionKey)) {
        localVal += 1;
        localStorage.setItem(storageKey, localVal.toString());
        sessionStorage.setItem(sessionKey, '1');
      }

      if (isMounted) setCount(localVal);

      // Attempt live API hit
      try {
        const cleanId = pageId.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
        const res = await fetch(`https://api.counterapi.dev/v1/portgen_${cleanId}/visits/up`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.count === 'number' && isMounted) {
            setCount(data.count + localVal);
          }
        }
      } catch (err) {
        // Fallback to local state if offline/blocked
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    updateVisitorCount();

    return () => {
      isMounted = false;
    };
  }, [pageId]);

  const formattedCount = count !== null ? count.toLocaleString() : '...';

  if (theme === 'terminal') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-black border border-green-500/50 rounded font-mono text-xs text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-ping inline-block" />
        <span>VISITORS:</span>
        <span className="font-bold tracking-wider">{loading ? '000000' : formattedCount.padStart(6, '0')}</span>
      </div>
    );
  }

  if (theme === 'neo') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-300 border-2 border-black font-extrabold text-xs text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase">
        <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 24 24">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
        <span>{label}:</span>
        <span className="bg-black text-yellow-300 px-1.5 py-0.5 rounded font-mono">{formattedCount}</span>
      </div>
    );
  }

  if (theme === 'glass') {
    return (
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 rounded-full text-xs text-slate-300 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span className="font-medium text-slate-400">{label}:</span>
        <span className="font-bold text-cyan-300 font-mono tracking-tight">{formattedCount}</span>
      </div>
    );
  }

  // Default compact pill theme
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-cyan-400">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span className="text-slate-400">{label}</span>
      <span className="font-bold text-white font-mono bg-slate-900/80 px-2 py-0.5 rounded text-[11px] border border-slate-700/50">
        {formattedCount}
      </span>
    </div>
  );
}
