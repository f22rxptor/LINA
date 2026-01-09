import { useState, useContext, useEffect } from 'react'
import Button from './Button'
import { ThemeContext, themes } from '../context/ThemeContext'

export default function Header({ user, onLoginClick, onSignOut }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useContext(ThemeContext)
  const [parallax, setParallax] = useState(false)

  useEffect(() => {
    // initialize from localStorage
    try {
      const stored = localStorage.getItem('parallaxEnabled')
      if (stored === '1') setParallax(true)
    } catch (e) {}
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const offset = Math.round(window.scrollY * 0.3)
      document.documentElement.style.setProperty('--bg-offset', `${offset}px`)
    }

    if (parallax) {
      document.documentElement.classList.add('parallax-bg')
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
    } else {
      document.documentElement.classList.remove('parallax-bg')
      document.documentElement.style.removeProperty('--bg-offset')
    }

    try { localStorage.setItem('parallaxEnabled', parallax ? '1' : '0') } catch (e) {}

    return () => window.removeEventListener('scroll', onScroll)
  }, [parallax])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <header className="glass-nav nav-style fixed top-0 left-0 right-0 z-50 border-b border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2 primary-accent rounded-lg group-hover:shadow-lg group-hover:shadow-indigo-500/50 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path>
                <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">lina</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { label: 'Home', id: 'home' },
              { label: 'Vision', id: 'vision' },
              { label: 'Future', id: 'future' },
              { label: 'Team', id: 'team' },
              { label: 'About', id: 'about' }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Theme Switcher */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
              {Object.entries(themes).map(([key, themeData]) => (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  title={themeData.name}
                  className={`w-8 h-8 rounded transition-all ${
                    theme === key 
                      ? 'ring-2 ring-indigo-500 scale-110' 
                      : 'hover:scale-105'
                  }`}
                  style={{
                    background: key === 'modern' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 
                               key === 'ocean' ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' :
                               'linear-gradient(135deg, #10b981, #0ea5a4)'
                  }}
                />
              ))}
            </div>
            {/* Parallax toggle */}
            <button
              onClick={() => setParallax(p => !p)}
              title="Toggle parallax background"
              className={`ml-2 px-2 py-1 text-xs rounded-md transition-all ${parallax ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'}`}
            >
              {parallax ? 'Parallax ON' : 'Parallax OFF'}
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-slate-300">{user.email}</span>
                <Button variant="ghost" size="sm" onClick={onSignOut}>Sign Out</Button>
              </>
            ) : (
              <Button onClick={onLoginClick} size="sm" icon="🔓">Login / Sign Up</Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-slate-700 pt-4">
            {[
              { label: 'Home', id: 'home' },
              { label: 'Vision', id: 'vision' },
              { label: 'Future', id: 'future' },
              { label: 'Team', id: 'team' },
              { label: 'About', id: 'about' }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => { scrollToSection(item.id); setMobileMenuOpen(false) }}
                className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-indigo-400 hover:bg-indigo-500/10 rounded"
              >
                {item.label}
              </button>
            ))}
            <div className="px-4 pt-2">
              {user ? (
                <>
                  <p className="text-xs text-slate-400 mb-2">{user.email}</p>
                  <Button variant="secondary" size="sm" onClick={onSignOut} className="w-full">Sign Out</Button>
                </>
              ) : (
                <Button onClick={onLoginClick} size="sm" className="w-full">Login / Sign Up</Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
