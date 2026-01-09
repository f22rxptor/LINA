# LINA ML Server Setup Guide

## 📋 Overview

The ML server uses machine learning to predict diabetes and hypertension risk based on user health data.

**Models Used:**
- Random Forest Classifier
- Gradient Boosting Classifier
- Automatic model selection based on performance

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Prepare Data

Choose one option:

**Option A: Download Real Medical Data (Recommended)**
```bash
python prepare_data.py
# Select option 1 to download Pima Indians Diabetes Dataset
```

**Option B: Create Synthetic Data**
```bash
python prepare_data.py
# Select option 2 to create realistic synthetic data
```

**Option C: Use Your Own Data**
- Create a CSV file with columns: age, bmi, bp_systolic, fasting_glucose, family_history, activity_level, cholesterol, years_condition, diabetes_risk
- Run `python prepare_data.py` and select option 3

### 3. Train the Model

```bash
python train_model.py
```

Output:
- ✅ Model evaluation metrics
- ✅ Feature importance analysis
- ✅ Cross-validation scores
- ✅ Saves best model to `diabetes_risk_model.pkl`

### 4. Run the Server

```bash
python app.py
```

Server will start on `http://localhost:3002`

## 📊 Data Features

The model considers:

| Feature | Range | Description |
|---------|-------|-------------|
| Age | 18-85 years | User's age |
| BMI | 15-50 kg/m² | Body Mass Index |
| BP Systolic | 80-200 mmHg | Blood Pressure (Systolic) |
| Fasting Glucose | 60-300 mg/dL | Fasting blood glucose |
| Family History | 0-1 | History of diabetes/hypertension |
| Activity Level | 0-3 | Physical activity level |
| Cholesterol | 100-400 mg/dL | Total cholesterol |
| Years Condition | 0-30 years | Years with condition (if any) |

## 🎯 Model Performance

After training, you'll see:
- **Training Accuracy**: How well the model learned from training data
- **Test Accuracy**: Real-world performance
- **ROC-AUC Score**: Sensitivity vs specificity (closer to 1.0 is better)
- **Feature Importance**: Which factors matter most for predictions

Example Output:
```
Random Forest Model Evaluation
Training Accuracy: 0.9234
Test Accuracy: 0.8945
ROC-AUC Score: 0.9123

Feature Importance (top 3):
1. Fasting Glucose: 0.25
2. BMI: 0.22
3. Blood Pressure: 0.18
```

## 🔄 Improving the Model

### Add More Training Data
```bash
# Update medical_data.csv with more records
python train_model.py
```

### Adjust Model Parameters

Edit `train_model.py`:
```python
model = RandomForestClassifier(
    n_estimators=200,      # Increase for better accuracy (slower)
    max_depth=12,          # Increase for more complex patterns
    min_samples_split=5,   # Lower to capture more patterns
    ...
)
```

### Use Different Algorithms

In `train_model.py`, you can add:
```python
from sklearn.ensemble import XGBClassifier, LGBMClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC

# Train multiple models and compare
```

## 📡 API Endpoint

**POST** `/api/predict`

**Request:**
```json
{
  "age": 45,
  "bmi": 28.5,
  "bp_systolic": 135,
  "fasting_glucose": 115,
  "familyHistory": 1,
  "activityLevel": 1,
  "cholesterol": 220,
  "years_condition": 2
}
```

**Response:**
```json
{
  "risk": 1,
  "probability": 0.78,
  "confidence": 0.95,
  "feature_importance": {
    "Age": 0.12,
    "BMI": 0.22,
    "Blood Pressure": 0.18,
    "Fasting Glucose": 0.25,
    "Family History": 0.15,
    "Activity Level": 0.05,
    "Cholesterol": 0.02,
    "Years Condition": 0.01
  }
}
```

## 🛠️ Troubleshooting

**Issue: "No module named 'sklearn'"**
```bash
pip install scikit-learn
```

**Issue: "Model files not found"**
```bash
python train_model.py
```

**Issue: "medical_data.csv not found"**
```bash
python prepare_data.py
```

**Issue: Server won't start**
- Check if port 3002 is available
- Try: `python app.py --port 3003`

## 📚 Resources

- **Scikit-learn Documentation**: https://scikit-learn.org/
- **Medical ML Best Practices**: https://github.com/OWASP/ML-Security
- **Pima Indians Dataset**: https://kaggle.com/datasets/uciml/pima-indians-diabetes-database
- **NHANES Data**: https://www.cdc.gov/nchs/nhanes/

## ⚠️ Important Disclaimers

⚠️ **This model is for educational purposes only and should NOT be used for medical diagnosis.**

- Always consult healthcare professionals for medical decisions
- This model is trained on general population data
- Individual medical conditions vary significantly
- Results should be discussed with a doctor

## 🤝 Contributing

To improve the model:
1. Collect more diverse medical data
2. Validate predictions against clinical outcomes
3. Add domain expert knowledge
4. Implement continuous learning from user feedback

---

Happy modeling! 🚀
