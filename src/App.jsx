import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import HomeSection from './components/sections/HomeSection'
import VisionSection from './components/sections/VisionSection'
import FutureSection from './components/sections/FutureSection'
import AimSection from './components/sections/AimSection'
import AboutSection from './components/sections/AboutSection'
import PredictorSection from './components/sections/PredictorSection'

import NutritionSection from './components/sections/NutritionSection'
import FitnessSection from './components/sections/FitnessSection'
import InsightsSection from './components/sections/InsightsSection'
import AuthModal from './components/modals/AuthModal'


function AppContent() {
  const [user, setUser] = useState(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const handleSignOut = () => {
    setUser(null)
  }

  return (
    <div className="min-h-screen">
      <Header 
        user={user} 
        onLoginClick={() => setAuthModalOpen(true)}
        onSignOut={handleSignOut}
      />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <HomeSection onLoginClick={() => setAuthModalOpen(true)} />
        <VisionSection />
        <FutureSection />
        <AimSection />
        <AboutSection />
        <PredictorSection />

        <NutritionSection />
        <FitnessSection />
        <InsightsSection />
      </main>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        onAuth={(userInfo) => { setUser(userInfo); setAuthModalOpen(false); }}
      />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
