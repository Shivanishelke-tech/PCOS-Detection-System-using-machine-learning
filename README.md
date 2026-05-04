# PCOS Prediction Web Application (React + Flask + SQLite)

Full-stack demo app for PCOS risk screening:
- Secure auth (register/login)
- Assessment flow with auto BMI calculation
- Prediction result + saved history
- Diet planner page + foods-to-avoid chart
- Exercise tracker page + sleep guidance
- Simple PCOS Q&A chatbot (offline, rule-based)

## Tech
- Frontend: React (Vite) + React Router
- Backend: Flask (Python) + SQLite (built-in `sqlite3`)

## Project structure
```
backend/
  app.py
  db.py
  auth.py
  model.py
  chat.py
  requirements.txt
frontend/
  index.html
  package.json
  vite.config.js
  src/
    main.jsx
    api.js
    App.jsx
    styles.css
    pages/
      Login.jsx
      Register.jsx
      Assessment.jsx
      Result.jsx
      History.jsx
      DietPlanner.jsx
      ExerciseTracker.jsx
      Chatbot.jsx
```

## Run (Backend)
Open PowerShell in `Project 1` and run:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
py -m pip install -r requirements.txt
py app.py
```

Backend starts on `http://127.0.0.1:5000`.

## Run (Frontend)
In a second PowerShell:

```powershell
cd frontend
npm install
npm run dev
```

Frontend starts on `http://127.0.0.1:5173`.

## Notes / Disclaimer
This is **not** a medical diagnosis tool. The current “model” is a transparent scoring-based classifier meant for demo purposes.
To use a real ML model, replace the logic in `backend/model.py` with a trained model and proper validation.

