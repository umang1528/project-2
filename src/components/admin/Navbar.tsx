import { useMemo, useRef, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Search, Moon, SunMedium, Menu, UserCircle2, ChevronRight, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { useSidebarStore } from '../../store/useSidebarStore';
import { useAuthStore } from '../../store/useAuthStore';

const pageMap: Record<string, { label: string; section: string }> = {
  '/admin/dashboard': { label: 'Dashboard', section: 'Admin' },
  '/admin/projects': { label: 'Projects', section: 'Admin' },
  '/admin/media': { label: 'Media', section: 'Admin' },
  '/admin/themes': { label: 'Themes', section: 'Admin' },
  '/admin/analytics': { label: 'Analytics', section: 'Admin' },
  '/admin/settings': { label: 'Settings', section: 'Admin' },
};

export function AdminTopbar() {
  const location = useLocation();
  const { theme, toggleTheme, toggleMobileOpen } = useSidebarStore();
  const navigate = useNavigate();

  const logout = useAuthStore((s) => s.logout);
  const refreshAuth = useAuthStore((s) => s.refreshAuth);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const page = useMemo(() => pageMap[location.pathname] ?? { label: 'Overview', section: 'Admin' }, [location.pathname]);

  useEffect(() => {
    function onOutside(e: MouseEvent | TouchEvent) {
      if (!dropdownRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', onOutside);
    document.addEventListener('touchstart', onOutside);

    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('touchstart', onOutside);
    };
  }, []);

  async function handleLogout() {
    try {
      await logout();
    } catch (err) {
      // swallow - best effort logout
    }
    try {
      window.localStorage.removeItem('accessToken');
    } catch {}
    setOpen(false);
    navigate('/');
    try {
      await refreshAuth();
    } catch {}
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4 md:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.35em] text-white/40">
            <span>{page.section}</span>
            <ChevronRight size={12} />
            <span className="text-white">{page.label}</span>
          </div>
          <h1 className="mt-3 text-3xl font-display font-semibold tracking-tight text-white sm:text-4xl">
            {page.label}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden md:flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <Search size={16} className="text-white/50" />
            <input
              type="search"
              placeholder="Search portfolio"
              className="w-52 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
            />
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={toggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 transition"
          >
            {theme === 'dark' ? <SunMedium size={18} /> : <Moon size={18} />}
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={toggleMobileOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 md:hidden"
          >
            <Menu size={18} />
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80"
          >
            <Bell size={18} />
          </motion.button>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="hidden sm:inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white hover:bg-white/10 transition"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-accent via-orange-500 to-red-500 text-white shadow-[0_20px_60px_rgba(255,62,0,0.16)]">
                <UserCircle2 size={20} />
              </div>
              <div className="min-w-0 text-left">
                <div className="text-[10px] uppercase tracking-[0.32em] text-white/40">Admin</div>
                <div className="font-semibold">Echo Nova</div>
              </div>
              <motion.div
                className="ml-2 flex items-center"
                animate={{ rotate: open ? 90 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              >
                <ChevronRight size={14} />
              </motion.div>
            </button>

            {/* Mobile compact avatar */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="sm:hidden inline-flex items-center justify-center h-11 w-11 rounded-2xl bg-gradient-to-br from-brand-accent via-orange-500 to-red-500 text-white shadow-[0_20px_60px_rgba(255,62,0,0.16)] hover:opacity-95 transition"
              aria-label="Open profile"
            >
              <UserCircle2 size={20} />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: -6 }}
              animate={open ? { opacity: 1, scale: 1, y: 4, filter: 'blur(0px)' } : { opacity: 0, scale: 0.98, y: -6, filter: 'blur(2px)' }}
              transition={{ duration: 0.18 }}
              className={`absolute right-0 z-50 mt-2 w-56 origin-top-right ${open ? '' : 'pointer-events-none'}`}
            >
              <div className="rounded-3xl bg-[#0F172A]/95 backdrop-blur-2xl border border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.08)] p-3">
                <div className="mb-2 px-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-accent via-orange-500 to-red-500 text-white">
                      <UserCircle2 size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">Echo Nova</div>
                      <div className="text-[12px] text-white/40">Administrator</div>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm text-red-400 hover:bg-red-600/10 transition"
                  >
                    <LogOut size={16} />
                    <span className="font-medium">Logout</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
