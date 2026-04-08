import { motion } from 'framer-motion'
import { Target, HeartPulse, ShieldCheck, Zap } from 'lucide-react'

export default function AimSection() {
  const aims = [
    {
      title: 'Proactive Health',
      description: 'Shifting from reactive treatments to predicting and preventing health issues before they become critical.',
      icon: <Target size={32} />
    },
    {
      title: 'Global Accessibility',
      description: 'Making highly accurate, AI-driven medical insights available to anyone, anywhere in the world instantly.',
      icon: <ShieldCheck size={32} />
    },
    {
      title: 'Personalized Lifestyle',
      description: 'Providing tailored nutritional and fitness plans that dynamically adapt to your unique biometric markers.',
      icon: <HeartPulse size={32} />
    }
  ]

  return (
    <section id="aim" className="section-card py-20 relative flex items-center justify-center">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] opacity-40 mix-blend-screen"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[100px] opacity-30 mix-blend-screen"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/20 rounded-2xl mb-6 shadow-lg shadow-indigo-500/20 backdrop-blur-md">
            <Zap className="w-8 h-8 text-indigo-400" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-slate-400 mb-6 tracking-tight">
            Our Mission
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            We are building the next generation of intelligent healthcare—an ecosystem designed to empower individuals with predictive analytics, actionable insights, and an AI companion that scales to your lifestyle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aims.map((aim, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative p-8 rounded-3xl bg-slate-900/50 border border-slate-700/50 backdrop-blur-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300 shadow-lg shadow-indigo-500/20">
                {aim.icon}
              </div>
              
              <h4 className="text-2xl font-bold text-white mb-4">{aim.title}</h4>
              <p className="text-slate-400 leading-relaxed font-medium">
                {aim.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
