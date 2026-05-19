import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectStore } from '../store/useProjectStore';
import { ArrowLeft, ArrowRight, Tag, Eye } from 'lucide-react';

export function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentProject, relatedProjects, loading, fetchProjectBySlug } = useProjectStore();

  useEffect(() => {
    if (slug) {
      fetchProjectBySlug(slug);
    }
  }, [slug, fetchProjectBySlug]);

  if (loading || !currentProject) {
    return (
      <section className="px-6 py-24 max-w-[1400px] mx-auto text-center">
        <div className="inline-flex items-center gap-3 rounded-3xl bg-white/5 px-8 py-6 text-white/70">
          <ArrowRight className="animate-spin" />
          Loading project details...
        </div>
      </section>
    );
  }

  const heroImage = typeof currentProject.thumbnail === 'string' ? currentProject.thumbnail : currentProject.thumbnail.url;

  return (
    <section className="px-6 pb-24 max-w-[1400px] mx-auto">
      <motion.button
        type="button"
        onClick={() => navigate('/projects')}
        className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm uppercase tracking-[0.35em] text-white/80 hover:bg-white/10 transition"
      >
        <ArrowLeft size={18} />
        Back to projects
      </motion.button>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-10">
          <div className="rounded-[32px] overflow-hidden border border-white/10 bg-white/5 shadow-[0_40px_90px_rgba(0,0,0,0.18)]">
            <img src={heroImage} alt={currentProject.title} className="w-full object-cover max-h-[620px]" referrerPolicy="no-referrer" />
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_0.65fr]">
            {currentProject.images?.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
                <img src={image.url} alt={`${currentProject.title} gallery ${index + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(255,255,255,0.04)]">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-accent/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-brand-accent">
              {currentProject.category}
            </span>
            <h1 className="mt-6 text-5xl font-display font-bold tracking-tight text-white">{currentProject.title}</h1>
            <p className="mt-6 text-sm leading-relaxed text-studio-text/70">{currentProject.fullDescription}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {currentProject.hashtags?.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70">
                  <Tag size={14} /> {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-black/10 p-6">
                <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">Views</span>
                <p className="mt-3 text-3xl font-semibold text-white">{currentProject.views ?? 0}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/10 p-6">
                <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">Created</span>
                <p className="mt-3 text-3xl font-semibold text-white">{new Date(currentProject.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_0_40px_rgba(255,255,255,0.04)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.35em] text-brand-accent">Case Study</span>
                <h2 className="mt-4 text-3xl font-semibold text-white">Full story</h2>
              </div>
              <div className="rounded-full bg-black/20 px-4 py-2 text-sm uppercase tracking-[0.35em] text-white/70">{currentProject.status}</div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-studio-text/70 whitespace-pre-line">{currentProject.caseStudy || currentProject.fullDescription}</p>
          </motion.div>
        </div>
      </motion.div>

      <div className="mt-20">
        <h2 className="text-3xl font-semibold tracking-tight text-white">Related work</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {relatedProjects.map((project) => {
            const thumb = typeof project.thumbnail === 'string' ? project.thumbnail : project.thumbnail?.url;
            return (
              <motion.button
                key={project.slug || project._id}
                type="button"
                onClick={() => navigate(`/projects/${project.slug}`)}
                whileHover={{ y: -5 }}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(255,255,255,0.04)]"
              >
                <img src={thumb} alt={project.title} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-white/50">
                    <Eye size={14} />
                    <span>{project.views ?? 0} views</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-studio-text/70 line-clamp-3">{project.shortDescription}</p>
                  <div className="mt-6 flex items-center justify-between text-brand-accent">
                    <span>View story</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
