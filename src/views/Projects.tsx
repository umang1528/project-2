import { motion } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../store/useProjectStore';
import { ArrowRight, Search, Sparkles, ChevronDown } from 'lucide-react';

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

  // ── Track visible count per category (starts at 4) ──
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});

  // 🔥🔥🔥 ALL CATEGORIES - component mein hi manage karo (store nahi chahiye)
  const [allCategories, setAllCategories] = useState<string[]>([]);

  // 🔥 Ek baar fetch karo saari categories (bina filter ke)
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        // API se saare projects lo bina filter ke (limit zyada rakho)
        const res = await fetch('/api/projects?limit=1000&status=published');
        const data = await res.json();
        
        if (data.status === 'success') {
          const cats = new Set<string>();
          data.data.projects.forEach((p: any) => {
            if (p.category) cats.add(p.category);
          });
          // A-Z sort karo
          setAllCategories(Array.from(cats).sort((a, b) => a.localeCompare(b)));
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchAllCategories();
  }, []); // Sirf ek baar mount pe

  // 🔥🔥🔥 Category options: "All" pehle, baaki allCategories se
  // Hamesha same rahenge chahe filter kuch bhi ho
  const categoryOptions = useMemo(() => {
    return ['All', ...allCategories];
  }, [allCategories]);

  // 🔥🔥🔥 Jab bhi naya project add ho, categories update karo
  useEffect(() => {
    const cats = new Set<string>(allCategories);
    projects.forEach((p) => {
      if (p.category && !cats.has(p.category)) {
        cats.add(p.category);
      }
    });
    const sorted = Array.from(cats).sort((a, b) => a.localeCompare(b));
    if (JSON.stringify(sorted) !== JSON.stringify(allCategories)) {
      setAllCategories(sorted);
    }
  }, [projects]);

  useEffect(() => {
    fetchProjects(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category, filters.search, filters.sort]);

  // 🔥 Sirf active category highlight kare, baaki bhi dikhein
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

  // ── Group projects by category ──
  const groupedProjects = useMemo(() => {
    const grouped: Record<string, typeof projects> = {};
    
    projects.forEach((project) => {
      const cat = project.category || 'Other';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(project);
    });

    // Agar filter active hai, toh sirf wahi category return karo
    if (filters.category) {
      const filtered: Record<string, typeof projects> = {};
      if (grouped[filters.category]) {
        filtered[filters.category] = grouped[filters.category];
      }
      return filtered;
    }

    // Nahi toh saari categories A-Z sort
    const sortedGrouped: Record<string, typeof projects> = {};
    Object.keys(grouped)
      .sort((a, b) => a.localeCompare(b))
      .forEach((key) => {
        sortedGrouped[key] = grouped[key];
      });

    return sortedGrouped;
  }, [projects, filters.category]);

  // ── Show 4 more projects for a category ──
  const showMore = (category: string) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [category]: (prev[category] || 4) + 4,
    }));
  };

  return (
    <section className="
      pt-24 sm:pt-32 md:pt-40 lg:pt-48
      pb-16 sm:pb-24 md:pb-32
      px-4 sm:px-6 md:px-8
      max-w-[1400px] mx-auto
    ">

      {/* ── HERO ── */}
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

      {/* ── FILTERS ── */}
      <div className="
        flex flex-col sm:flex-row
        flex-wrap
        justify-between items-start sm:items-end
        gap-6 sm:gap-x-12 sm:gap-y-8
        mb-12 sm:mb-16 md:mb-24
      ">
        <div className="space-y-3 sm:space-y-4">
          <span className="text-[10px] font-mono font-bold text-orange-500 uppercase tracking-[0.2em]">
            Filter by Category
          </span>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {categoryOptions.map((category) => {
              // 🔥 Check active state
              const isAll = category === 'All';
              const isActive = isAll 
                ? !filters.category 
                : filters.category === category;
              
              return (
                <button
                  key={category}
                  onClick={() => handleCategory(category)}
                  className={`text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                    isActive
                      ? 'text-orange-500'
                      : 'text-black/40 hover:text-orange-500'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

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

      {/* ── CATEGORY SECTIONS ── */}
      {projects.length === 0 && !loading ? (
        <div className="col-span-full border border-black/10 p-12 sm:p-20 text-center text-black/50">
          No Projects Found.
        </div>
      ) : (
        Object.entries(groupedProjects).map(([category, categoryProjects], categoryIndex) => {
          const visibleCount = visibleCounts[category] || 4;
          const visibleProjects = categoryProjects.slice(0, visibleCount);
          const hasMore = categoryProjects.length > visibleCount;
          const remaining = categoryProjects.length - visibleCount;

          return (
            <div key={category} className="mb-20 sm:mb-28 md:mb-36">
              
              {/* Category Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-10 sm:mb-14 md:mb-16"
              >
                <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-[0.3em]">
                    {String(categoryIndex + 1).padStart(2, '0')} / {String(Object.keys(groupedProjects).length).padStart(2, '0')}
                  </span>
                  <div className="h-[1px] flex-1 bg-black/10" />
                  <span className="text-[10px] font-mono font-bold text-black/30 uppercase tracking-[0.2em]">
                    {categoryProjects.length} Projects
                  </span>
                </div>
                
                <h2 className="
                  font-display font-bold uppercase leading-[0.85] tracking-tight text-black
                  text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                ">
                  {category}
                </h2>
              </motion.div>

              {/* Projects Grid - 4 at a time */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 sm:gap-y-12 md:gap-y-10 gap-x-6 md:gap-x-12">
                {visibleProjects.map((project, projectIndex) => {
                  const thumbnail =
                    typeof project.thumbnail === 'string'
                      ? project.thumbnail
                      : project.thumbnail?.url;

                  const isLastProject = 
                    categoryIndex === Object.keys(groupedProjects).length - 1 &&
                    projectIndex === visibleProjects.length - 1 &&
                    !hasMore;

                  const refProp = isLastProject ? { ref: lastCardRef } : {};

                  const spans = ['md:col-span-8', 'md:col-span-4', 'md:col-span-4', 'md:col-span-8'];
                  const spanClass = spans[projectIndex % 4];
                  const isLarge = spanClass === 'md:col-span-8';

                  return (
                    <motion.button
                      key={project.slug || project._id || `${category}-${projectIndex}`}
                      type="button"
                      onClick={() => navigate(`/projects/${project.slug}`)}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: projectIndex * 0.03 }}
                      className={`group relative flex flex-col text-left ${spanClass}`}
                      {...refProp}
                    >
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
                            w-full object-cover grayscale-80
                            group-hover:grayscale-0
                            transition-all duration-700
                            group-hover:scale-[1.02]
                            ${isLarge
                              ? 'h-[280px] sm:h-[420px] md:h-[580px] lg:h-[720px] xl:h-[850px]'
                              : 'h-[220px] sm:h-[320px] md:h-[400px] lg:h-[500px]'
                            }
                          `}
                        />

                        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col gap-1.5 sm:gap-2">
                          <div className="bg-black/90 backdrop-blur-md text-white font-mono text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-1 rounded-full shadow-lg">
                            № {String(projectIndex + 1).padStart(2, '0')}
                          </div>
                          <div className="bg-brand-accent text-black font-mono text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-1 rounded-full shadow-lg">
                            {project.createdAt ? new Date(project.createdAt).getFullYear() : 'N/A'}
                          </div>
                        </div>
                      </div>

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
                  );
                })}
              </div>

              {/* ── View More Button (4 at a time) ── */}
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mt-10 sm:mt-14 md:mt-16 flex justify-center"
                >
                  <button
                    type="button"
                    onClick={() => showMore(category)}
                    className="group flex items-center gap-3 border border-black/10 bg-black/[0.03] px-8 sm:px-12 py-3 sm:py-4 text-[10px] sm:text-xs uppercase tracking-[0.4em] text-black/60 transition-all hover:bg-black/10 hover:text-black/80"
                  >
                    <span>View More ({Math.min(remaining, 4)} more)</span>
                    <ChevronDown size={16} className="transition-transform duration-300" />
                  </button>
                </motion.div>
              )}

              {/* ── PROJECT BREAKDOWN ACCORDION ── */}
              <div className="mt-16 sm:mt-20 md:mt-24">

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
                      {category}
                      <br />
                      Breakdown
                    </h2>
                  </div>

                  <p className="max-w-md text-studio-text/60 text-base sm:text-lg leading-relaxed">
                    Explore the visual journey, layouts, concepts and design decisions behind the {category} projects.
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
                          src={`https://picsum.photos/seed/${category}${item}/900/1400`}
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
                                {category} Breakdown
                              </span>
                              <h3 className="mt-3 sm:mt-4 text-white font-display uppercase text-4xl lg:text-5xl xl:text-6xl">
                                {category} {item}
                              </h3>
                              <p className="mt-4 sm:mt-6 max-w-md text-white/70 leading-relaxed text-sm sm:text-base">
                                Explore layouts, visual systems, creative thinking and design decisions behind this {category} project.
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
                        src={`https://picsum.photos/seed/${category}${item}/900/1400`}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/55" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                        <span className="text-brand-accent uppercase tracking-[0.4em] text-[10px]">
                          {category} Breakdown
                        </span>
                        <div>
                          <h3 className="text-white font-display uppercase text-3xl">
                            {category} {item}
                          </h3>
                          <span className="text-white/20 font-display text-5xl">0{item}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Divider */}
              {categoryIndex < Object.keys(groupedProjects).length - 1 && (
                <div className="mt-20 sm:mt-28 md:mt-36 border-t border-black/10" />
              )}
            </div>
          );
        })
      )}

      {/* ── LOAD MORE ── */}
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