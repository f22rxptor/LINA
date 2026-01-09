export default function AboutSection() {
  return (
    <section id="about" className="section-card">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 h-8 w-8">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
          About lina
        </h2>
        <p className="text-slate-300 text-lg leading-relaxed">
          lina is a comprehensive health and wellness platform designed to empower individuals in the fight against lifestyle diseases like diabetes and hypertension. We leverage cutting-edge artificial intelligence to provide three core services: a risk prediction model to assess your health status, an AI-powered assistant to answer your questions and bust myths, and a detailed guide for nutrition and exercise tailored to your needs. Our goal is to make proactive health management accessible, understandable, and personalized for everyone.
        </p>
      </div>
    </section>
  )
}
