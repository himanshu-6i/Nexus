import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageSquare, User, AtSign, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || serviceId === 'your_service_id') {
      // Fallback for demo purposes if keys aren't set yet
      console.warn('EmailJS keys not configured. Simulating success for demo.');
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      }, 1500);
      return;
    }

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );
      
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Failed to send email:', err);
      setError('Failed to send message. Please try again later or contact me directly via email.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-7xl mb-8">Let's <span className="text-gradient">Collaborate</span></h1>
            <p className="text-slate-400 text-lg mb-12 max-w-md">
              Have a project in mind or just want to say hello? Drop me a message and I'll get back to you 
              within 24 hours.
            </p>

            <div className="space-y-8">
              {[
                { icon: Mail, label: 'Email', value: 'poojaloth9216@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+91 (XXX) 000-0000' },
                { icon: MapPin, label: 'Location', value: 'India' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">{item.label}</p>
                    <p className="text-xl text-white font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-8 md:p-12 rounded-[3rem] relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
            
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10" />
                </div>
                <h2 className="text-3xl mb-4">Message Sent!</h2>
                <p className="text-slate-400 mb-8">Thank you for reaching out. I'll get back to you soon.</p>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-primary font-bold hover:underline"
                  >
                    Send another message
                  </button>
                  <Link
                    to="/"
                    className="glass px-6 py-3 rounded-full text-white font-semibold hover:bg-white/10 transition-colors inline-block mx-auto"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl flex items-center gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-2 flex items-center gap-2">
                    <User className="w-4 h-4" /> Full Name
                  </label>
                  <input
                    required
                    name="from_name"
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-2 flex items-center gap-2">
                    <AtSign className="w-4 h-4" /> Email Address
                  </label>
                  <input
                    required
                    name="reply_to"
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Your Message
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
