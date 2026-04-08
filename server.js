import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { pool, query } from './db.js'

dotenv.config()

const app = express()
app.use(cors({ origin: '*', credentials: true }))
app.use(express.json())

// test database connection at startup
pool.getConnection()
  .then(conn => {
    console.log('✅ Connected to MySQL database')
    conn.release()
  })
  .catch(err => {
    console.error('❌ Unable to connect to MySQL:', err.message)
  })


// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// ML Model endpoint
app.post('/api/predict', async (req, res) => {
  try {
    const { age, bmi, bp_systolic, fasting_glucose, familyHistory, activityLevel } = req.body

    // Call Python ML server
    const mlServerUrl = process.env.ML_SERVER_URL || 'http://localhost:3002'
    const mlResponse = await fetch(`${mlServerUrl}/api/predict`, {
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

    // log the request and result into the database (if configured)
    try {
      await query(
        `INSERT INTO predictions 
          (age,bmi,bp_systolic,fasting_glucose,family_history,activity_level,risk,probability,created_at)
         VALUES (?,?,?,?,?,?,?,?,NOW())`,
        [age, bmi, bp_systolic, fasting_glucose, familyHistory, activityLevel, prediction.risk, prediction.probability]
      )
    } catch (dbErr) {
      console.warn('Could not log prediction to DB:', dbErr.message)
    }

    res.json(prediction)
  } catch (error) {
    console.error('Prediction Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// ---------- authentication endpoints ----------

app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' })
  }

  try {
    const existing = await query('SELECT id FROM users WHERE email = ?', [email])
    if (existing.length) {
      return res.status(409).json({ error: 'Email already in use' })
    }
    const hash = await bcrypt.hash(password, 10)
    const result = await query(
      'INSERT INTO users (name,email,password,created_at) VALUES (?,?,?,NOW())',
      [name, email, hash]
    )
    res.json({ id: result.insertId, name, email })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' })

  try {
    const rows = await query('SELECT id,name,password FROM users WHERE email = ?', [email])
    const user = rows[0]
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ error: 'Invalid credentials' })
    res.json({ id: user.id, name: user.name, email })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Database error' })
  }
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
