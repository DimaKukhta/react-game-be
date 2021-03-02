import { Router, json } from 'express';
import * as dataBase from '../db/database';

const router = Router();

router.get('/best-players', async (req, res, next) => {
  const allPlayers = await dataBase.getBestPlayers();

  allPlayers.sort((a, b) => a.score < b.score ? 1 : -1);
  const bestPlayers = allPlayers.slice(0, 10);

  res.json(bestPlayers);
});

router.post('/newBestPlayer', async (req, res, next) => {
    const player = {
      ...req.body
    };
    const newBestPlayers = await dataBase.updateBestPlayers(player);
    res.
    status(player ? 200 : 404)
    .json(player ?? { statusCode: 404 });
});


export default router;
