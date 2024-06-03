const express = require('express');
const cors = require('cors');
const path = require('path'); // Import path module
const sequelize = require('./db/connection'); // Ensure this path is correct
const { OliveOil, Balsamic } = require('./db/models'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// API endpoint for olive oils
app.get('/api/olive_oils', async (req, res) => {
  const tags = req.query.tags.split(',');
  try {
    const oliveOils = await getOliveOilsByTags(tags); // Define this function to fetch data based on tags
    res.json({ olive_oils: oliveOils });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// API endpoint for balsamics
app.get('/api/balsamics', async (req, res) => {
  const tags = req.query.tags.split(',');
  try {
    const balsamics = await getBalsamicsByTags(tags); // Define this function to fetch data based on tags
    res.json({ balsamics: balsamics });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});