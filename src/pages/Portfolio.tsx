import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Layers, Globe, Smartphone, ArrowUpDown, Calendar, Type, ChevronDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import ProjectModal from '../components/ProjectModal';
import { cn } from '@/src/lib/utils';

const projects = [
  {
    title: 'Nexus AI Dashboard',
    category: 'Web Application',
    image: 'https://picsum.photos/seed/dashboard/800/600',
    tags: ['React', 'Tailwind', 'Gemini API'],
    description: 'A cutting-edge AI-powered dashboard that provides real-time analytics and intelligent insights for modern enterprises. Built with React and integrated with the Gemini API for advanced data processing.',
    date: '2024-03-15',
    client: 'Nexus AI',
    link: '#',
    github: '#',
    icon: Layers,
  },
  {
    title: 'CryptoFlow Platform',
    category: 'Fintech',
    image: 'https://picsum.photos/seed/crypto/800/600',
    tags: ['Next.js', 'TypeScript', 'Web3'],
    description: 'A comprehensive Web3 financial platform designed for seamless cryptocurrency transactions and portfolio management. Features real-time price tracking and secure wallet integration.',
    date: '2024-01-20',
    client: 'FinTech Solutions',
    link: '#',
    github: '#',
    icon: Globe,
  },
  {
    title: 'Lumina Design System',
    category: 'UI/UX Design',
    image: 'https://picsum.photos/seed/design/800/600',
    tags: ['Figma', 'React', 'Storybook'],
    description: 'A robust and scalable design system built to ensure visual consistency across multiple digital products. Includes a comprehensive library of reusable components and detailed documentation.',
    date: '2023-11-10',
    client: 'Creative Studio',
    link: '#',
    github: '#',
    icon: Layers,
  },
  {
    title: 'EcoTrack Mobile',
    category: 'Mobile App',
    image: 'https://picsum.photos/seed/mobile/800/600',
    tags: ['React Native', 'Firebase'],
    description: 'A mobile application dedicated to helping users track their carbon footprint and discover sustainable lifestyle choices. Built with React Native and powered by Firebase for real-time data sync.',
    date: '2023-09-05',
    client: 'EcoWatch NGO',
    link: '#',
    github: '#',
    icon: Smartphone,
  },
  {
    title: 'Zenith E-commerce',
    category: 'E-commerce',
    image: 'https://picsum.photos/seed/shop/800/600',
    tags: ['Shopify', 'Liquid', 'Tailwind'],
    description: 'A high-performance e-commerce storefront optimized for conversion and speed. Features a custom Shopify theme with advanced filtering and a seamless checkout experience.',
    date: '2023-07-15',
    client: 'Zenith Retail',
    link: '#',
    github: '#',
    icon: Globe,
  },
  {
    title: 'Aura Social Hub',
    category: 'Social Media',
    image: 'https://picsum.photos/seed/social/800/600',
    tags: ['Node.js', 'Socket.io', 'React'],
    description: 'A real-time social networking platform that emphasizes community engagement and instant communication. Leverages Socket.io for low-latency messaging and dynamic content updates.',
    date: '2023-05-12',
    client: 'Social Connect',
    link: '#',
    github: '#',
    icon: Layers,
  },
];

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [sortBy]);

  const sortOptions: { value: SortOption; label: string; icon: any }[] = [
    { value: 'newest', label: 'Newest First', icon: Calendar },
    { value: 'oldest', label: 'Oldest First', icon: Calendar },
    { value: 'title-asc', label: 'Title (A-Z)', icon: Type },
    { value: 'title-desc', label: 'Title (Z-A)', icon: Type },
  ];

  const currentSort = sortOptions.find(opt => opt.value === sortBy);

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-7xl mb-6">Selected <span className="text-gradient">Works</span></h1>
            <p className="text-slate-400 max-w-2xl text-lg">
              A collection of projects where I've combined design thinking with technical precision 
              to solve complex problems.
            </p>
          </motion.div>

          {/* Sorting UI */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="glass px-6 py-3 rounded-2xl flex items-center gap-3 text-white hover:bg-white/10 transition-all min-w-[200px] justify-between group"
            >
              <div className="flex items-center gap-2">
                {currentSort && <currentSort.icon className="w-4 h-4 text-primary" />}
                <span className="font-semibold text-sm">{currentSort?.label}</span>
              </div>
              <ChevronDown className={cn("w-4 h-4 transition-transform", isSortOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-full min-w-[200px] glass rounded-2xl overflow-hidden z-20 p-2 shadow-2xl border-white/10"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                        sortBy === option.value 
                          ? "bg-primary text-white" 
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <option.icon className="w-4 h-4" />
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {sortedProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative cursor-pointer"
                onClick={() => openModal(project)}
              >
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 glass">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                    <div
                      className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    <div
                      className="w-12 h-12 rounded-full glass text-white flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Github className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="px-2">
                  <div className="flex items-center gap-2 text-primary text-sm font-bold mb-2 uppercase tracking-widest">
                    <project.icon className="w-4 h-4" />
                    {project.category}
                  </div>
                  <h3 className="text-2xl text-white mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="px-3 py-1 rounded-full bg-white/5 text-xs text-slate-400 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
