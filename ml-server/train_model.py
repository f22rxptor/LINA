import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, roc_curve
import joblib
import matplotlib.pyplot as plt

# ============================================
# LOAD OR CREATE MEDICAL DATASET
# ============================================

def create_realistic_dataset(n_samples=2000):
    """
    Create a realistic medical dataset based on diabetes/hypertension risk factors
    Data based on medical research and NHANES (National Health and Nutrition Examination Survey)
    """
    np.random.seed(42)
    
    # Age distribution (realistic)
    age = np.random.normal(loc=50, scale=15, size=n_samples)
    age = np.clip(age, 18, 85).astype(int)
    
    # BMI distribution (realistic)
    bmi = np.random.normal(loc=27, scale=5, size=n_samples)
    bmi = np.clip(bmi, 15, 50)
    
    # Blood Pressure - Systolic (mm Hg)
    bp_systolic = np.random.normal(loc=125, scale=20, size=n_samples)
    bp_systolic = np.clip(bp_systolic, 80, 200)
    
    # Fasting Glucose (mg/dL)
    fasting_glucose = np.random.normal(loc=105, scale=30, size=n_samples)
    fasting_glucose = np.clip(fasting_glucose, 60, 250)
    
    # Family History (0 = No, 1 = Yes)
    family_history = np.random.binomial(1, p=0.4, size=n_samples)
    
    # Activity Level (0=Sedentary, 1=Light, 2=Moderate, 3=Very Active)
    activity_level = np.random.choice([0, 1, 2, 3], size=n_samples, p=[0.3, 0.3, 0.25, 0.15])
    
    # Additional features for better prediction
    # Cholesterol level
    cholesterol = np.random.normal(loc=200, scale=40, size=n_samples)
    cholesterol = np.clip(cholesterol, 100, 400)
    
    # Years with condition (if any)
    years_condition = np.random.exponential(scale=3, size=n_samples)
    years_condition = np.clip(years_condition, 0, 30)
    
    # Create target variable based on medical criteria
    # Risk factors weighted by medical literature
    risk_score = (
        (age > 45) * 15 +
        (bmi > 25) * 20 +
        (bmi > 30) * 15 +
        (bp_systolic > 130) * 20 +
        (fasting_glucose > 100) * 25 +
        (fasting_glucose > 125) * 25 +
        (family_history == 1) * 20 +
        (activity_level == 0) * 15 +
        (cholesterol > 240) * 10 +
        (years_condition > 5) * 10
    )
    
    # Convert risk score to binary classification with some randomness
    threshold = 50
    y = (risk_score > threshold).astype(int)
    
    # Add some random noise to make it more realistic
    noise = np.random.binomial(1, p=0.1, size=n_samples)
    y = (y + noise) % 2
    
    # Create DataFrame
    data = pd.DataFrame({
        'age': age,
        'bmi': bmi,
        'bp_systolic': bp_systolic,
        'fasting_glucose': fasting_glucose,
        'family_history': family_history,
        'activity_level': activity_level,
        'cholesterol': cholesterol,
        'years_condition': years_condition,
        'diabetes_risk': y
    })
    
    return data

def load_from_csv(filepath):
    """Load real medical data from CSV file"""
    try:
        data = pd.read_csv(filepath)
        print(f"✅ Loaded data from {filepath}")
        return data
    except FileNotFoundError:
        print(f"⚠️ CSV file not found. Using synthetic data instead.")
        return None

# ============================================
# LOAD OR CREATE DATA
# ============================================

print("Loading medical data...")
csv_path = 'medical_data.csv'  # You can replace this with real data
data = load_from_csv(csv_path)

if data is None:
    print("Creating realistic synthetic medical dataset...")
    data = create_realistic_dataset(n_samples=2000)
    # Save for future use
    data.to_csv('medical_data.csv', index=False)
    print("✅ Synthetic data saved to medical_data.csv")

print(f"\nDataset shape: {data.shape}")
print(f"Data types:\n{data.dtypes}\n")
print(f"Risk distribution:\n{data['diabetes_risk'].value_counts()}\n")

# ============================================
# PREPARE DATA
# ============================================

# Separate features and target
X = data[['age', 'bmi', 'bp_systolic', 'fasting_glucose', 'family_history', 'activity_level', 'cholesterol', 'years_condition']]
y = data['diabetes_risk']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"Training set size: {X_train.shape[0]}")
print(f"Test set size: {X_test.shape[0]}\n")

# ============================================
# FEATURE SCALING
# ============================================

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# ============================================
# TRAIN MODELS
# ============================================

print("Training Random Forest model...")
rf_model = RandomForestClassifier(
    n_estimators=200,
    max_depth=12,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42,
    n_jobs=-1
)
rf_model.fit(X_train_scaled, y_train)

print("Training Gradient Boosting model...")
gb_model = GradientBoostingClassifier(
    n_estimators=150,
    learning_rate=0.1,
    max_depth=5,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42
)
gb_model.fit(X_train_scaled, y_train)

# ============================================
# EVALUATE MODELS
# ============================================

print("\n" + "="*60)
print("RANDOM FOREST MODEL EVALUATION")
print("="*60)

rf_train_score = rf_model.score(X_train_scaled, y_train)
rf_test_score = rf_model.score(X_test_scaled, y_test)
rf_pred = rf_model.predict(X_test_scaled)
rf_pred_proba = rf_model.predict_proba(X_test_scaled)[:, 1]
rf_auc = roc_auc_score(y_test, rf_pred_proba)

print(f"Training Accuracy: {rf_train_score:.4f}")
print(f"Test Accuracy: {rf_test_score:.4f}")
print(f"ROC-AUC Score: {rf_auc:.4f}\n")
print("Classification Report:")
print(classification_report(y_test, rf_pred))
print("Confusion Matrix:")
print(confusion_matrix(y_test, rf_pred))

print("\n" + "="*60)
print("GRADIENT BOOSTING MODEL EVALUATION")
print("="*60)

gb_train_score = gb_model.score(X_train_scaled, y_train)
gb_test_score = gb_model.score(X_test_scaled, y_test)
gb_pred = gb_model.predict(X_test_scaled)
gb_pred_proba = gb_model.predict_proba(X_test_scaled)[:, 1]
gb_auc = roc_auc_score(y_test, gb_pred_proba)

print(f"Training Accuracy: {gb_train_score:.4f}")
print(f"Test Accuracy: {gb_test_score:.4f}")
print(f"ROC-AUC Score: {gb_auc:.4f}\n")
print("Classification Report:")
print(classification_report(y_test, gb_pred))
print("Confusion Matrix:")
print(confusion_matrix(y_test, gb_pred))

# ============================================
# CROSS-VALIDATION
# ============================================

print("\n" + "="*60)
print("CROSS-VALIDATION SCORES")
print("="*60)

rf_cv_scores = cross_val_score(rf_model, X_train_scaled, y_train, cv=5, scoring='roc_auc')
gb_cv_scores = cross_val_score(gb_model, X_train_scaled, y_train, cv=5, scoring='roc_auc')

print(f"Random Forest CV Scores: {rf_cv_scores}")
print(f"Random Forest CV Mean: {rf_cv_scores.mean():.4f} (+/- {rf_cv_scores.std():.4f})\n")

print(f"Gradient Boosting CV Scores: {gb_cv_scores}")
print(f"Gradient Boosting CV Mean: {gb_cv_scores.mean():.4f} (+/- {gb_cv_scores.std():.4f})\n")

# ============================================
# FEATURE IMPORTANCE
# ============================================

print("="*60)
print("FEATURE IMPORTANCE")
print("="*60)

feature_names = ['Age', 'BMI', 'Blood Pressure', 'Fasting Glucose', 'Family History', 'Activity Level', 'Cholesterol', 'Years with Condition']

rf_importance = pd.DataFrame({
    'feature': feature_names,
    'importance': rf_model.feature_importances_
}).sort_values('importance', ascending=False)

gb_importance = pd.DataFrame({
    'feature': feature_names,
    'importance': gb_model.feature_importances_
}).sort_values('importance', ascending=False)

print("\nRandom Forest Feature Importance:")
print(rf_importance)

print("\nGradient Boosting Feature Importance:")
print(gb_importance)

# ============================================
# SELECT BEST MODEL
# ============================================

print("\n" + "="*60)
print("MODEL SELECTION")
print("="*60)

if rf_test_score > gb_test_score:
    print(f"✅ Random Forest selected (Test Accuracy: {rf_test_score:.4f})")
    best_model = rf_model
    best_model_name = "Random Forest"
else:
    print(f"✅ Gradient Boosting selected (Test Accuracy: {gb_test_score:.4f})")
    best_model = gb_model
    best_model_name = "Gradient Boosting"

# ============================================
# SAVE MODELS
# ============================================

print("\n" + "="*60)
print("SAVING MODELS")
print("="*60)

joblib.dump(rf_model, 'diabetes_risk_model_rf.pkl')
joblib.dump(gb_model, 'diabetes_risk_model_gb.pkl')
joblib.dump(best_model, 'diabetes_risk_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

print("✅ Models saved:")
print("   - diabetes_risk_model_rf.pkl (Random Forest)")
print("   - diabetes_risk_model_gb.pkl (Gradient Boosting)")
print("   - diabetes_risk_model.pkl (Best Model)")
print("   - scaler.pkl")

print("\n" + "="*60)
print("🎉 TRAINING COMPLETE!")
print("="*60)
print(f"\nBest Model: {best_model_name}")
print(f"Test Accuracy: {max(rf_test_score, gb_test_score):.4f}")
print(f"ROC-AUC Score: {max(rf_auc, gb_auc):.4f}")

