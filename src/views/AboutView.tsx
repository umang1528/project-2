import { motion } from 'motion/react';

import { TypeAnimation } from 'react-type-animation';

interface AboutViewProps {
  setCurrentView?: (view: 'home') => void;
}

export function AboutView({ setCurrentView }: AboutViewProps) {

  return (

    <section className="pt-48 pb-32 px-6 max-w-[1400px] mx-auto">

      {/* HERO */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >

        <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block">
          — About The Studio
        </span>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-end">

          {/* LEFT SIDE */}

          <div>

            <h1
              className="
        font-display
        text-[16vw]
        leading-[0.8]
        tracking-[-0.08em]
        uppercase
        font-bold
        "
            >
              VISIONS
            </h1>

            <h1
              className="
        font-display
        text-[16vw]
        leading-[0.8]
        tracking-[-0.08em]
        uppercase
        font-bold
        text-studio-text/20
        "
            >
              STUDIO
            </h1>

          </div>

          {/* RIGHT SIDE */}

          <div className="pb-8">

            <span className="text-brand-accent uppercase tracking-[0.3em] text-xs">
              Creative Collective
            </span>

            <p
              className="
        mt-6
        text-xl
        leading-relaxed
        text-studio-text/60
        "
            >
              We create visual identities, digital experiences
              and design systems that balance precision,
              storytelling and timeless aesthetics.
            </p>

          </div>

        </div>

        {/* FEATURE IMAGE */}

        <div className="mt-24 relative overflow-hidden rounded-[50px]">
          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop"
            alt="Studio"
            className="
      h-[850px]
      w-full
      object-cover
      transition-all
      duration-1000
      hover:scale-105
    "
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Content Overlay */}
          <div className="absolute bottom-12 left-12">
            <span className="text-white/60 tracking-[0.4em] uppercase text-xs">
              Design Philosophy
            </span>

            <h2
              className="
        text-white
        font-display
        text-6xl
        uppercase
        mt-4
      "
            >
              Design
              <br />
              With Intent.
            </h2>
          </div>
        </div>

        {/* Summary Paragraph Below Image */}
        <div className="mt-12 px-4 md:px-12">
          <div className="max-w-4xl">
            <p className="text-studio-text/70 text-lg md:text-xl font-light leading-relaxed tracking-wide">
              We believe in the power of thoughtful design—a philosophy that merges aesthetics with functionality,
              creating experiences that resonate. Our approach combines strategic thinking with creative execution,
              transforming ideas into impactful visual narratives that leave lasting impressions. Every project is
              an opportunity to push boundaries and redefine what's possible.
            </p>
          </div>

          {/* Decorative Line with Our Approach */}
          <div className="mt-8 flex items-center gap-4">
            <div className="w-16 h-[1px] bg-brand-accent" />
            <span className="text-brand-accent font-mono text-xs tracking-widest uppercase">
              Our Approach
            </span>
          </div>

          {/* Bottom Decorative Line */}
          <div className="mt-12 w-full h-[3px] bg-studio-border" />
        </div>

      </motion.div>

      {/* FOUNDER / CREATIVE DIRECTOR */}

      <section className="border-b border-studio-border">

        <div className="grid lg:grid-cols-[300px_1fr] gap-20">
          {/* LEFT */}
          <div>
            <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] block mb-6">
              — Creative Director
            </span>

            <div className="overflow-hidden rounded-[30px]">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                alt="Founder"
                className="w-full h-[420px] object-cover"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="pt-0">
            <span className="text-studio-text/40 uppercase tracking-[0.3em] text-xs">
              About Me
            </span>

            <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] mt-4 mb-10">
              I'm A Graphic
              <br />
              Designer &
              <br />
              Visual Storyteller.
            </h2>

            <p className="text-studio-text/60 text-lg leading-relaxed max-w-3xl">
              For the past several years, I have been creating visual identities,
              digital experiences and brand systems that combine creativity,
              strategy and timeless aesthetics. My work focuses on transforming
              complex ideas into simple, memorable and impactful visual solutions.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div>
                <h3 className="font-display text-5xl">50+</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-studio-text/50">
                  Projects
                </p>
              </div>

              <div>
                <h3 className="font-display text-5xl">4+</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-studio-text/50">
                  Years
                </p>
              </div>

              <div>
                <h3 className="font-display text-5xl">20+</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-studio-text/50">
                  Brands
                </p>
              </div>

              <div>
                <h3 className="font-display text-5xl">100%</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-studio-text/50">
                  Custom
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CREATIVE JOURNEY TIMELINE */}

      {/* <section className="py-40"> */}

      {/* SECTION HEADER */}

      {/* <div className="mb-24">

          <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] block mb-4">
            — Creative Journey
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

        </div> */}

      {/* TIMELINE */}

      {/* <div className="relative">

          MAIN LINE

          <div
            className="
      absolute
      left-[45px]
      top-0
      bottom-0
      w-px
      bg-studio-border
      "
          />

          {[
            {
              year: "2021",
              title: "Started Design Journey",
              desc: "Discovered graphic design and started learning branding, typography and visual storytelling.",
            },

            {
              year: "2022",
              title: "Freelance Projects",
              desc: "Worked with local businesses and startups creating social media creatives and marketing visuals.",
            },

            {
              year: "2023",
              title: "Brand Identity Design",
              desc: "Focused on logo design, visual systems and complete brand identity development.",
            },

            {
              year: "2024",
              title: "Professional Growth",
              desc: "Collaborated with agencies and handled larger creative projects across different industries.",
            },

            {
              year: "2025",
              title: "Creative Direction",
              desc: "Leading design projects, creating systems and delivering premium visual experiences.",
            },

          ].map((item, index) => (

            <motion.div
              key={index}
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
                delay: index * 0.1,
              }}
              className="
        relative
        pl-32
        pb-24
        group
        "
            >

              YEAR BG

              <span
                className="
          absolute
          right-0
          top-0
          font-display
          text-[7rem]
          md:text-[10rem]
          leading-none
          text-studio-text/[0.04]
          select-none
          pointer-events-none
          "
              >
                {item.year}
              </span>

              DOT

              <div
                className="
          absolute
          left-[33px]
          top-4
          w-6
          h-6
          rounded-full
          border-2
          border-brand-accent
          bg-white
          transition-all
          duration-300
          group-hover:scale-125
          "
              />

              CONTENT

              <span
                className="
          text-brand-accent
          font-mono
          tracking-[0.3em]
          uppercase
          text-xs
          block
          mb-4
          "
              >
                {item.year}
              </span>

              <h3
                className="
          font-display
          text-3xl
          md:text-5xl
          uppercase
          mb-4
          transition-all
          duration-300
          group-hover:translate-x-3
          "
              >
                {item.title}
              </h3>

              <p
                className="
          text-studio-text/60
          max-w-2xl
          leading-relaxed
          "
              >
                {item.desc}
              </p>

            </motion.div>

          ))}

        </div> */}

      {/* </section> */}



      {/* MANIFESTO */}

      <section className="py-20 text-center relative overflow-hidden">

        {/* BG WORD */}

        <div
          className="
    absolute
    inset-0
    flex
    items-center
    justify-center
    pointer-events-none
    select-none
    "
        >
          <span
            className="
      font-display
      text-[25vw]
      uppercase
      leading-none
      text-studio-text/[0.03]
      "
          >
            DESIGN
          </span>
        </div>

        <div className="relative z-10">

          <span
            className="
      text-brand-accent
      font-mono
      tracking-[0.4em]
      uppercase
      text-[10px]
      block
      mb-10
      "
          >
            — Manifesto
          </span>

          <h2
            className="
      font-display
      text-[12vw]
      md:text-[9rem]
      uppercase
      leading-[0.85]
      tracking-[-0.08em]
      "
          >
            I DON'T
            <br />
            DESIGN TO
            <br />
            IMPRESS.
          </h2>

          <div className="my-12 flex justify-center">
            <div className="w-24 h-[2px] bg-brand-accent" />
          </div>

          <h2
            className="
      font-display
      text-[12vw]
      md:text-[9rem]
      uppercase
      leading-[0.85]
      tracking-[-0.08em]
      text-studio-text/20
      "
          >
            I DESIGN
            <br />
            TO CREATE
            <br />
            MEMORY.
          </h2>

          <div
            className="
      mt-24
      max-w-4xl
      mx-auto
      "
          >
            <p
              className="
        text-xl
        text-studio-text/60
        leading-relaxed
        "
            >
              Every project begins with purpose, structure and intention.
              Great design is not about decoration—it is about creating
              experiences people remember long after they leave.
            </p>
          </div>

        </div>

      </section>

      {/* MANIFESTO BOTTOM IMAGES */}
      <section className="py-10 mb-5 bg-studio-text overflow-hidden">
        <div className="max-w-[1800px] max-h-[1000px] mx-auto px-6">

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
            className="mt-4 text-white font-display uppercase leading-[0.85] tracking-tight text-5xl md:text-7xl lg:text-[9rem]"
          >
            Project
            <br />
            <span className="text-white/20">Breakdown</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 max-w-md text-white/50 text-base"
          >
            Explore the visual journey, layouts, concepts and design decisions behind the project.
          </motion.p>

          {/* Images - Stacked Effect */}
          <div className="relative mt-16 h-[500px] md:h-[700px]">

            {/* Image 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="absolute left-[2%] md:left-[5%] top-[30%] md:top-[35%] w-[180px] md:w-[260px] rotate-[-3deg] z-10"
            >
              <div className="rounded-lg overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="https://picsum.photos/seed/pbreak1/400/550"
                  alt="Project page 1"
                  className="w-full h-[200px] md:h-[320px] object-cover"
                />
              </div>
            </motion.div>

            {/* Image 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute left-[18%] md:left-[18%] top-[20%] md:top-[22%] w-[200px] md:w-[300px] rotate-[-1deg] z-20"
            >
              <div className="rounded-lg overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="https://picsum.photos/seed/pbreak2/400/550"
                  alt="Project page 2"
                  className="w-full h-[220px] md:h-[350px] object-cover"
                />
              </div>
            </motion.div>

            {/* Image 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute left-[38%] md:left-[36%] top-[28%] md:top-[30%] w-[180px] md:w-[260px] rotate-[1deg] z-30"
            >
              <div className="rounded-lg overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="https://picsum.photos/seed/pbreak3/400/550"
                  alt="Project page 3"
                  className="w-full h-[200px] md:h-[320px] object-cover"
                />
              </div>
            </motion.div>

            {/* Image 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute left-[55%] md:left-[52%] top-[12%] md:top-[15%] w-[200px] md:w-[300px] rotate-[2deg] z-40"
            >
              <div className="rounded-lg overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="https://picsum.photos/seed/pbreak4/400/550"
                  alt="Project page 4"
                  className="w-full h-[220px] md:h-[350px] object-cover"
                />
              </div>
            </motion.div>

            {/* Image 5 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute right-[2%] md:right-[5%] top-[0%] md:top-[5%] w-[160px] md:w-[240px] rotate-[4deg] z-50"
            >
              <div className="rounded-lg overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="https://picsum.photos/seed/pbreak5/400/550"
                  alt="Project page 5"
                  className="w-full h-[180px] md:h-[300px] object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* CORE VALUES */}

      <div className="mb-48">

        <div className="mb-20">

          <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block mb-4">
            — Studio Principles
          </span>

          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.9]">
            What Drives
            <br />
            Every Project
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {[
            {
              title: 'STRUCTURAL TRUTH',
              desc: 'Design should reveal the underlying logic of a brand rather than obscuring it with unnecessary ornamentation.',
            },
            {
              title: 'DIGITAL PERMANENCE',
              desc: 'Building experiences that feel as solid and considered as physical architecture.',
            },
            {
              title: 'RHYTHMIC SYSTEMS',
              desc: 'Leveraging typography and grids to create a visual pulse that guides the user.',
            },
            {
              title: 'FUTURE ARTIFACTS',
              desc: 'Creating work today that will hold its integrity long into the next decade.',
            },
          ].map((item, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-studio-border
        bg-white
        p-10
        min-h-[280px]
        hover:-translate-y-2
        transition-all
        duration-500
        "
            >

              {/* NUMBER */}

              <span className="
          absolute
          top-8
          right-8
          font-display
          text-6xl
          text-studio-text/5
          leading-none
        ">
                0{i + 1}
              </span>

              {/* SMALL LABEL */}

              <span className="
          text-brand-accent
          font-mono
          uppercase
          tracking-[0.3em]
          text-[10px]
          block
          mb-8
        ">
                Principle
              </span>

              {/* TITLE */}

              <h3 className="
          font-display
          text-3xl
          md:text-4xl
          uppercase
          leading-[0.95]
          mb-6
        ">
                {item.title}
              </h3>

              {/* DESC */}

              <p className="
          text-studio-text/60
          leading-relaxed
          max-w-sm
        ">
                {item.desc}
              </p>

              {/* HOVER BAR */}

              <div className="
          absolute
          bottom-0
          left-0
          h-[4px]
          w-0
          bg-brand-accent
          transition-all
          duration-500
          group-hover:w-full
        " />

            </motion.div>

          ))}

        </div>

      </div>

      {/* FOOTER */}

      <div className="border-t border-studio-text pt-24">

        <div className="flex flex-col md:flex-row justify-between items-start gap-12">

          {/* LOCATION */}

          <div className="space-y-4">

            <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block">

              Location

            </span>

            <span className="text-2xl font-display font-bold uppercase text-studio-text">

              Lisbon, Portugal — Timezone UTC+1

            </span>

          </div>

          {/* ESTABLISHED */}

          <div className="space-y-4">

            <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block">

              Established

            </span>

            <span className="text-2xl font-display font-bold uppercase text-studio-text">

              MMXVI — Tenured Practice

            </span>

          </div>

          {/* BUTTON */}

          <button
            onClick={() => {

              setCurrentView?.('home');

              setTimeout(() => {

                const el =
                  document.getElementById(
                    'contact'
                  );

                el?.scrollIntoView({
                  behavior: 'smooth',
                });

              }, 100);

            }}
            className="px-10 py-5 bg-studio-text text-white font-bold uppercase tracking-widest text-[10px] hover:bg-brand-accent transition-colors"
          >

            Start a Collaboration

          </button>

        </div>

      </div>

    </section>
  );
}