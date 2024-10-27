export function calculatePossibleScores(dice: number[]): Record<string, number> {
  const counts = dice.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const scores: Record<string, number> = {};

  // Upper section
  for (let i = 1; i <= 6; i++) {
    scores[`${['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'][i-1]}`] = 
      (counts[i] || 0) * i;
  }

  const diceSum = dice.reduce((sum, val) => sum + val, 0);

  // Three of a kind
  if (Object.values(counts).some(count => count >= 3)) {
    scores.threeOfAKind = diceSum;
  }

  // Four of a kind
  if (Object.values(counts).some(count => count >= 4)) {
    scores.fourOfAKind = diceSum;
  }

  // Full house
  if (Object.values(counts).some(count => count === 3) &&
      Object.values(counts).some(count => count === 2)) {
    scores.fullHouse = 25;
  }

  // Small straight
  const uniqueDice = [...new Set(dice)].sort();
  let maxSequence = 1;
  let currentSequence = 1;
  for (let i = 1; i < uniqueDice.length; i++) {
    if (uniqueDice[i] === uniqueDice[i-1] + 1) {
      currentSequence++;
      maxSequence = Math.max(maxSequence, currentSequence);
    } else {
      currentSequence = 1;
    }
  }
  if (maxSequence >= 4) {
    scores.smallStraight = 30;
  }

  // Large straight
  if (maxSequence >= 5) {
    scores.largeStraight = 40;
  }

  // Yahtzee
  if (Object.values(counts).some(count => count === 5)) {
    scores.yahtzee = 50;
  }

  // Chance
  scores.chance = diceSum;

  return scores;
}