const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Log requests to console
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('<h1>Automation Portfolio - Sample App</h1><p>Running on Project 3 CI/CD Infrastructure</p>');
});

// API endpoint for users
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe', role: 'Developer' },
    { id: 2, name: 'Jane Smith', role: 'QA' }
  ]);
});

// Error handling
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sample app listening at http://0.0.0.0:${PORT}`);
});
