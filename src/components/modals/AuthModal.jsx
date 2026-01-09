import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import Button from '../Button'

export default function AuthModal({ isOpen, onClose, auth }) {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password)
      } else {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      }
      setFormData({ name: '', email: '', password: '' })
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onClick={onClose}>
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl w-full max-w-md relative transform transition-all scale-100 opacity-100 border border-slate-700" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white text-3xl leading-none hover:scale-110 transition">×</button>
        <div className="p-8">
          {error && (
            <div className="bg-red-500/20 text-red-300 text-sm p-3 rounded-lg mb-4 border border-red-500/50">{error}</div>
          )}

          <div className="mb-8">
            <h3 className="text-3xl font-bold text-white text-center">
              {isLogin ? '🔐 Welcome Back' : '✨ Create Account'}
            </h3>
            <p className="text-slate-400 text-center text-sm mt-2">
              {isLogin ? 'Login to your lina account' : 'Join thousands using lina'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required={!isLogin} 
                  placeholder="John Doe"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg text-white p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition outline-none" 
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="you@example.com"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg text-white p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                placeholder="••••••••"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg text-white p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition outline-none" 
              />
            </div>
            <Button 
              type="submit" 
              variant="primary" 
              size="lg"
              disabled={loading}
              className="w-full mt-6"
              icon={isLogin ? "🔓" : "🎉"}
            >
              {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-center text-slate-400 text-sm">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button 
                onClick={() => { setIsLogin(!isLogin); setError(''); }} 
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
