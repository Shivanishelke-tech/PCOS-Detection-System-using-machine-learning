import os
import sqlite3
from contextlib import contextmanager


def _db_path() -> str:
    # store DB next to backend code
    return os.path.join(os.path.dirname(__file__), "app.db")


@contextmanager
def get_conn():
    conn = sqlite3.connect(_db_path())
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_db():
    with get_conn() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              email TEXT NOT NULL UNIQUE,
              password_hash TEXT NOT NULL,
              created_at TEXT NOT NULL DEFAULT (datetime('now'))
            );
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS assessments (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_id INTEGER NOT NULL,
              created_at TEXT NOT NULL DEFAULT (datetime('now')),
              age INTEGER NOT NULL,
              weight_kg REAL NOT NULL,
              height_cm REAL NOT NULL,
              bmi REAL NOT NULL,
              blood_group TEXT NOT NULL,
              cycle_length_days INTEGER NOT NULL,
              married INTEGER NOT NULL,
              weight_gain INTEGER NOT NULL,
              skin_darkening INTEGER NOT NULL,
              hair_loss INTEGER NOT NULL,
              acne INTEGER NOT NULL,
              fast_food INTEGER NOT NULL,
              regular_exercise INTEGER NOT NULL,
              score REAL NOT NULL,
              prediction TEXT NOT NULL,
              recommendation TEXT NOT NULL,
              FOREIGN KEY(user_id) REFERENCES users(id)
            );
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS tokens (
              token TEXT PRIMARY KEY,
              user_id INTEGER NOT NULL,
              created_at TEXT NOT NULL DEFAULT (datetime('now')),
              revoked_at TEXT,
              FOREIGN KEY(user_id) REFERENCES users(id)
            );
            """
        )

