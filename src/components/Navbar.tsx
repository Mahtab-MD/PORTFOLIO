import { motion, useScroll, useMotionValueEvent, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Moon, Sun, User, FolderGit2, Mail } from 'lucide-react';
import { useState, useRef } from 'react';
import { useTheme } from '../hooks/use-theme';

function NavItem({ href, title, icon: Icon, text, mouseY }: { href: string, title: string, icon: any, text: string, mouseY: any }) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Calculate distance from mouse to the center of this item
  const distance = useTransform(mouseY, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  // Scale dimensions dynamically based on mouse distance for the macOS dock effect
  // Base width is ~44px, expands to 60px
  const widthTransform = useTransform(distance, [-120, 0, 120], [44, 64, 44]);
  // Base height is roughly 80px, expands to 110px
  const heightTransform = useTransform(distance, [-120, 0, 120], [85, 120, 85]);
  // Scale the internal content
  const scaleTransform = useTransform(distance, [-120, 0, 120], [1, 1.3, 1]);
  
  // Smooth the values using springs
  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 250, damping: 20 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 250, damping: 20 });
  const scale = useSpring(scaleTransform, { mass: 0.1, stiffness: 250, damping: 20 });

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetHref: string) => {
    e.preventDefault();
    const target = document.querySelector(targetHref);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      title={title}
      onClick={(e) => handleLinkClick(e, href)}
      style={{ width, height }}
      className="flex flex-col items-center justify-center rounded-2xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors group relative z-10"
    >
      <motion.div style={{ scale }} className="flex flex-col items-center justify-center pointer-events-none">
        <Icon size={14} className="group-hover:text-blue-400 transition-colors mb-1.5" />
        <span className="[writing-mode:vertical-rl] text-[10px] font-mono tracking-widest uppercase group-hover:text-zinc-100">
          {text}
        </span>
      </motion.div>
    </motion.a>
  );
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const mouseY = useMotionValue(Infinity);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
  });

  return (
    <motion.header
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 pointer-events-none transition-all duration-300"
    >
      <div
        id="navbar-island"
        onMouseMove={(e) => mouseY.set(e.clientY)}
        onMouseLeave={() => mouseY.set(Infinity)}
        className={`pointer-events-auto w-auto py-3 px-1.5 rounded-[2rem] flex flex-col items-center justify-between gap-3 transition-all duration-300 ${
          isScrolled
            ? 'bg-zinc-950/75 dark:bg-zinc-950/80 backdrop-blur-2xl backdrop-saturate-180 border border-white/20 dark:border-white/15 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.3),0_12px_36px_-6px_rgba(0,0,0,0.55)]'
            : 'bg-zinc-950/45 dark:bg-zinc-950/50 backdrop-blur-xl backdrop-saturate-180 border border-white/15 dark:border-white/10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2),0_8px_24px_-4px_rgba(0,0,0,0.4)]'
        }`}
      >
        {/* Top Logo Mark */}
        <a 
          href="#home" 
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-mono font-bold text-zinc-100 hover:text-white bg-white/10 hover:bg-blue-500/20 hover:border-blue-500/40 border border-white/15 transition-all group shrink-0"
          title="Home - Mahtab"
          aria-label="Home"
        >
          <span>M</span>
        </a>

        <div className="w-6 h-[1px] bg-white/15 shrink-0" />
        
        {/* Slender Vertical Navigation Links with MacOS Magnification Effect */}
        <nav className="flex flex-col items-center gap-1.5 w-full shrink-0">
          <NavItem href="#about" title="About" icon={User} text="ABOUT" mouseY={mouseY} />
          <NavItem href="#projects" title="Projects" icon={FolderGit2} text="PROJECTS" mouseY={mouseY} />
          <NavItem href="#contact" title="Contact" icon={Mail} text="CONTACT" mouseY={mouseY} />
        </nav>

        <div className="w-6 h-[1px] bg-white/15 shrink-0" />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-zinc-200 border border-white/15 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)] transition-all shrink-0"
          aria-label="Toggle dark mode"
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </motion.header>
  );
}
