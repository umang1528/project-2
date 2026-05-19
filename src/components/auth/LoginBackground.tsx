import { motion } from 'motion/react';

export function LoginBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#07090f]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,109,87,0.24),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_25%)] blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.08),_transparent_18%),radial-gradient(circle_at_80%_15%,_rgba(248,113,113,0.08),_transparent_14%)]" />

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-[-8rem] top-1/4 h-72 w-72 rounded-full bg-gradient-to-br from-[#ff6d5b]/40 via-transparent to-transparent blur-xl"
      />

      <motion.div
        animate={{ x: [0, 24, 0], y: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute right-[-6rem] top-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-[#38bdf8]/30 via-transparent to-transparent blur-3xl"
      />

      <motion.div
        animate={{ x: [0, -18, 0], y: [0, -18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/3 bottom-20 h-56 w-56 rounded-full bg-gradient-to-br from-[#a78bfa]/30 via-transparent to-transparent blur-3xl"
      />

      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_10%,transparent_12%)] [background-size:48px_48px]" />
    </div>
  );
}
