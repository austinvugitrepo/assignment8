DROP TABLE IF EXISTS items;

CREATE TABLE items (
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0)
);

INSERT INTO items (name, price) VALUES
  ('Laptop', 999),
  ('Mouse', 25);
