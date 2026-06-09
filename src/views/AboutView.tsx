import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

import Image from '../assets/images/3img.png';
import Img4 from "../assets/images/4img.png";
import { projectBreakdownApi } from '../api/projectBreakdown.api';

interface ProjectBreakdownItem {
  _id: string;
  title: string;
  image: string;
  order: number;
  isActive: boolean;
}

const fallbackBreakdownItems: ProjectBreakdownItem[] = [
  {
    _id: 'fallback-1',
    title: 'Project 1',
    image: 'https://picsum.photos/seed/pbreak1/900/1400',
    order: 0,
    isActive: true,
  },
  {
    _id: 'fallback-2',
    title: 'Project 2',
    image: 'https://picsum.photos/seed/pbreak2/900/1400',
    order: 1,
    isActive: true,
  },
  {
    _id: 'fallback-3',
    title: 'Project 3',
    image: 'https://picsum.photos/seed/pbreak3/900/1400',
    order: 2,
    isActive: true,
  },
  {
    _id: 'fallback-4',
    title: 'Project 4',
    image: 'https://picsum.photos/seed/pbreak4/900/1400',
    order: 3,
    isActive: true,
  },
  {
    _id: 'fallback-5',
    title: 'Project 5',
    image: 'https://picsum.photos/seed/pbreak5/900/1400',
    order: 4,
    isActive: true,
  },
];

interface AboutViewProps {
  setCurrentView?: (view: 'home') => void;
}

export function AboutView({ setCurrentView }: AboutViewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [breakdownItems, setBreakdownItems] = useState<ProjectBreakdownItem[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadBreakdownItems = async () => {
      try {
        const response = await projectBreakdownApi.getProjectBreakdownItems();
        if (isMounted) {
          setBreakdownItems(response.data?.data || []);
        }
      } catch (error) {
        console.error('Failed to load project breakdown items', error);
        if (isMounted) {
          setBreakdownItems([]);
        }
      }
    };

    loadBreakdownItems();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayBreakdownItems = (breakdownItems.length > 0 ? breakdownItems : fallbackBreakdownItems
  ).sort((a, b) => a.order - b.order);
  const visibleBreakdownItems = displayBreakdownItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  return (
    <section className="
      pt-24 sm:pt-32 md:pt-40 lg:pt-48
      pb-16 sm:pb-24 md:pb-32
      px-4 sm:px-6 md:px-8
      max-w-[1400px] mx-auto
    ">

      {/* ── HERO ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 sm:mb-16 md:mb-20"
      >
        <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-5 sm:mb-8 block">
          — About Me
        </span>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 sm:gap-12 md:gap-16 items-end">

          {/* LEFT */}
          <div>
            <h1 className="
              font-display font-bold leading-[0.8] tracking-[-0.08em] uppercase
              text-[18vw] sm:text-[15vw] md:text-[13vw] lg:text-[11vw] xl:text-[10rem]
            ">
              UMANG
            </h1>
            <h1 className="
              font-display font-bold leading-[0.8] tracking-[-0.08em] uppercase
              text-studio-text/20
              text-[18vw] sm:text-[15vw] md:text-[13vw] lg:text-[11vw] xl:text-[10rem]
            ">
              VISUALS
            </h1>
          </div>

          {/* RIGHT */}
          <div className="pb-4 sm:pb-6 md:pb-8">
            <span className="text-brand-accent uppercase tracking-[0.3em] text-xs">
              Graphic Designer & Visual Creator
            </span>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl leading-relaxed text-studio-text/60">
              I am a Graphic Designer and Fine Artist passionate about visual storytelling, branding
              and creative expression. My work combines artistic thinking with strategic design,
              allowing me to create experiences that are both visually engaging and purpose-driven.
              From traditional sketching and fine arts to digital branding and content creation,
              I enjoy exploring creativity across multiple mediums.
            </p>
          </div>
        </div>

        {/* Feature Image */}
        <div className="mt-12 sm:mt-16 md:mt-24 relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[50px]">
          <img
            src={Image}
            alt="Studio"
            className="
    w-full  h-auto  object-center transition-all duration-1000 hover:scale-105
    h-[280px] sm:h-[420px] md:h-[580px] lg:h-[700px] xl:h-[850px]
  "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 md:bottom-12 md:left-12">
            <span className="text-white/60 tracking-[0.4em] uppercase text-[10px] sm:text-xs">
              Design Philosophy
            </span>
            <h2 className="text-white font-display uppercase mt-3 sm:mt-4
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Create
              <br />
              With Purpose.
            </h2>
          </div>
        </div>

        {/* Summary paragraph */}
        <div className="mt-8 sm:mt-10 md:mt-12 px-0 sm:px-4 md:px-12">
          <div className="max-w-4xl">
            <p className="text-studio-text/70 text-base sm:text-lg md:text-xl font-light leading-relaxed tracking-wide">
              My creative approach is rooted in curiosity, observation and storytelling. Whether I am
              designing a brand identity, creating digital content or working on traditional artwork,
              I focus on building visuals that communicate clearly and leave a lasting impression.
              Every project is an opportunity to combine artistic expression with thoughtful design solutions.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 flex items-center gap-4">
            <div className="w-12 sm:w-16 h-[1px] bg-brand-accent" />
            <span className="text-brand-accent font-mono text-xs tracking-widest uppercase">
              Our Approach
            </span>
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12 w-full h-[3px] bg-studio-border" />
        </div>
      </motion.div>

      {/* ── FOUNDER / CREATIVE DIRECTOR ── */}
      <section className="border-b border-studio-border">
        <div className="grid lg:grid-cols-[300px_1fr] gap-10 sm:gap-14 md:gap-20">

          {/* LEFT */}
          <div>
            <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] block mb-4 sm:mb-6">
              — Creative Director
            </span>
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[30px]">
              <img
                src={Img4}
                alt="Founder"
                className="w-full object-cover
                  h-[260px] sm:h-[340px] md:h-[400px] lg:h-[420px]"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="pt-0 mb-12 sm:mb-16 md:mb-20">
            <span className="text-studio-text/40 uppercase tracking-[0.3em] text-xs">
              About Me
            </span>

            <h2 className="font-display uppercase leading-[0.9] mt-3 sm:mt-4 mb-6 sm:mb-8 md:mb-10
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            >
              I'm A Graphic
              <br />
              Designer,
              <br />
              Fine Artist &
              <br />
              Visual Creator
            </h2>

            <p className="text-studio-text/60 text-base sm:text-lg leading-relaxed max-w-3xl">
              Currently working as a Graphic Designer at MYITRONLINE Global Services while pursuing
              higher education and advanced artistic training. My journey combines Fine Arts, Interior
              Design and Graphic Design, giving me a multidisciplinary perspective on creativity.
              I enjoy transforming ideas into meaningful visual experiences through branding, social
              media design, promotional campaigns, illustration and digital content creation.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 md:gap-8 mt-10 sm:mt-12 md:mt-16">
              {[
                { stat: '25+', label: 'Projects' },
                { stat: '2+', label: 'Years' },
                { stat: '10+', label: 'Brands' },
                { stat: '100%', label: 'Custom' },
              ].map(({ stat, label }) => (
                <div key={label}>
                  <h3 className="font-display text-4xl sm:text-5xl">{stat}</h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-studio-text/50 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="py-12 sm:py-16 md:py-20 text-center relative overflow-hidden">

        {/* BG word */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-display uppercase leading-none text-studio-text/[0.03]
            text-[25vw]">
            DESIGN
          </span>
        </div>

        <div className="relative z-10">
          <span className="text-brand-accent font-mono tracking-[0.4em] uppercase text-[10px] block mb-6 sm:mb-10">
            — Manifesto
          </span>

          <h2 className="
            font-display uppercase leading-[0.85] tracking-[-0.08em]
            text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7rem] xl:text-[9rem]
          ">
            I DON'T
            <br />
            CREATE TO
            <br />
            FOLLOW TRENDS.
          </h2>

          <div className="my-8 sm:my-12 flex justify-center">
            <div className="w-16 sm:w-24 h-[2px] bg-brand-accent" />
          </div>

          <h2 className="
            font-display uppercase leading-[0.85] tracking-[-0.08em] text-studio-text/20
            text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7rem] xl:text-[9rem]
          ">
            I DESIGN
            <br />
            TO CREATE
            <br />
            MEMORY.
          </h2>

          <div className="mt-12 sm:mt-16 md:mt-24 max-w-4xl mx-auto px-2 sm:px-0">
            <p className="text-base sm:text-lg md:text-xl text-studio-text/60 leading-relaxed">
              Great design is not just about aesthetics. it is about communication, emotion and
              impact. My goal is to create work that connects with people, strengthens brands and
              tells meaningful stories. Whether through design or art, I believe every visual should
              have a purpose and every project should leave a lasting impression.
            </p>
          </div>
        </div>
      </section>

      {/* ── PROCESS SHOWCASE (Accordion) ── */}
      <section className="py-8 sm:py-10 mb-4 sm:mb-5 bg-studio-text overflow-hidden -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1800px] mx-auto">

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-accent uppercase tracking-[0.4em] text-xs block"
          >
            — Process Showcase
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 sm:mt-4 text-white font-display uppercase leading-[0.85] tracking-tight
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[9rem]"
          >
            Project
            <br />
            <span className="text-white/20">Breakdown</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-4 sm:mt-6 max-w-md text-white/50 text-sm sm:text-base"
          >
            Explore the visual journey, layouts, concepts and design decisions behind the project.
          </motion.p>

          {/* Desktop accordion */}
          <div
            className="mt-10 sm:mt-14 md:mt-16 hidden md:flex
  h-[460px] lg:h-[560px] xl:h-[650px] gap-2 lg:gap-3"
          >
            {visibleBreakdownItems.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={item._id || index}
                  onMouseEnter={() => setActiveIndex(index)}
                  animate={{ flex: isActive ? 5 : 1 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="relative overflow-hidden rounded-[20px] lg:rounded-[28px] border border-white/10 cursor-pointer min-w-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/40" />

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

                        <h3
                          className="
                mt-3 sm:mt-4
                text-white
                font-display
                uppercase
                text-4xl lg:text-5xl xl:text-6xl
              "
                        >
                          Project {item.title}
                        </h3>
                      </div>

                      <span className="text-white/20 font-display text-7xl lg:text-8xl">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Mobile stacked cards */}
          <div className="flex md:hidden flex-col gap-3 mt-8">
            {visibleBreakdownItems.map((item, index) => (
              <div
                key={item._id || index}
                className="relative overflow-hidden rounded-2xl border border-white/10 h-[180px] sm:h-[220px]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                  <span className="text-brand-accent uppercase tracking-[0.4em] text-[10px]">
                    Project Breakdown
                  </span>

                  <div className="flex items-end justify-between">
                    <h3 className="text-white font-display uppercase text-2xl sm:text-3xl">
                      Project {item.title}
                    </h3>

                    <span className="text-white/20 font-display text-5xl">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

            {/* view more button */}
          <div className="flex justify-center gap-4 mt-10 md:mt-14">

            {currentPage > 0 && (
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="
        px-8 py-4
        border border-white/20
        text-white
        uppercase
        tracking-[0.35em]
        text-xs
        font-bold

        hover:bg-white
        hover:text-black

        transition-all
      "
              >
                Previous
              </button>
            )}

            {(currentPage + 1) * itemsPerPage <
              displayBreakdownItems.length && (
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="
        px-8 py-4
        border border-white/20
        text-white
        uppercase
        tracking-[0.35em]
        text-xs
        font-bold

        hover:bg-white
        hover:text-black

        transition-all
      "
                >
                  Next Projects
                </button>
              )}

          </div>


        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <div className="mb-12 sm:mb-16 md:mb-20 mt-12 sm:mt-16 md:mt-20">

        <div className="mb-10 sm:mb-14 md:mb-20">
          <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block mb-3 sm:mb-4">
            — Creative Philosophy
          </span>
          <h2 className="font-display uppercase leading-[0.9]
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Principles
            <br />
            Behind My
            <br />
            Creative Work
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {[
            {
              title: 'ART WITH PURPOSE',
              desc: 'Every design and artwork should communicate something meaningful. I believe creativity is most powerful when it serves a clear purpose and connects with people on a deeper level.',
            },
            {
              title: 'STORY BEFORE STYLE',
              desc: 'Strong visuals begin with a strong idea. Whether designing a brand identity or creating artwork, I focus on telling stories that people can understand, remember and connect with.',
            },
            {
              title: 'BALANCE OF ART & DESIGN',
              desc: 'My background in fine arts and graphic design allows me to combine artistic expression with strategic thinking, creating work that is both visually compelling and highly functional.',
            },
            {
              title: 'CONTINUOUS EVOLUTION',
              desc: 'Creativity never stands still. I constantly explore new techniques, tools and perspectives to improve my craft and deliver better visual experiences with every project.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="
                group relative overflow-hidden
                rounded-2xl sm:rounded-3xl md:rounded-[32px]
                border border-studio-border bg-white
                p-6 sm:p-8 md:p-10
                min-h-[220px] sm:min-h-[260px] md:min-h-[280px]
                hover:-translate-y-2 transition-all duration-500
              "
            >
              {/* Number */}
              <span className="absolute top-6 right-6 sm:top-8 sm:right-8 font-display text-5xl sm:text-6xl text-studio-text/5 leading-none">
                0{i + 1}
              </span>

              <span className="text-brand-accent font-mono uppercase tracking-[0.3em] text-[10px] block mb-5 sm:mb-8">
                Principle
              </span>

              <h3 className="font-display uppercase leading-[0.95] mb-4 sm:mb-6
                text-2xl sm:text-3xl md:text-4xl"
              >
                {item.title}
              </h3>

              <p className="text-studio-text/60 leading-relaxed text-sm sm:text-base max-w-sm">
                {item.desc}
              </p>

              {/* Hover bottom bar */}
              <div className="absolute bottom-0 left-0 h-[4px] w-0 bg-brand-accent transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="border-t border-studio-text pt-12 sm:pt-16 md:pt-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-10 md:gap-12">

          <div className="space-y-3 sm:space-y-4">
            <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block">
              Location
            </span>
            <span className="text-xl sm:text-2xl font-display font-bold uppercase text-studio-text">
              Delhi, India
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block">
              Established
            </span>
            <span className="text-xl sm:text-2xl font-display font-bold uppercase text-studio-text">
              2024 — Present
            </span>
          </div>

          <button
            onClick={() => {
              setCurrentView?.('home');
              setTimeout(() => {
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="
              w-full md:w-auto
              px-7 sm:px-10 py-4 sm:py-5
              bg-studio-text text-white
              font-bold uppercase tracking-widest text-[10px]
              hover:bg-brand-accent transition-colors
            "
          >
            Start a Collaboration
          </button>
        </div>
      </div>

    </section>
  );
}