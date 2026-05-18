import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Zap, Monitor, Box, Activity, Type, Cpu, Shapes, Palette, Compass, PenTool } from 'lucide-react';
import { Project, ViewType } from '../types';
import { PORTFOLIO_ITEMS } from '../constants';

interface HomeViewProps {
  setSelectedProject: (project: Project) => void;
  setCurrentView: (view: ViewType) => void;
}

export function HomeView({ setSelectedProject, setCurrentView }: HomeViewProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-24 overflow-hidden">
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 text-center px-6"
        >
          <div className="mb-12 inline-flex items-center gap-4 px-6 py-2 border border-studio-border bg-white/50 backdrop-blur-md">
            <div className="w-2 h-2 rounded-none bg-brand-accent animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-studio-text/60">Independent GRAPHIC DESIGNER</span>
          </div>
          
          <h1 className="font-display text-[15vw] md:text-[14rem] font-bold leading-[0.75] tracking-tighter uppercase">
            VISI<span className="text-brand-accent">O</span>NS
          </h1>
          
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="flex flex-col gap-2 text-left">
              <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest">Specialization</span>
              <p className="text-sm font-display font-medium text-studio-text uppercase tracking-tight">GRAPHIC • PACKAGING • VISUALS</p>
            </div>
            <div className="h-[1px] w-12 bg-studio-border hidden md:block" />
            <div className="flex flex-col gap-2 text-left">
              <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest">Aesthetic</span>
              <p className="text-sm font-display font-medium text-studio-text uppercase tracking-tight">Brutalism • Swiss • Modern</p>
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-studio-border/30 -translate-y-1/2" />
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-studio-border/30 -translate-x-1/2" />
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section id="projects" className="py-32 px-6 max-w-[1400px] mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-6">
            <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block">— CASE STUDIES</span>
            <h2 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter uppercase">
              SELECTED <br /> <span className="italic text-studio-text/20">WORKS.</span>
            </h2>
          </div>
          <button 
             onClick={() => setCurrentView('archives')}
             className="group flex items-center gap-6"
          >
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-studio-text/40 group-hover:text-studio-text transition-colors">Survey the Archive</span>
             <div className="w-16 h-16 border border-studio-border flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-500">
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
             </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-studio-border border border-studio-border">
          {PORTFOLIO_ITEMS.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={`bg-white group cursor-zoom-in overflow-hidden relative ${item.size}`}
              onClick={() => setSelectedProject(item)}
            >
              <div className="absolute inset-0 z-10 p-12 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <span className="text-[10px] font-mono font-bold text-white bg-brand-accent px-3 py-1 uppercase tracking-widest leading-none">№ 0{index + 1}</span>
                  <div className="flex gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[8px] font-mono font-bold text-black bg-white px-2 py-1 uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                  <span className="text-white font-mono font-bold text-[10px] uppercase tracking-widest mb-4 block opacity-0 group-hover:opacity-100 transition-opacity delay-100">{item.category}</span>
                  <h3 className="text-white text-4xl md:text-6xl font-display font-bold leading-none tracking-tighter uppercase opacity-0 group-hover:opacity-100 transition-opacity delay-200">{item.title}</h3>
                </div>
              </div>

              <div className="relative h-full overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-studio-text/0 group-hover:bg-studio-text/40 transition-colors duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Competencies / Skills Section */}
      <section id="competencies" className="py-48 px-6 max-w-[1400px] mx-auto bg-studio-text text-white">
        <div className="grid lg:grid-cols-12 gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-12"
          >
            <div className="space-y-8">
              <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block">— TECHNICAL ARSENAL</span>
              <h2 className="text-6xl md:text-[7rem] font-display font-bold leading-[0.8] tracking-tighter uppercase mb-8">
                CORE <br /> <span className="italic text-white/20">LOGIC.</span>
              </h2>
              <p className="text-white/40 text-xl font-medium leading-relaxed max-w-sm">
                A rigorous suite of technical capabilities deployed across digital and physical touchpoints.
              </p>
            </div>

            <div className="flex items-center gap-6 group cursor-pointer">
               <div className="w-12 h-12 border border-white/20 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-500">
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </div>
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">Download Technical Résumé</span>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {[
              { name: 'Branding', icon: Zap },
              { name: 'UI/UX', icon: Monitor },
              { name: '3D Modeling', icon: Box },
              { name: 'Typography', icon: Type },
              { name: 'Motion Graphics', icon: Activity },
              { name: 'Illustration', icon: PenTool },
              { name: 'Brand Strategy', icon: Cpu },
              { name: 'Iconography', icon: Shapes },
              { name: 'Visual Design', icon: Palette },
              { name: 'Art Direction', icon: Compass }
            ].map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-studio-text p-12 group hover:bg-brand-accent transition-colors duration-500"
              >
                <skill.icon size={32} className="text-brand-accent group-hover:text-white transition-colors duration-500 mb-8" />
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-2">{skill.name}</h3>
                <div className="h-[1px] w-8 bg-white/20 group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section id="about" className="py-48 px-6 max-w-[1400px] mx-auto border-t border-studio-border">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square bg-white border border-studio-border p-3"
          >
             <img 
               src="https://images.unsplash.com/photo-1554446422-d05db23719d2?auto=format&fit=crop&q=80&w=1000" 
               alt="Philosophy"
               className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000"
               referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 border-[20px] border-white pointer-events-none" />
          </motion.div>
          
          <div className="space-y-12">
            <div className="space-y-8">
              <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block">— THE PHILOSOPHY</span>
              <h2 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter uppercase">
                DESIGN AS <br /> <span className="italic text-studio-text/40">ARCHITECTURAL</span> <br /> TRUTH.
              </h2>
              <p className="text-studio-text/60 text-xl font-medium leading-relaxed max-w-xl">
                We believe that every visual element must serve a structural purpose. Our practice is rooted in the intersection of digital fluidity and brutalist permanence.
              </p>
            </div>
            
            <button 
              onClick={() => {
                setCurrentView('about');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="group flex items-center gap-6"
            >
               <div className="w-16 h-16 border border-studio-border flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-500">
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
               </div>
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-studio-text/40 group-hover:text-studio-text transition-colors">Read the Manifesto</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
