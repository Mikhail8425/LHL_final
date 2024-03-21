DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255),
  user_id INTEGER REFERENCES users(id) NOT NULL,
  username VARCHAR(255),
  image_label VARCHAR(255),
  likes INTEGER
);