import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Assembli',
    description: 'A complete frontend and backend solution built using Google AI Studio and AntiGravity, deployed seamlessly via Vercel.',
    tech: ['Google AI Studio', 'AntiGravity', 'Vercel'],
    github: 'https://github.com/Mahtab-MD',
    link: 'https://assembli-md.vercel.app/',
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-white dark:bg-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Selected Works</h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                    <ExternalLink size={24} />
                  </a>
                </div>
                <div className="flex gap-3">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                    <Github size={20} />
                  </a>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-medium bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
