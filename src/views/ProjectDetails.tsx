import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectStore } from '../store/useProjectStore';
import { ArrowLeft, ArrowRight, Tag, Eye } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentProject, relatedProjects, loading, fetchProjectBySlug } = useProjectStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const nextProject = () =>
    setCurrentIndex((prev) => (prev === relatedProjects.length - 1 ? 0 : prev + 1));
  const prevProject = () =>
    setCurrentIndex((prev) => (prev === 0 ? relatedProjects.length - 1 : prev - 1));

  const galleryImages = currentProject?.images || [];
  const mainImages = galleryImages.slice(0, 2);
  const extraImages = galleryImages.slice(2);

  useEffect(() => {
    if (extraImages.length === 0) return;
    const interval = setInterval(() => {
      setGalleryIndex((prev) => (prev >= extraImages.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [extraImages.length]);

  useEffect(() => {
    if (slug) fetchProjectBySlug(slug);
  }, [slug, fetchProjectBySlug]);

  if (loading || !currentProject) {
    return (
      <section className="px-4 sm:px-6 py-24 max-w-[1400px] mx-auto text-center">
        <div className="inline-flex items-center gap-3 rounded-3xl bg-white/5 px-6 sm:px-8 py-5 sm:py-6 text-black/70">
          <ArrowRight className="animate-spin" size={18} />
          Loading project details...
        </div>
      </section>
    );
  }

  const heroImage =
    typeof currentProject.thumbnail === 'string'
      ? currentProject.thumbnail
      : currentProject.thumbnail?.url ?? '';

  return (
    <section className="
      px-4 sm:px-6 md:px-8
      pb-16 sm:pb-24
      pt-20 sm:pt-24
      max-w-[1400px] mx-auto
    ">

      {/* ── BACK BUTTON ── */}
      <motion.button
        type="button"
        onClick={() => navigate('/projects')}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="
          mb-8 sm:mb-10
          inline-flex items-center gap-2 sm:gap-3
          rounded-full border border-black/10 bg-black/5
          px-4 sm:px-5 py-2.5 sm:py-3
          text-xs sm:text-sm uppercase tracking-[0.35em] text-black/70
          hover:bg-black/10 transition
        "
      >
        <ArrowLeft size={16} />
        Back to projects
      </motion.button>

      {/* ── TOP SECTION ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-8 sm:gap-12 md:gap-16 lg:grid-cols-[1.2fr_0.8fr]"
      >

        {/* LEFT — Images */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10">

          {/* Hero image */}
          <div className="rounded-xl sm:rounded-2xl lg:rounded-[15px] overflow-hidden border border-black/10 bg-white/5 shadow-[0_30px_70px_rgba(0,0,0,0.14)]">
            <img
              src={heroImage}
              alt={currentProject.title}
              className="w-full object-cover max-h-[320px] sm:max-h-[480px] md:max-h-[560px] lg:max-h-[620px]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-5 sm:space-y-6 md:space-y-8">

            {/* First 2 images */}
            {mainImages.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {mainImages.map((image, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl sm:rounded-[10px] border border-black/10 bg-white/5"
                  >
                    <img
                      src={typeof image === 'string' ? image : image.url}
                      alt={`${currentProject.title} ${index}`}
                      className="w-full h-[180px] sm:h-[220px] md:h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Auto-carousel extra images */}
            {extraImages.length > 0 && (
              <div className="rounded-xl sm:rounded-2xl md:rounded-[24px] border border-black/10 p-3 sm:p-4 md:p-5 bg-white/5">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-black font-semibold text-sm sm:text-base">More Images</h3>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {extraImages.slice(0, 5).map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          galleryIndex === idx ? 'w-5 sm:w-6 bg-brand-accent' : 'w-1.5 bg-black/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4 md:gap-5 overflow-hidden">
                  {extraImages.slice(galleryIndex, galleryIndex + 3).map((image, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden border border-black/10
                        w-[110px] h-[80px]
                        sm:w-[150px] sm:h-[110px]
                        md:w-[180px] md:h-[130px]
                        lg:w-[220px] lg:h-[150px]"
                    >
                      <img
                        src={typeof image === 'string' ? image : image.url}
                        alt={`${currentProject.title} extra ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Info */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          <div className="rounded-2xl sm:rounded-3xl md:rounded-[32px] border border-black/10 bg-white/5 p-5 sm:p-7 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.06)]">

            <span className="inline-flex items-center gap-2 rounded-full bg-brand-accent/10 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-brand-accent">
              {currentProject.category}
            </span>

            <h1 className="
              mt-4 sm:mt-6
              font-display font-bold tracking-tight text-black
              hover:text-orange-500 cursor-pointer transition-colors duration-300
              text-3xl sm:text-4xl md:text-4xl lg:text-5xl
            ">
              {currentProject.title}
            </h1>

            <p className="mt-4 sm:mt-6 text-xs sm:text-sm leading-relaxed text-studio-text/70">
              {currentProject.fullDescription}
            </p>

            {/* Tags */}
            {currentProject.hashtags && currentProject.hashtags.length > 0 && (
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
                {currentProject.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-2xl sm:rounded-3xl border border-black/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-black/70"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="mt-6 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-2xl sm:rounded-3xl border border-orange-500 bg-white p-4 sm:p-6 transition-all duration-300 hover:bg-orange-500 group">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-black/70 group-hover:text-black/80">
                  Views
                </span>
                <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-black">
                  {currentProject.views ?? 0}
                </p>
              </div>

              <div className="rounded-2xl sm:rounded-3xl border border-orange-500 bg-white p-4 sm:p-6 transition-all duration-300 hover:bg-orange-500 group">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-black/70 group-hover:text-black/80">
                  Created
                </span>
                <p className="mt-2 sm:mt-3 text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-black">
                  {currentProject.createdAt
                    ? new Date(currentProject.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── CASE STUDY ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          mt-12 sm:mt-16 md:mt-20
          rounded-2xl sm:rounded-3xl md:rounded-[32px]
          border border-black/10 bg-white/5
          p-6 sm:p-8 md:p-10
          shadow-[0_0_40px_rgba(0,0,0,0.04)]
        "
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-wrap">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-brand-accent">
              Case Study
            </span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-semibold text-black">
              Full story
            </h2>
          </div>
          <div className="self-start sm:self-auto rounded-full border border-orange-500 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm uppercase tracking-[0.35em] text-black transition-all duration-300 hover:bg-orange-500">
            {currentProject.status}
          </div>
        </div>
        <p className="mt-5 sm:mt-6 text-xs sm:text-sm leading-relaxed text-studio-text/70 whitespace-pre-line">
          {currentProject.caseStudy || currentProject.fullDescription}
        </p>
      </motion.div>

      {/* ── RELATED PROJECTS CAROUSEL ── */}
      <div className="mt-20 sm:mt-28 md:mt-40 overflow-hidden">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-10 sm:mb-14 md:mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-orange-500">
              More Projects
            </span>
            <h2 className="mt-3 sm:mt-4 font-display uppercase leading-none
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Related Work
            </h2>
          </div>
          <span className="hidden sm:block text-xs uppercase tracking-[0.35em] text-black/40">
            Selected Case Studies
          </span>
        </div>

        {/* ── Desktop Carousel (md+) ── */}
        <div className="hidden md:block">
          <div className="relative h-[500px] lg:h-[600px] xl:h-[650px] flex items-center justify-center">

            {/* Left Button */}
            <button
              onClick={prevProject}
              className="absolute left-0 lg:left-8 z-50 w-11 h-11 lg:w-14 lg:h-14 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right Button */}
            <button
              onClick={nextProject}
              className="absolute right-0 lg:right-8 z-50 w-11 h-11 lg:w-14 lg:h-14 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition"
            >
              <ChevronRight size={20} />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              {relatedProjects.map((project, index) => {
                const thumb =
                  typeof project.thumbnail === 'string'
                    ? project.thumbnail
                    : project.thumbnail?.url;

                let position = index - currentIndex;
                if (position < -3) position += relatedProjects.length;
                if (position > 3) position -= relatedProjects.length;

                const isCenter = position === 0;

                return (
                  <motion.div
                    key={project.slug || project._id}
                    animate={{
                      x: position * 220,
                      scale: position === 0 ? 1 : Math.abs(position) === 1 ? 0.82 : 0.65,
                      opacity: Math.abs(position) > 2 ? 0.2 : position === 0 ? 1 : 0.7,
                      zIndex: position === 0 ? 50 : 10 - Math.abs(position),
                    }}
                    transition={{ duration: 0.5 }}
                    onClick={() => navigate(`/projects/${project.slug}`)}
                    className="absolute cursor-pointer"
                  >
                    <div className={`
                      overflow-hidden bg-white rounded-[28px] lg:rounded-[32px]
                      shadow-[0_30px_80px_rgba(0,0,0,0.15)] border border-black/10
                      ${isCenter
                        ? 'w-[280px] h-[400px] lg:w-[340px] lg:h-[460px] xl:w-[380px] xl:h-[520px]'
                        : 'w-[180px] h-[260px] lg:w-[220px] lg:h-[310px] xl:w-[260px] xl:h-[360px]'
                      }
                    `}>
                      <img
                        src={thumb}
                        alt={project.title}
                        className="w-full h-[75%] object-cover"
                      />
                      <div className="p-3 sm:p-4 lg:p-5">
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-orange-500">
                          {project.category}
                        </span>
                        <h3 className={`mt-2 font-bold uppercase line-clamp-2 ${isCenter ? 'text-sm lg:text-base' : 'text-xs lg:text-sm'}`}>
                          {project.title}
                        </h3>
                        {isCenter && (
                          <p className="mt-2 text-xs text-black/60 line-clamp-2">
                            {project.shortDescription}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Mobile Related Projects (< md) ── */}
        <div className="flex md:hidden flex-col gap-5">

          {/* Nav buttons */}
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={prevProject}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs text-black/40 uppercase tracking-widest">
              {currentIndex + 1} / {relatedProjects.length}
            </span>
            <button
              onClick={nextProject}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Show 1 card at a time on mobile */}
          {relatedProjects.length > 0 && (() => {
            const project = relatedProjects[currentIndex];
            const thumb =
              typeof project.thumbnail === 'string'
                ? project.thumbnail
                : project.thumbnail?.url;
            return (
              <motion.div
                key={project.slug || project._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                onClick={() => navigate(`/projects/${project.slug}`)}
                className="cursor-pointer overflow-hidden bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-black/10"
              >
                <img
                  src={thumb}
                  alt={project.title}
                  className="w-full h-[240px] sm:h-[300px] object-cover"
                />
                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-orange-500">
                    {project.category}
                  </span>
                  <h3 className="mt-3 text-xl font-bold uppercase">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-black/60 line-clamp-3">
                    {project.shortDescription}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-orange-500 text-xs uppercase tracking-widest">
                    <span>View Project</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            );
          })()}

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-2">
            {relatedProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-6 bg-brand-accent' : 'w-2 bg-black/20'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}