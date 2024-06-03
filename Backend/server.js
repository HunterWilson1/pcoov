const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const sequelize = require('./db/connection');
const OliveOil = require('./models/oliveOil');
const Balsamic = require('./models/balsamic');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// API endpoint for olive oils
app.get('/api/olive_oils', async (req, res) => {
  const tags = req.query.tags ? req.query.tags.split(',') : [];
  try {
    const oliveOils = await OliveOil.findAll({
      where: {
        tags: {
          [sequelize.Op.overlap]: tags,
        },
      },
    });
    res.json({ olive_oils: oliveOils });
  } catch (error) {
    console.error('Error fetching olive oils:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// API endpoint for balsamics
app.get('/api/balsamics', async (req, res) => {
  const tags = req.query.tags ? req.query.tags.split(',') : [];
  try {
    const balsamics = await Balsamic.findAll({
      where: {
        tags: {
          [sequelize.Op.overlap]: tags,
        },
      },
    });
    res.json({ balsamics: balsamics });
  } catch (error) {
    console.error('Error fetching balsamics:', error);
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

// Sync database
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database:', err));
