import { motion } from 'motion/react';
import { Mail, MessageSquare } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mb-8">
            <MessageSquare size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Let's build something together.</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </p>
          
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mohammad.mahtab1114@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
          >
            <Mail size={20} />
            Say Hello
          </a>
        </motion.div>
      </div>
    </section>
  );
}
