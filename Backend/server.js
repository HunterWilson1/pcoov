const express = require('express');
const cors = require('cors');
const path = require('path');
const { Sequelize } = require('sequelize'); // Ensure Sequelize is properly imported
const { Balsamic, OliveOil } = require('./db/models');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api/balsamics', async (req, res) => {
  const tags = req.query.tags;
  try {
    let balsamics;
    if (tags) {
      const tagArray = tags.split(',');
      balsamics = await Balsamic.findAll({
        where: Sequelize.literal(`"tags" @> '${JSON.stringify(tagArray)}'`)  // Using JSON containment
      });
    } else {
      balsamics = await Balsamic.findAll();
    }
    res.json({ balsamics });
  } catch (err) {
    console.error("Error fetching balsamics:", err);
    res.status(500).send(`Error fetching data: ${err.message}`);
  }
});

app.get('/api/olive_oils', async (req, res) => {
  const tags = req.query.tags;
  try {
    let oliveOils;
    if (tags) {
      const tagArray = tags.split(','); // Split the tags into an array
      // Create a literal condition for each tag
      const conditions = tagArray.map(tag => Sequelize.literal(`JSON_CONTAINS(tags, '"${tag}"')`));
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


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
