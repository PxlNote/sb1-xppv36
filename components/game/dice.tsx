'use client';

import { cn } from '@/lib/utils';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

interface DieProps {
  value: number;
  held: boolean;
  onClick: () => void;
}

const diceIcons = {
  1: Dice1,
  2: Dice2,
  3: Dice3,
  4: Dice4,
  5: Dice5,
  6: Dice6,
};

export function Die({ value, held, onClick }: DieProps) {
  const DiceIcon = diceIcons[value as keyof typeof diceIcons];
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-16 h-16 rounded-lg border-2 transition-all duration-200",
        "hover:scale-105 active:scale-95",
        held ? "border-primary bg-primary/20" : "border-muted bg-card"
      )}
    >
      <DiceIcon className="w-full h-full p-2" />
    </button>
  );
}

export function DiceRow({ dice, heldDice, onToggleHold }: {
  dice: number[];
  heldDice: boolean[];
  onToggleHold: (index: number) => void;
}) {
  return (
    <div className="flex gap-4 justify-center my-8">
      {dice.map((value, index) => (
        <Die
          key={index}
          value={value}
          held={heldDice[index]}
          onClick={() => onToggleHold(index)}
        />
      ))}
    </div>
  );
}