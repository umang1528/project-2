import { motion } from 'motion/react';
import { Users, Server, Palette, LayoutGrid } from 'lucide-react';

const Stat = ({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-dark rounded-2xl p-6 border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/40">{label}</div>
          <div className="mt-3 font-display text-4xl font-bold tracking-tight uppercase">{value}</div>
        </div>
        <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
};

export function AdminDashboardPage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <div className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px]">ADMIN / DASHBOARD</div>
        <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter uppercase mt-4">CINEMATIC CONTROL</h1>
      </motion.div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Stat label="Projects" value="04" Icon={Users} />
        <Stat label="Assets" value="27" Icon={Server} />
        <Stat label="Themes" value="03" Icon={Palette} />
        <Stat label="Sections" value="09" Icon={LayoutGrid} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] , delay: 0.08}}
        className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/40">Analytics Preview</div>
        <p className="mt-4 text-studio-text/70 max-w-2xl">
          Architecture scaffold ready: protected layout, cinematic cards, and route transitions.
          Next steps implement stores, CRUD panels, drag reorder, media upload, and the theme engine.
        </p>
      </motion.div>
    </div>
  );
}

