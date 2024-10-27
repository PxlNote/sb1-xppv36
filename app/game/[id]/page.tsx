'use client';

import { GameBoard } from '@/components/game/game-board';

export default function GamePage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="container mx-auto">
        <GameBoard gameId={params.id} playerId="player1" />
      </div>
    </main>
  );
}