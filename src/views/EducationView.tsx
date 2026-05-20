import { motion } from 'motion/react';

import {
  EDUCATION_DATA,
} from '../constants';

import {
  Download,
  ArrowUpRight,
} from 'lucide-react';

import ResumePDF from '../assets/CV pdf/Umang resume.pdf';

export function EducationView() {

  return (

    <section className="pt-48 pb-32 px-6 max-w-[1400px] mx-auto">

      {/* HERO */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mb-40"
      >

        <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">

          — FOUNDATION

        </span>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-end">

          {/* LEFT */}

          <div>

            <h1 className="font-display text-7xl md:text-[10rem] font-bold leading-[0.9] tracking-[-0.06em]">

              EDUCATION.

            </h1>

            <p className="mt-10 text-studio-text/60 text-xl leading-relaxed max-w-2xl">

              Rigorous exploration of design systems,
              visual storytelling, typography,
              branding strategy, and future-focused
              digital experiences.

            </p>

          </div>

          {/* RIGHT */}

          <motion.a
            href={ResumePDF}
            target="_blank"
            download
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="group relative overflow-hidden rounded-[32px] border border-studio-border bg-white/5 p-10 transition-all duration-700 hover:bg-black hover:text-white"
          >

            <div className="flex items-center justify-between">

              <div>

                <span className="text-[10px] uppercase tracking-[0.4em] text-studio-text/40 group-hover:text-white/40 block">

                  Curriculum Vitae

                </span>

                <h3 className="mt-4 text-3xl font-bold">

                  Download Resume

                </h3>

              </div>

              <div className="w-20 h-20 rounded-full border border-studio-border flex items-center justify-center transition-all duration-500 group-hover:bg-brand-accent group-hover:border-brand-accent">

                <Download
                  size={28}
                  className="transition-all duration-500 group-hover:translate-y-1 group-hover:text-black"
                />

              </div>

            </div>

          </motion.a>

        </div>

      </motion.div>

      {/* EDUCATION TIMELINE */}

      <div className="space-y-12">

        {EDUCATION_DATA.map(
          (item, i) => (

            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
              }}
              className="group grid lg:grid-cols-[220px_1fr] gap-10 border-t border-studio-border pt-12"
            >

              {/* YEAR */}

              <div>

                <span className="sticky top-32 inline-block text-sm font-mono font-bold uppercase tracking-[0.3em] text-brand-accent">

                  {item.year}

                </span>

              </div>

              {/* CONTENT */}

              <div className="max-w-4xl">

                {/* TEXT */}

                <div className="space-y-8">

                  <div>

                    <span className="inline-flex items-center gap-2 rounded-full border border-studio-border bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-studio-text/60">

                      <ArrowUpRight size={12} />

                      Academic Journey

                    </span>

                    <h2 className="mt-6 font-display text-5xl font-bold tracking-tight leading-none">

                      {item.title}

                    </h2>

                    <p className="mt-4 font-mono uppercase tracking-[0.3em] text-[10px] text-studio-text/40">

                      {item.institution}

                    </p>

                  </div>

                  <p className="text-lg leading-relaxed text-studio-text/60 max-w-2xl">

                    {item.description}

                  </p>

                  {/* TAGS */}

                  <div className="flex flex-wrap gap-3">

                    {item.tags.map(
                      (tag) => (

                        <span
                          key={tag}
                          className="rounded-full border border-studio-border bg-white/5 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-studio-text/60 transition-all duration-500 hover:bg-brand-accent hover:text-black"
                        >

                          {tag}

                        </span>

                      )
                    )}

                  </div>

                </div>

              </div>

            </motion.div>

          )
        )}

      </div>

    </section>
  );
}