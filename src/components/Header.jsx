import { useState, useContext, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut, SunMoon, Leaf, Waves, Activity } from 'lucide-react'
import Button from './Button'
import { ThemeContext, themes } from '../context/ThemeContext'

export default function Header({ user, onLoginClick, onSignOut }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useContext(ThemeContext)
  const [scrolled, setScrolled] = useState(false)
  const [parallax, setParallax] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('parallaxEnabled')
      if (stored === '1') setParallax(true)
    } catch (e) {}
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
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
      window.addEventListener('scroll', () => { setScrolled(window.scrollY > 20) }, { passive: true })
    }

    try { localStorage.setItem('parallaxEnabled', parallax ? '1' : '0') } catch (e) {}

    return () => window.removeEventListener('scroll', onScroll)
  }, [parallax])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const themeIcons = {
    modern: <SunMoon size={14} />,
    ocean: <Waves size={14} />,
    sunset: <Leaf size={14} />
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 
        ${scrolled ? 'py-2' : 'py-4'}`}
    >
      <div className={`mx-auto max-w-7xl transition-all duration-300 rounded-2xl
        ${scrolled ? 'nav-style shadow-lg shadow-indigo-500/10 border border-slate-700/50 backdrop-blur-xl' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between h-14 px-4 sm:px-6">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection('home')}
          >
            <div className="relative flex items-center justify-center p-2.5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg shadow-purple-500/30 overflow-hidden">
               {/* Animated ping effect behind icon */}
              <div className="absolute inset-0 bg-white/20 animate-ping opacity-20 rounded-xl"></div>
              {/* Dynamic Icon instead of simple SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-indigo-100 to-slate-300 bg-clip-text text-transparent group-hover:from-indigo-200 group-hover:to-pink-200 transition-all duration-300">
                LINA
              </h1>
              <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest leading-none mt-1 opacity-80">Health AI</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/40 p-1 rounded-xl border border-slate-700/50">
            {[
              { label: 'Home', id: 'home' },
              { label: 'Vision', id: 'vision' },
              { label: 'Future', id: 'future' },
              { label: 'Mission', id: 'aim' },
              { label: 'About', id: 'about' }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme & Parallax */}
            <div className="flex items-center gap-2 bg-slate-800/40 p-1.5 rounded-xl border border-slate-700/50">
              <div className="flex gap-1">
                {Object.entries(themes).map(([key, themeData]) => (
                  <button
                    key={key}
                    onClick={() => setTheme(key)}
                    title={themeData.name}
                    className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all text-white/70 
                      ${theme === key ? 'ring-2 ring-indigo-500 text-white scale-110' : 'hover:scale-105 hover:text-white'}`}
                    style={{
                      background: key === 'modern' ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : 
                                 key === 'ocean' ? 'linear-gradient(135deg, #0284c7, #2563eb)' :
                                 'linear-gradient(135deg, #059669, #0d9488)'
                    }}
                  >
                    {themeIcons[key]}
                  </button>
                ))}
              </div>
              <div className="w-px h-5 bg-slate-600"></div>
              <button
                onClick={() => setParallax(p => !p)}
                title="Toggle parallax"
                className={`px-2 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md transition-all ${
                  parallax ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:bg-slate-700/50'
                }`}
              >
                3D
              </button>
            </div>

            {/* ML Launcher */}
            <button 
              onClick={() => scrollToSection('predictor')}
              className="hidden lg:flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 hover:text-white font-semibold text-sm rounded-xl transition-all border border-indigo-500/30 hover:border-indigo-400 group"
            >
              <Activity size={16} className="text-indigo-400 group-hover:animate-pulse" />
              <span>Launch ML</span>
            </button>

            {/* Auth */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3 bg-slate-800/40 px-3 py-1.5 rounded-xl border border-slate-700/50">
                  <span className="text-sm font-medium text-slate-200 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <User size={14} />
                    </div>
                    {user.email.split('@')[0]}
                  </span>
                  <button onClick={onSignOut} className="text-slate-400 hover:text-rose-400 transition-colors p-1">
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={onLoginClick} 
                  className="px-5 py-2 bg-white text-slate-900 hover:bg-slate-200 font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center gap-2"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-300 hover:text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-slate-700/50 bg-slate-800/90 backdrop-blur-xl rounded-b-2xl"
            >
              <div className="p-4 space-y-2">
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'Vision', id: 'vision' },
                  { label: 'Future', id: 'future' },
                  { label: 'Mission', id: 'aim' },
                  { label: 'About', id: 'about' }
                ].map(item => (
                  <button 
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-xl"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 mt-2 border-t border-slate-700/50">
                  {user ? (
                    <div className="flex flex-col gap-3">
                      <span className="text-sm text-slate-400 px-4">{user.email}</span>
                      <button onClick={onSignOut} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-xl transition-colors">
                        <LogOut size={18} /> Sign Out
                      </button>
                    </div>
                  ) : (
                    <button onClick={onLoginClick} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium">
                      Sign In / Sign Up
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
