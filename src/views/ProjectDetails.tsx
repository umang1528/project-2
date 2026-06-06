import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectStore } from '../store/useProjectStore';
import { ArrowLeft, ArrowRight, Tag, Eye } from 'lucide-react';
  import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    currentProject,
    relatedProjects,
    loading,
    fetchProjectBySlug,
  } = useProjectStore();


  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) =>
      prev === relatedProjects.length - 1 ? 0 : prev + 1
    );
  };

  const prevProject = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? relatedProjects.length - 1 : prev - 1
    );
  };

  const [galleryIndex, setGalleryIndex] = useState(0);

  const galleryImages = currentProject?.images || [];
  const mainImages = galleryImages.slice(0, 2);
  const extraImages = galleryImages.slice(2);

  // Auto-carousel every 3 seconds
  useEffect(() => {
    if (extraImages.length === 0) return;

    const interval = setInterval(() => {
      setGalleryIndex((prev) =>
        prev >= extraImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [extraImages.length]);

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

  const heroImage =
    typeof currentProject.thumbnail === 'string'
      ? currentProject.thumbnail
      : currentProject.thumbnail?.url ?? '';

  return (
    <section className="px-6 pb-24 max-w-[1400px] mx-auto">

      {/* BACK BUTTON */}
      <motion.button
        type="button"
        onClick={() => navigate('/projects')}
        className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm uppercase tracking-[0.35em] text-white/80 hover:bg-white/10 transition"
      >
        <ArrowLeft size={18} />
        Back to projects
      </motion.button>

      {/* TOP SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]"
      >
        {/* LEFT SIDE */}
        <div className="space-y-10">
          {/* HERO IMAGE */}
          <div className="rounded-[15px] overflow-hidden border border-white/10 bg-white/5 shadow-[0_40px_90px_rgba(0,0,0,0.18)]">
            <img
              src={heroImage}
              alt={currentProject.title}
              className="w-full object-cover max-h-[620px]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-8">
            {/* FIRST 2 LARGE IMAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mainImages.map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[10px] border border-white/10 bg-white/5"
                >
                  <img
                    src={typeof image === 'string' ? image : image.url}
                    alt={`${currentProject.title} ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* AUTO-CAROUSEL EXTRA IMAGES */}
            {extraImages.length > 0 && (
              <div className="rounded-[24px] border border-white/10 p-5 bg-white/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-black font-semibold">
                    More Images
                  </h3>

                  {/* Dots Indicator */}
                  <div className="flex items-center gap-2">
                    {extraImages.slice(0, 5).map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-500 ${galleryIndex === idx
                          ? 'w-6 bg-brand-accent'
                          : 'w-1.5 bg-studio-text/20'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Auto-Slide Images */}
                <div className="flex gap-5 overflow-hidden">
                  {extraImages
                    .slice(galleryIndex, galleryIndex + 3)
                    .map((image, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-[140px] sm:w-[180px] md:w-[220px] h-[100px] sm:h-[130px] md:h-[150px] rounded-xl overflow-hidden border border-white/10"
                      >
                        <img
                          src={typeof image === 'string' ? image : image.url}
                          alt={`${currentProject.title} extra image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-10">
          {/* PROJECT INFO */}
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(255,255,255,0.04)]">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-accent/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-brand-accent">
              {currentProject.category}
            </span>

            <h1 className="mt-6 text-5xl font-display font-bold tracking-tight text-black transition-colors duration-300 hover:text-orange-500 cursor-pointer">
              {currentProject.title}
            </h1>

            <p className="mt-6 text-sm leading-relaxed text-studio-text/70">
              {currentProject.fullDescription}
            </p>

            {/* TAGS */}
            <div className="mt-8 flex flex-wrap gap-3">
              {currentProject.hashtags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-black/70"
                >
                  <Tag size={14} />
                  {tag}
                </span>
              ))}
            </div>

            {/* STATS */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {/* VIEWS */}
              <div className="rounded-3xl border border-orange-500 bg-white p-6 transition-all duration-300 hover:bg-orange-500">
                <span className="text-[10px] uppercase tracking-[0.35em] text-black/70">
                  Views
                </span>
                <p className="mt-3 text-3xl font-semibold text-black">
                  {currentProject.views ?? 0}
                </p>
              </div>

              {/* CREATED */}
              <div className="rounded-3xl border border-orange-500 bg-white p-6 transition-all duration-300 hover:bg-orange-500">
                <span className="text-[10px] uppercase tracking-[0.35em] text-black/70">
                  Created
                </span>
                <p className="mt-3 text-lg sm:text-xl lg:text-2xl font-semibold text-black">
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

      {/* CASE STUDY FULL WIDTH */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-20 rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_0_40px_rgba(255,255,255,0.04)]"
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-brand-accent">
              Case Study
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-black">
              Full story
            </h2>
          </div>
          <div className="rounded-full border border-orange-500 bg-white px-4 py-2 text-sm uppercase tracking-[0.35em] text-black transition-all duration-300 hover:bg-orange-500">
            {currentProject.status}
          </div>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-studio-text/70 whitespace-pre-line">
          {currentProject.caseStudy || currentProject.fullDescription}
        </p>
      </motion.div>

      {/* RELATED PROJECTS */}
      {/* <div className="mt-20">
        <h2 className="text-3xl font-semibold tracking-tight text-black">
          Related work
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {relatedProjects.map((project) => {
            const thumb =
              typeof project.thumbnail === 'string'
                ? project.thumbnail
                : project.thumbnail?.url;

            return (
              <motion.button
                key={project.slug || project._id}
                type="button"
                onClick={() => navigate(`/projects/${project.slug}`)}
                whileHover={{ y: -5 }}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(255,255,255,0.04)]"
              >
                <img
                  src={thumb}
                  alt={project.title}
                  className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-black/50">
                    <Eye size={14} />
                    <span>{project.views ?? 0} views</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-black transition-all duration-300 hover:text-orange-500">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-studio-text/70 line-clamp-3">
                    {project.shortDescription}
                  </p>
                  <div className="mt-6 flex items-center justify-between text-brand-accent">
                    <span>View story</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div> */}


      {/* RELATED PROJECTS */}
      {/* <div className="mt-32">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight">
            Related Work
          </h2>

          <span className="text-xs uppercase tracking-[0.35em] text-black/40">
            More Case Studies
          </span>
        </div>

        <div className="bg-black relative flex flex-wrap lg:flex-nowrap items-center justify-center gap-0 min-h-[550px] overflow-hidden w-
">

          {relatedProjects.slice(0, 5).map((project, index) => {
            const thumb =
              typeof project.thumbnail === 'string'
                ? project.thumbnail
                : project.thumbnail?.url;

            const rotations = [
              '-rotate-6',
              '-rotate-3',
              'rotate-0',
              'rotate-3',
              'rotate-6',
            ];

            return (
              <motion.div
                key={project.slug || project._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -25,
                  rotate: 0,
                  zIndex: 100,
                }}
                transition={{
                  duration: 0.4,
                }}
                viewport={{ once: true }}
                className={`
            relative
            w-[220px]
            md:w-[260px]
            bg-white
            shadow-2xl
            cursor-pointer
            overflow-hidden
            border
            border-black/10
            ${rotations[index % rotations.length]}
            lg:-ml-8
          `}
                onClick={() => navigate(`/projects/${project.slug}`)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={thumb}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-orange-500">
                    {project.category}
                  </span>

                  <h3 className="mt-3 text-lg font-bold leading-tight uppercase">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm text-black/60 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-black/50">
                      View Project
                    </span>

                    <ArrowRight
                      size={16}
                      className="text-orange-500"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div> */}

      <div className="mt-40 overflow-hidden">

        <div className="flex items-end justify-between mb-16">

          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-orange-500">
              More Projects
            </span>

            <h2 className="mt-4 text-5xl md:text-7xl font-display uppercase leading-none">
              Related Work
            </h2>
          </div>

          <span className="hidden md:block text-xs uppercase tracking-[0.35em] text-black/40">
            Selected Case Studies
          </span>

        </div>

        <div className="relative h-[650px] flex items-center justify-center">

          {/* LEFT BUTTON */}

          <button
            onClick={prevProject}
            className="absolute left-0 md:left-8 z-50 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition"
          >
            <ChevronLeft size={24} />
          </button>

          {/* RIGHT BUTTON */}

          <button
            onClick={nextProject}
            className="absolute right-0 md:right-8 z-50 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition"
          >
            <ChevronRight size={24} />
          </button>

          <div className="relative w-full h-full flex items-center justify-center">

            {relatedProjects.map((project, index) => {

              const thumb =
                typeof project.thumbnail === "string"
                  ? project.thumbnail
                  : project.thumbnail?.url;

              let position = index - currentIndex;

              if (position < -3)
                position += relatedProjects.length;

              if (position > 3)
                position -= relatedProjects.length;

              const isCenter = position === 0;

              return (

                <motion.div
                  key={project.slug || project._id}
                  animate={{
                    x: position * 260,
                    scale:
                      position === 0
                        ? 1
                        : Math.abs(position) === 1
                          ? 0.82
                          : 0.65,
                    opacity:
                      Math.abs(position) > 2
                        ? 0.2
                        : position === 0
                          ? 1
                          : 0.7,
                    zIndex:
                      position === 0
                        ? 50
                        : 10 - Math.abs(position),
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  onClick={() =>
                    navigate(`/projects/${project.slug}`)
                  }
                  className="absolute cursor-pointer"
                >

                  <div
                    className={`
                overflow-hidden
                bg-white
                rounded-[32px]
                shadow-[0_30px_80px_rgba(0,0,0,0.15)]
                border border-black/10
                ${isCenter
                        ? "w-[380px] h-[520px]"
                        : "w-[260px] h-[360px]"
                      }
              `}
                  >

                    <img
                      src={thumb}
                      alt={project.title}
                      className="w-full h-[75%] object-cover"
                    />

                    <div className="p-5">

                      <span className="text-[10px] uppercase tracking-[0.3em] text-orange-500">
                        {project.category}
                      </span>

                      <h3 className="mt-3 font-bold uppercase line-clamp-2">
                        {project.title}
                      </h3>

                      {isCenter && (
                        <p className="mt-3 text-sm text-black/60 line-clamp-3">
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

    </section>
  );
}