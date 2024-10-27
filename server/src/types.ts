export interface Player {
  id: string;
  name: string;
  scores: Record<string, number>;
  connected: boolean;
}

export interface Game {
  id: string;
  players: Record<string, Player>;
  currentTurn: string;
  dice: number[];
  heldDice: boolean[];
  rollsLeft: number;
  status: 'waiting' | 'playing' | 'finished';
}

export interface GameState {
  games: Record<string, Game>;
}