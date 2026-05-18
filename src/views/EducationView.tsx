import { motion } from 'motion/react';
import { EDUCATION_DATA } from '../constants';
import { Download } from 'lucide-react';
import ResumePDF from '../assets/CV pdf/Umang resume.pdf';


export function EducationView() {
  return (
    <section className="pt-48 pb-32 px-6 max-w-[1000px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-32 text-left"
      >
        <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">— FOUNDATION</span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <h1 className="font-display text-7xl md:text-9xl font-bold leading-none tracking-tighter mb-8">
              EDUCATION.
            </h1>
            <p className="text-studio-text/60 text-xl font-medium leading-relaxed">
              Rigorous exploration of design history, technical craft, and future-forward theory.
            </p>
          </div>

          <motion.a
            href={ResumePDF}
            target="_blank"
            download
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-shrink-0 items-center gap-6 group"
          >
            <div className="w-16 h-16 border border-studio-border flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-500">
              <Download
                size={24}
                className="group-hover:translate-y-1 transition-transform text-studio-text group-hover:text-white"
              />
            </div>

            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-studio-text/40 group-hover:text-studio-text transition-colors block">
                Curriculum Vitae
              </span>

              <span className="text-lg font-mono font-bold uppercase text-studio-text">
                {/* PDF Transcript [2.4MB] */}
              </span>
            </div>
          </motion.a>
        </div>
      </motion.div>

      <div className="space-y-4 pt-12 border-t border-studio-border">
        {EDUCATION_DATA.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-[200px_1fr] gap-12 py-12 border-b border-studio-border items-start"
          >
            <span className="font-mono text-sm font-bold text-brand-accent">{item.year}</span>
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-4xl font-bold tracking-tight mb-2">{item.title}</h2>
                <p className="font-mono uppercase tracking-widest text-[10px] text-studio-text/40">{item.institution}</p>
              </div>
              <p className="text-studio-text/60 font-medium leading-relaxed text-lg max-w-2xl">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-studio-text/5 text-[9px] font-bold uppercase tracking-widest text-studio-text/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
