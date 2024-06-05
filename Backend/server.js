const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./db/connection');
const { OliveOil, Balsamic } = require('./db/models');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

connectDB();

app.get('/api/olive_oils', async (req, res) => {
  try {
    const oliveOils = await OliveOil.find({});
    res.json({ olive_oils: oliveOils });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch olive oils' });
  }
});

app.get('/api/olive_oils/:tags', async (req, res) => {
  try {
    const tags = req.params.tags.split(',');
    const oliveOils = await OliveOil.find({ tags: { $in: tags } });
    res.json({ olive_oils: oliveOils });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch olive oils by tags' });
  }
});

app.get('/api/balsamics', async (req, res) => {
  try {
    const balsamics = await Balsamic.find({});
    res.json({ balsamics: balsamics });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch balsamics' });
  }
});

app.get('/api/balsamics/:tags', async (req, res) => {
  try {
    const tags = req.params.tags.split(',');
    const balsamics = await Balsamic.find({ tags: { $in: tags } });
    res.json({ balsamics: balsamics });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch balsamics by tags' });
  }
});

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
