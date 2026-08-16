import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { Menu, X, Cpu, Briefcase, Wrench, Mail, Home } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Portfolio', path: '/portfolio', icon: Briefcase },
  { name: 'AI Tools', path: '/ai-tools', icon: Wrench },
  { name: 'Contact', path: '/contact', icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'bg-[#030712]/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-display font-bold tracking-tighter text-white">
            NEXUS<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1 border-white/5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2',
                location.pathname === item.path
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            to="/contact"
            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-[#030712] border-b border-white/5 p-6 flex flex-col gap-4 md:hidden glass"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex items-center gap-3 p-3 rounded-xl transition-colors',
                location.pathname === item.path ? 'bg-white/10 text-white' : 'text-slate-400'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="bg-primary text-white p-4 rounded-xl text-center font-bold"
          >
            Hire Me
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
