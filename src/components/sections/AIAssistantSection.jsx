import { useState, useRef, useEffect } from 'react'

export default function AIAssistantSection() {
  const [messages, setMessages] = useState([
    { type: 'ai', text: "Hello! I'm Aura, your AI health assistant powered by Gemini. How can I help you today?" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const callGeminiAPI = async (userPrompt) => {
    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userPrompt })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'API call failed')
      }

      const result = await response.json()
      return result.reply
    } catch (error) {
      console.error("Error:", error)
      return "Sorry, I encountered an error. Please make sure the backend server is running on port 3001. Try: npm run server"
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    setMessages(prev => [...prev, { type: 'user', text: userMessage }])
    setLoading(true)

    try {
      const responseText = await callGeminiAPI(userMessage)
      setMessages(prev => [...prev, { type: 'ai', text: responseText }])
    } catch (error) {
      setMessages(prev => [...prev, { type: 'ai', text: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="ai-assistant" className="section-card">
      <div className="w-full max-w-3xl mx-auto flex flex-col h-[90vh]">
        <h2 className="text-4xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 h-8 w-8">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
            <path d="M5 3v4"></path>
            <path d="M19 17v4"></path>
            <path d="M3 5h4"></path>
            <path d="M17 19h4"></path>
          </svg>
          AI Health Assistant
        </h2>
        <p className="text-center text-slate-400 mb-6 max-w-2xl mx-auto leading-relaxed">Ask me anything about diabetes, hypertension, and healthy living. I can also clear up common myths!</p>

        <div className="flex-1 overflow-y-auto p-4 bg-slate-900 rounded-lg space-y-4 flex flex-col mb-4 border border-slate-700">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble ${msg.type === 'user' ? 'user-bubble' : 'ai-bubble'}`}>
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="chat-bubble ai-bubble flex items-center space-x-1">
              <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse delay-300"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input type="text" placeholder="Type your message..." value={input} onChange={(e) => setInput(e.target.value)} disabled={loading} className="flex-1 bg-slate-700 border-slate-600 rounded-lg shadow-sm focus:border-indigo-500 text-white p-3 transition disabled:opacity-50" />
          <button type="submit" disabled={loading} className="p-3 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed transition transform hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </section>
  )
}
