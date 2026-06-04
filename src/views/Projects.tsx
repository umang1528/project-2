import { motion } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

  console.log('Projects:', projects);

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


  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured),
    [projects]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  console.log('Featured Projects:', featuredProjects);

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

        {featuredProjects.length === 0 && !loading ? (
          <div className="col-span-full border border-white/10 p-20 text-center text-white/50">
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

            const isLarge =
              spanClass === 'md:col-span-8';

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


                  <div className="relative overflow-hidden mb-8 border border-black/10 bg-white p-2 shadow-[0px_20px_60px_rgba(0,0,0,0.12)] hover:shadow-[0px_35px_90px_rgba(0,0,0,0.20)] transition-all duration-700 cursor-pointer">

                    <img
                      src={thumbnail}
                      alt={project.title}
                      className={`
    w-full
    object-cover
    grayscale
    group-hover:grayscale-0
    transition-all
    duration-700
    group-hover:scale-[1.02]
    ${isLarge ? 'h-[850px]' : 'h-[500px]'}
  `}
                    />

                    <div className="absolute top-6 left-6 flex flex-col gap-2">

                      <div className="bg-black/90 backdrop-blur-md text-white font-mono text-[10px] px-3 py-1 rounded-full shadow-lg">
                        № {String(index + 1).padStart(2, '0')}
                      </div>

                      <div className="bg-brand-accent text-black font-mono text-[10px] px-3 py-1 rounded-full shadow-lg">
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

                    <h3 className="text-5xl font-display font-bold uppercase text-black leading-none group-hover:text-brand-accent transition-colors duration-300">
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

                {(index + 1) % 4 === 0 && (

                  <div className="col-span-full my-24">

                    <div className="mt-16 hidden md:flex h-[650px] gap-3">

                      {[1, 2, 3, 4, 5].map((item, index) => {

                        const isActive = activeIndex === index;

                        return (

                          <motion.div
                            key={index}
                            onMouseEnter={() => setActiveIndex(index)}
                            animate={{
                              flex: isActive ? 5 : 1,
                            }}
                            transition={{
                              duration: 0.8,
                              ease: "easeInOut",
                            }}
                            className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-white/10
          cursor-pointer
          min-w-0
        "
                          >

                            <img
                              src={`https://picsum.photos/seed/pbreak${item}/900/1400`}
                              alt=""
                              className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
                            />

                            <div className="absolute inset-0 bg-black/40" />

                            {isActive && (

                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="
              absolute
              inset-0
              p-10
              flex
              flex-col
              justify-between
              z-10
            "
                              >

                                <div>

                                  <span className="text-brand-accent uppercase tracking-[0.4em] text-xs">
                                    Project Breakdown
                                  </span>

                                  <h3 className="mt-4 text-white text-5xl lg:text-6xl font-display uppercase">
                                    Project {item}
                                  </h3>

                                </div>

                                <span className="text-white/20 text-8xl font-display">
                                  0{item}
                                </span>

                              </motion.div>

                            )}

                          </motion.div>

                        );

                      })}

                    </div>

                  </div>

                )}

              </>
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