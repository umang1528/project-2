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
        className="mb-10"
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

              A journey shaped through academic learning, technical education and
              hands-on creative experience. From fine arts and interior design to
              graphic design, branding and digital content creation, each stage has
              contributed to building a multidisciplinary approach focused on visual
              communication, problem-solving and impactful design experiences.

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
      {/* <div className="space-y-12">

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

              YEAR

              <div>

                <span className="sticky top-32 inline-block text-sm font-mono font-bold uppercase tracking-[0.3em] text-brand-accent">

                  {item.year}

                </span>

              </div>

              CONTENT

              <div className="max-w-4xl">

                TEXT

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

                  TAGS

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

      </div> */}



      {/* CREATIVE JOURNEY */}

      <section className="py-40">

        {/* HEADER */}

        <div className="mb-24">

          <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] block mb-4">
            — — EDUCATION & EXPERIENCE
          </span>

          <h2
            className="
      font-display
      text-5xl
      md:text-7xl
      uppercase
      leading-[0.85]
      "
          >
            Building
            <br />
            Experience
            <br />
            Through Design.
          </h2>

        </div>

        {/* LABELS */}

        <div className="grid lg:grid-cols-[220px_1fr] gap-10 border-t border-studio-border pt-12 mb-12">

          <div>
            <span className="text-2xl uppercase font-medium">
              YEAR
            </span>
          </div>

          <div>
            <span className="text-2xl uppercase font-medium">
              CONTENT
            </span>
          </div>

        </div>

        {/* ITEMS */}

        <div className="space-y-16">

          {[
            {
              year: "2023",
              category: "Education",
              title: "High School & Senior Secondary (CBSE)",
              institution: "Govt. Sarvodaya Vidyalaya, Shalimar Bagh, Delhi",
              description:
                "Completed secondary and senior secondary education under the CBSE curriculum while developing a strong interest in creativity, visual communication and digital media. This phase laid the foundation for analytical thinking, discipline and problem-solving skills that later supported my design journey.",
              tags: ["CBSE", "Schooling", "Academic Foundation"],
            },

            {
              year: "2023",
              category: "Technical Education",
              title: "Interior Design & Decoration",
              institution: "ITI PUSA, Delhi",
              description:
                "Received formal training in interior design, space planning, decoration principles and visual aesthetics. The program strengthened my understanding of composition, balance, color theory and design fundamentals, which continue to influence my creative work today.",
              tags: ["Interior Design", "Decoration", "Space Planning"],
            },

            {
              year: "2023",
              category: "Higher Education",
              title: "Bachelor of Arts (B.A)",
              institution: "Delhi University 'SOL'(Present)",
              description:
                "Currently pursuing a Bachelor of Arts degree while simultaneously building a professional career in graphic design. This academic journey has enhanced my communication skills, critical thinking and ability to approach creative challenges from multiple perspectives.",
              tags: ["Delhi University", "B.A", "SOL"],
            },

            {
              year: "2023",
              category: "Fine Arts",
              title: "Art Diploma",
              institution: "Pankaj Fine Art Academy (Present)",
              description:
                "Actively developing artistic skills through intensive training in portrait sketching, drawing techniques, composition and fine arts. This education has strengthened my observation skills and helped me create more expressive and visually compelling design work.",
              tags: ["Fine Arts", "Portrait Art", "Sketching"],
            },

            {
              year: "2024",
              category: "Professional Experience",
              title: "Graphic Designer",
              institution: "MYITRONLINE Global Services (Present)",
              description:
                "Working as a Graphic Designer, creating branding assets, social media campaigns, promotional creatives, motion graphics and marketing materials. Collaborating with teams to develop visual strategies that improve engagement, strengthen brand identity and support business growth.",
              tags: ["Branding", "Social Media", "Marketing"],
            },

            {
              year: "2025",
              category: "Freelancing",
              title: "Independent Graphic Designer",
              institution: "Freelance Projects",
              description:
                "Delivered creative solutions for clients across branding, social media design, promotional materials and custom sticker artwork. Managing projects independently has improved client communication, creative problem-solving and end-to-end design execution skills.",
              tags: ["Freelance", "Client Work", "Creative Design"],
            },

          ].map((item, i) => (

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
              whileHover={{
                x: 10,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
              }}
              className="
        group
        grid
        lg:grid-cols-[220px_1fr]
        gap-10
        border-t
        border-studio-border
        pt-12
        "
            >

              {/* YEAR */}

              <div>

                <span
                  className="
            sticky
            top-32
            inline-block
            text-sm
            font-mono
            font-bold
            uppercase
            tracking-[0.3em]
            text-brand-accent
            "
                >
                  {item.year}
                </span>

              </div>

              {/* CONTENT */}

              <div className="relative max-w-5xl">

                {/* HUGE BG YEAR */}

                <span
                  className="
            absolute
            right-0
            top-0
            font-display
            text-[8rem]
            md:text-[12rem]
            leading-none
            text-studio-text/[0.03]
            select-none
            pointer-events-none
            "
                >
                  {item.year}
                </span>

                {/* PILL */}

                <span
                  className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-studio-border
            px-4
            py-2
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-studio-text/60
            "
                >
                  ↗ {item.category}
                </span>

                {/* TITLE */}

                <h2
                  className="
            mt-8
            font-display
            text-4xl
            md:text-7xl
            font-bold
            tracking-tight
            leading-[0.9]
            "
                >
                  {item.title}
                </h2>

                {/* INSTITUTION */}

                <p
                  className="
            mt-5
            font-mono
            uppercase
            tracking-[0.35em]
            text-[10px]
            text-studio-text/40
            "
                >
                  {item.institution}
                </p>

                {/* DESCRIPTION */}

                <p
                  className="
            mt-12
            text-xl
            leading-relaxed
            text-studio-text/60
            max-w-3xl
            "
                >
                  {item.description}
                </p>

                {/* TAGS */}

                <div className="flex flex-wrap gap-4 mt-12">

                  {item.tags.map((tag) => (

                    <span
                      key={tag}
                      className="
                rounded-full
                border
                border-studio-border
                px-5
                py-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-studio-text/60
                transition-all
                duration-500
                hover:bg-black
                hover:text-white
                hover:border-black
                "
                    >
                      {tag}
                    </span>

                  ))}

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </section>
        
        {/* footer */}
      <div className="mt-12 pt-12 border-t border-studio-border flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-studio-text flex items-center justify-center">
            <span className="font-display font-bold text-white text-xs">U</span>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-studio-text/40">© 2026 VISIONS — Creative Collective</span>
        </div>
        <div className="flex gap-12 italic text-[10px] font-mono font-bold text-studio-text/20 uppercase tracking-widest">
          <span>Architecting Perception</span>
          <span>Digital Permanence</span>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-studio-text/40 hover:text-brand-accent transition-colors"
        >
          Back to Top <ArrowUpRight className="-rotate-90 transition-transform group-hover:-translate-y-1" size={14} />
        </button>
      </div>

    </section>
  );
}