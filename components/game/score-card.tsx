'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ScoreCardProps {
  scores: Record<string, number>;
  possibleScores: Record<string, number>;
  onSelectScore: (category: string) => void;
  currentPlayer: string;
  isCurrentTurn: boolean;
}

const scoreCategories = {
  upper: [
    { key: 'ones', label: 'Ones' },
    { key: 'twos', label: 'Twos' },
    { key: 'threes', label: 'Threes' },
    { key: 'fours', label: 'Fours' },
    { key: 'fives', label: 'Fives' },
    { key: 'sixes', label: 'Sixes' },
  ],
  lower: [
    { key: 'threeOfAKind', label: '3 of a kind' },
    { key: 'fourOfAKind', label: '4 of a kind' },
    { key: 'fullHouse', label: 'Full house' },
    { key: 'smallStraight', label: 'SM straight' },
    { key: 'largeStraight', label: 'LG straight' },
    { key: 'yahtzee', label: 'YAHTZEE' },
    { key: 'chance', label: 'Chance' },
  ],
};

export function ScoreCard({
  scores,
  possibleScores,
  onSelectScore,
  currentPlayer,
  isCurrentTurn,
}: ScoreCardProps) {
  const renderScoreRow = (category: { key: string; label: string }) => {
    const score = scores[category.key];
    const possibleScore = possibleScores[category.key];
    const isSelectable = isCurrentTurn && score === undefined && possibleScore !== undefined;

    return (
      <tr key={category.key} className="border-b border-muted">
        <td className="py-2 px-4">{category.label}</td>
        <td
          className={cn(
            "py-2 px-4 text-center",
            isSelectable && "cursor-pointer hover:bg-primary/20",
            score !== undefined && "text-muted-foreground"
          )}
          onClick={() => isSelectable && onSelectScore(category.key)}
        >
          {score !== undefined ? score : (isSelectable ? possibleScore : '')}
        </td>
      </tr>
    );
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{currentPlayer}</span>
          <span className="text-sm font-normal">
            {isCurrentTurn ? "Your turn" : "Waiting..."}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full">
          <tbody>
            {scoreCategories.upper.map(renderScoreRow)}
            <tr className="border-b border-muted">
              <td className="py-2 px-4 font-semibold">Bonus</td>
              <td className="py-2 px-4 text-center">
                {scores.bonus || '0'}
              </td>
            </tr>
            {scoreCategories.lower.map(renderScoreRow)}
            <tr className="border-t-2 border-primary">
              <td className="py-2 px-4 font-semibold">Total</td>
              <td className="py-2 px-4 text-center font-semibold">
                {Object.values(scores).reduce((a, b) => a + (b || 0), 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}