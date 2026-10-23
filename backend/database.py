
import sqlite3
from pathlib import Path

# Store the database inside the backend folder.
BASE_DIR = Path(__file__).resolve().parent
DATABASE_PATH = BASE_DIR / "ai_readiness_responses.db"


def get_connection():
    """Create a connection to the SQLite database."""
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    """Create the responses table if it does not exist."""
    with get_connection() as connection:
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
    print(f"Database initialized at: {DATABASE_PATH}")
