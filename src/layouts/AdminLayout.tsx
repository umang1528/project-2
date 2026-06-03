import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useSidebarStore } from '../store/useSidebarStore';
import { AdminSidebar } from '../components/admin/Sidebar';
import { AdminTopbar } from '../components/admin/Navbar';

export function AdminLayout() {
  const location = useLocation();
  const theme = useSidebarStore((state) => state.theme);

  const routeKey = useMemo(() => location.pathname, [location.pathname]);

  return (
    <div className={`min-h-screen text-white flex overflow-hidden ${theme === 'dark' ? 'bg-[#05070f]' : 'bg-slate-100 text-slate-950'}`}>
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
          <AdminTopbar />
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={routeKey}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-[calc(100vh-88px)]"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

