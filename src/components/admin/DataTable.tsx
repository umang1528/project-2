import { motion } from 'motion/react';

const projects = [
  { name: 'Nova UI Toolkit', stage: 'Design', owner: 'Avery', status: 'Live' },
  { name: 'Arc Motion Suite', stage: 'Production', owner: 'Sage', status: 'Review' },
  { name: 'Obsidian Media', stage: 'Launch', owner: 'Iris', status: 'Pending' },
  { name: 'Flux Portfolio', stage: 'Optimization', owner: 'Noa', status: 'Live' },
];

export function DataTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/40">Recent projects</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Live portfolio table</h2>
        </div>

        <div className="rounded-2xl bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.35em] text-white/60">
          Updated 18 min ago
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 bg-white/5 px-5 py-4 text-[10px] uppercase tracking-[0.35em] text-white/40">
          <span>Project</span>
          <span>Stage</span>
          <span>Owner</span>
          <span>Status</span>
        </div>

        <div className="divide-y divide-white/10">
          {projects.map((project) => (
            <div key={project.name} className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-5 py-4 text-sm text-white/70 hover:bg-white/5 transition">
              <span>{project.name}</span>
              <span>{project.stage}</span>
              <span>{project.owner}</span>
              <span className="font-semibold text-white">{project.status}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
