DROP TABLE IF EXISTS plans CASCADE;

CREATE TABLE plans (
  id SERIAL PRIMARY KEY,
  plan_name VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  price INTEGER,
  billingCycle VARCHAR(255),
  description TEXT
);