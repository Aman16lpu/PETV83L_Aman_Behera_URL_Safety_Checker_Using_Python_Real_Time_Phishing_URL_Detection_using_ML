PhishAlert: Real-Time Phishing URL Detection using Machine Learning & Browser Extension
PhishAlert is a powerful, real-time phishing URL detection tool that uses a machine learning model integrated with a Google Chrome extension. It analyzes URLs based on handcrafted features and warns users before they land on potentially dangerous sites — helping to stay safe from phishing attacks.

-> Features
*	Real-time phishing detection
*	Feature-based ML model (Random Forest)
*	Chrome browser extension (Manifest V3)
*	Fast Flask backend for prediction API
*	Easy to train, test, and extend
*	Built using a real-world phishing dataset

-> How It Works
1.	The Chrome extension grabs the URL of the current tab.
2.	It extracts 50+ features (like presence of IP, suspicious keywords, URL length, etc.).
3.	It sends these features to the Flask API (localhost:5000/predict).
4.	The backend uses a trained Random Forest model to classify the URL.
5.	The extension shows a warning if the URL is phishing.

-> Project Structure
PhishAlert/
│
├── train_model.py             # Trains ML model using CSV dataset
├── app.py                     # Flask API backend for predictions
├── Phishing_Legitimate_full.csv # Dataset with legitimate and phishing URLs
│
├── extension/                 # Chrome extension folder
│   ├── background.js
│   ├── popup.html
│   ├── popup.js
│   ├── manifest.json
│
├── model_pro.pkl              # Trained ML model (auto-generated)
├── feature_names.pkl          # Feature list used during training (auto-generated)



-> Installation & Usage
1. Train the Model
python train_model.py
2. Run the Flask Server
python app.py
3. Load Extension in Chrome
*	Go to chrome://extensions
*	Enable Developer mode
*	Click Load Unpacked
*	Select the extension/ folder
4. Test a URL
*	Open any website
*	Click the PhishAlert extension icon
*	Click “Check This Site” to see if it’s safe or phishing

-> Dataset
The model uses the Phishing_Legitimate_full.csv dataset consisting of:
*	Legitimate URLs with label 0
*	Phishing URLs with label 1
You can enhance detection accuracy by adding more high-quality phishing samples.

-> Sample Phishing URLs to Test
http://secure-login.bankofamerica.com.login-update.verify-account.com/
http://secure-login.paypal.com.account.verify-update.com/
http://netflix.com.secure-user-update-info.com/
http://appleid.apple.com.loginverifysecurity.ru/
http://login-update.microsoft.com.user-auth.info/

-> Machine Learning
*	Algorithm: Random Forest Classifier
*	Features: 50+ handcrafted URL-based and content-based features
*	Libraries: scikit-learn, pandas, joblib



