'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DiceRow } from './dice';
import { ScoreCard } from './score-card';
import { calculatePossibleScores } from '@/lib/yahtzee-rules';

export function GameBoard({ gameId, playerId }: { gameId: string; playerId: string }) {
  const [dice, setDice] = useState<number[]>([1, 1, 1, 1, 1]);
  const [heldDice, setHeldDice] = useState<boolean[]>([false, false, false, false, false]);
  const [rollsLeft, setRollsLeft] = useState(3);
  const [scores, setScores] = useState<Record<string, number>>({});
  
  const rollDice = () => {
    if (rollsLeft > 0) {
      setDice(prev => 
        prev.map((die, i) => heldDice[i] ? die : Math.floor(Math.random() * 6) + 1)
      );
      setRollsLeft(prev => prev - 1);
    }
  };

  const toggleHold = (index: number) => {
    if (rollsLeft < 3) {
      setHeldDice(prev => {
        const next = [...prev];
        next[index] = !next[index];
        return next;
      });
    }
  };

  const handleSelectScore = (category: string) => {
    const possibleScores = calculatePossibleScores(dice);
    setScores(prev => ({
      ...prev,
      [category]: possibleScores[category]
    }));
    setDice([1, 1, 1, 1, 1]);
    setHeldDice([false, false, false, false, false]);
    setRollsLeft(3);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-full max-w-2xl">
        <DiceRow
          dice={dice}
          heldDice={heldDice}
          onToggleHold={toggleHold}
        />
        <div className="flex justify-center gap-4">
          <Button 
            onClick={rollDice}
            disabled={rollsLeft === 0}
          >
            Roll Dice ({rollsLeft} left)
          </Button>
        </div>
      </div>
      
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <ScoreCard
          scores={scores}
          possibleScores={rollsLeft < 3 ? calculatePossibleScores(dice) : {}}
          onSelectScore={handleSelectScore}
          currentPlayer="Player 1"
          isCurrentTurn={true}
        />
      </div>
    </div>
  );
}