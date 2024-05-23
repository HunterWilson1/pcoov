const express = require('express');
const cors = require('cors');
const path = require('path');
const { Balsamic, OliveOil } = require('./db/models');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the "images" directory
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api/balsamics', async (req, res) => {
  try {
    const balsamics = await Balsamic.findAll();
    res.json({ balsamics });
  } catch (err) {
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/olive_oils', async (req, res) => {
  try {
    const oliveOils = await OliveOil.findAll();
    res.json({ olive_oils: oliveOils });
  } catch (err) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
