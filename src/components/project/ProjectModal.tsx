import { motion } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImage, setActiveImage] = useState(project.image);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
    >
      <div 
        className="absolute inset-0 bg-studio-bg/95 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[1200px] bg-white border border-studio-border overflow-hidden grid lg:grid-cols-[1.5fr_1fr]"
        style={{ maxHeight: 'calc(100vh - 100px)' }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-20 group flex items-center gap-4 text-studio-text/40 hover:text-studio-text transition-colors"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Close</span>
          <div className="w-8 h-8 rounded-none border border-studio-border flex items-center justify-center group-hover:bg-studio-text group-hover:text-white transition-all">
            <X size={14} />
          </div>
        </button>

        {/* Left: Image & Gallery */}
        <div className="relative flex flex-col h-full bg-studio-bg overflow-hidden">
          <div className="relative flex-1 overflow-hidden">
            <motion.img 
              key={activeImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              src={activeImage} 
              alt={project.title}
              className="w-full h-full object-cover grayscale-0 brightness-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-[20px] border-white pointer-events-none" />
          </div>

          {/* Gallery Thumbnails */}
          {project.gallery && (
            <div className="p-8 pb-12 bg-white flex gap-4 overflow-x-auto scrollbar-hide border-t border-studio-border">
              {[project.image, ...project.gallery].map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-24 flex-shrink-0 border p-1 transition-all duration-300 ${activeImage === img ? 'border-brand-accent scale-105' : 'border-studio-border grayscale hover:grayscale-0'}`}
                >
                  <img 
                    src={img} 
                    alt={`${project.title} gallery ${i}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="p-12 md:p-20 flex flex-col justify-center overflow-y-auto">
           <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block">
                  Product Identification — {project.category}
                </span>
                <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
                  {project.title}
                </h2>
              </div>

              <div className="h-[2px] w-24 bg-studio-text" />

              <div className="space-y-8">
                <p className="text-studio-text/60 text-xl font-medium leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="px-4 py-1.5 bg-studio-bg border border-studio-border text-[10px] font-mono font-bold uppercase tracking-widest text-studio-text/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-12 border-t border-studio-border flex items-center justify-between">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest leading-none mb-2">Artifact ID</span>
                    <span className="text-xs font-display font-bold uppercase tracking-tight">00-VNSN-26-{String(project.id).padStart(2, '0')}</span>
                 </div>
                 <button className="group flex items-center gap-4 px-8 py-4 bg-studio-text text-white hover:bg-brand-accent transition-colors">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Full Case Study</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
