import { motion } from 'motion/react';
import React, { useState, useRef } from 'react';
import { Sparkles, FileText, MessageSquare, Wand2, Copy, Check, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { GoogleGenAI } from "@google/genai";

const tools = [
  {
    id: 'resume',
    name: 'Resume Optimizer',
    desc: 'Enhance your resume with AI-powered keywords and bullet points. You can also upload an image of a job description.',
    icon: FileText,
    color: 'from-blue-500 to-cyan-400',
    prompt: 'Optimize the following resume content for better impact and clarity. Use professional keywords and bullet points. If an image is provided, tailor the optimization to the job description in the image: ',
    allowImage: true,
  },
  {
    id: 'caption',
    name: 'Social Caption Gen',
    desc: 'Generate viral captions for Instagram, LinkedIn, and Twitter. Upload an image to get context-aware captions.',
    icon: MessageSquare,
    color: 'from-purple-500 to-pink-400',
    prompt: 'Generate 3 viral social media captions (Instagram, LinkedIn, Twitter) for the following topic or image. Include relevant emojis and hashtags: ',
    allowImage: true,
  },
  {
    id: 'code',
    name: 'Code Explainer',
    desc: 'Paste complex code or upload an image of code to get a simple, clear explanation.',
    icon: Wand2,
    color: 'from-orange-500 to-yellow-400',
    prompt: 'Explain the following code snippet or image in simple, clear terms. Break down what it does step-by-step: ',
    allowImage: true,
  },
];

export default function AITools() {
  const [activeTool, setActiveTool] = useState(tools[0]);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleGenerate = async () => {
    if (!input.trim() && !selectedImage) return;
    setLoading(true);
    setOutput('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-3-flash-preview";
      
      let contents: any = [];
      
      if (selectedImage) {
        const base64Data = selectedImage.split(',')[1];
        const mimeType = selectedImage.split(';')[0].split(':')[1];
        contents.push({
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        });
      }

      const promptText = `${activeTool.prompt}\n\n${input}`;
      contents.push({ text: promptText });

      const response = await ai.models.generateContent({
        model: model,
        contents: contents,
      });

      setOutput(response.text || 'No response generated.');
    } catch (error) {
      console.error('AI Generation Error:', error);
      setOutput('Sorry, there was an error generating the result. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-secondary text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              Powered by Gemini Pro
            </div>
            <h1 className="text-5xl md:text-7xl mb-6">AI <span className="text-gradient">Toolbox</span></h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Boost your productivity with my custom-built AI tools designed for 
              creatives, developers, and entrepreneurs.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTool(tool);
                  setOutput('');
                  setInput('');
                }}
                className={cn(
                  'w-full text-left p-6 rounded-3xl transition-all duration-300 border flex items-center gap-4 group',
                  activeTool.id === tool.id
                    ? 'glass border-primary/50 shadow-lg shadow-primary/10'
                    : 'border-white/5 hover:border-white/20 hover:bg-white/5'
                )}
              >
                <div className={cn(
                  'w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg',
                  tool.color
                )}>
                  <tool.icon className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className={cn(
                    'font-bold transition-colors',
                    activeTool.id === tool.id ? 'text-white' : 'text-slate-400 group-hover:text-white'
                  )}>
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{tool.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Main Interface */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeTool.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass p-8 rounded-[2.5rem] min-h-[500px] flex flex-col"
            >
              <div className="mb-8">
                <h2 className="text-2xl mb-2 flex items-center gap-3">
                  <activeTool.icon className="text-primary w-6 h-6" />
                  {activeTool.name}
                </h2>
                <p className="text-slate-400">{activeTool.desc}</p>
              </div>

              <div className="flex-1 flex flex-col gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between ml-2">
                    <label className="text-sm font-semibold text-slate-400">Input Details</label>
                    {(activeTool as any).allowImage && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 text-xs font-bold text-primary hover:text-secondary transition-colors"
                      >
                        <ImageIcon className="w-4 h-4" />
                        Add Image
                      </button>
                    )}
                  </div>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  {selectedImage && (
                    <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden glass border border-white/10 mb-4">
                      <img src={selectedImage} alt="Selected" className="w-full h-full object-contain" />
                      <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={activeTool.id === 'resume' ? 'Paste your job description or current bullet points...' : 'Enter your topic or code snippet here...'}
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading || (!input.trim() && !selectedImage)}
                  className="bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Result
                    </>
                  )}
                </button>

                {output && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 relative group"
                  >
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={copyToClipboard}
                        className="p-2 rounded-lg glass hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-slate-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                      {output}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
