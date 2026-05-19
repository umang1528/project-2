import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { PageContainer } from '../../components/admin/PageContainer';

export function Settings() {
  return (
    <PageContainer
      title="Settings"
      subtitle="Fine-tune the admin dashboard with security controls, system preferences and interface behavior settings."
    >
      <div className="grid gap-5 xl:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-accent via-orange-500 to-red-500 text-white">
              <ShieldCheck size={22} />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/40">Security</p>
              <h3 className="mt-3 text-xl font-semibold text-white">Guardrails</h3>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-white/70">
            <div className="rounded-3xl bg-black/40 p-4">
              <p className="font-semibold text-white">Session timeout</p>
              <p className="mt-1 text-sm">Auto sign-out after 12 minutes of inactivity.</p>
            </div>
            <div className="rounded-3xl bg-black/40 p-4">
              <p className="font-semibold text-white">MFA required</p>
              <p className="mt-1 text-sm">Two-factor authentication enabled for all admins.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 via-cyan-500 to-teal-500 text-white">
              <SlidersHorizontal size={22} />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/40">Preferences</p>
              <h3 className="mt-3 text-xl font-semibold text-white">Interface</h3>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-white/70">
            {[
              'Enable motion transitions',
              'Compact sidebar layout',
              'Auto theme sync',
            ].map((option) => (
              <div key={option} className="rounded-3xl bg-black/40 p-4">
                <p className="font-semibold text-white">{option}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="mt-5 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/40">Interface</p>
            <h3 className="mt-3 text-xl font-semibold text-white">Personalization</h3>
          </div>
          <Sparkles size={24} className="text-white/70" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {['Fluid layout', 'Glass transparency', 'Focused type scale', 'Soft shadows'].map((item) => (
            <div key={item} className="rounded-3xl bg-black/40 p-4 text-white/70">{item}</div>
          ))}
        </div>
      </motion.div>
    </PageContainer>
  );
}
