import { motion } from 'motion/react';
import { LineChart, Activity, Percent, Sparkles } from 'lucide-react';
import { PageContainer } from '../../components/admin/PageContainer';

export function Analytics() {
  return (
    <PageContainer
      title="Analytics"
      subtitle="Deep metrics and cinematic reporting for the creative ecosystem. Track attention, conversions and engagement with premium clarity."
    >
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/40">Insights</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Conversion velocity</h2>
            </div>
            <LineChart size={24} className="text-white/70" />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { value: '82%', label: 'Engagement', icon: Sparkles },
              { value: '14.2K', label: 'Views', icon: Activity },
              { value: '5.4%', label: 'Conversion', icon: Percent },
            ].map((metric) => (
              <div key={metric.label} className="rounded-3xl bg-black/40 p-4 text-white">
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <metric.icon size={18} />
                  <span>{metric.label}</span>
                </div>
                <p className="mt-4 text-3xl font-semibold text-white">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 h-[320px] rounded-[28px] bg-black/40 p-6 text-white/60">
            <div className="h-full rounded-[28px] bg-gradient-to-b from-brand-accent/20 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="space-y-5"
        >
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/40">Pulse</p>
                <h3 className="mt-3 text-xl font-semibold text-white">Traffic breakdown</h3>
              </div>
              <div className="rounded-2xl bg-black/40 px-3 py-2 text-xs uppercase tracking-[0.35em] text-white/60">Live</div>
            </div>
            <div className="mt-6 space-y-4 text-sm text-white/70">
              <p>Organic performance is accelerating with new campaign adoption.</p>
              <p>Referral reach is stable while conversion quality improves.</p>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl">
            <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/40">Action plan</p>
            <h3 className="mt-3 text-xl font-semibold text-white">What to optimize</h3>
            <ul className="mt-6 space-y-3 text-white/70">
              {['A/B test landing visuals', 'Refine motion storytelling', 'Optimize media asset delivery'].map((item) => (
                <li key={item} className="rounded-3xl bg-black/40 px-4 py-3">{item}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
}
