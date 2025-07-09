import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib


data = pd.read_csv("Phishing_Legitimate_full.csv")
data.columns = data.columns.str.strip()


data.dropna(inplace=True)


if 'id' in data.columns:
    data.drop('id', axis=1, inplace=True)


X = data.drop(['CLASS_LABEL'], axis=1)
y = data['CLASS_LABEL']


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)


joblib.dump(model, 'model_pro.pkl')
joblib.dump(list(X.columns), 'feature_names.pkl')

print("✅ Model trained and saved successfully.")
