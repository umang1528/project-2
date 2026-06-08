
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const brandStages = ['UMANG', 'VISUALS'];
const keywords = [
  'BRANDING',
  'UI/UX',
  'POSTERS',
  'SOCIAL MEDIA',
  'PACKAGING',
  'VISUAL STORYTELLING',
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [stage, setStage] = useState(0);
  const [brandText, setBrandText] = useState(brandStages[0]);
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers: number[] = [];

    timers.push(
      window.setTimeout(() => {
        setBrandText(brandStages[1]);
      }, 1200)
    );

    timers.push(
      window.setTimeout(() => {
        setStage(1);
      }, 2000)
    );

    timers.push(
      window.setTimeout(() => {
        setStage(2);
      }, 4000)
    );

    timers.push(
      window.setTimeout(() => {
        setStage(3);
      }, 7000)
    );

    timers.push(
      window.setTimeout(() => {
        onComplete();
      }, 10000)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [onComplete]);

  useEffect(() => {
    if (stage !== 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setKeywordIndex((current) => (current + 1) % keywords.length);
    }, 700);

    return () => window.clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    if (stage !== 3) {
      return;
    }

    const start = performance.now();
    const duration = 3000;
    let frame = 0;

    const tick = (time: number) => {
      const elapsed = Math.min(duration, time - start);
      const next = Math.round((elapsed / duration) * 100);
      setProgress(next);

      if (elapsed < duration) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [stage]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const currentKeyword = keywords[keywordIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1000] bg-[#F5F3EF] text-[#111111]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.span
            className="pointer-events-none absolute inset-x-0 top-[20%] mx-auto w-[40%] text-center text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] font-display font-bold uppercase tracking-[-0.1em] text-[#111111] opacity-5 select-none"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: stage >= 2 ? 0.05 : 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            CREATE
          </motion.span>
        </div>

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-10 text-center">
          <div className="max-w-[1200px] w-full">
            {stage === 0 && (
              <motion.div
                key="brand-hero"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="flex flex-col items-center justify-center gap-6"
              >
                <div className="flex items-center justify-center gap-4 text-[3.8rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[7.5rem] xl:text-[8.5rem] font-black uppercase tracking-[-0.08em] text-[#111111] sm:leading-[0.85]">
                  <span className="block">{brandText}</span>
                </div>
                <p className="max-w-xl text-sm sm:text-base md:text-lg tracking-[0.35em] uppercase text-[#777777]">
                  A premium studio intro for a refined graphic designer portfolio.
                </p>
              </motion.div>
            )}

            {stage === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="flex flex-col items-center justify-center gap-10"
              >
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.4em] text-[#777777]">
                    Creative Practice
                  </p>
                  <div className="relative overflow-hidden">
                    <motion.span
                      key={currentKeyword}
                      initial={{ opacity: 0, y: 18, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -18, scale: 0.96 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      className="block text-[4.2rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[7.5rem] font-black uppercase tracking-[-0.08em] text-[#111111]"
                    >
                      {currentKeyword}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            )}

            {stage >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="space-y-12"
              >
                <div className="space-y-5">
                  <p className="text-sm uppercase tracking-[0.45em] text-[#777777]">
                    Creative direction
                  </p>
                  <h2 className="text-[2.4rem] sm:text-[3rem] md:text-[3.8rem] lg:text-[4.4rem] font-semibold uppercase leading-[0.95] text-[#111111]">
                    Designing Experiences,
                    <br />
                    Not Just Graphics
                  </h2>
                </div>

                <div className="mx-auto w-full max-w-[760px]">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-[#111111]/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: stage === 2 ? '100%' : '0%' }}
                      transition={{ duration: 2.8, ease: 'easeInOut' }}
                      className="h-full rounded-full bg-[#FF7A00]"
                    />
                  </div>
                </div>

                <div className="max-w-[780px] mx-auto text-center">
                  <AnimatePresence mode="wait">
                    {stage === 3 ? (
                      <motion.div
                        key="preparing"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="space-y-4"
                      >
                        <p className="text-sm uppercase tracking-[0.4em] text-[#777777]">
                          Preparing Portfolio
                        </p>
                        <p className="text-[5rem] sm:text-[5.8rem] md:text-[6.8rem] font-black uppercase tracking-[-0.08em] text-[#111111]">
                          {progress}%
                        </p>
                        <p className="text-base sm:text-lg text-[#777777] tracking-[0.12em] uppercase">
                          Portfolio assets are being energized for the first reveal.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="stage-two-caption"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="text-[#777777]"
                      >
                        <p className="text-sm uppercase tracking-[0.35em]">
                          Refined concepts loading
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
