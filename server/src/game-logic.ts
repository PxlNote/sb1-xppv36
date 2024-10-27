import { Game, Player } from './types';
import { v4 as uuidv4 } from 'uuid';

export function createGame(hostPlayer: Player): Game {
  return {
    id: uuidv4(),
    players: {
      [hostPlayer.id]: hostPlayer
    },
    currentTurn: hostPlayer.id,
    dice: [1, 1, 1, 1, 1],
    heldDice: [false, false, false, false, false],
    rollsLeft: 3,
    status: 'waiting'
  };
}

export function joinGame(game: Game, player: Player): Game {
  if (Object.keys(game.players).length >= 2) {
    throw new Error('Game is full');
  }

  return {
    ...game,
    players: {
      ...game.players,
      [player.id]: player
    },
    status: 'playing'
  };
}

export function rollDice(game: Game): Game {
  if (game.rollsLeft <= 0) return game;

  const newDice = game.dice.map((die, i) => 
    game.heldDice[i] ? die : Math.floor(Math.random() * 6) + 1
  );

  return {
    ...game,
    dice: newDice,
    rollsLeft: game.rollsLeft - 1
  };
}

export function toggleHold(game: Game, dieIndex: number): Game {
  if (game.rollsLeft === 3) return game;

  const newHeldDice = [...game.heldDice];
  newHeldDice[dieIndex] = !newHeldDice[dieIndex];

  return {
    ...game,
    heldDice: newHeldDice
  };
}

export function submitScore(game: Game, playerId: string, category: string, score: number): Game {
  const player = game.players[playerId];
  if (!player) return game;

  const newPlayer: Player = {
    ...player,
    scores: {
      ...player.scores,
      [category]: score
    }
  };

  const nextPlayerId = Object.keys(game.players).find(id => id !== playerId);

  return {
    ...game,
    players: {
      ...game.players,
      [playerId]: newPlayer
    },
    currentTurn: nextPlayerId || playerId,
    dice: [1, 1, 1, 1, 1],
    heldDice: [false, false, false, false, false],
    rollsLeft: 3
  };
}