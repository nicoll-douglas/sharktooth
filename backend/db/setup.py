from .connect import connect
from pathlib import Path
import os
import sqlite3

def setup(conn: sqlite3.Connection = connect()):
  """Sets up the application's database by reading and executing the application's SQL schema.

  Args:
    conn (sqlite3.Connection): A connection to the application's database.
  """
  
  schema_dir = Path(__file__).parent if os.getenv("APP_ENV") == "development" else os.path.join(os.getenv("RESOURCES_PATH"), "backend")
  schema_path = os.path.join(schema_dir, "schema.sql")

  with open(schema_path, "r", encoding="utf-8") as f:
    schema = f.read()

  cur = conn.cursor()
  cur.executescript(schema)
  conn.commit()
# END setup