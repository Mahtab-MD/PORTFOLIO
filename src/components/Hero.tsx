import { motion } from 'motion/react';
import { Github, Linkedin, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <h2 className="text-sm font-semibold tracking-wide text-blue-600 dark:text-blue-400 uppercase mb-4">
            Welcome to my portfolio
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
            Hello, I'm <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
            >
              Mahtab Mohammad
            </motion.span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-lg mx-auto md:mx-0">
            Software Engineer passionate about building clean, interactive, and scalable digital experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mohammad.mahtab1114@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-full font-medium hover:scale-105 transition-transform shadow-lg"
            >
              Get in touch
              <ArrowRight size={18} />
            </a>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Mahtab-MD"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-50 transition-all hover:scale-110 shadow-sm"
                aria-label="GitHub Profile"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/mahtab-mohammad-547831413/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-[#0A66C2] dark:hover:text-[#4294ff] transition-all hover:scale-110 shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <motion.img 
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              src="/assets/profile.png" 
              alt="Mahtab Mohammad" 
              className="relative w-full h-full object-cover rounded-full border-2 border-zinc-900 dark:border-white shadow-[0_0_20px_rgba(37,99,235,0.5)] dark:shadow-[0_0_30px_rgba(96,165,250,0.7)] ring-4 ring-blue-500/30 dark:ring-blue-400/40 z-10 cursor-pointer hover:shadow-[0_0_40px_rgba(37,99,235,0.8)] dark:hover:shadow-[0_0_50px_rgba(96,165,250,0.9)] hover:ring-blue-500/50 dark:hover:ring-blue-400/60 transition-shadow duration-300"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop";
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

