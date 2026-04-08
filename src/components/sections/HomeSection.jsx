import { motion } from 'framer-motion'
import { Rocket, BookOpen, Activity } from 'lucide-react'
import Button from '../Button'

export default function HomeSection({ onLoginClick }) {
  return (
    <section id="home" className="section-card text-center relative overflow-hidden flex items-center justify-center min-h-[90vh]">
      {/* Animated Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/30 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-indigo-500/30 text-indigo-300 font-medium text-sm mb-8 backdrop-blur-md">
            <Activity size={16} className="text-indigo-400" />
            <span>Next-Generation Health AI</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight tracking-tight mb-8">
            Your Personal AI Agent for a <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">Healthier Lifestyle</span>
          </h1>
        </motion.div>

        <motion.p 
          className="mt-6 text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Early detection and personalized guidance for Diabetes & Hypertension. Take control of your health with AI-powered insights, nutritional guides, and fitness plans.
        </motion.p>
        
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button 
              onClick={onLoginClick}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all text-lg w-full sm:w-auto"
            >
              <Rocket size={20} />
              <span>Get Started Now</span>
            </button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-800/80 hover:bg-slate-700 border border-slate-600 hover:border-indigo-400 text-white font-semibold rounded-xl backdrop-blur-sm transition-all text-lg w-full sm:w-auto"
            >
              <BookOpen size={20} className="text-indigo-400" />
              <span>Learn More</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
