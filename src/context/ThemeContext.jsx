import { createContext, useState } from 'react'

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
    bg: 'from-orange-900 to-red-900',
    primary: 'from-orange-400 to-red-500',
    secondary: 'from-red-500 to-pink-600',
    accent: 'orange',
    navbar: 'bg-red-900/80 backdrop-blur-lg border-b border-orange-500/30',
    card: 'bg-red-800/30 border border-orange-500/50'
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('modern')

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeConfig: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  )
}
