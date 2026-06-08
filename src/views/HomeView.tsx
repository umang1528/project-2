import { motion, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight,
  Zap,
  Monitor,
  Box,
  Activity,
  Palette,
  PenTool
} from 'lucide-react';
import { Project, ViewType } from '../types';
import Image from '../assets/images/2img.png';
import ResumePDF from '../assets/CV pdf/Umang resume.pdf';

import { useProjectStore } from '../store/useProjectStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { homeCarouselApi } from '../api/homeCarousel.api';


interface HomeViewProps {
  setSelectedProject?: (project: Project) => void;
  setCurrentView?: (view: ViewType) => void;
}

export function HomeView({ setSelectedProject, setCurrentView }: HomeViewProps) {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const { projects, fetchProjects, loading } = useProjectStore();

  const [carouselItems, setCarouselItems] = useState<Array<{ _id: string; image: string; title?: string; order?: number }>>([]);
  const [visibleProjects, setVisibleProjects] = useState(8);

  useEffect(() => {
    fetchProjects(1, true);
  }, [fetchProjects]);

  useEffect(() => {
    const loadCarouselItems = async () => {
      try {
        const response = await homeCarouselApi.getHomeCarouselItems();
        setCarouselItems(response.data?.data || []);
      } catch (error) {
        console.error('Failed to load carousel items', error);
      }
    };
    loadCarouselItems();
  }, []);

  const featuredProjects = projects.filter(
    (project: any) => !project.featured
  );

  return (
    <>
      {/* ─────────────────────────────────────────────
          HERO SECTION
      ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 pb-10 overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 text-center px-4 sm:px-6 w-full"
        >
          {/* Badge */}
          <div className="mb-6 sm:mb-10 inline-flex items-center gap-3 px-4 sm:px-6 py-2 border border-studio-border bg-white/50 backdrop-blur-md">
            <div className="w-2 h-2 rounded-none bg-brand-accent animate-pulse flex-shrink-0" />
            <span className="text-[10px] sm:text-sm font-mono font-bold tracking-[0.25em] sm:tracking-[0.4em] uppercase text-studio-text/60">
              Independent GRAPHIC DESIGNER
            </span>
          </div>

          {/* Main Heading — scales smoothly across all screens */}
          <h1
            className="
            font-display
            font-bold
            uppercase
            leading-[0.8]
            tracking-[-0.06em]

            text-[20vw]
            sm:text-[22vw]
            md:text-[20vw]
            lg:text-[18vw]
            xl:text-[16vw]
            2xl:text-[22rem]
          "
          >
            VISI<span className="text-brand-accent">O</span>NS
          </h1>

          {/* Subtitle row */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <div className="flex flex-col gap-1 sm:gap-2 text-center sm:text-left">
              <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest">
                Specialization
              </span>
              <p className="text-base sm:text-lg md:text-xl font-display font-medium text-studio-text uppercase tracking-tight">
                GRAPHIC • PACKAGING • VISUALS
              </p>
            </div>
            <div className="h-[1px] w-10 bg-studio-border hidden sm:block" />
            <div className="flex flex-col gap-1 sm:gap-2 text-center sm:text-left">
              <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest">
                Aesthetic
              </span>
              <p className="text-base sm:text-lg md:text-xl font-display font-medium text-studio-text uppercase tracking-tight">
                Brutalism • Swiss • Modern
              </p>
            </div>
          </div>
        </motion.div>

        {/* Decorative crosshair lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-studio-border/30 -translate-y-1/2" />
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-studio-border/30 -translate-x-1/2" />
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          INSTAGRAM SEAMLESS CAROUSEL
      ───────────────────────────────────────────── */}
      <section className="pt-4 pb-25 overflow-hidden bg-[#f5f3ef]">
        <span className="block text-center text-brand-accent uppercase tracking-[0.4em] text-xs">
          Visual Storytelling
        </span>

        <div className="text-center mb-10 sm:mb-16 md:mb-20 px-4">
          <h2 className="mt-6 font-display uppercase leading-none
            text-4xl sm:text-5xl md:text-6xl lg:text-8xl"
          >
            Seamless
            <br />
            Carousel Experience
          </h2>
        </div>

        {/* Carousel + Phone wrapper — height shrinks on small screens */}
        <div className="relative flex items-center
          h-[320px] sm:h-[420px] md:h-[520px] lg:h-[450px]"
        >
          {/* Moving images strip */}
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
            className="absolute flex"
          >
            {carouselItems.length > 0 ? (
              carouselItems.map((item) => (
                <div
                  key={item._id}
                  className="
                 w-[190px] h-[190px]
                  sm:w-[190px] sm:h-[190px]
                  md:w-[240px] md:h-[240px]
                  lg:w-[280px] lg:h-[280px]
                  xl:w-[320px] xl:h-[320px]

                  overflow-hidden
                  border
                  border-black/10
                  flex-shrink-0
                  bg-white
                  "
                >
                  <img
                    src={item.image}
                    alt={item.title || 'Carousel image'}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="flex h-[360px] w-screen items-center justify-center text-black/60">
                No carousel items available.
              </div>
            )}
          </motion.div>

          {/* Phone Frame — scales with screen */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative
           w-[190px] h-[370px]
          sm:w-[240px] sm:h-[460px]
          md:w-[270px] md:h-[520px]
          lg:w-[300px] lg:h-[580px]"
            >
              {/* Top white mask */}
              <div className="absolute top-0 left-0 right-0
                h-[70px] sm:h-[85px] md:h-[100px] lg:h-[110px]
                bg-white rounded-t-[30px] sm:rounded-t-[38px] lg:rounded-t-[43px] z-40"
              />
              {/* Bottom white mask */}
              <div className="absolute bottom-0 left-0 right-0
                h-[70px] sm:h-[85px] md:h-[100px] lg:h-[110px]
                bg-white rounded-b-[30px] sm:rounded-b-[38px] lg:rounded-b-[43px] z-40"
              />

              {/* Dynamic Island */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2
                w-[60px] h-[18px] sm:w-[75px] sm:h-[22px] lg:w-[90px] lg:h-[25px]
                bg-black rounded-full z-50"
              />

              {/* Instagram Header */}
              <div className="absolute top-10 sm:top-12 lg:top-16 left-0 right-0 px-4 sm:px-5 z-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full bg-black" />
                    <span className="text-black text-[11px] sm:text-sm font-semibold">
                      umang.design
                    </span>
                  </div>
                  <span className="text-black text-base sm:text-lg">•••</span>
                </div>
              </div>

              {/* Bottom IG UI */}
              <div className="absolute bottom-6 sm:bottom-7 lg:bottom-8 left-0 right-0 px-4 sm:px-6 text-black z-50">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium mb-2">
                  <span>❤️ 2.4k</span>
                  <span>💬 124</span>
                  <span>↗ Share</span>
                </div>
                <p className="text-[8px] sm:text-xs uppercase tracking-[0.3em] opacity-70 text-center">
                  Carousel Preview
                </p>
              </div>

              {/* Phone border */}
              <div className="absolute inset-0
                rounded-[38px] sm:rounded-[45px] lg:rounded-[55px]
                border-[8px] sm:border-[10px] lg:border-[12px]
                border-black pointer-events-none z-[60]"
              />
            </div>
          </div>
        </div>
      </section>



      {/* (OPTIONALCAROSALSECTION)
      <section
            className="
        h-screen
        overflow-hidden
        bg-[#f5f3ef]
        flex
        flex-col
        justify-center
      "
          >
            <span className="block text-center text-brand-accent uppercase tracking-[0.4em] text-xs">
              Visual Storytelling
            </span>

            <div className="text-center mb-6 sm:mb-8 md:mb-10 px-4">
              <h2
                className="
            mt-4
            font-display
            uppercase
            leading-none

            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            xl:text-7xl
          "
              >
                Seamless
                <br />
                Carousel Experience
              </h2>
            </div>

            <div
              className="
          relative
          flex
          items-center
          justify-center

          h-[280px]
          sm:h-[350px]
          md:h-[420px]
          lg:h-[500px]
        "
            >
              Moving Carousel
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 30,
                  ease: "linear",
                }}
                className="absolute flex"
              >
                {carouselItems.length > 0 ? (
                  [...carouselItems, ...carouselItems].map((item, index) => (
                    <div
                      key={`${item._id}-${index}`}
                      className="
                  w-[150px]
                  h-[150px]

                  sm:w-[190px]
                  sm:h-[190px]

                  md:w-[240px]
                  md:h-[240px]

                  lg:w-[280px]
                  lg:h-[280px]

                  overflow-hidden
                  border
                  border-black/10
                  flex-shrink-0
                  bg-white
                "
                    >
                      <img
                        src={item.image}
                        alt={item.title || "Carousel image"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex h-[280px] w-screen items-center justify-center text-black/60">
                    No carousel items available.
                  </div>
                )}
              </motion.div>

              PHONE
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="
              relative

              w-[190px]
              h-[370px]

              sm:w-[240px]
              sm:h-[460px]

              md:w-[270px]
              md:h-[520px]

              lg:w-[300px]
              lg:h-[580px]
            "
                >
                  Top Mask
                  <div
                    className="
                absolute
                top-0
                left-0
                right-0

                h-[70px]
                sm:h-[85px]
                md:h-[100px]
                lg:h-[110px]

                bg-white
                rounded-t-[30px]
                sm:rounded-t-[38px]
                lg:rounded-t-[43px]
                z-40
              "
                  />

                  Bottom Mask
                  <div
                    className="
                absolute
                bottom-0
                left-0
                right-0

                h-[70px]
                sm:h-[85px]
                md:h-[100px]
                lg:h-[110px]

                bg-white
                rounded-b-[30px]
                sm:rounded-b-[38px]
                lg:rounded-b-[43px]
                z-40
              "
                  />

                  Dynamic Island
                  <div
                    className="
                absolute
                top-5
                left-1/2
                -translate-x-1/2

                w-[60px]
                h-[18px]

                sm:w-[75px]
                sm:h-[22px]

                lg:w-[90px]
                lg:h-[25px]

                bg-black
                rounded-full
                z-50
              "
                  />

                  Instagram Header
                  <div
                    className="
                absolute
                top-10
                sm:top-12
                lg:top-16

                left-0
                right-0

                px-4
                sm:px-5

                z-50
              "
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full bg-black" />

                        <span className="text-black text-[11px] sm:text-sm font-semibold">
                          umang.design
                        </span>
                      </div>

                      <span className="text-black text-base sm:text-lg">
                        •••
                      </span>
                    </div>
                  </div>

                  Bottom UI
                  <div
                    className="
                absolute
                bottom-6
                sm:bottom-7
                lg:bottom-8

                left-0
                right-0

                px-4
                sm:px-6

                text-black
                z-50
              "
                  >
                    <div className="flex items-center gap-3 text-xs sm:text-sm font-medium mb-2">
                      <span>❤️ 2.4k</span>
                      <span>💬 124</span>
                      <span>↗ Share</span>
                    </div>

                    <p className="text-[8px] sm:text-xs uppercase tracking-[0.3em] opacity-70 text-center">
                      Carousel Preview
                    </p>
                  </div>

                  Phone Border
                  <div
                    className="
                absolute
                inset-0

                rounded-[38px]
                sm:rounded-[45px]
                lg:rounded-[55px]

                border-[8px]
                sm:border-[10px]
                lg:border-[12px]

                border-black
                pointer-events-none
                z-[60]
              "
                  />
                </div>
              </div>
            </div>
          </section> */}


      {/* ─────────────────────────────────────────────
          FEATURED PROJECTS GRID
      ───────────────────────────────────────────── */}
      <section id="projects" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-24 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 sm:gap-12">
          <div className="space-y-4 sm:space-y-6">
            <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block">
              — CASE STUDIES
            </span>
            <h2 className="font-display font-bold leading-[0.9] tracking-tighter uppercase
              text-5xl sm:text-6xl md:text-8xl lg:text-9xl"
            >
              SELECTED <br />
              <span className="italic text-studio-text/20">WORKS.</span>
            </h2>
          </div>

          <button
            onClick={() => navigate('/projects')}
            className="group flex items-center gap-4 sm:gap-6"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-studio-text/40 group-hover:text-studio-text transition-colors">
              Survey the Archive
            </span>
            <div className="w-12 h-12 sm:w-16 sm:h-16 border border-studio-border flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-500">
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 bg-white p-1 sm:p-2 gap-2 sm:gap-3 md:gap-4 auto-rows-[260px] sm:auto-rows-[300px] md:auto-rows-[350px]">
          {loading ? (
            <div className="col-span-full py-20 text-center text-black">
              Loading Featured Projects...
            </div>
          ) : (
            featuredProjects.slice(0, visibleProjects).map((project: any, index: number) => {
              const thumbnail =
                typeof project.thumbnail === 'string'
                  ? project.thumbnail
                  : project.thumbnail?.url;

              const getLayoutClass = () => {
                const pattern = [
                  'sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2',
                  'sm:col-span-1 md:col-span-1',
                  'sm:col-span-1 md:col-span-1',
                  'sm:col-span-2 md:col-span-2 md:row-span-2',
                  'sm:col-span-1 md:col-span-1',
                  'sm:col-span-1 md:col-span-1',
                  'sm:col-span-2 md:col-span-2 md:row-span-2',
                  'sm:col-span-2 md:col-span-2',
                ];
                return pattern[index % pattern.length];
              };

              const sizeClass = getLayoutClass();
              const isLarge = sizeClass.includes('col-span-2');

              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`bg-white group cursor-pointer overflow-hidden relative ${sizeClass}`}
                  onClick={() => navigate(`/projects/${project.slug}`)}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-700" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 z-30 p-5 sm:p-7 md:p-10 lg:p-12 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold text-white bg-brand-accent px-2 sm:px-3 py-1 uppercase tracking-widest leading-none">
                        № {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex gap-1 sm:gap-2 flex-wrap justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {project.tags?.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="text-[7px] sm:text-[8px] font-mono font-bold text-black bg-white px-1.5 sm:px-2 py-1 uppercase tracking-widest"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-white/70 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] block mb-2">
                        {project.category}
                      </span>
                      <h3 className={`text-white font-display font-bold leading-none tracking-tighter uppercase ${isLarge
                        ? 'text-2xl sm:text-3xl md:text-4xl lg:text-6xl'
                        : 'text-xl sm:text-2xl md:text-3xl'
                        }`}>
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative h-full overflow-hidden">
                    <img
                      src={thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale-75 brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 border-t-2 border-r-2 border-white/0 group-hover:border-white/60 transition-all duration-500" />
                  <div className="absolute bottom-4 left-4 w-10 h-10 sm:w-12 sm:h-12 border-b-2 border-l-2 border-white/0 group-hover:border-white/60 transition-all duration-500" />
                </motion.div>
              );
            })
          )}
        </div>

        {/* View More Button */}
        {visibleProjects < featuredProjects.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 sm:mt-12 flex justify-center"
          >
            <button
              onClick={() => setVisibleProjects(prev => prev + 4)}
              className="group flex items-center gap-4 sm:gap-6 bg-transparent border border-studio-border px-6 sm:px-10 py-4 sm:py-6 hover:bg-brand-accent hover:border-brand-accent transition-all duration-500"
            >
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.3em] text-studio-text group-hover:text-white transition-colors">
                View More Projects
              </span>
              <ArrowRight
                size={18}
                className="text-studio-text group-hover:text-white group-hover:translate-x-1 transition-all duration-500"
              />
            </button>
          </motion.div>
        )}
      </section>

      {/* ─────────────────────────────────────────────
          SKILLS / DESIGN STACK
      ───────────────────────────────────────────── */}
      <section id="competencies" className="py-16 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 max-w-[1400px] mx-auto bg-studio-text text-white">
        <div className="grid lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 items-start">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8 sm:space-y-10"
          >
            <div className="space-y-4 sm:space-y-6">
              <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block">
                — CREATIVE TOOLKIT
              </span>
              <h2 className="font-display font-bold leading-[0.85] tracking-tighter uppercase
                text-5xl sm:text-6xl md:text-7xl lg:text-[7rem]"
              >
                DESIGN <br />
                <span className="text-white/20">STACK.</span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-md">
                A curated collection of industry-standard creative tools for branding, motion graphics, packaging, and digital storytelling.
              </p>
            </div>

            {/* Download Resume */}
            <a
              href={ResumePDF}
              download="Umang-Resume.pdf"
              className="inline-flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 border border-white/20 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-500">
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/50 group-hover:text-white transition-colors">
                Download Resume
              </span>
            </a>
          </motion.div>

          {/* Right column — skills grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                name: 'Adobe Illustrator',
                desc: 'Brand identity & vector graphics',
                level: 95,
                logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/adobe-illustrator-icon.png'
              },
              {
                name: 'Adobe Photoshop',
                desc: 'Image editing & manipulation',
                level: 90,
                logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/adobe-photoshop-icon.png'
              },
              {
                name: 'CorelDRAW',
                desc: 'Print production & layouts',
                level: 88,
                logo: 'https://img.icons8.com/fluent/1200/coreldraw-2021.jpg'
              },
              {
                name: 'Figma',
                desc: 'UI/UX design & prototyping',
                level: 85,
                logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg'
              },
              {
                name: 'After Effects',
                desc: 'Motion graphics & animations',
                level: 80,
                logo: 'https://static.vecteezy.com/system/resources/thumbnails/066/118/544/small/adobe-after-effects-cc-icon-app-logo-editable-transparent-background-premium-social-media-design-for-digital-download-free-png.png'
              },
              {
                name: 'Premiere Pro',
                desc: 'Video editing & color grading',
                level: 78,
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/512px-Adobe_Premiere_Pro_CC_icon.svg.png'
              },
              {
                name: 'DaVinci Resolve',
                desc: 'Advanced video post-production',
                level: 75,
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/DaVinci_Resolve_17_logo.svg/512px-DaVinci_Resolve_17_logo.svg.png'
              },
              {
                name: 'Canva',
                desc: 'Quick visual content creation',
                level: 92,
                logo: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Canva_icon_-_new_logo.svg'
              },
            ].map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group relative p-4 sm:p-5 md:p-6 bg-white/5 border border-white/5 hover:border-brand-accent/50 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/10 transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center bg-white p-1 flex-shrink-0">
                      <img src={skill.logo} alt={skill.name} className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white group-hover:text-brand-accent transition-colors duration-300">
                      {skill.name}
                    </h3>
                  </div>
                  <p className="text-white/40 text-xs sm:text-sm mb-3 sm:mb-4 group-hover:text-white/70 transition-colors duration-300">
                    {skill.desc}
                  </p>
                  <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                      className="h-full bg-brand-accent rounded-full"
                    />
                  </div>
                  <span className="text-xs font-mono text-white/30 mt-2 block">{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          ABOUT TEASER
      ───────────────────────────────────────────── */}
      <section id="about" className="py-20 sm:py-32 md:py-40 lg:py-48 px-4 sm:px-6 max-w-[1400px] mx-auto border-t border-studio-border">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 md:gap-24 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square bg-white border border-studio-border p-2 sm:p-3"
          >
            <img
              src={Image}
              alt="Philosophy"
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-[10px] sm:border-[15px] md:border-[20px] border-white pointer-events-none" />
          </motion.div>

          {/* Text */}
          <div className="space-y-8 sm:space-y-12">
            <div className="space-y-5 sm:space-y-8">
              <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block">
                — THE PHILOSOPHY
              </span>
              <h2 className="font-display font-bold leading-[0.9] tracking-tighter uppercase
                text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
              >
                DESIGN AS <br />
                <span className="italic text-studio-text/40">VISUAL</span> <br />
                SYSTEM.
              </h2>
              <p className="text-studio-text/60 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                Specialized in branding, motion graphics, packaging, and digital visual systems creating modern design experiences that combine clarity, structure, and impactful communication across digital and print mediums.
              </p>
            </div>

            <button
              onClick={() => {
                navigate('/about');
                setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }), 100);
              }}
              className="group flex items-center gap-4 sm:gap-6"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 border border-studio-border flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-500">
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-studio-text/40 group-hover:text-studio-text transition-colors">
                EXPLORE APPROACH
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          CONTACT SECTION
      ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 max-w-[1400px] mx-auto border-t border-studio-border">
        <div className="grid lg:grid-cols-2 border border-studio-border bg-white">

          {/* LEFT */}
          <div className="p-8 sm:p-12 md:p-16 lg:p-20 border-b lg:border-b-0 lg:border-r border-studio-border flex flex-col justify-between gap-12">
            <div>
              <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block mb-6 sm:mb-8">
                — CONTACT
              </span>
              <h2 className="font-display font-bold leading-[0.9] tracking-tighter uppercase text-black
                text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7rem]"
              >
                READY TO <br />
                <span className="italic text-black/30">MANIFEST</span>
                <br />
                YOUR <br />
                VISION.
              </h2>
            </div>

            <div className="border-t border-studio-border pt-8 sm:pt-10">
              <p className="text-black/60 text-base sm:text-lg md:text-xl leading-relaxed max-w-md">
                Currently accepting a limited number of high-quality creative partnerships for Q3 2026.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="p-8 sm:p-12 md:p-16 lg:p-20">
            <form className="space-y-10 sm:space-y-14 md:space-y-16">

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                <div className="space-y-3 sm:space-y-4">
                  <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-black/40">
                    Name
                  </span>
                  <input
                    type="text"
                    placeholder="ALEXANDER ROSS"
                    className="w-full border-b border-studio-border bg-transparent pb-3 sm:pb-5
                      text-xl sm:text-2xl md:text-3xl font-display font-bold uppercase tracking-tight
                      text-black placeholder:text-black/20 outline-none"
                  />
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-black/40">
                    Email
                  </span>
                  <input
                    type="email"
                    placeholder="ALEX@STUDIO.COM"
                    className="w-full border-b border-studio-border bg-transparent pb-3 sm:pb-5
                      text-xl sm:text-2xl md:text-3xl font-display font-bold uppercase tracking-tight
                      text-black placeholder:text-black/20 outline-none"
                  />
                </div>
              </div>

              {/* Briefing */}
              <div className="space-y-3 sm:space-y-4">
                <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-black/40">
                  Briefing
                </span>
                <textarea
                  rows={4}
                  placeholder="TELL US ABOUT THE MISSION..."
                  className="w-full border-b border-studio-border bg-transparent pb-3 sm:pb-5
                    text-xl sm:text-2xl md:text-3xl font-display font-bold uppercase tracking-tight
                    text-black placeholder:text-black/20 outline-none resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="group w-full border border-black px-6 sm:px-10 py-5 sm:py-7 md:py-8 flex items-center justify-between hover:bg-black transition-colors duration-500"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black group-hover:text-white transition-colors">
                  SEND DISPATCH
                </span>
                <ArrowRight
                  size={22}
                  className="text-black group-hover:text-white group-hover:translate-x-2 transition-all duration-500"
                />
              </button>
            </form>
          </div>

        </div>
      </section>
    </>
  );
}