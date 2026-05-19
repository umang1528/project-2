import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string;
  caption: string;
  icon: LucideIcon;
  accent: string;
}

export function DashboardCard({ title, value, caption, icon: Icon, accent }: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/40">{title}</div>
          <div className="mt-4 text-4xl font-semibold tracking-tight text-white">{value}</div>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/5 border border-white/10 text-white">
          <Icon size={24} className={accent} />
        </div>
      </div>

      <div className="mt-4 text-sm text-white/60">{caption}</div>
    </motion.div>
  );
}
