'use client';

import { GameBoard } from '@/components/game/game-board';

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; // Await the promise to get the actual object
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="container mx-auto">
        <GameBoard gameId={resolvedParams.id} playerId="player1" /> // Use resolvedParams.id
      </div>
    </main>
  );
}
