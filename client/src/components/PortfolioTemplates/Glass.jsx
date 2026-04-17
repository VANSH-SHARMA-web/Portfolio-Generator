import { Mail, ExternalLink, ChevronRight, Smartphone } from 'lucide-react';

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

export default function Glass({ data }) {
  const { name, role, email, phone, about, skills, projects, github, linkedin } = data;

  return (
    <div className="min-h-full w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white font-sans p-6 md:p-12 lg:p-16 flex justify-center selection:bg-pink-500/30 relative overflow-hidden z-0">
      {/* Ambient background blobs objects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 -z-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 -z-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-32 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 -z-10 animate-blob animation-delay-4000"></div>

      <div className="max-w-5xl w-full space-y-12">
        <header className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl flex flex-col items-center text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            {name || 'Your Name'}
          </h1>
          <p className="text-xl md:text-2xl text-pink-300 font-medium tracking-wide uppercase">
            {role || 'Your Role'}
          </p>
          <p className="text-lg text-white/80 max-w-3xl leading-relaxed">
            {about || 'Share your story here.'}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors backdrop-blur-sm">
                <Mail className="w-5 h-5" /> <span>{email}</span>
              </a>
            )}
            {phone && (
              <a href={`tel:${phone}`} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors backdrop-blur-sm">
                <Smartphone className="w-5 h-5" /> <span>{phone}</span>
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors backdrop-blur-sm">
                <GithubIcon className="w-5 h-5" /> <span>GitHub</span>
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors backdrop-blur-sm">
                <LinkedinIcon className="w-5 h-5" /> <span>LinkedIn</span>
              </a>
            )}
          </div>
        </header>

        {/* Skills Section */}
        {skills && skills.length > 0 && skills.some(s => s.trim() !== '') && (
          <section className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-white/90 uppercase tracking-widest text-center">Expertise</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, i) => skill.trim() && (
                <span key={i} className="px-5 py-2.5 bg-black/20 border border-white/5 rounded-2xl text-sm font-semibold tracking-wide text-white/90">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && projects.some(p => p.title || p.description) && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white/90 uppercase tracking-widest text-center mb-8">Selected Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                (project.title || project.description) && (
                  <div key={project.id} className="group flex flex-col justify-between p-8 bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 rounded-3xl transition-all duration-300 shadow-xl">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-300 transition-colors">
                        {project.title || 'Untitled Project'}
                      </h3>
                      <p className="text-white/70 text-base leading-relaxed mb-6">
                        {project.description || 'No description provided.'}
                      </p>
                    </div>
                    {project.link && (
                      <a href={project.link.startsWith('http') ? project.link : `https://${project.link}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-cyan-300 font-semibold hover:text-cyan-200 transition-colors w-fit">
                        View Project <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
