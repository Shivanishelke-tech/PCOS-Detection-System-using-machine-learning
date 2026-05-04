const TOKEN_KEY = "pcos_token";

export function setToken(token) {
  if (!token) localStorage.removeItem(TOKEN_KEY);
  else localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthed() {
  return Boolean(getToken());
}

async function request(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

export const api = {
  health: () => request("/api/health"),
  register: (email, password) => request("/api/register", { method: "POST", body: { email, password } }),
  login: (email, password) => request("/api/login", { method: "POST", body: { email, password } }),
  me: () => request("/api/me"),
  assess: (payload) => request("/api/assess", { method: "POST", body: payload }),
  history: () => request("/api/history"),
  chat: (message) => request("/api/chat", { method: "POST", body: { message } })
};

