export default function FitnessSection() {
  const exerciseData = [
    { name: 'Brisking Walking', intensity: 'Low', description: 'An excellent low-impact cardio exercise. Aim for 30 minutes most days of the week.', cautions: null },
    { name: 'Cycling', intensity: 'Medium', description: 'Great for cardiovascular health and is gentle on the joints. Can be done outdoors or on a stationary bike.', cautions: null },
    { name: 'Yoga', intensity: 'Low', description: 'Improves flexibility, balance, and can help reduce stress, which is beneficial for blood pressure management.', cautions: 'Avoid certain poses (like deep forward bends or twists) if you have active sciatica. Listen to your body.' },
    { name: 'Swimming', intensity: 'Low', description: 'A full-body workout that is very easy on the joints. Excellent for cardio and strength.', cautions: null },
    { name: 'Bodyweight Squats', intensity: 'Medium', description: 'Strengthens your legs and core. Focus on proper form to avoid injury. Start with 3 sets of 10-12 reps.', cautions: 'Improper form can strain the lower back. Keep your back straight and chest up. Stop if you feel sharp pain.' },
    { name: 'Light Dumbbell Training', intensity: 'Medium', description: 'Resistance training helps improve insulin sensitivity. Start with light weights and focus on compound movements.', cautions: 'Avoid heavy overhead lifting if you have uncontrolled high blood pressure. Focus on controlled movements.' },
    { name: 'Running / Jogging', intensity: 'High', description: 'Effective for cardio but is high-impact.', cautions: 'High-impact. Can be stressful on joints (knees, hips) and the lower back. Consult a doctor if you have joint pain or sciatica issues.' },
    { name: 'Badminton / Tennis', intensity: 'High', description: 'Fun and engaging, but involves quick, sharp movements.', cautions: 'Involves sudden twisting and turning, which can aggravate back conditions like sciatica or knee problems. Ensure a proper warm-up.' },
    { name: 'HIIT', intensity: 'High', description: 'High-Intensity Interval Training. Short bursts of intense exercise followed by brief recovery.', cautions: 'Very demanding on the cardiovascular system. Not recommended for beginners or those with uncontrolled hypertension or heart conditions.' },
  ]

  return (
    <section id="fitness" className="section-card">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 h-8 w-8">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          FitFlow Exercise Guide
        </h2>
        <p className="text-center text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">Discover safe and effective exercises tailored for a healthy lifestyle.</p>
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exerciseData.map((exercise, idx) => (
            <div key={idx} className="info-card rounded-lg flex flex-col p-4">
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-lg text-white">{exercise.name}</h4>
                  <span className="bg-slate-800 text-indigo-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">{exercise.intensity} Impact</span>
                </div>
                <p className="text-slate-400 mt-2 text-sm flex-grow">{exercise.description}</p>
                {exercise.cautions && (
                  <div className="mt-3 p-2 bg-red-900/50 border-l-4 border-red-500 text-red-300 text-xs rounded-r-lg">
                    <strong className="font-bold">Caution:</strong> {exercise.cautions}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
