import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dumbbell, Filter } from 'lucide-react'

const exerciseData = [
  // Cardio
  { id: 1, name: 'Brisk Walking', category: 'Cardio', intensity: 'Low', description: 'Aim for 30 minutes most days. Great for overall heart health without joint strain.', cautions: null, image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=500&q=80' },
  { id: 2, name: 'Running / Jogging', category: 'Cardio', intensity: 'High', description: 'Effective high-impact cardio. Burns major calories and builds endurance.', cautions: 'Can be stressful on joints (knees, hips). Consult a doctor if you have joint pain.', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=500&q=80' },
  { id: 3, name: 'Cycling', category: 'Cardio', intensity: 'Medium', description: 'Excellent cardiovascular health and very gentle on the joints.', cautions: null, image: 'https://images.unsplash.com/photo-1517649712541-2bf453038ced?auto=format&fit=crop&w=500&q=80' },
  { id: 4, name: 'HIIT', category: 'Cardio', intensity: 'High', description: 'High-Intensity Interval Training. Short bursts of intense exercise.', cautions: 'Not advised for uncontrolled hypertension.', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80' },
  
  // Strength
  { id: 5, name: 'Bodyweight Squats', category: 'Strength', intensity: 'Medium', description: 'Strengthens legs and core. Start with 3 sets of 10-12 reps.', cautions: 'Keep back straight. Stop if you feel sharp spinal pain.', image: 'https://images.unsplash.com/photo-1534438097544-e22119ebdd92?auto=format&fit=crop&w=500&q=80' },
  { id: 6, name: 'Dumbbell Training', category: 'Strength', intensity: 'Medium', description: 'Resistance training drastically improves insulin sensitivity.', cautions: 'Avoid heavy overhead lifting if you have high blood pressure.', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=500&q=80' },
  
  // Yoga
  { id: 7, name: 'Downward Dog Pose', category: 'Yoga', intensity: 'Low', description: 'Stretches the entire body, builds arm strength, and improves blood flow to the brain.', cautions: 'Avoid if you have severe carpal tunnel syndrome.', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80' },
  { id: 8, name: 'Warrior II Pose', category: 'Yoga', intensity: 'Medium', description: 'Builds stamina, stretches hips, and improves balance and focus.', cautions: null, image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=500&q=80' },
  { id: 9, name: 'Cobra Pose', category: 'Yoga', intensity: 'Low', description: 'Opens the chest, strengthens the spine, and soothes sciatica.', cautions: 'Avoid during pregnancy or with severe back injuries.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=80' },
  { id: 10, name: 'Tree Pose', category: 'Yoga', intensity: 'Low', description: 'Enhances physical balance and mental concentration.', cautions: 'Use a wall for support if you struggle with vertigo.', image: 'https://images.unsplash.com/photo-1588286840104-8957b0197274?auto=format&fit=crop&w=500&q=80' },
  
  // Swimming
  { id: 11, name: 'Freestyle Swimming', category: 'Swimming', intensity: 'Medium', description: 'A massive full-body workout. Excellent for cardio and strength with zero joint impact.', cautions: null, image: 'https://images.unsplash.com/photo-1519315901367-f34f9274ceb0?auto=format&fit=crop&w=500&q=80' },
  { id: 12, name: 'Breaststroke', category: 'Swimming', intensity: 'Low', description: 'Gentle pace. Great for chest and leg muscle toning.', cautions: null, image: 'https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=500&q=80' },
]

export default function FitnessSection() {
  const [currentCategory, setCurrentCategory] = useState('all')

  const filteredExercises = currentCategory === 'all' 
    ? exerciseData 
    : exerciseData.filter(ex => ex.category.toLowerCase() === currentCategory.toLowerCase())

  return (
    <section id="fitness" className="section-card py-24 relative flex items-center justify-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] opacity-40 mix-blend-screen -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px] opacity-30 mix-blend-screen -translate-y-1/2"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10 px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-cyan-500/20 rounded-2xl mb-4 shadow-lg shadow-cyan-500/10 backdrop-blur-md">
            <Dumbbell className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6 tracking-tight">
            FitFlow Movements
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Discover safe, beautiful, and highly effective exercises tailored for all mobility levels. Explore cardio routines or deeply stretch with our guided yoga poses.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-12 flex flex-col items-center">
          <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-700/50 backdrop-blur-md shadow-2xl flex flex-col md:flex-row gap-4 justify-center">
            <span className="text-xs uppercase tracking-widest font-bold text-slate-500 flex items-center gap-1"><Filter size={12}/> Filter Routine</span>
            <div className="flex flex-wrap justify-center gap-2">
              {['all', 'Yoga', 'Swimming', 'Cardio', 'Strength'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setCurrentCategory(cat)} 
                  className={`py-1.5 px-4 text-sm font-semibold rounded-xl transition-all duration-300 border ${
                    currentCategory.toLowerCase() === cat.toLowerCase() 
                      ? 'bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/30' 
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {cat === 'all' ? 'All Exercises' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Area */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredExercises.map((exercise, index) => {
              let intensityBadge = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              if (exercise.intensity === 'Medium') intensityBadge = 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              if (exercise.intensity === 'High') intensityBadge = 'bg-rose-500/20 text-rose-400 border-rose-500/30'

              return (
                <motion.div
                  key={exercise.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-slate-700/50 flex flex-col group hover:border-cyan-500/50 hover:shadow-cyan-500/10 transition-all duration-300"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-700">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
                    <img 
                      src={exercise.image} 
                      alt={exercise.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-3 right-3 z-20">
                      <span className={`border text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md backdrop-blur-sm ${intensityBadge}`}>
                        {exercise.intensity} Impact
                      </span>
                    </div>
                    <div className="absolute top-3 left-3 z-20">
                      <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border border-slate-700">
                        {exercise.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="font-bold text-lg text-white mb-2 group-hover:text-cyan-400 transition-colors">{exercise.name}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow">{exercise.description}</p>
                    
                    {exercise.cautions && (
                      <div className="mt-auto p-3 bg-rose-900/20 border border-rose-500/30 rounded-xl">
                        <p className="text-rose-300/90 text-xs font-medium leading-relaxed">
                          <strong className="text-rose-400 font-bold block mb-0.5">Note:</strong> 
                          {exercise.cautions}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
