import { useState } from 'react'
import Button from '../Button'

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Call backend which calls ML model
      const response = await fetch('http://localhost:3001/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: parseFloat(formData.age),
          bmi: parseFloat(formData.bmi),
          bp_systolic: parseFloat(formData.bp_systolic),
          fasting_glucose: parseFloat(formData.fasting_glucose),
          familyHistory: formData.familyHistory,
          activityLevel: formData.activityLevel
        })
      })

      if (!response.ok) {
        throw new Error('Prediction failed')
      }

      const mlPrediction = await response.json()
      const probability = Math.round(mlPrediction.probability * 100)
      
      let riskLevel, riskColor, advice, riskGradient

      if (probability < 40) {
        riskLevel = 'Low Risk'
        riskColor = 'text-green-400'
        riskGradient = 'from-green-500/10 to-slate-900'
        advice = 'Your risk level is low. Continue to maintain a healthy lifestyle, including a balanced diet and regular physical activity. Regular check-ups are still recommended.'
      } else if (probability < 70) {
        riskLevel = 'Medium Risk'
        riskColor = 'text-yellow-400'
        riskGradient = 'from-yellow-500/10 to-slate-900'
        advice = 'You are at a medium risk. It is advisable to focus on lifestyle modifications. Increase physical activity, monitor your diet closely, and consider consulting a doctor for personalized advice.'
      } else {
        riskLevel = 'High Risk'
        riskColor = 'text-red-400'
        riskGradient = 'from-red-500/10 to-slate-900'
        advice = 'You are at a high risk. It is strongly recommended to consult a healthcare professional for a comprehensive evaluation and guidance. Immediate lifestyle changes in diet and exercise are crucial.'
      }

      const features = Object.entries(mlPrediction.feature_importance || {}).map(([name, importance]) => ({
        name,
        contribution: importance * 40
      })).sort((a, b) => b.contribution - a.contribution)

      setResult({ probability, riskLevel, riskColor, riskGradient, advice, features })
    } catch (error) {
      console.error('Error:', error)
      alert('Error making prediction. Make sure both servers are running: npm run dev:all')
    }
  }

  return (
    <section id="predictor" className="section-card">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 h-8 w-8">
            <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"></path>
            <path d="M15 7h6v6"></path>
          </svg>
          Risk Predictor
        </h2>
        <p className="text-center text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">Enter your details below to get a personalized risk assessment for diabetes and hypertension.</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/50 p-8 rounded-2xl border border-slate-700">
          <div>
            <label className="block text-sm font-medium text-slate-300">Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:border-indigo-500 text-white p-2 transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Sex</label>
            <select name="sex" value={formData.sex} onChange={handleChange} required className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:border-indigo-500 text-white p-2 transition">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Height (cm)</label>
            <input type="number" name="height" value={formData.height} onChange={handleChange} required className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:border-indigo-500 text-white p-2 transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Weight (kg)</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} required className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:border-indigo-500 text-white p-2 transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">BMI</label>
            <input type="text" name="bmi" value={formData.bmi} readOnly className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md shadow-sm text-slate-400 p-2 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Family History of Diabetes/Hypertension</label>
            <select name="familyHistory" value={formData.familyHistory} onChange={handleChange} required className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:border-indigo-500 text-white p-2 transition">
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Blood Pressure (Systolic)</label>
            <input type="number" name="bp_systolic" value={formData.bp_systolic} onChange={handleChange} required className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:border-indigo-500 text-white p-2 transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Fasting Glucose (mg/dL) (Optional)</label>
            <input type="number" name="fasting_glucose" value={formData.fasting_glucose} onChange={handleChange} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:border-indigo-500 text-white p-2 transition" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300">Physical Activity Level</label>
            <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} required className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:border-indigo-500 text-white p-2 transition">
              <option value="0">Sedentary (little or no exercise)</option>
              <option value="1">Lightly active (light exercise/sports 1-3 days/week)</option>
              <option value="2">Moderately active (moderate exercise/sports 3-5 days/week)</option>
              <option value="3">Very active (hard exercise/sports 6-7 days a week)</option>
            </select>
          </div>

          <div className="md:col-span-2 text-center">
            <Button 
              type="submit" 
              variant="primary" 
              size="lg"
              icon="🔍"
              className="w-full md:w-auto"
            >
              Analyze My Risk
            </Button>
          </div>
        </form>

        {result && (
          <div className={`mt-10 bg-gradient-to-br ${result.riskGradient} p-6 rounded-lg shadow-lg fade-in border border-slate-700`}>
            <h3 className="text-2xl font-bold text-center mb-4 text-white">Prediction Result</h3>
            <div className="text-center mb-6">
              <span className={`px-4 py-2 rounded-full font-semibold ${result.riskColor}`}>{result.riskLevel}</span>
              <p className="text-5xl font-bold mt-2 text-white">{result.probability}%</p>
              <p className="text-slate-400">Risk Probability</p>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-slate-300">Key Contributing Factors:</h4>
              <div className="space-y-2">
                {result.features.map((f, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="w-1/3 text-sm text-slate-400">{f.name}</span>
                    <div className="w-2/3 bg-slate-700 rounded-full h-4">
                      <div className="bg-indigo-500 h-4 rounded-full" style={{ width: `${f.contribution * 100 / 40}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-slate-300">Personalized Advice:</h4>
              <p className="text-slate-400">{result.advice}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
