const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const { OliveOil, Balsamic } = require('./models'); // Ensure correct path

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Endpoint for fetching olive oils based on tags
app.get('/api/olive_oils', async (req, res) => {
  const tags = req.query.tags;
  try {
    let oliveOils;
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      const conditions = tagArray.map(tag => Sequelize.literal(`FIND_IN_SET('${tag}', REPLACE(tags, ' ', '')) > 0`));
      oliveOils = await OliveOil.findAll({
        where: {
          [Sequelize.Op.or]: conditions
        }
      });
    } else {
      oliveOils = await OliveOil.findAll();
    }
    res.json({ olive_oils: oliveOils });
  } catch (err) {
    console.error("Error fetching olive oils:", err);
    res.status(500).send(`Error fetching data: ${err.message}`);
  }
});

// Endpoint for fetching balsamics based on tags
app.get('/api/balsamics', async (req, res) => {
  const tags = req.query.tags;
  try {
    let balsamics;
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      const conditions = tagArray.map(tag => Sequelize.literal(`FIND_IN_SET('${tag}', REPLACE(tags, ' ', '')) > 0`));
      balsamics = await Balsamic.findAll({
        where: {
          [Sequelize.Op.or]: conditions
        }
      });
    } else {
      balsamics = await Balsamic.findAll();
    }
    res.json({ balsamics: balsamics });
  } catch (err) {
    console.error("Error fetching balsamics:", err);
    res.status(500).send(`Error fetching data: ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
