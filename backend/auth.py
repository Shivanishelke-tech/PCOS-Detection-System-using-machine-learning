import secrets
from typing import Optional

from werkzeug.security import check_password_hash, generate_password_hash

from db import get_conn


def create_user(email: str, password: str) -> int:
    password_hash = generate_password_hash(password)
    with get_conn() as conn:
        cur = conn.execute(
            "INSERT INTO users (email, password_hash) VALUES (?, ?)",
            (email.lower().strip(), password_hash),
        )
        return int(cur.lastrowid)


def verify_user(email: str, password: str) -> Optional[int]:
    with get_conn() as conn:
        row = conn.execute(
            "SELECT id, password_hash FROM users WHERE email = ?",
            (email.lower().strip(),),
        ).fetchone()
        if not row:
            return None
        if not check_password_hash(row["password_hash"], password):
            return None
        return int(row["id"])


def issue_token(user_id: int) -> str:
    token = secrets.token_urlsafe(32)
    with get_conn() as conn:
        conn.execute(
            "INSERT INTO tokens (token, user_id) VALUES (?, ?)",
            (token, user_id),
        )
    return token


def revoke_token(token: str) -> None:
    with get_conn() as conn:
        conn.execute(
            "UPDATE tokens SET revoked_at = datetime('now') WHERE token = ?",
            (token,),
        )


def get_user_id_for_token(token: str) -> Optional[int]:
    if not token:
        return None
    with get_conn() as conn:
        row = conn.execute(
            "SELECT user_id FROM tokens WHERE token = ? AND revoked_at IS NULL",
            (token,),
        ).fetchone()
        if not row:
            return None
        return int(row["user_id"])


def get_user(user_id: int):
    with get_conn() as conn:
        return conn.execute(
            "SELECT id, email, created_at FROM users WHERE id = ?",
            (user_id,),
        ).fetchone()

