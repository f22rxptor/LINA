import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, ArrowRight, ShieldAlert, ShieldCheck, Trophy, HeartPulse, Utensils, Dumbbell } from 'lucide-react'

export default function PredictorSection() {
  const [formData, setFormData] = useState({
    age: '',
    sex: 'Male',
    height: '',
    weight: '',
    bmi: '',
    familyHistory: '0',
    bp_systolic: '',
    fasting_glucose: '',
    activityLevel: '0'
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const calculateBMI = (height, weight) => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2)
      return parseFloat(bmi)
    }
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let newData = { ...formData, [name]: value }
    
    if (name === 'height' || name === 'weight') {
      const height = name === 'height' ? parseFloat(value) : parseFloat(formData.height)
      const weight = name === 'weight' ? parseFloat(value) : parseFloat(formData.weight)
      const bmi = calculateBMI(height, weight)
      newData.bmi = bmi ? bmi.toString() : ''
    }
    
    setFormData(newData)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const baseUrl = import.meta.env.VITE_API_URL || ''
      const response = await fetch(`${baseUrl}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: parseFloat(formData.age) || 0,
          bmi: parseFloat(formData.bmi) || 0,
          bp_systolic: parseFloat(formData.bp_systolic) || 0,
          fasting_glucose: parseFloat(formData.fasting_glucose) || 0,
          familyHistory: parseFloat(formData.familyHistory) || 1,
          activityLevel: parseFloat(formData.activityLevel) || 0,
          cholesterol: 200,
          yearsCondition: 0
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Prediction failed: ${response.statusText}`)
      }

      const mlPrediction = await response.json()
      const probability = Math.round(mlPrediction.probability * 100)
      
      let riskLevel, riskColor, advice, riskGradient, shadowColor, icon, dietRec, exerciseRec

      if (probability < 40) {
        riskLevel = 'Low Risk'
        riskColor = 'text-emerald-400'
        riskGradient = 'from-emerald-900/40 to-slate-900/80'
        shadowColor = 'shadow-emerald-500/20'
        icon = <Trophy size={120} className="text-emerald-400/20" />
        advice = 'Great going! Your health is in excellent shape. There is absolutely nothing to worry about right now. Keep up the phenomenal work by maintaining your current balanced lifestyle.'
        dietRec = 'Mediterranean or Balanced Global Diet.'
        exerciseRec = 'Maintain your current routine. Try adding some Swimming for full-body conditioning.'
      } else if (probability < 70) {
        riskLevel = 'Medium Risk'
        riskColor = 'text-amber-400'
        riskGradient = 'from-amber-900/40 to-slate-900/80'
        shadowColor = 'shadow-amber-500/20'
        icon = <HeartPulse size={120} className="text-amber-400/20" />
        advice = "Don't panic! This is just an early indicator and not a diagnosis. Making a few small, positive lifestyle changes now can completely reverse this trend. You've got this!"
        dietRec = 'Low GI foods. Try Indian Dal Tadka or American Caesar Salads.'
        exerciseRec = 'Moderate Cardio & Light Strength Training. Walking and Yoga are perfect.'
      } else {
        riskLevel = 'High Risk'
        riskColor = 'text-rose-400'
        riskGradient = 'from-rose-900/40 to-slate-900/80'
        shadowColor = 'shadow-rose-500/20'
        icon = <ShieldAlert size={120} className="text-rose-400/20" />
        advice = 'Please stay calm. While your risk shows as elevated, these conditions are highly manageable with the right guidance. We recommend consulting a healthcare professional to build a plan.'
        dietRec = 'Strict Low Carbohydrate, High Fiber Diet. Avoid refined sugars like Gulab Jamun.'
        exerciseRec = 'Supervised Low-Impact Cardio. Recommend Swimming and gentle Yoga poses.'
      }

      const features = Object.entries(mlPrediction.feature_importance || {}).map(([name, importance]) => ({
        name,
        contribution: importance * 40
      })).sort((a, b) => b.contribution - a.contribution)

      setTimeout(() => {
        setResult({ probability, riskLevel, riskColor, riskGradient, shadowColor, advice, features, icon, dietRec, exerciseRec })
        setLoading(false)
      }, 800)
    } catch (error) {
      console.error('Prediction Error:', error)
      const errorMsg = error.message || 'Error making prediction'
      alert(errorMsg)
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="predictor" className="section-card py-20 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-50"></div>

      <motion.div 
        className="w-full max-w-4xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/20 rounded-2xl mb-4 text-indigo-400">
            <Activity size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-4 tracking-tight">
            Risk Predictor
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Advanced ML analysis to determine your risk probability for diabetes and hypertension based on key health indicators.
          </p>
        </motion.div>

        <motion.form 
          variants={itemVariants}
          onSubmit={handleSubmit} 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 shadow-xl"
        >
          {Object.entries({
            age: { label: 'Age', type: 'number' },
            sex: { label: 'Sex', type: 'select', options: ['Male', 'Female'] },
            height: { label: 'Height (cm)', type: 'number' },
            weight: { label: 'Weight (kg)', type: 'number' },
            bmi: { label: 'BMI (Calculated)', type: 'text', readOnly: true },
            familyHistory: { label: 'Family History of Diabetes/BP', type: 'select', options: [{val: '0', text: 'No'}, {val: '1', text: 'Yes'}] },
            bp_systolic: { label: 'Blood Pressure (Systolic)', type: 'number' },
            fasting_glucose: { label: 'Fasting Glucose (mg/dL) (Optional)', type: 'number' },
            activityLevel: { 
              label: 'Physical Activity Level', 
              type: 'select', 
              options: [
                {val: '0', text: 'Sedentary'},
                {val: '1', text: 'Lightly Active'},
                {val: '2', text: 'Moderately Active'},
                {val: '3', text: 'Very Active'}
              ],
              fullWidth: true
            }
          }).map(([key, config]) => (
            <div key={key} className={config.fullWidth ? "md:col-span-2" : ""}>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">{config.label}</label>
              {config.type === 'select' ? (
                <select 
                  name={key} 
                  value={formData[key]} 
                  onChange={handleChange} 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none"
                >
                  {config.options.map(opt => 
                    typeof opt === 'string' 
                      ? <option key={opt}>{opt}</option> 
                      : <option key={opt.val} value={opt.val}>{opt.text}</option>
                  )}
                </select>
              ) : (
                <input 
                  type={config.type} 
                  name={key} 
                  value={formData[key]} 
                  onChange={handleChange} 
                  readOnly={config.readOnly}
                  className={`w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all ${config.readOnly ? 'opacity-70 cursor-not-allowed bg-slate-800/50' : ''}`}
                />
              )}
            </div>
          ))}

          <div className="md:col-span-2 pt-4">
            <button 
              type="submit"
              disabled={loading}
              className="w-full group relative flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">Run AI Analysis</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </motion.form>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className={`mt-12 bg-gradient-to-br ${result.riskGradient} p-8 rounded-3xl border border-slate-700/50 shadow-2xl ${result.shadowColor} relative overflow-hidden`}
          >
            {/* dynamic abstract shape in background */}
            <div className="absolute top-0 right-0 pt-4 pr-4">
              {result.icon}
            </div>

            <div className="relative z-10">
              <div className="text-center mb-10">
                <span className={`inline-block px-5 py-2 rounded-full font-bold text-sm mb-4 bg-slate-900/50 border border-current ${result.riskColor}`}>
                  {result.riskLevel}
                </span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-7xl font-black ${result.riskColor}`}>{result.probability}</span>
                  <span className="text-3xl text-slate-400 font-bold">%</span>
                </div>
                <p className="text-slate-400 mt-2 font-medium">Calculated Risk Probability</p>
              </div>
              
              {/* Personalized AI Reassurance Message */}
              <div className="mb-10 p-6 bg-slate-900/60 rounded-2xl border border-slate-700/50 text-center shadow-lg">
                <h4 className="text-white font-bold text-xl mb-2">AI Assessment</h4>
                <p className="text-slate-300 text-lg leading-relaxed">{result.advice}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                 {/* Reccomendation: Diet */}
                 <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-700/30 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                      <Utensils size={20} />
                    </div>
                    <h4 className="font-bold text-white">Suggested Diet</h4>
                  </div>
                  <p className="text-slate-400 text-sm mb-6 flex-grow">{result.dietRec}</p>
                  <button onClick={() => scrollToSection('nutrition')} className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl text-sm font-bold transition-colors">
                    View Diet Plan →
                  </button>
                 </div>

                 {/* Reccomendation: Exercise */}
                 <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-700/30 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
                      <Dumbbell size={20} />
                    </div>
                    <h4 className="font-bold text-white">Suggested Exercise</h4>
                  </div>
                  <p className="text-slate-400 text-sm mb-6 flex-grow">{result.exerciseRec}</p>
                  <button onClick={() => scrollToSection('fitness')} className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-xl text-sm font-bold transition-colors">
                    View Workouts →
                  </button>
                 </div>
              </div>

              {/* Key Factors Chart */}
              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-700/30">
                  <h4 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
                    <Activity size={18} className="text-indigo-400" /> Key Prediction Factors
                  </h4>
                  <div className="space-y-5">
                    {result.features.map((f, idx) => (
                      <div key={idx} className="relative">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-300 font-medium capitalize">{f.name.replace(/_/g, ' ')}</span>
                          <span className="text-slate-500 font-bold text-xs">{(f.contribution * 100 / 40).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden shadow-inner">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${f.contribution * 100 / 40}%` }}
                            transition={{ duration: 1.5, delay: 0.2 + (idx * 0.1), ease: "easeOut" }}
                            className={`h-full rounded-full ${result.riskColor.replace('text-', 'bg-')} relative`}
                          >
                            <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>

            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
