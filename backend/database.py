
import os
import sqlite3
from pathlib import Path

DATABASE_URL = os.getenv("DATABASE_URL")

BASE_DIR = Path(__file__).resolve().parent
DATABASE_PATH = BASE_DIR / "ai_readiness_responses.db"


def get_connection():
    """Use PostgreSQL on Render and SQLite during local development."""

    if DATABASE_URL:
        import psycopg
        from psycopg.rows import dict_row

        return psycopg.connect(
            DATABASE_URL,
            row_factory=dict_row
        )

    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    """Create the responses table if it does not already exist."""

    with get_connection() as connection:
        if DATABASE_URL:
            connection.execute(
                """
                CREATE TABLE IF NOT EXISTS responses (
                    id BIGSERIAL PRIMARY KEY,
                    submission_id TEXT NOT NULL UNIQUE,
                    submitted_at TEXT NOT NULL,
                    questionnaire_version TEXT NOT NULL,
                    responses_json TEXT NOT NULL,
                    dimension_scores_json TEXT NOT NULL,
                    overall_score DOUBLE PRECISION NOT NULL
                )
                """
            )
        else:
            connection.execute(
                """
                CREATE TABLE IF NOT EXISTS responses (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    submission_id TEXT NOT NULL UNIQUE,
                    submitted_at TEXT NOT NULL,
                    questionnaire_version TEXT NOT NULL,
                    responses_json TEXT NOT NULL,
                    dimension_scores_json TEXT NOT NULL,
                    overall_score REAL NOT NULL
                )
                """
            )


if __name__ == "__main__":
    initialize_database()
    print("Database initialized successfully.")
