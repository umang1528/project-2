import { motion } from 'motion/react';
import { Github, Twitter, Instagram, Mail, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="py-48 px-6 max-w-[1400px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-start">
        <div className="space-y-12">
          <div className="space-y-8">
            <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block">— PROJECT DISPATCH</span>
            <h2 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter uppercase">
              HAVE A <br /> NEW <span className="italic text-studio-text/40">VISION?</span>
            </h2>
          </div>
          
          <div className="space-y-4">
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-studio-text/40">Direct Communication</span>
             <a href="mailto:hello@visions.haus" className="block text-4xl md:text-5xl font-display font-bold hover:text-brand-accent transition-colors">
               HELLO@VISIONS.HAUS
             </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 pt-12 md:pt-24 border-t border-studio-border">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest">Network</span>
            <div className="flex gap-4">
              {[
                { Icon: Github, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Instagram, href: '#' },
                { Icon: Mail, href: '#' }
              ].map((social, i) => (
                <motion.a 
                  key={i} 
                  href={social.href} 
                  whileHover={{ scale: 1.1, backgroundColor: 'var(--color-brand-accent)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 border border-studio-border flex items-center justify-center text-studio-text/40 hover:text-white hover:border-brand-accent transition-colors duration-300"
                >
                  <social.Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest">Office</span>
            <div className="flex flex-col gap-2 font-display font-medium text-studio-text/40 text-sm">
              <p>Rua da Prata, 80</p>
              <p>1100-415 Lisboa</p>
              <p>Portugal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-48 pt-12 border-t border-studio-border flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-studio-text flex items-center justify-center">
            <span className="font-display font-bold text-white text-xs">V</span>
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
          Back to Top <ArrowRight className="-rotate-90 transition-transform group-hover:-translate-y-1" size={14} />
        </button>
      </div>
    </footer>
  );
}
