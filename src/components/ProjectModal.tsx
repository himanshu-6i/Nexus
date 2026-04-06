import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Calendar, User, Tag } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  const formattedDate = project.date 
    ? new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'Oct 2025';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#030712]/90 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass rounded-[2.5rem] shadow-2xl shadow-primary/10 border-white/10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 rounded-full glass hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Section */}
              <div className="relative aspect-video lg:aspect-auto lg:h-full min-h-[300px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent lg:hidden" />
              </div>

              {/* Info Section */}
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-2 text-primary text-sm font-bold mb-4 uppercase tracking-widest">
                  <project.icon className="w-4 h-4" />
                  {project.category}
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                  {project.title}
                </h2>
                
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  {project.description || "A comprehensive digital solution built with cutting-edge technologies to deliver exceptional user experiences and meet complex business requirements."}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-primary">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Date</p>
                      <p className="text-sm font-semibold">{formattedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-primary">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Client</p>
                      <p className="text-sm font-semibold">{project.client || 'Nexus Corp'}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-4 flex items-center gap-2">
                    <Tag className="w-3 h-3" /> Technologies Used
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string, j: number) => (
                      <span key={j} className="px-4 py-2 rounded-xl bg-white/5 text-sm text-slate-300 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={project.link}
                    className="flex-1 bg-white text-black px-8 py-4 rounded-2xl font-bold text-center hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Preview
                  </a>
                  <a
                    href={project.github}
                    className="flex-1 glass text-white px-8 py-4 rounded-2xl font-bold text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
