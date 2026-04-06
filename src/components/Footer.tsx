import { Github, Twitter, Linkedin, Mail, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#030712] border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Cpu className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-display font-bold tracking-tighter text-white">
              NEXUS<span className="text-primary">.</span>
            </span>
          </Link>
          <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
            Empowering brands with cutting-edge web development, creative design, and 
            intelligent AI solutions. Let's build the future together.
          </p>
          <div className="flex gap-4">
            {[
              { Icon: Github, href: 'https://github.com/himanshu-6i' },
              { Icon: Twitter, href: '#' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/himanshu-meena-6i/' },
              { Icon: Mail, href: 'mailto:poojaloth9216@gmail.com' }
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/50 transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-slate-400">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
            <li><Link to="/ai-tools" className="hover:text-primary transition-colors">AI Tools</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Services</h4>
          <ul className="space-y-4 text-slate-400">
            <li><span className="hover:text-secondary transition-colors cursor-default">Web Development</span></li>
            <li><span className="hover:text-secondary transition-colors cursor-default">UI/UX Design</span></li>
            <li><span className="hover:text-secondary transition-colors cursor-default">Graphic & Logo Design</span></li>
            <li><span className="hover:text-secondary transition-colors cursor-default">AI Integration</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Nexus AI. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
