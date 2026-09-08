import { motion } from 'motion/react';
import { ExternalLink, Github, Award, CheckCircle2, Sparkles, Target } from 'lucide-react';

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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Featured Work</h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-lg"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Column: Context & Overview */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6 w-fit">
                <Award size={16} />
                <span>Prompt Wars @ S.R.M Institute</span>
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">ASSEMBLI</h3>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                An AI-powered team formation platform designed to understand what you're building, analyze your existing team, identify gaps, and recommend the people who can actually complete it.
              </p>
              
              <div className="bg-white dark:bg-zinc-800/50 rounded-2xl p-6 mb-8 border border-zinc-200 dark:border-zinc-700/50 shadow-sm">
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-2 uppercase tracking-wider font-semibold">The Core Philosophy</p>
                <p className="font-medium text-lg italic text-zinc-800 dark:text-zinc-200 mb-4">
                  "Instead of simply asking: <span className="text-blue-600 dark:text-blue-400 font-semibold">Who do you want to find?</span><br/>
                  ASSEMBLI asks: <span className="text-blue-600 dark:text-blue-400 font-semibold">What is your team missing?</span>"
                </p>
                <div className="flex gap-3 items-start">
                  <Sparkles className="text-blue-500 shrink-0 mt-1" size={20} />
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    <strong className="text-zinc-900 dark:text-zinc-100">Complementarity over similarity.</strong> A good teammate isn't necessarily someone who has the same skills as you. It's someone who fills the gap you can't.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {['Google AI Studio', 'AntiGravity', 'Vercel'].map((tech, i) => (
                  <span key={i} className="px-4 py-1.5 text-sm font-medium bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="https://assembli-md.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors">
                  <ExternalLink size={18} />
                  View Live Platform
                </a>
                <a href="https://github.com/Mahtab-MD" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white px-6 py-3 rounded-full font-medium transition-colors">
                  <Github size={18} />
                  Source Code
                </a>
              </div>
            </div>

            {/* Right Column: Features */}
            <div className="bg-zinc-100 dark:bg-zinc-950/50 p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800 flex flex-col justify-center">
              <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                <Target className="text-blue-600 dark:text-blue-400" size={28} />
                Platform Features
              </h4>
              
              <ul className="space-y-6">
                {[
                  'AI-powered project understanding',
                  'Team gap analysis',
                  'Semantic candidate matching',
                  'AI reasoning behind recommendations',
                  'Manual talent search when you want more control',
                  'Team simulation to see how adding a candidate changes the team',
                  'A complete workflow from Project → Gap → Match → Team'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={24} />
                    <span className="text-zinc-700 dark:text-zinc-300 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
