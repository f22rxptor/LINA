import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
if (!GEMINI_API_KEY) {
  console.error('❌ ERROR: GEMINI_API_KEY not found in environment variables. Please set it in .env file.')
  process.exit(1)
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// ML Model endpoint
app.post('/api/predict', async (req, res) => {
  try {
    const { age, bmi, bp_systolic, fasting_glucose, familyHistory, activityLevel } = req.body

    // Call Python ML server
    const mlResponse = await fetch('http://localhost:3002/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        age,
        bmi,
        bp_systolic,
        fasting_glucose,
        familyHistory,
        activityLevel
      })
    })

    if (!mlResponse.ok) {
      return res.status(mlResponse.status).json({ error: 'ML prediction failed' })
    }

    const prediction = await mlResponse.json()
    res.json(prediction)
  } catch (error) {
    console.error('Prediction Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const systemPrompt = "You are a friendly and helpful AI assistant for health and wellness, specializing in diabetes and hypertension. Your name is Aura. Your ONLY purpose is to provide information related to healthcare, healthy living, diabetes, and hypertension. You MUST refuse to answer any questions outside of this scope. For all healthcare questions, provide clear, concise, and safe information. Always include a disclaimer: 'This information is for educational purposes only. Always consult with a healthcare professional for medical advice.'"

    const payload = {
      contents: [{
        parts: [{ text: message }]
      }],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Gemini API Error:', errorData)
      return res.status(response.status).json({ error: 'Failed to get response from Gemini API' })
    }

    const result = await response.json()
    const candidate = result.candidates?.[0]

    if (candidate && candidate.content?.parts?.[0]?.text) {
      return res.json({ reply: candidate.content.parts[0].text })
    } else {
      return res.status(500).json({ error: 'Invalid response from Gemini API' })
    }
  } catch (error) {
    console.error('Server Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
