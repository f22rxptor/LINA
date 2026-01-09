@echo off
REM Setup and train ML model with real data

echo.
echo ========================================
echo LINA ML Model Training Setup
echo ========================================
echo.

echo Step 1: Installing Python dependencies...
pip install Flask Flask-CORS scikit-learn numpy pandas python-dotenv joblib matplotlib --quiet

if %errorlevel% neq 0 (
    echo Error installing dependencies. Please try: pip install -r requirements.txt
    pause
    exit /b 1
)

echo Step 2: Downloading real medical dataset...
python download_real_data.py

if %errorlevel% neq 0 (
    echo Error downloading data. Continuing with synthetic data...
)

echo.
echo Step 3: Training ML model...
python train_model.py

if %errorlevel% neq 0 (
    echo Error training model.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Success! Model trained and ready!
echo ========================================
echo.
echo Next: Start your servers with: npm run dev:all
echo.
pause
