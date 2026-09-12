import { motion, useScroll, useMotionValueEvent, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Moon, Sun, User, FolderGit2, Mail } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useTheme } from '../hooks/use-theme';

function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

function NavItem({ href, title, icon: Icon, text, mouseY, isActive }: { href: string, title: string, icon: any, text: string, mouseY: any, isActive: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Calculate distance from mouse to the center of this item
  const distance = useTransform(mouseY, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  // Scale dimensions dynamically based on mouse distance for the macOS dock effect
  const widthTransform = useTransform(distance, [-120, 0, 120], [44, 64, 44]);
  const heightTransform = useTransform(distance, [-120, 0, 120], [85, 120, 85]);
  const scaleTransform = useTransform(distance, [-120, 0, 120], [1, 1.3, 1]);
  
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
      className={`flex flex-col items-center justify-center rounded-2xl transition-colors group relative z-10 ${
        isActive 
          ? 'text-zinc-900 dark:text-zinc-200' 
          : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-900/5 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10'
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeNavDot"
          className="absolute -left-1 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-500"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
      <motion.div style={{ scale }} className="flex flex-col items-center justify-center pointer-events-none">
        <Icon size={14} className={`${isActive ? 'text-blue-600 dark:text-blue-500' : 'group-hover:text-blue-600 dark:group-hover:text-blue-400'} transition-colors mb-1.5`} />
        <span className={`[writing-mode:vertical-rl] text-[10px] font-mono tracking-widest uppercase ${isActive ? 'text-zinc-900 dark:text-zinc-200' : 'group-hover:text-zinc-900 dark:group-hover:text-zinc-100'}`}>
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
  
  const sectionIds = useMemo(() => ['home', 'about', 'projects', 'contact'], []);
  const activeSection = useActiveSection(sectionIds);

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
            ? 'bg-white/70 dark:bg-zinc-950/80 backdrop-blur-2xl backdrop-saturate-180 border border-zinc-200/50 dark:border-white/15 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.3),0_12px_36px_-6px_rgba(0,0,0,0.55)]'
            : 'bg-white/40 dark:bg-zinc-950/50 backdrop-blur-xl backdrop-saturate-180 border border-zinc-200/30 dark:border-white/10 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2),0_8px_24px_-4px_rgba(0,0,0,0.4)]'
        }`}
      >
        {/* Top Logo Mark */}
        <a 
          href="#home" 
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-mono font-bold text-zinc-800 hover:text-zinc-900 dark:text-zinc-100 dark:hover:text-white bg-zinc-900/5 hover:bg-blue-600/10 dark:bg-white/10 dark:hover:bg-blue-500/20 border border-zinc-900/10 hover:border-blue-600/30 dark:border-white/15 dark:hover:border-blue-500/40 transition-all group shrink-0"
          title="Home - Mahtab"
          aria-label="Home"
        >
          <span>M</span>
        </a>

        <div className="w-6 h-[1px] bg-zinc-900/10 dark:bg-white/15 shrink-0" />
        
        {/* Slender Vertical Navigation Links with MacOS Magnification Effect */}
        <nav className="flex flex-col items-center gap-1.5 w-full shrink-0">
          <NavItem href="#about" title="About" icon={User} text="ABOUT" mouseY={mouseY} isActive={activeSection === 'about'} />
          <NavItem href="#projects" title="Projects" icon={FolderGit2} text="PROJECTS" mouseY={mouseY} isActive={activeSection === 'projects'} />
          <NavItem href="#contact" title="Contact" icon={Mail} text="CONTACT" mouseY={mouseY} isActive={activeSection === 'contact'} />
        </nav>

        <div className="w-6 h-[1px] bg-zinc-900/10 dark:bg-white/15 shrink-0" />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-zinc-900/5 hover:bg-zinc-900/10 dark:bg-white/10 dark:hover:bg-white/20 text-zinc-600 hover:text-zinc-900 dark:text-zinc-200 border border-zinc-900/10 dark:border-white/15 shadow-sm dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)] transition-all shrink-0"
          aria-label="Toggle dark mode"
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </motion.header>
  );
}
