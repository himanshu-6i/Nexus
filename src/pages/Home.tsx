import { motion } from 'motion/react';
import { ArrowRight, Code, Palette, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-[400px] right-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full -z-10" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-primary text-sm font-bold mb-6">
              <Star className="w-4 h-4 fill-primary" />
              Available for Freelance Projects
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
              Building the <span className="text-gradient">Next Generation</span> <br />
              of Digital Experiences
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              I'm a full-stack developer and designer specializing in high-performance web applications 
              and intelligent AI-driven solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/portfolio"
                className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 group"
              >
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/ai-tools"
                className="w-full sm:w-auto glass text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Explore AI Tools
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 max-w-4xl mx-auto"
          >
            {[
              { label: 'Projects Completed', value: '50+' },
              { label: 'Happy Clients', value: '30+' },
              { label: 'Years Experience', value: '5+' },
              { label: 'AI Tools Built', value: '12' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-display font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl mb-4">My Expertise</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Combining technical excellence with creative vision to deliver outstanding results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Web Development',
                desc: 'Building scalable, responsive, and high-performance web applications using modern frameworks.',
                icon: Code,
                color: 'from-blue-500 to-cyan-400',
              },
              {
                title: 'UI/UX Design',
                desc: 'Creating intuitive and visually stunning interfaces that provide seamless user experiences.',
                icon: Palette,
                color: 'from-purple-500 to-pink-400',
              },
              {
                title: 'Graphic & Logo Design',
                desc: 'Crafting unique brand identities and visual assets that resonate with your target audience.',
                icon: Palette,
                color: 'from-green-500 to-emerald-400',
              },
              {
                title: 'AI Integration',
                desc: 'Leveraging large language models and machine learning to build intelligent features.',
                icon: Zap,
                color: 'from-orange-500 to-yellow-400',
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="glass p-8 rounded-3xl relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 blur-2xl group-hover:opacity-20 transition-opacity`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <service.icon className="text-white w-7 h-7" />
                </div>
                <h3 className="text-2xl mb-4">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {service.desc}
                </p>
                <Link to="/portfolio" className="text-white font-semibold flex items-center gap-2 group/link">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full" />
          
          <h2 className="text-4xl md:text-6xl mb-8 relative z-10">
            Ready to start your <br />
            <span className="text-gradient">next big project?</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Whether you need a custom web application, a brand redesign, or AI implementation, 
            I'm here to help you succeed.
          </p>
          <Link
            to="/contact"
            className="inline-flex bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/30 relative z-10"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
