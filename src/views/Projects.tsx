import { motion } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../store/useProjectStore';
import { ArrowRight, Search, Sparkles } from 'lucide-react';

const STATIC_CATEGORIES = ['All', 'Branding', 'UI/UX', 'Motion', 'Product', 'Portfolio'];

export function Projects() {
  const {
    projects,
    loading,
    pagination,
    filters,
    fetchProjects,
    loadMoreProjects,
    setFilters,
  } = useProjectStore();

  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const categoryOptions = useMemo(() => {
    const categories = new Set<string>(['All']);
    projects.forEach((project) => {
      if (project.category) {
        categories.add(project.category);
      }
    });
    return Array.from(categories).slice(0, 8);
  }, [projects]);

  useEffect(() => {
    fetchProjects(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category, filters.search, filters.sort]);

  const handleCategory = (category: string) => {
    setFilters({ category: category === 'All' ? '' : category });
    fetchProjects(1, true);
  };

  const handleSearch = (value: string) => {
    setFilters({ search: value });
  };

  const lastCardRef = useCallback(
    (node: HTMLButtonElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pagination.currentPage < pagination.totalPages) {
          loadMoreProjects();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, loadMoreProjects, pagination.currentPage, pagination.totalPages]
  );

  return (
    <section className="px-6 pb-24 max-w-[1400px] mx-auto">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] items-center mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-brand-accent font-mono uppercase tracking-[0.35em] text-[10px] mb-4 block">Portfolio Archive</span>
          <h1 className="font-display text-6xl md:text-7xl font-bold tracking-tight uppercase">Project Grid</h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-studio-text/70">
            Explore live work, case study launches, featured builds and premium campaigns built for modern brands.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl">
            <div className="flex items-center gap-3 border border-white/10 rounded-3xl bg-white/5 px-4 py-3">
              <Search size={18} className="text-white/50" />
              <input
                type="search"
                value={filters.search}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search projects, tags or categories"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
              />
            </div>
            <div className="mt-6 grid gap-3">
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategory(category)}
                  className={`rounded-3xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-all ${filters.category === category || (category === 'All' && !filters.category)
                    ? 'bg-brand-accent text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {projects.length === 0 && !loading ? (
          <div className="col-span-full rounded-[32px] border border-white/10 bg-white/5 p-16 text-center text-white/60">
            No projects found. Try a different search or category.
          </div>
        ) : (
          projects.map((project, index) => {
            const thumbnail = typeof project.thumbnail === 'string' ? project.thumbnail : project.thumbnail?.url;
            const refProp = index === projects.length - 1 ? { ref: lastCardRef } : {};

            return (
              <motion.button
                key={project.slug || project._id || index}
                type="button"
                onClick={() => navigate(`/projects/${project.slug}`)}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(255,255,255,0.04)] transition-all"
                {...refProp}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={thumbnail}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-2 text-[10px] uppercase tracking-[0.35em] text-white/80">
                    {project.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-4 text-xs uppercase tracking-[0.35em] text-studio-text/50">
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    <span>{project.views ?? 0} views</span>
                  </div>
                  <h2 className="text-2xl font-display font-bold tracking-tight text-white transition-colors group-hover:text-brand-accent">
                    {project.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-studio-text/70 line-clamp-3">
                    {project.shortDescription}
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.35em] text-white/50">View details</span>
                    <ArrowRight size={18} className="text-brand-accent" />
                  </div>
                </div>
              </motion.button>
            );
          })
        )}
      </div>

      <div className="mt-12 flex items-center justify-center">
        {loading ? (
          <div className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white/70">
            <Sparkles size={18} className="animate-pulse text-brand-accent" />
            Loading more projects…
          </div>
        ) : pagination.currentPage >= pagination.totalPages ? (
          <div className="text-sm text-studio-text/60">You're all caught up — no more projects to load.</div>
        ) : (
          <button
            type="button"
            onClick={loadMoreProjects}
            className="rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm uppercase tracking-[0.35em] text-white transition hover:bg-white/10"
          >
            Load more
          </button>
        )}
      </div>
    </section>
  );
}
