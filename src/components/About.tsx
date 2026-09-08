import { motion } from 'motion/react';
import { Code2, Laptop, Rocket, Camera, BookOpen, Plane, Coffee } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400"
          >
            <p>
              Hello! I'm Mahtab Mohammad, a passionate Software Engineer focused on crafting clean, user-centric, and high-performance applications.
            </p>
            <p>
              I thrive on turning complex problems into elegant, intuitive designs. With a strong foundation in modern web technologies, I love exploring the intersection of design and engineering to build digital products that leave a lasting impact.
            </p>
            <p>
              When I'm not writing code, you can find me exploring new tech trends, contributing to open-source, or refining my skills in UI/UX architecture.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex h-full"
          >
            <div className="p-6 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center">
              <Rocket className="text-blue-600 dark:text-blue-400 mb-4" size={48} />
              <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-50">Tools & DevOps</h3>
              <p className="text-base">Git, Vercel, Lovable, Antigravity</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold tracking-tight mb-8">Interests & Hobbies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <Camera className="text-zinc-700 dark:text-zinc-300 mb-3" size={28} />
              <span className="font-medium text-zinc-900 dark:text-zinc-100">Photography</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <Plane className="text-zinc-700 dark:text-zinc-300 mb-3" size={28} />
              <span className="font-medium text-zinc-900 dark:text-zinc-100">Traveling</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <Laptop className="text-zinc-700 dark:text-zinc-300 mb-3" size={28} />
              <span className="font-medium text-zinc-900 dark:text-zinc-100">Gaming</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <Coffee className="text-zinc-700 dark:text-zinc-300 mb-3" size={28} />
              <span className="font-medium text-zinc-900 dark:text-zinc-100">Coffee Brewing</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
