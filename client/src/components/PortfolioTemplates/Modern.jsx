import { Mail, ExternalLink, ChevronRight } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Modern({ data }) {
  const { name, role, email, phone, about, skills, projects, github, linkedin } = data;

  return (
    <div className="min-h-full w-full bg-[#0a0f1d] text-slate-200 font-sans p-6 md:p-12 lg:p-16 flex justify-center selection:bg-purple-500/30">
      <div className="max-w-4xl w-full space-y-24">
        
        {/* Header Section */}
        <header className="space-y-8 animate-fade-in-up">
          <div className="space-y-4 border-l-4 border-cyan-500 pl-6">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              {name || 'Your Name'}
            </h1>
            <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-semibold">
              {role || 'Your Role'}
            </p>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            {about || 'Write a short blurb about who you are and what you do.'}
          </p>
          
          <div className="flex gap-4 pt-2">
            {github && (
              <a href={github} target="_blank" rel="noreferrer" className="p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white transition-all hover:-translate-y-1 ring-1 ring-white/5">
                <GithubIcon className="w-6 h-6" />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer" className="p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white transition-all hover:-translate-y-1 ring-1 ring-white/5">
                <LinkedinIcon className="w-6 h-6" />
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="p-3 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-xl text-cyan-400 hover:text-cyan-300 transition-all hover:-translate-y-1 ring-1 ring-cyan-500/20 flex items-center gap-2 px-4 shadow-sm">
                <Mail className="w-5 h-5" /> <span className="font-medium text-sm hidden sm:block">{email}</span>
              </a>
            )}
            {phone && (
              <a href={`tel:${phone}`} className="p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white transition-all hover:-translate-y-1 ring-1 ring-white/5 flex items-center gap-2 px-4 shadow-sm">
                <span className="font-medium text-sm">{phone}</span>
              </a>
            )}
          </div>
        </header>

        {/* Skills Section */}
        {skills && skills.length > 0 && skills.some(s => s.trim() !== '') && (
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-white">Core Technologies</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-800 to-transparent"></div>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => skill.trim() && (
                <span key={i} className="px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-lg text-sm font-medium text-slate-300 shadow-sm backdrop-blur-sm">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && projects.some(p => p.title || p.description) && (
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-white">Featured Work</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-800 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                (project.title || project.description) && (
                  <div key={project.id} className="group flex flex-col justify-between p-8 bg-slate-800/20 hover:bg-slate-800/40 border border-slate-800 hover:border-slate-700 rounded-2xl transition-all duration-300">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                        {project.title || 'Untitled Project'}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        {project.description || 'No description provided.'}
                      </p>
                    </div>
                    {project.link && (
                      <a href={project.link.startsWith('http') ? project.link : `https://${project.link}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:translate-x-2 transition-transform w-fit mt-2">
                        View Details <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="pt-12 pb-8 border-t border-slate-800/50 text-center text-slate-500 text-sm flex flex-col items-center gap-2">
          <p>Designed with PortfolioGen.</p>
        </footer>
        
      </div>
    </div>
  );
}
