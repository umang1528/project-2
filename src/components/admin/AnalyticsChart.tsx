import { motion } from 'motion/react';

const chartPoints = [
  { label: 'Jan', value: 56 },
  { label: 'Feb', value: 72 },
  { label: 'Mar', value: 64 },
  { label: 'Apr', value: 88 },
  { label: 'May', value: 76 },
  { label: 'Jun', value: 92 },
  { label: 'Jul', value: 84 },
];

export function AnalyticsChart() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/40">Performance</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Portfolio analytics</h2>
        </div>
        <div className="rounded-2xl bg-black/40 px-3 py-2 text-xs uppercase tracking-[0.35em] text-white/70">
          30d view
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[auto_1fr] lg:items-end">
        <div className="space-y-3">
          <div className="rounded-3xl bg-white/5 p-4 text-sm text-white/60">Views up 28% month over month.</div>
          <div className="rounded-3xl bg-white/5 p-4 text-sm text-white/60">Revenue trend remains steady with premium campaigns.</div>
        </div>

        <div className="flex items-end gap-3 overflow-hidden rounded-[28px] bg-black/40 p-4">
          {chartPoints.map((point, index) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="flex-1"
            >
              <div className="h-40 rounded-full bg-white/5 relative overflow-hidden">
                <div
                  className="absolute inset-x-0 bottom-0 rounded-full bg-gradient-to-t from-brand-accent via-orange-500 to-white"
                  style={{ height: `${point.value}%` }}
                />
              </div>
              <p className="mt-3 text-center text-xs uppercase tracking-[0.35em] text-white/50">{point.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
