const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_PATH = path.join(__dirname, 'gameData.json');

// Save game data
app.post('/save-game', (req, res) => {
  const { gameId, gameData } = req.body;
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  data[gameId] = gameData;
  fs.writeFileSync(DATA_PATH, JSON.stringify(data));
  res.send({ success: true });
});

// Fetch game data
app.get('/game/:gameId', (req, res) => {
  const { gameId } = req.params;
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  if (data[gameId]) {
    res.send(data[gameId]);
  } else {
    res.status(404).send({ error: 'Game not found' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
