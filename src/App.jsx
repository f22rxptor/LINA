import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import HomeSection from './components/sections/HomeSection'
import VisionSection from './components/sections/VisionSection'
import FutureSection from './components/sections/FutureSection'
import TeamSection from './components/sections/TeamSection'
import AboutSection from './components/sections/AboutSection'
import PredictorSection from './components/sections/PredictorSection'
import AIAssistantSection from './components/sections/AIAssistantSection'
import NutritionSection from './components/sections/NutritionSection'
import FitnessSection from './components/sections/FitnessSection'
import InsightsSection from './components/sections/InsightsSection'
import AuthModal from './components/modals/AuthModal'

// Firebase Config - Load from environment variables
// Update .env.local with your Firebase project credentials
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

function AppContent() {
  const [user, setUser] = useState(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return unsubscribe
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Sign out error:', error)
    }
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
        <TeamSection />
        <AboutSection />
        <PredictorSection />
        <AIAssistantSection />
        <NutritionSection />
        <FitnessSection />
        <InsightsSection />
      </main>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        auth={auth}
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
