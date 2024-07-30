import express from 'express';
const app = express();
const port = 5173;
import { json } from 'body-parser';
import cors from 'cors';
app.use(cors());

app.use(json());

let games = {}; // In-memory store for simplicity

// Endpoint to save game data
app.post('/save-game', (req, res) => {
  const { gameId, gameData } = req.body;
  games[gameId] = gameData;
  res.status(200).json({ message: 'Game saved successfully' });
});

// Endpoint to get game data
app.get('/game/:gameId', (req, res) => {
  const { gameId } = req.params;
  const gameData = games[gameId];
  if (gameData) {
    res.status(200).json(gameData);
  } else {
    res.status(404).json({ message: 'Game not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

