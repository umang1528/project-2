import { motion } from 'motion/react';
import { Activity, Sparkles, Download, TrendingUp } from 'lucide-react';
import { PageContainer } from '../../components/admin/PageContainer';
import { DashboardCard } from '../../components/admin/DashboardCard';
import { AnalyticsChart } from '../../components/admin/AnalyticsChart';
import { DataTable } from '../../components/admin/DataTable';

const cards = [
  { title: 'Total Projects', value: '28', caption: 'Creative portfolios running live.', icon: Sparkles, accent: 'text-amber-300' },
  { title: 'Portfolio Views', value: '14.2K', caption: 'High-fidelity audience reach.', icon: TrendingUp, accent: 'text-sky-300' },
  { title: 'Downloads', value: '9.8K', caption: 'Premium assets distributed.', icon: Download, accent: 'text-lime-300' },
  { title: 'Revenue', value: '$52.4K', caption: 'Revenue across flagship campaigns.', icon: Activity, accent: 'text-fuchsia-300' },
];

export function Dashboard() {
  return (
    <PageContainer
      title="Dashboard"
      subtitle="A cinematic control room for creative engineering, featuring glassmorphism, premium metrics and motion-driven insights."
    >
      <motion.div className="grid gap-5 xl:grid-cols-4">
        {cards.map((card) => (
          <DashboardCard key={card.title} title={card.title} value={card.value} caption={card.caption} icon={card.icon} accent={card.accent} />
        ))}
      </motion.div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr] xl:items-start">
        <div className="space-y-5">
          <AnalyticsChart />
          <DataTable />
        </div>

        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/40">Quick actions</p>
                <h3 className="mt-3 text-xl font-semibold text-white">Control center</h3>
              </div>
              <div className="rounded-2xl bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.35em] text-white/60">Pro</div>
            </div>

            <div className="mt-6 space-y-3">
              {['Publish project', 'Push theme update', 'Review analytics', 'Export assets'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/5"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl"
          >
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/40">Activity</p>
              <h3 className="mt-3 text-xl font-semibold text-white">Timeline</h3>
            </div>

            <div className="mt-6 space-y-4">
              {[
                { time: '08:15', action: 'New theme asset uploaded', detail: 'Design system updated.' },
                { time: '10:30', action: 'Campaign analytics reviewed', detail: 'Engagement up 18%.' },
                { time: '13:20', action: 'Client feedback added', detail: 'Media grid refined.' },
                { time: '16:40', action: 'Release schedule planned', detail: 'Launch window set.' },
              ].map((item) => (
                <div key={item.time} className="rounded-3xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center justify-between gap-3 text-sm text-white/40">
                    <span>{item.time}</span>
                    <span className="text-xs uppercase tracking-[0.35em] text-white/50">Live</span>
                  </div>
                  <p className="mt-3 font-semibold text-white">{item.action}</p>
                  <p className="mt-2 text-sm text-white/60">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
}
