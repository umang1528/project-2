import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ViewType } from '../../types';

interface NavbarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export function Navbar({ currentView, setCurrentView, isMenuOpen, setIsMenuOpen }: NavbarProps) {
  const navigate = (view: ViewType) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
<nav className="fixed top-0 left-0 right-0 z-50 px-6 py-3 bg-white/20 backdrop-blur-xl shadow-lg border-b border-white/10">
  <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate('home')}
        >
          <div className="w-10 h-10 bg-studio-text flex items-center justify-center transition-colors duration-500 group-hover:bg-brand-accent">
            <span className="font-display font-bold text-white text-xl">U</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl font-bold tracking-tighter leading-none">UMANG</span>
            <span className="text-[8px] tracking-[0.5em] text-studio-text/40 font-bold uppercase">Creative Haus</span>
          </div>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <button
             onClick={() => navigate('home')}
             className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${currentView === 'home' ? 'text-brand-accent' : 'text-studio-text/40 hover:text-studio-text'}`}
          >
            Works
          </button>
          <button
             onClick={() => navigate('archives')}
             className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${currentView === 'archives' ? 'text-brand-accent' : 'text-studio-text/40 hover:text-studio-text'}`}
          >
            Index
          </button>
          <button
             onClick={() => navigate('about')}
             className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${currentView === 'about' ? 'text-brand-accent' : 'text-studio-text/40 hover:text-studio-text'}`}
          >
            About
          </button>
          <button
             onClick={() => navigate('education')}
             className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${currentView === 'education' ? 'text-brand-accent' : 'text-studio-text/40 hover:text-studio-text'}`}
          >
            Origins
          </button>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-studio-text text-white px-8 py-3 rounded-none text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-accent transition-all"
          >
            Briefing
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-studio-text"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-24 left-6 right-6 bg-white border border-studio-border p-12 flex flex-col gap-8 text-left"
        >
          <button onClick={() => navigate('home')} className="font-display text-4xl font-bold tracking-tighter hover:text-brand-accent">WORKS</button>
          <button onClick={() => navigate('archives')} className="font-display text-4xl font-bold tracking-tighter hover:text-brand-accent">INDEX</button>
          <button onClick={() => navigate('education')} className="font-display text-4xl font-bold tracking-tighter hover:text-brand-accent">ORIGINS</button>
          <button onClick={() => navigate('about')} className="font-display text-4xl font-bold tracking-tighter hover:text-brand-accent">ABOUT</button>
        </motion.div>
      )}
    </nav>
  );
}
