import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export const themes = {
  modern: {
    name: 'Modern',
    bg: 'from-slate-900 to-slate-800',
    primary: 'from-indigo-500 to-indigo-600',
    secondary: 'from-purple-500 to-pink-500',
    accent: 'indigo',
    navbar: 'glass-nav',
    card: 'bg-slate-700/50 border border-slate-600'
  },
  ocean: {
    name: 'Ocean',
    bg: 'from-blue-900 to-cyan-900',
    primary: 'from-cyan-400 to-blue-500',
    secondary: 'from-blue-500 to-indigo-600',
    accent: 'cyan',
    navbar: 'bg-blue-900/80 backdrop-blur-lg border-b border-cyan-500/30',
    card: 'bg-blue-800/30 border border-cyan-500/50'
  },
  sunset: {
    name: 'Sunset',
    bg: 'from-emerald-900 to-teal-900',
    primary: 'from-emerald-400 to-teal-500',
    secondary: 'from-teal-500 to-cyan-600',
    accent: 'teal',
    navbar: 'bg-teal-900/80 backdrop-blur-lg border-b border-emerald-500/30',
    card: 'bg-teal-800/30 border border-emerald-500/50'
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('modern')

  // apply selected theme as a class on the root html element
  useEffect(() => {
    if (typeof document === 'undefined') return
    const html = document.documentElement
    html.classList.remove('theme-modern', 'theme-ocean', 'theme-sunset')
    html.classList.add(`theme-${theme}`)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeConfig: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  )
}
