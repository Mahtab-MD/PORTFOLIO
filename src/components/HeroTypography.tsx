import { motion, MotionValue, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface HeroTypographyProps {
  scrollYProgress: MotionValue<number>;
}

export function HeroTypography({ scrollYProgress }: HeroTypographyProps) {
  // ─────────────────────────────────────────────────────────────
  // STAGE 1: "HELLO, I'M MAHTAB." (0.00 -> 0.20)
  // Fully visible at start, then smoothly and completely fades out
  // before Stage 2 arrives with zero collision or overlapping.
  // ─────────────────────────────────────────────────────────────
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.13, 0.20], [1, 1, 0]);
  const stage1Y = useTransform(scrollYProgress, [0, 0.13, 0.20], [0, 0, -28]);
  const stage1Scale = useTransform(scrollYProgress, [0, 0.13, 0.20], [1, 1, 0.98]);
  const stage1Visibility = useTransform(scrollYProgress, (v) => (v < 0.21 ? 'visible' : 'hidden'));
  const stage1Pointer = useTransform(scrollYProgress, (v) => (v < 0.20 ? 'auto' : 'none'));

  // Staggered smooth fade out applied directly to the 3 targeted elements
  const stage1EyebrowOpacity = useTransform(scrollYProgress, [0, 0.11, 0.17], [1, 1, 0]);
  const stage1EyebrowY = useTransform(scrollYProgress, [0, 0.11, 0.17], [0, 0, -14]);

  const stage1HeadingOpacity = useTransform(scrollYProgress, [0, 0.13, 0.19], [1, 1, 0]);
  const stage1HeadingY = useTransform(scrollYProgress, [0, 0.13, 0.19], [0, 0, -20]);

  const stage1ParaOpacity = useTransform(scrollYProgress, [0, 0.14, 0.20], [1, 1, 0]);
  const stage1ParaY = useTransform(scrollYProgress, [0, 0.14, 0.20], [0, 0, -22]);

  // ─────────────────────────────────────────────────────────────
  // STAGE 2: "SOFTWARE ENGINEER." (0.24 -> 0.46)
  // Dedicated window with buffer before and after to eliminate overlap
  // ─────────────────────────────────────────────────────────────
  const stage2Opacity = useTransform(scrollYProgress, [0.24, 0.29, 0.40, 0.46], [0, 1, 1, 0]);
  const stage2Y = useTransform(scrollYProgress, [0.24, 0.29, 0.40, 0.46], [28, 0, 0, -28]);
  const stage2Scale = useTransform(scrollYProgress, [0.24, 0.29, 0.40, 0.46], [0.98, 1, 1, 0.98]);
  const stage2Visibility = useTransform(scrollYProgress, (v) => (v >= 0.23 && v < 0.47 ? 'visible' : 'hidden'));
  const stage2Pointer = useTransform(scrollYProgress, (v) => (v >= 0.24 && v < 0.46 ? 'auto' : 'none'));

  // ─────────────────────────────────────────────────────────────
  // STAGE 3: "I BUILD. I EXPERIMENT. I TURN IDEAS INTO SOFTWARE." (0.50 -> 0.72)
  // ─────────────────────────────────────────────────────────────
  const stage3Opacity = useTransform(scrollYProgress, [0.50, 0.55, 0.67, 0.72], [0, 1, 1, 0]);
  const stage3Y = useTransform(scrollYProgress, [0.50, 0.55, 0.67, 0.72], [28, 0, 0, -28]);
  const stage3Scale = useTransform(scrollYProgress, [0.50, 0.55, 0.67, 0.72], [0.98, 1, 1, 0.98]);
  const stage3Visibility = useTransform(scrollYProgress, (v) => (v >= 0.49 && v < 0.73 ? 'visible' : 'hidden'));
  const stage3Pointer = useTransform(scrollYProgress, (v) => (v >= 0.50 && v < 0.72 ? 'auto' : 'none'));

  // Staggered reveal for each statement in Stage 3
  const line1Opacity = useTransform(scrollYProgress, [0.51, 0.56], [0.35, 1]);
  const line1Color = useTransform(scrollYProgress, [0.51, 0.56], ['#71717a', '#ffffff']);
  
  const line2Opacity = useTransform(scrollYProgress, [0.57, 0.62], [0.35, 1]);
  const line2Color = useTransform(scrollYProgress, [0.57, 0.62], ['#71717a', '#ffffff']);

  const line3Opacity = useTransform(scrollYProgress, [0.63, 0.68], [0.35, 1]);
  const line3Color = useTransform(scrollYProgress, [0.63, 0.68], ['#71717a', '#ffffff']);

  // ─────────────────────────────────────────────────────────────
  // STAGE 4: "WELCOME TO MY WORK." (0.76 -> 1.00)
  // ─────────────────────────────────────────────────────────────
  const stage4Opacity = useTransform(scrollYProgress, [0.76, 0.81, 0.96, 1.0], [0, 1, 1, 0.2]);
  const stage4Y = useTransform(scrollYProgress, [0.76, 0.81, 1.0], [28, 0, 0]);
  const stage4Scale = useTransform(scrollYProgress, [0.76, 0.81, 1.0], [0.98, 1, 1]);
  const stage4Visibility = useTransform(scrollYProgress, (v) => (v >= 0.75 ? 'visible' : 'hidden'));
  const stage4Pointer = useTransform(scrollYProgress, (v) => (v >= 0.76 ? 'auto' : 'none'));

  return (
    <div className="relative w-full min-h-[380px] sm:min-h-[440px] flex items-center select-none">
      {/* ─────────────────────────────────────────────────────────────
          STAGE 1: "HELLO, I'M MAHTAB."
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          opacity: stage1Opacity,
          y: stage1Y,
          scale: stage1Scale,
          visibility: stage1Visibility,
          pointerEvents: stage1Pointer,
        }}
        className="absolute inset-0 flex flex-col justify-center text-left"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <motion.span
            style={{
              opacity: stage1EyebrowOpacity,
              y: stage1EyebrowY,
            }}
            className="text-xs sm:text-sm font-mono tracking-[0.25em] text-zinc-400 uppercase inline-block"
          >
            HELLO, I'M
          </motion.span>
        </div>

        <motion.h1
          style={{
            opacity: stage1HeadingOpacity,
            y: stage1HeadingY,
          }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.02] mb-5"
        >
          MAHTAB.
        </motion.h1>

        <motion.p
          style={{
            opacity: stage1ParaOpacity,
            y: stage1ParaY,
          }}
          className="text-base sm:text-lg lg:text-xl font-normal text-zinc-400 max-w-md leading-relaxed"
        >
          A Software Engineer in the making. Turning complex ideas into elegant, high-performance software.
        </motion.p>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          STAGE 2: "SOFTWARE ENGINEER."
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          opacity: stage2Opacity,
          y: stage2Y,
          scale: stage2Scale,
          visibility: stage2Visibility,
          pointerEvents: stage2Pointer,
        }}
        className="absolute inset-0 flex flex-col justify-center text-left"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-blue-400 uppercase">
            DISCIPLINE
          </span>
        </div>

        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.02] mb-5">
          SOFTWARE<br />
          <span className="text-zinc-300">ENGINEER.</span>
        </h2>

        <p className="text-base sm:text-lg lg:text-xl font-normal text-zinc-400 max-w-md leading-relaxed">
          Building digital experiences, solving hard problems, and designing robust system architectures.
        </p>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          STAGE 3: "I BUILD. I EXPERIMENT. I TURN IDEAS INTO SOFTWARE."
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          opacity: stage3Opacity,
          y: stage3Y,
          scale: stage3Scale,
          visibility: stage3Visibility,
          pointerEvents: stage3Pointer,
        }}
        className="absolute inset-0 flex flex-col justify-center text-left"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-blue-400 uppercase">
            PHILOSOPHY
          </span>
        </div>

        <div className="space-y-1 sm:space-y-2 mb-6">
          <motion.div
            style={{
              opacity: line1Opacity,
              color: line1Color,
            }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight transition-colors duration-200"
          >
            I BUILD.
          </motion.div>

          <motion.div
            style={{
              opacity: line2Opacity,
              color: line2Color,
            }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight transition-colors duration-200"
          >
            I EXPERIMENT.
          </motion.div>

          <motion.div
            style={{
              opacity: line3Opacity,
              color: line3Color,
            }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] transition-colors duration-200"
          >
            I TURN IDEAS<br />INTO SOFTWARE.
          </motion.div>
        </div>

        <p className="text-sm sm:text-base font-normal text-zinc-500 max-w-md">
          Bridging technical discipline with creative intuition.
        </p>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          STAGE 4: "WELCOME TO MY WORK."
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          opacity: stage4Opacity,
          y: stage4Y,
          scale: stage4Scale,
          visibility: stage4Visibility,
          pointerEvents: stage4Pointer,
        }}
        className="absolute inset-0 flex flex-col justify-center text-left"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-blue-400 uppercase">
            PORTFOLIO
          </span>
        </div>

        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.02] mb-5">
          WELCOME TO<br />
          <span className="text-zinc-300">MY WORK.</span>
        </h2>

        <p className="text-base sm:text-lg lg:text-xl font-normal text-zinc-400 max-w-md mb-8 leading-relaxed">
          Explore my featured engineering projects, technical stack, and creative experiments below.
        </p>

        <div>
          <a
            href="#about"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300 hover:text-white transition-colors group"
          >
            <span>Continue to About</span>
            <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
