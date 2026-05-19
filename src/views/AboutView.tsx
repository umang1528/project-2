import { motion } from 'motion/react';

interface AboutViewProps {
  setCurrentView?: (view: 'home') => void;
}

export function AboutView({ setCurrentView }: AboutViewProps) {
  return (
    <section className="pt-48 pb-32 px-6 max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-48"
      >
        <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block">— OUR CORE</span>
        <h1 className="font-display text-7xl md:text-[12rem] font-bold leading-[0.8] tracking-tighter uppercase mb-24">
          THE <br /> STUDIO <br /> <span className="text-studio-text/20">ETHOS.</span>
        </h1>
        
        <div className="grid md:grid-cols-2 gap-24 items-start">
           <p className="text-studio-text text-3xl md:text-5xl font-display font-medium leading-[1.1] tracking-tight uppercase">
             WE DON'T JUST DECORATE SURFACES—WE ENGINEER PERCEPTIONS THROUGH ARCHITECTURAL DESIGN SYSTEMS.
           </p>
           <div className="space-y-8 text-studio-text/60 text-xl font-medium leading-relaxed">
              <p>
                Visions Portfolio is a Lisbon-based creative collective specializing in the development of rigorous brand identities and digital experiences. Our approach is defined by a surgical attention to detail and a commitment to visual permanence.
              </p>
              <p>
                By merging the principles of Swiss modernism with contemporary technological artifacts, we create systems that are both timeless and forward-looking.
              </p>
           </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-studio-border bg-studio-border mb-48">
        {[
          { title: 'STRUCTURAL TRUTH', desc: 'Design should reveal the underlying logic of a brand rather than obscuring it with unnecessary ornamentation.' },
          { title: 'DIGITAL PERMANENCE', desc: 'Building experiences that feel as solid and considered as physical architecture, even in a fluid digital landscape.' },
          { title: 'RHYTHMIC SYSTEMS', desc: 'Leveraging typography and grids to create a visual pulse that guides the user with clarity and intention.' },
          { title: 'FUTURE ARTIFACTS', desc: 'Creating work today that will hold its integrity and aesthetic value long into the next decade.' }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-12 space-y-6"
          >
            <span className="text-brand-accent font-mono font-bold text-[10px] tracking-[0.3em]">0{i+1}.</span>
            <h3 className="font-display text-3xl font-bold uppercase tracking-tight">{item.title}</h3>
            <p className="text-studio-text/60 font-medium leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-studio-text pt-24">
         <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-4">
              <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block">Location</span>
              <span className="text-2xl font-display font-bold uppercase text-studio-text">Lisbon, Portugal — Timezone UTC+1</span>
            </div>
            <div className="space-y-4">
              <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block">Established</span>
              <span className="text-2xl font-display font-bold uppercase text-studio-text">MMXVI — Tenured Practice</span>
            </div>
            <button 
              onClick={() => {
                setCurrentView?.('home');
                setTimeout(() => {
                   const el = document.getElementById('contact');
                   el?.scrollIntoView({ behavior: 'smooth' });
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
