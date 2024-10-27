import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { GameState, Player } from './types';
import { createGame, joinGame, rollDice, toggleHold, submitScore } from './game-logic';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const gameState: GameState = {
  games: {}
};

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('create_game', ({ playerName }, callback) => {
    const player: Player = {
      id: socket.id,
      name: playerName,
      scores: {},
      connected: true
    };

    const game = createGame(player);
    gameState.games[game.id] = game;
    
    socket.join(game.id);
    callback({ gameId: game.id, playerId: player.id });
  });

  socket.on('join_game', ({ gameId, playerName }, callback) => {
    const game = gameState.games[gameId];
    if (!game) {
      callback({ error: 'Game not found' });
      return;
    }

    try {
      const player: Player = {
        id: socket.id,
        name: playerName,
        scores: {},
        connected: true
      };

      gameState.games[gameId] = joinGame(game, player);
      socket.join(gameId);
      
      io.to(gameId).emit('game_updated', gameState.games[gameId]);
      callback({ playerId: player.id });
    } catch (error) {
      callback({ error: error.message });
    }
  });

  socket.on('roll_dice', ({ gameId }) => {
    const game = gameState.games[gameId];
    if (!game || game.currentTurn !== socket.id) return;

    gameState.games[gameId] = rollDice(game);
    io.to(gameId).emit('game_updated', gameState.games[gameId]);
  });

  socket.on('toggle_hold', ({ gameId, dieIndex }) => {
    const game = gameState.games[gameId];
    if (!game || game.currentTurn !== socket.id) return;

    gameState.games[gameId] = toggleHold(game, dieIndex);
    io.to(gameId).emit('game_updated', gameState.games[gameId]);
  });

  socket.on('submit_score', ({ gameId, category, score }) => {
    const game = gameState.games[gameId];
    if (!game || game.currentTurn !== socket.id) return;

    gameState.games[gameId] = submitScore(game, socket.id, category, score);
    io.to(gameId).emit('game_updated', gameState.games[gameId]);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    // Handle player disconnection
    Object.entries(gameState.games).forEach(([gameId, game]) => {
      if (game.players[socket.id]) {
        game.players[socket.id].connected = false;
        io.to(gameId).emit('game_updated', game);
      }
    });
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});