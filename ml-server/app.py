from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load the trained model and scaler
try:
    model = joblib.load('diabetes_risk_model.pkl')
    scaler = joblib.load('scaler.pkl')
    print("✅ Model loaded successfully!")
except FileNotFoundError:
    print("❌ Model files not found. Please run 'python train_model.py' first.")
    model = None
    scaler = None

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ML Server is running'})

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        if not model or not scaler:
            return jsonify({'error': 'Model not loaded'}), 500

        data = request.json
        
        # Extract features from request (matching train_model.py features)
        age = float(data.get('age', 0))
        bmi = float(data.get('bmi', 0))
        bp_systolic = float(data.get('bp_systolic', 0))
        fasting_glucose = float(data.get('fasting_glucose', 0))
        family_history = float(data.get('familyHistory', 0))
        activity_level = float(data.get('activityLevel', 0))
        cholesterol = float(data.get('cholesterol', 200))  # default healthy level
        years_condition = float(data.get('yearsCondition', 0))
        
        # Create feature array (must match training features order)
        features = np.array([[age, bmi, bp_systolic, fasting_glucose, family_history, activity_level, cholesterol, years_condition]])
        
        # Scale features
        features_scaled = scaler.transform(features)
        
        # Make prediction
        prediction = model.predict(features_scaled)[0]
        probability = model.predict_proba(features_scaled)[0][1]
        
        # Get feature importance
        feature_names = ['Age', 'BMI', 'Blood Pressure', 'Fasting Glucose', 'Family History', 'Activity Level', 'Cholesterol', 'Years with Condition']
        importances = model.feature_importances_
        
        return jsonify({
            'risk': int(prediction),
            'probability': float(probability),
            'confidence': float(max(model.predict_proba(features_scaled)[0])),
            'feature_importance': {name: float(imp) for name, imp in zip(feature_names, importances)}
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    port = os.getenv('ML_PORT', 3002)
    print(f"🚀 ML Server running on http://localhost:{port}")
    app.run(debug=True, port=port)
