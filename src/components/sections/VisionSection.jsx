export default function VisionSection() {
  return (
    <section id="vision" className="section-card">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-8 flex items-center justify-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 h-8 w-8">
            <path d="M22 12s-4-7-10-7S2 12 2 12s4 7 10 7 10-7 10-7Z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          Our Vision & Mission
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="info-card p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-slate-400 leading-relaxed">
              To provide accessible, AI-driven tools for early detection and personalized management of lifestyle diseases. We aim to bridge the gap between medical information and daily life, offering clear, actionable guidance that empowers users to make healthier choices every day.
            </p>
          </div>
          <div className="info-card p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-slate-400 leading-relaxed">
              A future where everyone has the knowledge and support to prevent and manage lifestyle diseases effectively, leading to longer, healthier, and happier lives. We envision a world where technology and healthcare collaborate seamlessly to create a proactive wellness ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
