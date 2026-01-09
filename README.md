# LINA - Health & Wellness AI Assistant 🏥🤖

A full-stack application for diabetes and hypertension risk prediction using machine learning, combined with an AI-powered health assistant chatbot.

## 📋 Features

- **AI Health Assistant**: Chat with "Aura", an AI assistant specialized in diabetes and hypertension information
- **Risk Prediction**: ML-powered diabetes risk assessment based on health metrics
- **Health Dashboard**: Track fitness, nutrition, and insights
- **Responsive UI**: Built with React + Vite + Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI framework
- **Vite 7.3** - Fast build tool & dev server
- **Tailwind CSS 3.4** - Styling
- **Firebase 12.7** - Authentication & real-time data

### Backend
- **Node.js + Express** - REST API server
- **Python Flask** - ML prediction server
- **Gemini 2.5 Flash API** - AI chatbot backbone

### Machine Learning
- **scikit-learn** - Random Forest & Gradient Boosting classifiers
- **pandas/numpy** - Data processing
- **joblib** - Model serialization

## 📦 Prerequisites

- **Node.js 18+** & **npm 9+**
- **Python 3.11+** (Python 3.13 requires Microsoft C++ Build Tools for scikit-learn)
- **Git**

## 🚀 Quick Start

### 1. Clone & Install Dependencies

```bash
# Frontend & backend Node deps
npm install

# Python ML server deps (use Python 3.11 for smooth install)
py -3.11 -m venv .venv
.venv\Scripts\activate
python -m pip install -r ml-server/requirements.txt
```

### 2. Set Up Environment Variables
## 📂 Project Structure

```
LINA/
├── src/                          # Frontend React code
│   ├── components/               # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Header.jsx
│   │   ├── FoodCard.jsx
│   │   └── modals/              # Modal dialogs
│   │       ├── AuthModal.jsx
│   │       └── FoodModal.jsx
│   ├── sections/                 # Page sections
│   │   ├── HomeSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── AIAssistantSection.jsx
│   │   ├── PredictorSection.jsx
│   │   ├── FitnessSection.jsx
│   │   ├── NutritionSection.jsx
│   │   └── ... (other sections)
│   ├── context/                  # React Context
│   │   └── ThemeContext.jsx      # Theme management
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── ml-server/                    # Python ML Flask server
│   ├── app.py                    # Flask API endpoints
│   ├── train_model.py            # Model training script
│   ├── prepare_data.py           # Data preprocessing
│   ├── download_real_data.py     # Real data fetcher
│   ├── requirements.txt          # Python dependencies
│   ├── medical_data.csv          # Training data
│   ├── diabetes_risk_model.pkl   # Trained model
│   ├── scaler.pkl               # Feature scaler
│   └── README.md
├── server.js                     # Node Express backend
├── package.json                  # Node dependencies & scripts
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS config
├── postcss.config.js            # PostCSS config
├── .env                         # Environment variables (not in git)
├── .env.example                 # Example env file
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Backend (Node) - http://localhost:3001

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/predict` | Predict diabetes risk (calls ML server) |
| POST | `/api/chat` | Chat with Aura AI assistant |

**Predict Request:**
```json
{
  "age": 45,
  "bmi": 28.5,
  "bp_systolic": 140,
  "fasting_glucose": 110,
  "familyHistory": 1,
  "activityLevel": 1
}
```

**Chat Request:**
```json
{
  "message": "What are the symptoms of diabetes?"
}
```

### ML Server (Python) - http://localhost:3002

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | ML server health |
| POST | `/api/predict` | Diabetes risk prediction |

## 🐛 Troubleshooting

### Issue: `scikit-learn` build error on Windows
**Symptom**: `Microsoft Visual C++ 14.0 or greater is required`

**Solutions** (in order of preference):

1. **Use Python 3.11** instead of 3.13:
   ```bash
   rmdir /s /q .venv
   py -3.11 -m venv .venv
   .venv\Scripts\activate
   python -m pip install -r ml-server/requirements.txt
   ```

2. **Install Microsoft C++ Build Tools**:
   - Download: https://visualstudio.microsoft.com/visual-cpp-build-tools/
   - During installation, select "Desktop development with C++"
   - Restart terminal and retry pip install

### Issue: Cannot find module `express` or other Node packages
```bash
npm install
```

### Issue: Python venv not activating
Make sure you're using the correct path:
```powershell
# For PowerShell:
.venv\Scripts\Activate.ps1

# For Command Prompt (cmd):
.venv\Scripts\activate.bat
```

### Issue: Ports already in use
- Frontend (5173): `netstat -ano | findstr :5173` then `taskkill /PID <PID> /F`
- Backend (3001): `netstat -ano | findstr :3001` then `taskkill /PID <PID> /F`
- ML Server (3002): `netstat -ano | findstr :3002` then `taskkill /PID <PID> /F`

### Issue: Gemini API errors
- Verify your API key is correct in `.env`
- Check rate limits on [Google AI Console](https://aistudio.google.com)
- Ensure message length is reasonable (API has input limits)

## 📝 Available npm Scripts

```bash
npm run dev          # Start Vite dev server (port 5173)
npm run server       # Start Node backend (port 3001)
npm run ml-server    # Start Python ML server (port 3002)
npm run dev:all      # Run all 3 servers concurrently
npm run build        # Build frontend for production
npm run preview      # Preview production build locally
npm run lint         # Check code with ESLint
```

## 🔒 Security Notes

- **Never commit** `.env` file or API keys
- Always use `.env.example` as a template
- Treat `GEMINI_API_KEY` as sensitive
- For production, use environment secrets management (GitHub Secrets, AWS Secrets Manager, etc.)

## 🚢 Deployment

### Frontend (Vite Build)
```bash
npm run build
# Output in dist/
```

### Backend Options
- **Heroku**: Add `Procfile` with `node server.js`
- **AWS Lambda**: Use Serverless framework
- **DigitalOcean**: Simple Node app deployment
- **Render/Railway**: Auto-deploy from GitHub

### ML Server Options
- Deploy Python app to **Heroku**, **AWS EC2**, or **DigitalOcean**
- Use **Docker** to containerize both services

## 📚 References

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Flask Docs](https://flask.palletsprojects.com)
- [scikit-learn Docs](https://scikit-learn.org)
- [Gemini API](https://ai.google.dev)

## 📄 License

[Add your license here - e.g., MIT, Apache 2.0]

## 👥 Contributors

[Add contributor info here]

---

**Happy hacking!** 🚀 If you encounter issues, check the troubleshooting section or open an issue on GitHub.
- BMI auto-calculation
- Risk scoring algorithm
- Visual result display

### AIAssistantSection
- Message history
- Loading states
- Gemini API integration
- System prompt for health focus

### NutritionSection
- Dual filtering (category + risk)
- Food database with 40+ items
- GI badges
- Nutritional breakdown modal

### FitnessSection
- Exercise database
- Intensity levels
- Caution warnings
- Responsive grid

## Environment Variables

Create a `.env` file (optional for production):
```
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
...
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Future Enhancements

- Wearable device integration
- Telemedicine features
- Community/support section
- Offline functionality
- PWA support

## Notes

- All images are from Unsplash (placeholder URLs)
- Gemini API key exposed in code (for demo only)
- Mock ML predictions (real model integration pending)
- Food data is static (can be connected to database)

## License

MIT License

## Support

For issues or questions, contact the LINA development team.
