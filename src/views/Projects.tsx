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
    <section className="pt-48 pb-32 px-6 max-w-[1400px] mx-auto">

      {/* HERO SECTION */}

      <div className="grid lg:grid-cols-12 gap-12 items-end mb-32 border-b border-white/10 pb-16">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8"
        >
          <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
            Collection Retrospective
          </span>

          <h1 className="font-display text-7xl md:text-9xl lg:text-[11rem] leading-[0.8] tracking-tighter font-bold uppercase text-black">
            THE INDEX.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 lg:mb-4"
        >
          <p className="text-black/60 text-xl font-medium leading-relaxed max-w-sm">
            "Design is the silent ambassador of your brand.
            Exploring visual systems since MMXVI."
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-white/10"></div>

            <span className="text-[10px] font-mono font-bold tracking-widest text-brand-accent/40 uppercase">
              SUMMER 2026 ISSUE
            </span>
          </div>
        </motion.div>
      </div>

      {/* FILTERS */}

      <div className="flex flex-wrap justify-between items-end gap-x-12 gap-y-8 mb-24">

        {/* CATEGORY */}

        <div className="space-y-4">
          <span className="text-[10px] font-mono font-bold text-orange-500 uppercase tracking-[0.2em]">
            Filter by Category
          </span>

          <div className="flex flex-wrap gap-4">
            {categoryOptions.map((category) => (
              <button
                key={category}
                onClick={() => handleCategory(category)}
                className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 ${filters.category === category ||
                  (category === 'All' && !filters.category)
                  ? 'text-orange-500'
                  : 'text-black/40 hover:text-orange-500'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* SEARCH */}

        <div className="space-y-4 w-full max-w-md lg:ml-auto">
          <span className="text-[10px] font-mono font-bold text-orange-500 uppercase tracking-[0.2em] block">
            Search Archive
          </span>

          <div className="flex items-center gap-3 border-b border-orange-500/20 pb-3">
            <Search size={16} className="text-orange-500/70" />

            <input
              type="search"
              value={filters.search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-transparent outline-none text-sm text-black placeholder:text-black/30"
            />
          </div>
        </div>

      </div>

      {/* PROJECT GRID */}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-12">

        {projects.length === 0 && !loading ? (
          <div className="col-span-full border border-white/10 p-20 text-center text-white/50">
            No Projects Found.
          </div>
        ) : (
          projects.map((project, index) => {

            const thumbnail =
              typeof project.thumbnail === 'string'
                ? project.thumbnail
                : project.thumbnail?.url;

            const refProp =
              index === projects.length - 1 ? { ref: lastCardRef } : {};

            const spans = [
              'md:col-span-8',
              'md:col-span-4',
              'md:col-span-7',
              'md:col-span-4',
              'md:col-span-4',
            ];

            const spanClass = spans[index % spans.length];

            return (
              <motion.button
                key={project.slug || project._id || index}
                type="button"
                onClick={() => navigate(`/projects/${project.slug}`)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className={`group relative flex flex-col text-left ${spanClass}`}
                {...refProp}
              >
                <div className="relative overflow-hidden mb-8 border border-white/10 p-2 bg-white/[0.03] cursor-pointer">

                  <img
                    src={thumbnail}
                    alt={project.title}
                    className="w-full aspect-[4/5] object-cover grayscale-[60%] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute top-4 left-4 flex flex-col gap-1">

                    <div className="bg-black text-white font-mono text-[10px] px-3 py-1">
                      № {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="bg-brand-accent text-black font-mono text-[10px] px-3 py-1">
                      {new Date(project.createdAt).getFullYear()}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">

                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-[0.2em]">
                      {project.category}
                    </span>

                    <div className="h-[1px] flex-1 bg-white/10"></div>
                  </div>

                  <h3 className="text-3xl font-display font-bold tracking-tight uppercase text-black group-hover:text-brand-accent transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-black/60 text-sm leading-relaxed font-medium max-w-md line-clamp-2">
                    {project.shortDescription}
                  </p>

                  <div className="pt-2 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/40">
                    <span>View Project</span>
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </motion.button>
            );
          })
        )}
      </div>

      {/* LOAD MORE */}

      <div className="mt-24 flex items-center justify-center">

        {loading ? (
          <div className="inline-flex items-center gap-3 border border-white/10 bg-white/[0.03] px-6 py-4 text-sm text-white/70">

            <Sparkles
              size={18}
              className="animate-pulse text-brand-accent"
            />

            Loading More Projects...
          </div>
        ) : pagination.currentPage >= pagination.totalPages ? (
          <div className="text-sm text-white/40">
            You're all caught up — no more projects.
          </div>
        ) : (
          <button
            type="button"
            onClick={loadMoreProjects}
            className="border border-white/10 bg-white/[0.03] px-10 py-4 text-xs uppercase tracking-[0.4em] text-white transition-all hover:bg-white/10"
          >
            Load More
          </button>
        )}
      </div>
    </section>
  );
}