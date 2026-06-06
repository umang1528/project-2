import { motion } from 'motion/react';
import { EDUCATION_DATA } from '../constants';
import { Download, ArrowUpRight } from 'lucide-react';
import ResumePDF from '../assets/CV pdf/Umang resume.pdf';

export function EducationView() {
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
        className="mb-8 sm:mb-10"
      >
        <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 sm:mb-6 block">
          — FOUNDATION
        </span>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 sm:gap-14 md:gap-20 items-end">

          {/* LEFT */}
          <div>
            <h1 className="
              font-display font-bold leading-[0.9] tracking-[-0.06em]
              text-[14vw] sm:text-[11vw] md:text-8xl lg:text-[9rem] xl:text-[10rem]
            ">
              EDUCATION.
            </h1>

            <p className="mt-6 sm:mt-8 md:mt-10 text-studio-text/60 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
              A journey shaped through academic learning, technical education and
              hands-on creative experience. From fine arts and interior design to
              graphic design, branding and digital content creation, each stage has
              contributed to building a multidisciplinary approach focused on visual
              communication, problem-solving and impactful design experiences.
            </p>
          </div>

          {/* RIGHT — Download Resume card */}
          <motion.a
            href={ResumePDF}
            target="_blank"
            download
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="
              group relative overflow-hidden
              rounded-2xl sm:rounded-3xl md:rounded-[32px]
              border border-studio-border bg-white/5
              p-6 sm:p-8 md:p-10
              transition-all duration-700
              hover:bg-black hover:text-white
              cursor-pointer block
            "
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-studio-text/40 group-hover:text-white/40 block">
                  Curriculum Vitae
                </span>
                <h3 className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-bold">
                  Download Resume
                </h3>
              </div>

              <div className="
                flex-shrink-0
                w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
                rounded-full border border-studio-border
                flex items-center justify-center
                transition-all duration-500
                group-hover:bg-brand-accent group-hover:border-brand-accent
              ">
                <Download
                  size={22}
                  className="transition-all duration-500 group-hover:translate-y-1 group-hover:text-black"
                />
              </div>
            </div>
          </motion.a>
        </div>
      </motion.div>

      {/* ── CREATIVE JOURNEY / TIMELINE ── */}
      <section className="py-16 sm:py-24 md:py-32 lg:py-40">

        {/* Section Header */}
        <div className="mb-12 sm:mb-16 md:mb-24">
          <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] block mb-3 sm:mb-4">
            — — EDUCATION & EXPERIENCE
          </span>
          <h2 className="
            font-display uppercase leading-[0.85]
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl
          ">
            Building
            <br />
            Experience
            <br />
            Through Design.
          </h2>
        </div>

        {/* Column Labels — hidden on mobile */}
        <div className="
          hidden lg:grid lg:grid-cols-[220px_1fr]
          gap-10 border-t border-studio-border pt-10 sm:pt-12 mb-10 sm:mb-12
        ">
          <div>
            <span className="text-xl sm:text-2xl uppercase font-medium">YEAR</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl uppercase font-medium">CONTENT</span>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-10 sm:space-y-14 md:space-y-16">
          {[
            {
              year: '2023',
              category: 'Education',
              title: 'High School & Senior Secondary (CBSE)',
              institution: 'Govt. Sarvodaya Vidyalaya, Shalimar Bagh, Delhi',
              description:
                'Completed secondary and senior secondary education under the CBSE curriculum while developing a strong interest in creativity, visual communication and digital media. This phase laid the foundation for analytical thinking, discipline and problem-solving skills that later supported my design journey.',
              tags: ['CBSE', 'Schooling', 'Academic Foundation'],
            },
            {
              year: '2023',
              category: 'Technical Education',
              title: 'Interior Design & Decoration',
              institution: 'ITI PUSA, Delhi',
              description:
                'Received formal training in interior design, space planning, decoration principles and visual aesthetics. The program strengthened my understanding of composition, balance, color theory and design fundamentals, which continue to influence my creative work today.',
              tags: ['Interior Design', 'Decoration', 'Space Planning'],
            },
            {
              year: '2023',
              category: 'Higher Education',
              title: 'Bachelor of Arts (B.A)',
              institution: "Delhi University 'SOL'(Present)",
              description:
                'Currently pursuing a Bachelor of Arts degree while simultaneously building a professional career in graphic design. This academic journey has enhanced my communication skills, critical thinking and ability to approach creative challenges from multiple perspectives.',
              tags: ['Delhi University', 'B.A', 'SOL'],
            },
            {
              year: '2023',
              category: 'Fine Arts',
              title: 'Art Diploma',
              institution: 'Pankaj Fine Art Academy (Present)',
              description:
                'Actively developing artistic skills through intensive training in portrait sketching, drawing techniques, composition and fine arts. This education has strengthened my observation skills and helped me create more expressive and visually compelling design work.',
              tags: ['Fine Arts', 'Portrait Art', 'Sketching'],
            },
            {
              year: '2024',
              category: 'Professional Experience',
              title: 'Graphic Designer',
              institution: 'MYITRONLINE Global Services (Present)',
              description:
                'Working as a Graphic Designer, creating branding assets, social media campaigns, promotional creatives, motion graphics and marketing materials. Collaborating with teams to develop visual strategies that improve engagement, strengthen brand identity and support business growth.',
              tags: ['Branding', 'Social Media', 'Marketing'],
            },
            {
              year: '2025',
              category: 'Freelancing',
              title: 'Independent Graphic Designer',
              institution: 'Freelance Projects',
              description:
                'Delivered creative solutions for clients across branding, social media design, promotional materials and custom sticker artwork. Managing projects independently has improved client communication, creative problem-solving and end-to-end design execution skills.',
              tags: ['Freelance', 'Client Work', 'Creative Design'],
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ x: 6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="
                group
                grid grid-cols-1 lg:grid-cols-[220px_1fr]
                gap-4 sm:gap-6 lg:gap-10
                border-t border-studio-border
                pt-8 sm:pt-10 md:pt-12
              "
            >
              {/* Year */}
              <div>
                <span className="
                  lg:sticky lg:top-32
                  inline-block text-xs sm:text-sm font-mono font-bold uppercase
                  tracking-[0.3em] text-brand-accent
                ">
                  {item.year}
                </span>
              </div>

              {/* Content */}
              <div className="relative max-w-5xl">

                {/* Giant BG year — decorative */}
                <span className="
                  absolute right-0 top-0
                  font-display leading-none select-none pointer-events-none
                  text-studio-text/[0.03]
                  text-[5rem] sm:text-[7rem] md:text-[10rem] lg:text-[12rem]
                ">
                  {item.year}
                </span>

                {/* Category pill */}
                <span className="
                  inline-flex items-center gap-2 rounded-full
                  border border-studio-border
                  px-3 sm:px-4 py-1.5 sm:py-2
                  text-[10px] uppercase tracking-[0.35em] text-studio-text/60
                ">
                  ↗ {item.category}
                </span>

                {/* Title */}
                <h2 className="
                  mt-5 sm:mt-6 md:mt-8
                  font-display font-bold tracking-tight leading-[0.9]
                  text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl
                ">
                  {item.title}
                </h2>

                {/* Institution */}
                <p className="
                  mt-3 sm:mt-4 md:mt-5
                  font-mono uppercase tracking-[0.35em] text-[10px] text-studio-text/40
                ">
                  {item.institution}
                </p>

                {/* Description */}
                <p className="
                  mt-6 sm:mt-8 md:mt-12
                  text-base sm:text-lg md:text-xl leading-relaxed text-studio-text/60 max-w-3xl
                ">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 md:mt-12">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        rounded-full border border-studio-border
                        px-3 sm:px-4 md:px-5 py-1.5 sm:py-2
                        text-[10px] font-bold uppercase tracking-[0.3em]
                        text-studio-text/60
                        transition-all duration-500
                        hover:bg-black hover:text-white hover:border-black
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

      {/* ── FOOTER ── */}
      <div className="
        mt-8 sm:mt-10 md:mt-12
        pt-8 sm:pt-10 md:pt-12
        border-t border-studio-border
        flex flex-col md:flex-row
        justify-between items-center
        gap-6 sm:gap-8
        text-center md:text-left
      ">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-studio-text flex items-center justify-center flex-shrink-0">
            <span className="font-display font-bold text-white text-xs">U</span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-studio-text/40">
            © 2026 VISIONS — Creative Collective
          </span>
        </div>

        <div className="flex gap-6 sm:gap-12 italic text-[9px] sm:text-[10px] font-mono font-bold text-studio-text/20 uppercase tracking-widest">
          <span>Architecting Perception</span>
          <span>Digital Permanence</span>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-studio-text/40 hover:text-brand-accent transition-colors"
        >
          Back to Top
          <ArrowUpRight
            className="-rotate-90 transition-transform group-hover:-translate-y-1"
            size={13}
          />
        </button>
      </div>

    </section>
  );
}