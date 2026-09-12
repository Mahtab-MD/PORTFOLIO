import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, MotionValue, useMotionValueEvent, useTransform } from 'motion/react';

interface HeroVideoProps {
  scrollYProgress: MotionValue<number>;
}

const TOTAL_FRAMES = 192;
const FRAME_BASE_URL = '/assets/';

export function HeroVideo({ scrollYProgress }: HeroVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  // Subtle cinematic scale & opacity response as scrolling progresses
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.025, 1.05]);
  const videoOpacity = useTransform(scrollYProgress, [0.88, 1], [1, 0.4]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(5, '0');
      img.src = `${FRAME_BASE_URL}${frameNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        
        // Render first frame immediately once it's loaded
        if (i === 1 && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
          }
        }
      };
      images[i] = img;
    }
    
    imagesRef.current = images;
  }, []);

  // Set up canvas drawing on scroll
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!canvasRef.current || imagesRef.current.length === 0) return;

    // Calculate which frame to show based on scroll progress (0.0 -> 1.0)
    // Clamp between 1 and TOTAL_FRAMES
    const progress = Math.max(0, Math.min(1, latest));
    let frameIndex = Math.floor(progress * TOTAL_FRAMES) + 1;
    if (frameIndex > TOTAL_FRAMES) frameIndex = TOTAL_FRAMES;

    const img = imagesRef.current[frameIndex];
    if (img && img.complete) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clear and draw exactly to the canvas coordinate size
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }
  });

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
        className="absolute inset-0 w-full h-full lg:w-[70%] lg:left-[30%] xl:w-[68%] xl:left-[32%] overflow-hidden bg-zinc-950"
      >
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className={`w-full h-full object-cover object-[50%_35%] sm:object-[50%_36%] lg:object-[50%_38%] transition-opacity duration-700 ${
            imagesLoaded > 0 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            willChange: 'transform',
          }}
        />
        
        {/* Loading Indicator */}
        {imagesLoaded < TOTAL_FRAMES && (
          <div className="absolute top-4 right-4 text-xs font-mono text-zinc-500 bg-zinc-950/50 px-3 py-1 rounded-full backdrop-blur-md">
            Buffering {Math.round((imagesLoaded / TOTAL_FRAMES) * 100)}%
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SEAMLESS CINEMATIC SCRIMS & GRADIENTS
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
