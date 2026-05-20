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
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mb-48"
      >

        <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block text-center">

          — OUR CORE

        </span>

        {/* CENTER TYPEWRITER HEADING */}

        <div className="mb-24 flex justify-center text-center">

          <div className="font-display text-7xl md:text-[12rem] font-bold leading-[0.8] tracking-tighter uppercase min-h-[220px]">

            <TypeAnimation
              sequence={[
                'THE STUDIO ETHOS.',
                2500,
                '',
              ]}
              wrapper="div"
              speed={20}
              repeat={Infinity}
              cursor={true}
            />

          </div>

        </div>

        {/* CONTENT + IMAGE */}

        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-24 items-start">

          {/* LEFT CONTENT */}

          <div>

            {/* NORMAL TEXT */}

            <p className="text-studio-text text-3xl md:text-5xl font-display font-medium leading-[1.1] tracking-tight uppercase">

              WE DON'T JUST DECORATE SURFACES—WE ENGINEER PERCEPTIONS THROUGH ARCHITECTURAL DESIGN SYSTEMS.

            </p>

            {/* DESCRIPTION */}

            <div className="mt-12 space-y-8 text-studio-text/60 text-xl font-medium leading-relaxed">

              <p>

                Visions Portfolio is a Lisbon-based creative collective specializing in the development of rigorous brand identities and digital experiences. Our approach is defined by a surgical attention to detail and a commitment to visual permanence.

              </p>

              <p>

                By merging the principles of Swiss modernism with contemporary technological artifacts, we create systems that are both timeless and forward-looking.

              </p>

            </div>

          </div>

          {/* RIGHT IMAGE */}

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.18)]"
          >

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop"
              alt="Studio"
              className="h-[700px] w-full object-cover transition-all duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />

            {/* OVERLAY */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* FLOATING TEXT */}

            <div className="absolute bottom-8 left-8">

              <span className="text-white/60 text-[10px] uppercase tracking-[0.4em] block mb-4">

                Creative Direction

              </span>

              <h3 className="text-white text-4xl font-display font-bold leading-none uppercase">

                Modern <br />

                Visual <br />

                Systems.

              </h3>

            </div>

          </motion.div>

        </div>

      </motion.div>

      {/* CORE VALUES */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-studio-border bg-studio-border mb-48">

        {[
          {
            title: 'STRUCTURAL TRUTH',
            desc: 'Design should reveal the underlying logic of a brand rather than obscuring it with unnecessary ornamentation.',
          },

          {
            title: 'DIGITAL PERMANENCE',
            desc: 'Building experiences that feel as solid and considered as physical architecture, even in a fluid digital landscape.',
          },

          {
            title: 'RHYTHMIC SYSTEMS',
            desc: 'Leveraging typography and grids to create a visual pulse that guides the user with clarity and intention.',
          },

          {
            title: 'FUTURE ARTIFACTS',
            desc: 'Creating work today that will hold its integrity and aesthetic value long into the next decade.',
          },

        ].map((item, i) => (

          <motion.div
            key={i}
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: i * 0.1,
            }}
            className="bg-white p-12 space-y-6"
          >

            <span className="text-brand-accent font-mono font-bold text-[10px] tracking-[0.3em]">

              0{i + 1}.

            </span>

            <h3 className="font-display text-3xl font-bold uppercase tracking-tight">

              {item.title}

            </h3>

            <p className="text-studio-text/60 font-medium leading-relaxed">

              {item.desc}

            </p>

          </motion.div>

        ))}

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