import Button from '../Button'

export default function HomeSection({ onLoginClick }) {
  return (
    <section id="home" className="section-card text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Your Personal AI Agent for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500">Healthier Lifestyle</span>
        </h1>
        <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Early detection and personalized guidance for Diabetes & Hypertension. Take control of your health with AI-powered insights, nutritional guides, and fitness plans.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button 
            variant="primary" 
            size="lg"
            onClick={onLoginClick}
            icon="🚀"
          >
            Get Started Now
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            icon="📚"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
