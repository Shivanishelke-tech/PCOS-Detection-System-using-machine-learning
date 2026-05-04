import React from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { isAuthed, setToken } from "./api";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Assessment from "./pages/Assessment.jsx";
import Result from "./pages/Result.jsx";
import History from "./pages/History.jsx";
import DietPlanner from "./pages/DietPlanner.jsx";
import ExerciseTracker from "./pages/ExerciseTracker.jsx";
import Wellness from "./pages/Wellness.jsx";
import Chatbot from "./pages/Chatbot.jsx";

function Protected({ children }) {
  const location = useLocation();
  if (!isAuthed()) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
}

function TopNav() {
  const navigate = useNavigate();
  const authed = isAuthed();
  return (
    <div className="topnav">
      <div className="brand">
        <div className="logo" aria-hidden="true" />
        <div>
          <div className="brandTitle">PCOS Detection & Support</div>
          <div className="brandSub">Assessment • Diet • Exercise • Chatbot</div>
        </div>
      </div>
      <div className="navlinks">
        {authed ? (
          <>
            <Link to="/assessment">Assessment</Link>
            <Link to="/history">History</Link>
            <Link to="/diet">Diet Planner</Link>
            <Link to="/exercise">Exercise</Link>
            <Link to="/wellness">Sleep & Cycle</Link>
            <Link to="/chatbot">AI Chatbot</Link>
            <button
              className="btn btnGhost"
              onClick={() => {
                setToken(null);
                navigate("/login");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="appShell">
      <TopNav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to={isAuthed() ? "/assessment" : "/login"} replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/assessment"
            element={
              <Protected>
                <Assessment />
              </Protected>
            }
          />
          <Route
            path="/result"
            element={
              <Protected>
                <Result />
              </Protected>
            }
          />
          <Route
            path="/history"
            element={
              <Protected>
                <History />
              </Protected>
            }
          />
          <Route
            path="/diet"
            element={
              <Protected>
                <DietPlanner />
              </Protected>
            }
          />
          <Route
            path="/exercise"
            element={
              <Protected>
                <ExerciseTracker />
              </Protected>
            }
          />
          <Route
            path="/wellness"
            element={
              <Protected>
                <Wellness />
              </Protected>
            }
          />
          <Route
            path="/chatbot"
            element={
              <Protected>
                <Chatbot />
              </Protected>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <footer className="footer">
          <div className="muted">
            This is a demo screening tool, not a medical diagnosis. For concerns, consult a qualified clinician.
          </div>
        </footer>
      </div>
    </div>
  );
}

