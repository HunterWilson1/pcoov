const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3001;

// Use CORS to allow requests from your frontend
app.use(cors());

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'balsamicDB'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Fetch balsamic data
app.get('/api/balsamics', (req, res) => {
  const sql = 'SELECT * FROM balsamics';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Error fetching data');
      throw err;
    }
    res.json({ balsamics: result });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
