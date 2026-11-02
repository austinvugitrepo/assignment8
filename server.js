const express = require('express');
const app = express();
const PORT = 3000;

let items = [
	{id: 1, name: 'Laptop', price: 999 },
	{id: 2, name: 'Mouse', price: 25 },
];
let nextId = 3;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/items', (req, res) => {
	res.status(200).json(items);
});

app.get('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: `Item ${id} not found` });
  }
  res.status(200).json(item);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


