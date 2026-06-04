import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  currentView?: string;
  setCurrentView?: (view: any) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export function Navbar({ isMenuOpen, setIsMenuOpen }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const isActive = (path: string) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  const navigateToAdmin = () => {
    setIsMenuOpen(false);
    navigate('/admin/dashboard');
  };


  return (
<nav className="fixed top-0 left-0 right-0 z-200 px-6 py-3 bg-white/20 backdrop-blur-xl shadow-lg border-b border-white/10">
  <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavigate('/')}
        >
          <div className="w-10 h-10 rounded-lg bg-studio-text flex items-center justify-center transition-colors duration-500 group-hover:bg-brand-accent">
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
             onClick={() => handleNavigate('/')}
             className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${isActive('/') ? 'text-brand-accent' : 'text-studio-text/40 hover:text-studio-text'}`}
          >
            HOME
          </button>
          <button
             onClick={() => handleNavigate('/projects')}
             className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${isActive('/projects') ? 'text-brand-accent' : 'text-studio-text/40 hover:text-studio-text'}`}
          >
            PROJECT
          </button>
               <button
             onClick={() => handleNavigate('/education')}
             className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${isActive('/education') ? 'text-brand-accent' : 'text-studio-text/40 hover:text-studio-text'}`}
          >
            Education
          </button>
          <button
             onClick={() => handleNavigate('/about')}
             className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${isActive('/about') ? 'text-brand-accent' : 'text-studio-text/40 hover:text-studio-text'}`}
          >
            About
          </button>
     


          {/* ADMIN LOGIN */}
          <motion.button
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.06,
              boxShadow: '0px 0px 24px rgba(0,0,0,0.35)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25 }}

            onClick={navigateToAdmin}
            className="bg-black text-white px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all border border-white/10"
          >
            Login
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
          <button onClick={() => handleNavigate('/')} className="font-display text-4xl font-bold tracking-tighter hover:text-brand-accent">HOME</button>
          <button onClick={() => handleNavigate('/projects')} className="font-display text-4xl font-bold tracking-tighter hover:text-brand-accent">PROJECT</button>
          <button onClick={() => handleNavigate('/education')} className="font-display text-4xl font-bold tracking-tighter hover:text-brand-accent">EDUCATION</button>
          <button onClick={() => handleNavigate('/about')} className="font-display text-4xl font-bold tracking-tighter hover:text-brand-accent">ABOUT</button>

          <motion.button
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={navigateToAdmin}
            className="mt-4 bg-black text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all border border-studio-border"
          >
            Login
          </motion.button>
        </motion.div>
      )}
    </nav>
  );
}

