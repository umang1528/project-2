import { motion } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../store/useProjectStore';
import { ArrowRight, Search, Sparkles } from 'lucide-react';

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
  const [activeIndex, setActiveIndex] = useState(0);

  const categoryOptions = useMemo(() => {
    const categories = new Set<string>(['All']);
    projects.forEach((project) => {
      if (project.category) categories.add(project.category);
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

  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured),
    [projects]
  );

  return (
    <section className="
      pt-24 sm:pt-32 md:pt-40 lg:pt-48
      pb-16 sm:pb-24 md:pb-32
      px-4 sm:px-6 md:px-8
      max-w-[1400px] mx-auto
    ">

      {/* ─────────────────────────────────────────
          HERO
      ───────────────────────────────────────── */}
      <div className="
        grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12
        items-end
        mb-16 sm:mb-24 md:mb-32
        border-b border-black/10
        pb-10 sm:pb-14 md:pb-16
      ">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8"
        >
          <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] mb-4 sm:mb-6 block">
            Graphic Designer
          </span>

          <h1 className="
            font-display font-bold uppercase leading-[0.8] tracking-tighter text-black
            text-[13vw]
            sm:text-[10vw]
            md:text-8xl
            lg:text-9xl
            xl:text-[11rem]
          ">
            VISUAL STORIES.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 lg:mb-4"
        >
          <p className="text-black/60 text-sm sm:text-base font-medium leading-relaxed max-w-sm">
            "More than a showcase of projects, this archive reflects a journey of ideas transformed
            into meaningful visual experiences. From branding and social media campaigns to creative
            design systems, every piece is crafted to communicate clearly, inspire engagement, and
            leave a lasting impression."
          </p>

          <div className="mt-6 sm:mt-8 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-black/10" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-brand-accent/40 uppercase">
              SUMMER 2026 ISSUE
            </span>
          </div>
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────
          FILTERS
      ───────────────────────────────────────── */}
      <div className="
        flex flex-col sm:flex-row
        flex-wrap
        justify-between items-start sm:items-end
        gap-6 sm:gap-x-12 sm:gap-y-8
        mb-12 sm:mb-16 md:mb-24
      ">
        {/* Category filter */}
        <div className="space-y-3 sm:space-y-4">
          <span className="text-[10px] font-mono font-bold text-orange-500 uppercase tracking-[0.2em]">
            Filter by Category
          </span>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {categoryOptions.map((category) => (
              <button
                key={category}
                onClick={() => handleCategory(category)}
                className={`text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  filters.category === category ||
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

        {/* Search */}
        <div className="space-y-3 sm:space-y-4 w-full sm:w-auto sm:max-w-xs md:max-w-md sm:ml-auto">
          <span className="text-[10px] font-mono font-bold text-orange-500 uppercase tracking-[0.2em] block">
            Search Archive
          </span>
          <div className="flex items-center gap-3 border-b border-orange-500/20 pb-3">
            <Search size={15} className="text-orange-500/70 flex-shrink-0" />
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

      {/* ─────────────────────────────────────────
          PROJECT GRID
      ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 sm:gap-y-12 md:gap-y-10 gap-x-6 md:gap-x-12">

        {featuredProjects.length === 0 && !loading ? (
          <div className="col-span-full border border-black/10 p-12 sm:p-20 text-center text-black/50">
            No Projects Found.
          </div>
        ) : (
          featuredProjects.map((project, index) => {
            const thumbnail =
              typeof project.thumbnail === 'string'
                ? project.thumbnail
                : project.thumbnail?.url;

            const refProp =
              index === featuredProjects.length - 1 ? { ref: lastCardRef } : {};

            const spans = [
              'md:col-span-8',
              'md:col-span-4',
              'md:col-span-4',
              'md:col-span-8',
            ];
            const spanClass = spans[index % 4];
            const isLarge = spanClass === 'md:col-span-8';

            return (
              <>
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
                  {/* Image Card */}
                  <div className="
                    relative overflow-hidden mb-5 sm:mb-6 md:mb-8
                    border border-black/10 bg-white p-1.5 sm:p-2
                    shadow-[0px_20px_60px_rgba(0,0,0,0.12)]
                    hover:shadow-[0px_35px_90px_rgba(0,0,0,0.20)]
                    transition-all duration-700 cursor-pointer
                  ">
                    <img
                      src={thumbnail}
                      alt={project.title}
                      className={`
                        w-full object-cover grayscale
                        group-hover:grayscale-0
                        transition-all duration-700
                        group-hover:scale-[1.02]
                        ${isLarge
                          ? 'h-[280px] sm:h-[420px] md:h-[580px] lg:h-[720px] xl:h-[850px]'
                          : 'h-[220px] sm:h-[320px] md:h-[400px] lg:h-[500px]'
                        }
                      `}
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col gap-1.5 sm:gap-2">
                      <div className="bg-black/90 backdrop-blur-md text-white font-mono text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-1 rounded-full shadow-lg">
                        № {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="bg-brand-accent text-black font-mono text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-1 rounded-full shadow-lg">
                        {project.createdAt ? new Date(project.createdAt).getFullYear() : 'N/A'}
                      </div>
                    </div>
                  </div>

                  {/* Text Info */}
                  <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-[0.2em]">
                        {project.category}
                      </span>
                      <div className="h-[1px] flex-1 bg-black/10" />
                    </div>

                    <h3 className="
                      font-display font-bold uppercase text-black leading-none
                      group-hover:text-brand-accent transition-colors duration-300
                      text-3xl sm:text-4xl md:text-4xl lg:text-5xl
                    ">
                      {project.title}
                    </h3>

                    <p className="text-black/60 text-xs sm:text-sm leading-relaxed font-medium max-w-md line-clamp-2">
                      {project.shortDescription}
                    </p>

                    <div className="pt-1 sm:pt-2 flex items-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-black/40">
                      <span>View Project</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.button>

                {/* ── Every 4th project: Breakdown accordion ── */}
                {(index + 1) % 4 === 0 && (
                  <div className="col-span-full my-10 sm:my-16 md:my-20">

                    {/* Header */}
                    <div className="mb-10 sm:mb-12 md:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8">
                      <div>
                        <span className="text-brand-accent uppercase tracking-[0.4em] text-xs">
                          — Process Showcase
                        </span>
                        <h2 className="
                          mt-3 sm:mt-4
                          font-display uppercase leading-[0.85] tracking-tight
                          text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[8rem]
                        ">
                          Project
                          <br />
                          Breakdown
                        </h2>
                      </div>

                      <p className="max-w-md text-studio-text/60 text-base sm:text-lg leading-relaxed">
                        Explore the visual journey, layouts, concepts and design decisions behind the project.
                      </p>
                    </div>

                    {/* Desktop Accordion */}
                    <div className="hidden md:flex h-[500px] lg:h-[600px] xl:h-[650px] gap-2 lg:gap-3">
                      {[1, 2, 3, 4, 5].map((item, i) => {
                        const isActive = activeIndex === i;
                        return (
                          <motion.div
                            key={i}
                            onMouseEnter={() => setActiveIndex(i)}
                            animate={{ flex: isActive ? 5 : 1 }}
                            transition={{ duration: 0.8, ease: 'easeInOut' }}
                            className="relative overflow-hidden rounded-[24px] lg:rounded-[32px] border border-black/10 cursor-pointer min-w-0"
                          >
                            <img
                              src={`https://picsum.photos/seed/pbreak${item}/900/1400`}
                              alt=""
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50" />

                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 p-7 lg:p-10 flex flex-col justify-between z-10"
                              >
                                <div>
                                  <span className="text-brand-accent uppercase tracking-[0.4em] text-xs">
                                    Project Breakdown
                                  </span>
                                  <h3 className="mt-3 sm:mt-4 text-white font-display uppercase text-4xl lg:text-5xl xl:text-6xl">
                                    Project {item}
                                  </h3>
                                  <p className="mt-4 sm:mt-6 max-w-md text-white/70 leading-relaxed text-sm sm:text-base">
                                    Explore layouts, visual systems, creative thinking and design decisions behind this project.
                                  </p>
                                </div>
                                <span className="text-white/20 font-display text-7xl lg:text-8xl">
                                  0{item}
                                </span>
                              </motion.div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Mobile: stacked cards */}
                    <div className="flex md:hidden flex-col gap-4">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div
                          key={item}
                          className="relative overflow-hidden rounded-2xl border border-black/10 h-[200px] sm:h-[240px]"
                        >
                          <img
                            src={`https://picsum.photos/seed/pbreak${item}/900/1400`}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/55" />
                          <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                            <span className="text-brand-accent uppercase tracking-[0.4em] text-[10px]">
                              Project Breakdown
                            </span>
                            <div>
                              <h3 className="text-white font-display uppercase text-3xl">
                                Project {item}
                              </h3>
                              <span className="text-white/20 font-display text-5xl">0{item}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}
              </>
            );
          })
        )}
      </div>

      {/* ─────────────────────────────────────────
          LOAD MORE
      ───────────────────────────────────────── */}
      <div className="mt-16 sm:mt-20 md:mt-24 flex items-center justify-center">
        {loading ? (
          <div className="inline-flex items-center gap-3 border border-black/10 bg-black/[0.03] px-5 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-black/70">
            <Sparkles size={16} className="animate-pulse text-brand-accent" />
            Loading More Projects...
          </div>
        ) : pagination.currentPage >= pagination.totalPages ? (
          <div className="text-xs sm:text-sm text-black/40">
            You're all caught up — no more projects.
          </div>
        ) : (
          <button
            type="button"
            onClick={loadMoreProjects}
            className="border border-black/10 bg-black/[0.03] px-8 sm:px-10 py-3 sm:py-4 text-[10px] sm:text-xs uppercase tracking-[0.4em] text-black/60 transition-all hover:bg-black/10"
          >
            Load More
          </button>
        )}
      </div>

    </section>
  );
}