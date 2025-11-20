const express = require('express');
const app = express();


app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1>');
});

app.get('/about', (req, res) => {
  res.send('<h1>About Page</h1>');
});

app.get('/api/users', (req, res) => {
  res.json({ users: ['Alice', 'Bob'] });
});

app.post('/api/users', (req, res) => {
  const userData = req.body; 
  res.status(201).json({ message: 'User created', data: userData });
});

app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

