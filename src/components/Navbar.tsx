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

function NavItem({ 
  href, 
  title, 
  icon: Icon, 
  text, 
  mouseY, 
  isActive, 
  isEffectivelyDark 
}: { 
  href: string, 
  title: string, 
  icon: any, 
  text: string, 
  mouseY: any, 
  isActive: boolean,
  isEffectivelyDark: boolean 
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseY, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

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

  // Determine styles dynamically based on the effective theme
  const containerClass = isActive 
    ? (isEffectivelyDark ? 'text-zinc-200' : 'text-zinc-900')
    : (isEffectivelyDark ? 'text-zinc-400 hover:text-white hover:bg-white/10' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-900/5');
  
  const iconClass = isActive
    ? (isEffectivelyDark ? 'text-blue-500' : 'text-blue-600')
    : (isEffectivelyDark ? 'group-hover:text-blue-400' : 'group-hover:text-blue-600');
    
  const textClass = isActive
    ? (isEffectivelyDark ? 'text-zinc-200' : 'text-zinc-900')
    : (isEffectivelyDark ? 'group-hover:text-zinc-100' : 'group-hover:text-zinc-900');

  return (
    <motion.a
      ref={ref}
      href={href}
      title={title}
      onClick={(e) => handleLinkClick(e, href)}
      style={{ width, height }}
      className={`flex flex-col items-center justify-center rounded-2xl transition-all duration-700 group relative z-10 ${containerClass}`}
    >
      {isActive && (
        <motion.div
          layoutId="activeNavDot"
          className={`absolute -left-1 w-1.5 h-1.5 rounded-full transition-colors duration-700 ${isEffectivelyDark ? 'bg-blue-500' : 'bg-blue-600'}`}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
      <motion.div style={{ scale }} className="flex flex-col items-center justify-center pointer-events-none">
        <Icon size={14} className={`${iconClass} transition-colors duration-700 mb-1.5`} />
        <span className={`[writing-mode:vertical-rl] text-[10px] font-mono tracking-widest uppercase transition-colors duration-700 ${textClass}`}>
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
  const [forceDark, setForceDark] = useState(true);
  const mouseY = useMotionValue(Infinity);
  
  const sectionIds = useMemo(() => ['home', 'about', 'projects', 'contact'], []);
  const activeSection = useActiveSection(sectionIds);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
    
    // Dynamic theme switching based on scroll depth
    const homeEl = document.getElementById('home');
    if (homeEl) {
      const homeBottom = homeEl.offsetTop + homeEl.offsetHeight;
      // Start adopting the light theme when the next page is coming into view
      // This creates the "volume increase/decrease" crossfade effect
      const threshold = homeBottom - window.innerHeight * 0.6;
      setForceDark(latest < threshold);
    }
  });

  // The nav bar is effectively dark if the user selected dark mode, OR if we are forcing it dark (e.g., over the hero section)
  const isEffectivelyDark = theme === 'dark' || forceDark;

  // Dynamic Background Classes
  let bgClass = '';
  if (isEffectivelyDark) {
    bgClass = isScrolled
      ? 'bg-zinc-950/80 backdrop-blur-2xl backdrop-saturate-180 border-white/15 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.3),0_12px_36px_-6px_rgba(0,0,0,0.55)]'
      : 'bg-zinc-950/50 backdrop-blur-xl backdrop-saturate-180 border-white/10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2),0_8px_24px_-4px_rgba(0,0,0,0.4)]';
  } else {
    bgClass = isScrolled
      ? 'bg-white/70 backdrop-blur-2xl backdrop-saturate-180 border-zinc-200/50 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.1)]'
      : 'bg-white/40 backdrop-blur-xl backdrop-saturate-180 border-zinc-200/30 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.05)]';
  }

  // Dynamic Logo Classes
  const logoClass = isEffectivelyDark
    ? 'text-zinc-100 hover:text-white bg-white/10 hover:bg-blue-500/20 border-white/15 hover:border-blue-500/40'
    : 'text-zinc-800 hover:text-zinc-900 bg-zinc-900/5 hover:bg-blue-600/10 border-zinc-900/10 hover:border-blue-600/30';

  // Dynamic Divider Classes
  const dividerClass = isEffectivelyDark ? 'bg-white/15' : 'bg-zinc-900/10';

  // Dynamic Theme Toggle Button Classes
  const themeToggleClass = isEffectivelyDark
    ? 'bg-white/10 hover:bg-white/20 text-zinc-200 border-white/15 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)]'
    : 'bg-zinc-900/5 hover:bg-zinc-900/10 text-zinc-600 hover:text-zinc-900 border-zinc-900/10 shadow-sm';

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
        // Using duration-700 ease-in-out gives it that smooth "volume up/down" gradient fade effect
        className={`pointer-events-auto w-auto py-3 px-1.5 rounded-[2rem] flex flex-col items-center justify-between gap-3 transition-all duration-700 ease-in-out border ${bgClass}`}
      >
        {/* Top Logo Mark */}
        <a 
          href="#home" 
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-mono font-bold transition-all duration-700 group shrink-0 border ${logoClass}`}
          title="Home - Mahtab"
          aria-label="Home"
        >
          <span>M</span>
        </a>

        <div className={`w-6 h-[1px] shrink-0 transition-colors duration-700 ${dividerClass}`} />
        
        {/* Slender Vertical Navigation Links with MacOS Magnification Effect */}
        <nav className="flex flex-col items-center gap-1.5 w-full shrink-0">
          <NavItem href="#about" title="About" icon={User} text="ABOUT" mouseY={mouseY} isActive={activeSection === 'about'} isEffectivelyDark={isEffectivelyDark} />
          <NavItem href="#projects" title="Projects" icon={FolderGit2} text="PROJECTS" mouseY={mouseY} isActive={activeSection === 'projects'} isEffectivelyDark={isEffectivelyDark} />
          <NavItem href="#contact" title="Contact" icon={Mail} text="CONTACT" mouseY={mouseY} isActive={activeSection === 'contact'} isEffectivelyDark={isEffectivelyDark} />
        </nav>

        <div className={`w-6 h-[1px] shrink-0 transition-colors duration-700 ${dividerClass}`} />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-700 shrink-0 border ${themeToggleClass}`}
          aria-label="Toggle dark mode"
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </motion.header>
  );
}
