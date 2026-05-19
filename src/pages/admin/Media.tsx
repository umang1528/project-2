import { motion } from 'motion/react';
import { ImageIcon, Video, Layers } from 'lucide-react';
import { PageContainer } from '../../components/admin/PageContainer';

const assets = [
  { title: 'Hero Illustration', type: 'Image' },
  { title: 'Motion Reel', type: 'Video' },
  { title: 'Texture Pack', type: 'Asset' },
  { title: 'Prototype Scene', type: 'Frame' },
];

export function Media() {
  return (
    <PageContainer
      title="Media"
      subtitle="A premium collection of visual assets, motion libraries and cinematic content for portfolio delivery."
    >
      <div className="grid gap-5 xl:grid-cols-2">
        {assets.map((asset) => (
          <motion.div
            key={asset.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 via-violet-500 to-pink-500 text-white">
                {asset.type === 'Video' ? <Video size={22} /> : <ImageIcon size={22} />}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{asset.title}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.35em] text-white/40">{asset.type}</p>
              </div>
            </div>
            <div className="mt-6 rounded-3xl bg-black/40 p-4 text-sm text-white/70 transition group-hover:bg-white/5">
              Quick preview and version control for every media asset.
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/40">Media library</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Centralized asset board</h2>
          </div>
          <div className="rounded-2xl bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.35em] text-white/60">45 items</div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-4 text-white">
            <div className="flex items-center gap-3 text-sm text-white/60">
              <Layers size={16} />
              <span>Version control on every file.</span>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/40 p-4 text-white">
            <div className="flex items-center gap-3 text-sm text-white/60">
              <Layers size={16} />
              <span>Optimized delivery for responsive previews.</span>
            </div>
          </div>
        </div>
      </motion.div>
    </PageContainer>
  );
}
