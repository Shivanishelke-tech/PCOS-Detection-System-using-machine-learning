import React, { useState } from "react";
import { api } from "../api";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chat, setChat] = useState([
    { role: "bot", text: "Hi! Ask me PCOS/PCOD questions about symptoms, diet, exercise, and sleep." }
  ]);

  async function send() {
    const text = message.trim();
    if (!text) return;
    setMessage("");
    setError("");
    setLoading(true);
    const next = [...chat, { role: "user", text }];
    setChat(next);
    try {
      const res = await api.chat(text);
      setChat((c) => [...c, { role: "bot", text: res.answer }]);
    } catch (err) {
      setError(err.message || "Chat failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid2">
      <div className="card">
        <div className="cardHeader">
          <div>
            <h1 className="h1">AI Chatbot (PCOS Q&A)</h1>
            <div className="muted">Safe guidance; for diagnosis consult a clinician.</div>
          </div>
          <span className="pill">Connected to backend</span>
        </div>

        <div className="chatWrap">
          {chat.map((m, idx) => (
            <div key={idx} className={`chatBubble ${m.role === "user" ? "user" : "bot"}`}>
              <div style={{ fontWeight: 900, marginBottom: 6 }}>{m.role === "user" ? "You" : "Bot"}</div>
              <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{m.text}</div>
            </div>
          ))}
        </div>

        <div className="divider" />
        <label>Your question</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your PCOS question..." />
        <div className="btnRow">
          <button className="btn" disabled={loading} onClick={send}>
            {loading ? "Sending..." : "Send"}
          </button>
          <button
            className="btn btnGhost"
            onClick={() => setChat([{ role: "bot", text: "Hi! Ask me PCOS/PCOD questions about symptoms, diet, exercise, and sleep." }])}
          >
            Clear
          </button>
        </div>
        {error ? <div className="error">{error}</div> : null}
      </div>

      <div className="card">
        <h2 className="h2">Example questions</h2>
        <div className="muted" style={{ lineHeight: 1.7 }}>
          - What is PCOS?
          <br />- My periods are irregular. What can cause that?
          <br />- What diet is good for PCOS?
          <br />- What exercises are best for PCOD?
          <br />- How much sleep should adults get?
        </div>
        <div className="divider" />
        <div className="pill">Tip: keep questions short and specific</div>
      </div>
    </div>
  );
}

