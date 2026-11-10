const express = require('express');
const app = express();
const PORT = 3000;

const pool = require('./db');

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/api/resources', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items ORDER BY id');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/resources/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'id must be an integer' });
  }
  try {
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Item ${id} not found` });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/resources', async (req, res) => {
  const { name, price } = req.body ?? {};
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'name is required and must be a non-empty string' });
  }
  if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
    return res.status(400).json({ error: 'price is required and must be a number >= 0' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO items (name, price) VALUES ($1, $2) RETURNING *',
      [name.trim(), price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.put('/api/resources/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'id must be an integer' });
  }
  const { name, price } = req.body ?? {};
  if (name === undefined && price === undefined) {
    return res.status(400).json({ error: 'send name and/or price to update' });
  }
  if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
    return res.status(400).json({ error: 'name must be a non-empty string' });
  }
  if (price !== undefined && (typeof price !== 'number' || !Number.isFinite(price) || price < 0)) {
    return res.status(400).json({ error: 'price must be a number >= 0' });
  }
  try {
    const result = await pool.query(
      'UPDATE items SET name = COALESCE($1, name), price = COALESCE($2, price) WHERE id = $3 RETURNING *',
      [name === undefined ? null : name.trim(), price === undefined ? null : price, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Item ${id} not found` });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/api/resources/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Item ${id} not found` });
  }
  const [deleted] = items.splice(index, 1);
  res.status(200).json(deleted);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

