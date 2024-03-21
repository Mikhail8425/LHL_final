DROP TABLE IF EXISTS watchlists CASCADE;

CREATE TABLE watchlists (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  ticker_symbol VARCHAR(255) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  email_frequency TEXT
);
