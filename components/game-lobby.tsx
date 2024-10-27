'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

export function GameLobby() {
  const [playerName, setPlayerName] = useState('');
  const [gameCode, setGameCode] = useState('');

  const handleCreateGame = () => {
    // Will implement with Socket.IO
    console.log('Creating game...');
  };

  const handleJoinGame = () => {
    // Will implement with Socket.IO
    console.log('Joining game...');
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="flex items-center space-x-2 text-4xl font-bold">
        <Dice1 className="h-12 w-12" />
        <Dice2 className="h-12 w-12" />
        <span className="text-primary">Online Yahtzee</span>
        <Dice5 className="h-12 w-12" />
        <Dice6 className="h-12 w-12" />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Online Yahtzee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Button
              className="w-full"
              size="lg"
              onClick={handleCreateGame}
              disabled={!playerName}
            >
              Create New Game
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or join existing game
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Enter game code"
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value)}
            />
            <Button
              className="w-full"
              variant="outline"
              onClick={handleJoinGame}
              disabled={!playerName || !gameCode}
            >
              Join Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}