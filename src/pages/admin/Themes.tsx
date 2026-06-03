import { motion } from 'motion/react';
import { MoonStar, Palette, Sparkles } from 'lucide-react';
import { PageContainer } from '../../components/admin/PageContainer';

export function Themes() {
  return (
    <PageContainer
      title="Themes"
      subtitle="Configure cinematic palettes, glassmorphism skins and premium visual modes for every admin surface."
    >
      <div className="grid gap-5 xl:grid-cols-3">
        {[
          { title: 'Night Pulse', description: 'Dark mode with electric highlights.', icon: MoonStar },
          { title: 'Studio Glow', description: 'Soft glass and polished gradients.', icon: Palette },
          { title: 'Vivid Flux', description: 'High contrast, bold accent motion.', icon: Sparkles },
        ].map((theme) => (
          <motion.div
            key={theme.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-accent via-orange-500 to-red-500 text-white">
                <theme.icon size={22} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{theme.title}</h3>
                <p className="mt-2 text-sm text-white/60">{theme.description}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {['Activate', 'Preview', 'Edit'].map((label) => (
                <button
                  key={label}
                  className="rounded-3xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/70 transition hover:bg-white/5"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </PageContainer>
  );
}
