import { useEffect, useRef, useState } from 'react';
import { motion, MotionValue, useMotionValueEvent, useTransform } from 'motion/react';

interface HeroVideoProps {
  scrollYProgress: MotionValue<number>;
}

export function HeroVideo({ scrollYProgress }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const isIntersectingRef = useRef(true);

  // Subtle cinematic scale & opacity response as scrolling progresses
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.025, 1.05]);
  const videoOpacity = useTransform(scrollYProgress, [0.88, 1], [1, 0.4]);

  // Update target playback time strictly derived from scroll progress (0..1)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration)) return;

    // Clamp progress safely
    const clampedProgress = Math.max(0, Math.min(1, latest));
    // Provide 0.05s buffer at the end to prevent video 'ended' freeze or jump
    const maxUsableDuration = Math.max(0, video.duration - 0.05);
    targetTimeRef.current = clampedProgress * maxUsableDuration;
  });

  // Smooth requestAnimationFrame lerp loop for jitter-free scrubbing forward & backward
  useEffect(() => {
    let isCancelled = false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tick = () => {
      if (isCancelled) return;

      if (!prefersReducedMotion && isIntersectingRef.current) {
        const video = videoRef.current;
        if (video && video.readyState >= 2 && video.duration && !isSeekingRef.current) {
          const delta = targetTimeRef.current - currentTimeRef.current;

          // Only seek when the delta is beyond threshold to prevent CPU thrashing
          if (Math.abs(delta) > 0.008) {
            // Responsive lerp coefficient for fluid scrolling
            currentTimeRef.current += delta * 0.2;

            try {
              video.currentTime = currentTimeRef.current;
            } catch {
              // Ignore transient seeking errors during rapid scrolls
            }
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      isCancelled = true;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Pause scrubbing loop when Hero is scrolled out of viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setIsVideoLoaded(true);
      video.pause();
      const currentProg = Math.max(0, Math.min(1, scrollYProgress.get() || 0));
      const maxUsableDuration = Math.max(0, video.duration - 0.05);
      const initTime = currentProg * maxUsableDuration;
      targetTimeRef.current = initTime;
      currentTimeRef.current = initTime;
      try {
        video.currentTime = initTime;
      } catch {
        // Ignore seek error
      }
    }
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
      {/* ─────────────────────────────────────────────────────────────
          FULLSCREEN / NEAR-FULLSCREEN CINEMATIC VIDEO BACKGROUND
          Positioned across right and center-right of the viewport.
          Left side fades seamlessly into background for pure typography.
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          scale: videoScale,
          opacity: videoOpacity,
        }}
        className="absolute inset-0 w-full h-full lg:w-[70%] lg:left-[30%] xl:w-[68%] xl:left-[32%] overflow-hidden"
      >
        {!hasError ? (
          <video
            ref={videoRef}
            src="/assets/hero.mp4"
            poster="/assets/profile.png"
            muted
            playsInline
            preload="auto"
            autoPlay={false}
            onLoadedMetadata={handleLoadedMetadata}
            onSeeking={() => { isSeekingRef.current = true; }}
            onSeeked={() => { isSeekingRef.current = false; }}
            onError={handleError}
            className={`w-full h-full object-cover object-[50%_35%] sm:object-[50%_36%] lg:object-[50%_38%] transition-opacity duration-700 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              willChange: 'transform',
            }}
          />
        ) : (
          /* Graceful Fallback if video file is missing or unreadable */
          <img
            src="/assets/profile.png"
            alt="Mahtab Mohammad - Software Engineer"
            className="w-full h-full object-cover object-[50%_36%]"
          />
        )}

        {/* ─────────────────────────────────────────────────────────────
            SEAMLESS CINEMATIC SCRIMS & GRADIENTS
            - Left-to-Right Scrim: Gives left side 100% pure contrast for typography
            - Top Scrim: Seamless integration with header / navbar
            - Bottom Scrim: Smooth transition into next portfolio section
            ───────────────────────────────────────────────────────────── */}

        {/* Desktop Left-to-Right Gradient Scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-44 sm:w-64 lg:w-96 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none"
        />

        {/* Top Vignette Scrim */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-zinc-950 via-zinc-950/50 to-transparent pointer-events-none"
        />

        {/* Bottom Vignette Scrim */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-48 sm:h-56 lg:h-64 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-transparent pointer-events-none"
        />

        {/* Bottom-Right Corner Scrim: Seamlessly blends corner residue into deep zinc-950 */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-72 sm:w-96 lg:w-[30rem] h-60 sm:h-72 lg:h-80 bg-[radial-gradient(ellipse_at_bottom_right,rgba(9,9,11,1)_0%,rgba(9,9,11,0.85)_45%,transparent_75%)] pointer-events-none"
        />

        {/* Right Edge Scrim for seamless cinematic framing */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-zinc-950/70 to-transparent pointer-events-none"
        />

        {/* Mobile Dark Overlay: Ensures typography below or above remains crystal clear */}
        <div
          aria-hidden="true"
          className="absolute inset-0 lg:hidden bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40 pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
