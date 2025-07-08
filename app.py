from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)


model = joblib.load('model_pro.pkl')
feature_names = joblib.load('feature_names.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("📦 Received data:", data)

        if not data:
            return jsonify({'error': 'No JSON received'}), 400

        missing_features = [feature for feature in feature_names if feature not in data]
        if missing_features:
            return jsonify({'error': f'Missing features: {missing_features}'}), 400

        features_df = pd.DataFrame([[data[feature] for feature in feature_names]], columns=feature_names)

        prediction = model.predict(features_df)[0]

        return jsonify({
            'phishing': bool(prediction == 1),
            'message': '⚠️ Phishing site!' if prediction == 1 else '✅ Safe site'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
