DROP TABLE IF EXISTS watchlists CASCADE;
CREATE TABLE watchlists(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    stock_id INTEGER REFERENCES stocks(id) NOT NULL
);