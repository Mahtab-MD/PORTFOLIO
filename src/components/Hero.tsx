import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { HeroVideo } from './HeroVideo';
import { HeroTypography } from './HeroTypography';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStage, setCurrentStage] = useState(1);

  // Measure scroll progress through the tall hero sequence (0.0 -> 1.0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track active narrative stage for subtle chapter markers
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (progress < 0.22) {
      setCurrentStage(1);
    } else if (progress < 0.48) {
      setCurrentStage(2);
    } else if (progress < 0.74) {
      setCurrentStage(3);
    } else {
      setCurrentStage(4);
    }
  });

  // Scroll hint fades out smoothly once user scrolls down slightly
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Bottom scroll progress line (0% to 100%)
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-[400vh] bg-zinc-950 text-white select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          STICKY FULLSCREEN VIEWPORT
          Remains fixed in place while user scrolls through the 4 stages
          ───────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden flex flex-col justify-between pt-24 pb-8 px-6 sm:px-10 lg:px-16">
        
        {/* Fullscreen Cinematic Background Video */}
        <HeroVideo scrollYProgress={scrollYProgress} />

        {/* ─────────────────────────────────────────────────────────────
            TOP HEADER / STAGE TRACKER (MINIMAL)
            ───────────────────────────────────────────────────────────── */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-zinc-400 select-none z-20 pt-2">
          <div className="flex items-center gap-3">
            <span className="text-zinc-200 font-semibold tracking-wider">MAHTAB</span>
            <span className="text-zinc-600">/</span>
            <span className="text-blue-400 font-medium">
              {currentStage === 1 && 'INTRODUCTION'}
              {currentStage === 2 && 'DISCIPLINE'}
              {currentStage === 3 && 'PHILOSOPHY'}
              {currentStage === 4 && 'PORTFOLIO'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((stageNum) => (
              <div
                key={stageNum}
                className={`h-1 rounded-full transition-all duration-300 ${
                  currentStage === stageNum
                    ? 'w-6 bg-blue-500'
                    : 'w-1.5 bg-zinc-700'
                }`}
                aria-label={`Stage ${stageNum}`}
              />
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            MAIN STAGE LAYOUT
            Left 40-45% for typography. Right side showcases the video.
            ───────────────────────────────────────────────────────────── */}
        <div className="w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 items-center z-20">
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
            <HeroTypography scrollYProgress={scrollYProgress} />
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BOTTOM FOOTER / MINIMAL CONTROLS
            ───────────────────────────────────────────────────────────── */}
        <div className="w-full max-w-7xl mx-auto flex items-end justify-between text-xs font-mono text-zinc-400 select-none z-20 pb-2">
          
          {/* Scroll prompt (fades out quickly) */}
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="flex items-center gap-2.5 text-zinc-400"
          >
            <div className="w-4 h-7 rounded-full border border-zinc-600 flex items-start justify-center p-1">
              <div className="w-1 h-1.5 rounded-full bg-blue-400 animate-bounce" />
            </div>
            <span className="tracking-widest uppercase text-[11px] font-medium text-zinc-300">
              Scroll to scrub cinematic intro
            </span>
          </motion.div>

          {/* Chapter indicator */}
          <div className="hidden sm:flex items-center gap-2 text-zinc-400">
            <span className="text-zinc-200 font-bold">0{currentStage}</span>
            <span className="text-zinc-600">/</span>
            <span>04</span>
          </div>

          {/* Fast Skip to Content */}
          <a
            href="#about"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <span className="text-[11px] uppercase tracking-wider">Skip to Content</span>
            <ChevronDown size={14} />
          </a>
        </div>

        {/* Bottom subtle progress line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-900 z-30">
          <motion.div
            style={{ width: progressBarWidth }}
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
          />
        </div>

      </div>
    </section>
  );
}
