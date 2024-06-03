const express = require('express');
const cors = require('cors');
const path = require('path'); // Add this line
const sequelize = require('./connection'); // Ensure this path is correct
const { OliveOil, Balsamic } = require('./models'); // Ensure this path is correct

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.get('/api/olive_oils', async (req, res) => {
  const tags = req.query.tags;
  try {
    let oliveOils;
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      const conditions = tagArray.map(tag => sequelize.literal(`FIND_IN_SET('${tag}', REPLACE(tags, ' ', '')) > 0`));
      oliveOils = await OliveOil.findAll({
        where: {
          [sequelize.Op.or]: conditions
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

app.get('/api/balsamics', async (req, res) => {
  const tags = req.query.tags;
  try {
    let balsamics;
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      const conditions = tagArray.map(tag => sequelize.literal(`FIND_IN_SET('${tag}', REPLACE(tags, ' ', '')) > 0`));
      balsamics = await Balsamic.findAll({
        where: {
          [sequelize.Op.or]: conditions
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

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
