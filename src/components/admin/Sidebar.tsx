import { useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Images, Palette, BarChart3, Settings } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useSidebarStore } from '../../store/useSidebarStore';
import type { AdminSidebarItem, AdminRouteKey } from '../../types/admin';
import { SidebarItem } from './SidebarItem';

const items: AdminSidebarItem[] = [
  { key: 'dashboard', label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { key: 'projects', label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { key: 'projectLocations', label: 'Project Locations', href: '/admin/project-locations', icon: Images },
  {key: 'homepage-carousel', label: 'Homepage Carousel', href: '/admin/homepage-carousel', icon: Images},
  { key: 'media', label: 'Media', href: '/admin/media', icon: Images },
  { key: 'themes', label: 'Themes', href: '/admin/themes', icon: Palette },
  { key: 'analytics', label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { key: 'settings', label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const location = useLocation();
  const { collapsed, toggleCollapsed, mobileOpen, setMobileOpen } = useSidebarStore();

  const activeKey = (items.find((i) => location.pathname.startsWith(i.href))?.key ?? 'dashboard') as AdminRouteKey;

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[55] md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 96 : 280, x: mobileOpen ? 0 : undefined }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className="relative z-[56] hidden md:flex flex-col border-r border-white/10 bg-[#0B0F19]/60 backdrop-blur-xl overflow-hidden"
      >
        <div className="p-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleCollapsed}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-3 flex items-center justify-between"
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/60">ADMIN</span>
            <span className="text-white/80">{collapsed ? '»' : '«'}</span>
          </motion.button>
        </div>

        <div className="px-4 pb-6">
          <div className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/40 mb-3">Navigation</div>
          <nav className="flex flex-col gap-2">
            {items.map((item) => (
              <SidebarItem
                key={item.key}
                item={item}
                collapsed={collapsed}
                isActive={activeKey === item.key}
              />
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/40">Session</div>
            <div className="mt-2 text-2xl font-display font-bold tracking-tighter">PRO</div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -18, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -18, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="fixed top-0 left-0 h-full w-[280px] md:hidden z-[56] border-r border-white/10 bg-[#0B0F19]/80 backdrop-blur-xl overflow-hidden"
          >
            <div className="p-4">
              <button
                type="button"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-3 flex items-center justify-between text-white/80"
                onClick={() => setMobileOpen(false)}
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/60">CLOSE</span>
                <span>✕</span>
              </button>
            </div>

            <div className="px-4 pb-6">
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/40 mb-3">Navigation</div>
              <nav className="flex flex-col gap-2">
                {items.map((item) => (
                  <SidebarItem
                    key={item.key}
                    item={item}
                    collapsed={false}
                    isActive={activeKey === item.key}
                    onSelect={() => setMobileOpen(false)}
                  />
                ))}
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

