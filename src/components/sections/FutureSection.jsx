export default function FutureSection() {
  const features = [
    {
      title: 'Advanced Personalization',
      description: 'Integrate wearable data (smartwatches, fitness trackers) for real-time tracking and more accurate, dynamic recommendations.'
    },
    {
      title: 'Telemedicine Integration',
      description: 'Connect users with certified doctors and nutritionists directly through the platform for professional consultations.'
    },
    {
      title: 'Community & Support',
      description: 'Build a community feature for users to share experiences, recipes, and motivation, creating a strong support network.'
    }
  ]

  return (
    <section id="future" className="section-card">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-8 flex items-center justify-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 h-8 w-8">
            <path d="M4.5 12.5a8 8 0 0 1 8-8 .5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5 5 5 0 0 0-5 5 .5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5Zm15 0a8 8 0 0 0-8-8 .5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5 5 5 0 0 1 5 5 .5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5Z"></path>
          </svg>
          Future Scope
        </h2>
        <p className="text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">We're just getting started. Here's what we envision for the future of lina:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {features.map((feature, index) => (
            <div key={index} className="info-card p-4 rounded-lg">
              <h4 className="font-bold text-indigo-400">{feature.title}</h4>
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
