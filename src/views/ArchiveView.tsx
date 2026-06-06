import { motion } from 'motion/react';
import { Project } from '../types';
import { ARCHIVE_PROJECTS, CATEGORIES, YEARS } from '../constants';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface ArchiveViewProps {
  setSelectedProject: (project: Project) => void;
  setCurrentView: (view: 'home' | 'archives' | 'education' | 'about') => void;
}

export function ArchiveView({ setSelectedProject, setCurrentView }: ArchiveViewProps) {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [yearFilter, setYearFilter] = useState<string | null>(null);

  const filtered = ARCHIVE_PROJECTS
    .filter(p => !categoryFilter || p.category === categoryFilter)
    .filter(p => !yearFilter || p.year === yearFilter);

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
        border-b border-studio-text
        pb-10 sm:pb-14 md:pb-16
      ">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8"
        >
          <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] mb-4 sm:mb-6 block">
            CREATIVE COLLECTION
          </span>
          <h1 className="
            font-display font-bold uppercase leading-[0.8] tracking-tighter
            text-[14vw] sm:text-[11vw] md:text-8xl lg:text-9xl xl:text-[11rem]
          ">
            THE INDEX.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-4 lg:mb-4"
        >
          <p className="text-studio-text/60 text-sm sm:text-base font-medium leading-relaxed max-w-sm">
            "Design is the silent ambassador of your brand.
            Through branding, motion graphics, packaging, and modern visual storytelling, I create
            structured digital experiences that balance bold aesthetics with purposeful communication."
          </p>
          <div className="mt-6 sm:mt-8 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-studio-border" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-brand-accent/40 uppercase">
              SUMMER 2026 ISSUE
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── FILTERS ── */}
      <div className="
        flex flex-col sm:flex-row flex-wrap
        gap-x-8 md:gap-x-12 gap-y-6 sm:gap-y-8
        mb-12 sm:mb-16 md:mb-24
        items-start sm:items-end
      ">
        {/* Category filter */}
        <div className="space-y-3 sm:space-y-4">
          <span className="text-[10px] font-mono font-bold text-studio-text/40 uppercase tracking-[0.2em]">
            Filter by Category
          </span>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={() => setCategoryFilter(null)}
              className={`text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all ${
                !categoryFilter ? 'text-brand-accent' : 'text-studio-text/40 hover:text-studio-text'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all ${
                  categoryFilter === cat ? 'text-brand-accent' : 'text-studio-text/40 hover:text-studio-text'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Divider — only desktop */}
        <div className="h-10 w-[1px] bg-studio-border hidden lg:block" />

        {/* Year filter */}
        <div className="space-y-3 sm:space-y-4">
          <span className="text-[10px] font-mono font-bold text-studio-text/40 uppercase tracking-[0.2em]">
            Filter by Year
          </span>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={() => setYearFilter(null)}
              className={`text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all ${
                !yearFilter ? 'text-brand-accent' : 'text-studio-text/40 hover:text-studio-text'
              }`}
            >
              All Eras
            </button>
            {YEARS.map(year => (
              <button
                key={year}
                onClick={() => setYearFilter(year)}
                className={`text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all ${
                  yearFilter === year ? 'text-brand-accent' : 'text-studio-text/40 hover:text-studio-text'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROJECT GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-y-12 sm:gap-y-16 md:gap-y-24 gap-x-6 md:gap-x-12">
        {filtered.length === 0 ? (
          <div className="col-span-full py-16 sm:py-24 md:py-32 text-center border border-dashed border-studio-border bg-white/50">
            <span className="text-[10px] font-mono font-bold text-studio-text/40 uppercase tracking-[0.4em]">
              No artifacts found matching this criteria
            </span>
            <button
              onClick={() => { setCategoryFilter(null); setYearFilter(null); }}
              className="block mx-auto mt-6 text-brand-accent font-bold uppercase text-xs hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filtered.map((project, i) => {
            // On md+ screens use the alternating span pattern; on sm use full width
            const colSpan =
              i % 7 === 0
                ? 'sm:col-span-2 md:col-span-8'
                : i % 5 === 2
                ? 'sm:col-span-2 md:col-span-7'
                : 'md:col-span-4';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className={`${colSpan} group relative flex flex-col`}
              >
                {/* Image */}
                <div
                  className="
                    relative overflow-hidden mb-5 sm:mb-6 md:mb-8
                    border border-studio-border p-1.5 sm:p-2 bg-white cursor-zoom-in
                  "
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-[4/5] object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-1">
                    <div className="bg-studio-text text-white font-mono text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-1">
                      № {String(project.id).padStart(2, '0')}
                    </div>
                    <div className="bg-brand-accent text-white font-mono text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-1">
                      {project.year}
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-[10px] font-mono font-bold text-brand-accent uppercase">
                      {project.category}
                    </span>
                    <div className="h-[1px] flex-1 bg-studio-border" />
                  </div>

                  <h3 className="
                    font-display font-bold tracking-tight uppercase
                    group-hover:text-brand-accent transition-colors
                    text-2xl sm:text-3xl
                  ">
                    {project.title}
                  </h3>

                  <p className="text-studio-text/60 text-xs sm:text-sm leading-relaxed font-medium max-w-md line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer className="
        py-20 sm:py-32 md:py-48
        px-4 sm:px-6
        text-center border-t border-studio-border bg-white mt-10 sm:mt-12
      ">
        <div
          className="flex flex-col items-center gap-6 sm:gap-8 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="
            w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
            border border-studio-border rounded-none
            flex items-center justify-center
            group-hover:bg-studio-text transition-all duration-500
          ">
            <ArrowRight
              className="-rotate-90 text-studio-text group-hover:text-white transition-colors"
              size={24}
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-studio-text/40 group-hover:text-brand-accent transition-colors">
            END OF ARCHIVE
          </span>
        </div>
      </footer>

    </section>
  );
}