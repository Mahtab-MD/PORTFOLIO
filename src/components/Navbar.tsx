import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Moon, Sun, User, FolderGit2, Mail } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../hooks/use-theme';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

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
        className={`pointer-events-auto w-11 sm:w-12 py-3 px-1 rounded-full flex flex-col items-center justify-between gap-2 transition-all duration-300 ${
          isScrolled
            ? 'bg-zinc-950/75 dark:bg-zinc-950/80 backdrop-blur-2xl backdrop-saturate-180 border border-white/20 dark:border-white/15 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.3),0_12px_36px_-6px_rgba(0,0,0,0.55)]'
            : 'bg-zinc-950/45 dark:bg-zinc-950/50 backdrop-blur-xl backdrop-saturate-180 border border-white/15 dark:border-white/10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2),0_8px_24px_-4px_rgba(0,0,0,0.4)]'
        }`}
      >
        {/* Top Logo Mark */}
        <a 
          href="#home" 
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold text-zinc-100 hover:text-white bg-white/10 hover:bg-blue-500/20 hover:border-blue-500/40 border border-white/15 transition-all group"
          title="Home - Mahtab"
          aria-label="Home"
        >
          <span>M</span>
        </a>

        <div className="w-5 h-[1px] bg-white/15 my-0.5" />
        
        {/* Slender Vertical Navigation Links */}
        <nav className="flex flex-col items-center gap-1.5 w-full">
          <a 
            href="#about" 
            className="w-full py-2 flex flex-col items-center justify-center rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all group"
            title="About"
          >
            <User size={13} className="group-hover:text-blue-400 group-hover:scale-110 transition-transform mb-1" />
            <span className="[writing-mode:vertical-rl] text-[9px] font-mono tracking-widest uppercase text-zinc-400 group-hover:text-zinc-100">
              ABOUT
            </span>
          </a>

          <a 
            href="#projects" 
            className="w-full py-2 flex flex-col items-center justify-center rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all group"
            title="Projects"
          >
            <FolderGit2 size={13} className="group-hover:text-blue-400 group-hover:scale-110 transition-transform mb-1" />
            <span className="[writing-mode:vertical-rl] text-[9px] font-mono tracking-widest uppercase text-zinc-400 group-hover:text-zinc-100">
              PROJECT
            </span>
          </a>

          <a 
            href="#contact" 
            className="w-full py-2 flex flex-col items-center justify-center rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all group"
            title="Contact"
          >
            <Mail size={13} className="group-hover:text-blue-400 group-hover:scale-110 transition-transform mb-1" />
            <span className="[writing-mode:vertical-rl] text-[9px] font-mono tracking-widest uppercase text-zinc-400 group-hover:text-zinc-100">
              CONTACT
            </span>
          </a>
        </nav>

        <div className="w-5 h-[1px] bg-white/15 my-0.5" />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-zinc-200 border border-white/15 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)] transition-all"
          aria-label="Toggle dark mode"
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </motion.header>
  );
}
