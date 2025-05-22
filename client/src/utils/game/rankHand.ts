import { HAND_RANKINGS } from '@/constants/handRankings';

/**
 * Evaluates a poker hand and determines its rank and tiebreaker values.
 *
 * @param {string[]} hand - An array of strings representing the cards in the hand.
 *                          Each card is represented as a combination of rank and suit (e.g., ['10♠', 'J♠', 'Q♠', 'K♠', 'A♠']).
 * @returns {{ rank: number, name: string, tiebreaker: number[] }} An object containing:
 *          - `rank`: The numerical rank of the hand (e.g., 1 for Royal Flush, 2 for Straight Flush).
 *          - `name`: The name of the hand (e.g., "Full House", "Flush").
 *          - `tiebreaker`: An array of numerical values used to resolve ties between hands.
 * @throws {Error} If the hand does not contain exactly 5 cards or contains invalid card values.
 */
export function rankHand(hand: string[]): {
   rank: number;
   name: string;
   tiebreaker: number[];
} {
   // Example: hand = ['10♠', 'J♠', 'Q♠', 'K♠', 'A♠']
   if (hand.length !== 5) {
      throw new Error(
         'Invalid hand: A poker hand must contain exactly 5 cards.'
      );
   }

   // Extract ranks and suits
   const ranks = hand.map(card => card.slice(0, -1)); // ['10', 'J', 'Q', 'K', 'A']
   const suits = hand.map(card => card.slice(-1)); // ['♠', '♠', '♠', '♠', '♠']

   // Convert ranks to numeric values for comparison
   const rankStringToInt = (rankString: string) => {
      if (rankString === 'A') return 14;
      if (rankString === 'K') return 13;
      if (rankString === 'Q') return 12;
      if (rankString === 'J') return 11;
      return parseInt(rankString, 10);
   };

   const rankValues = ranks
      .map(rank => rankStringToInt(rank))
      .sort((a, b) => b - a); // Sort descending to make it easier to check for straights and get high card
   // rankValues = [14, 13, 12, 11, 10]

   if (rankValues.some(val => isNaN(val))) {
      console.error('Invalid rank values in hand:', rankValues);
      throw new Error('rankHand encountered invalid rank values.');
   }

   /**
    * Creates an object representing the rank, name, and tiebreaker values of a poker hand.
    *
    * @param {keyof typeof HAND_RANKINGS} name - The name of the poker hand (e.g., "Royal Flush", "Full House").
    * @param {number[]} [tiebreaker=rankValues] - An array of numerical values used to resolve ties between hands.
    *                                            Defaults to the sorted rank values of the hand.
    * @returns {{ rank: number, name: string, tiebreaker: number[] }} An object containing:
    *          - `rank`: The numerical rank of the hand (e.g., 1 for Royal Flush, 2 for Straight Flush).
    *          - `name`: The name of the hand (e.g., "Full House", "Flush").
    *          - `tiebreaker`: An array of numerical values used to resolve ties between hands.
    */
   const rankingToReturn = (
      name: keyof typeof HAND_RANKINGS,
      tiebreaker = rankValues,
      winningCards: string[] = hand
   ) => ({
      rank: HAND_RANKINGS[name],
      name,
      tiebreaker: tiebreaker,
      winningCards: winningCards
   });

   const isFlush = suits.every(suit => suit === suits[0]);
   const isStraight = rankValues.every(
      (val, i, arr) => i === 0 || val === arr[i - 1] - 1
   );

   // Check for Royal Flush, return if found
   if (isFlush && isStraight && rankValues[0] === 14) {
      const name = 'Royal Flush';
      return rankingToReturn(name);
   }

   // Check for Straight Flush, return if found
   if (isFlush && isStraight) {
      const name = 'Straight Flush';
      return rankingToReturn(name);
   }

   // Count occurrences of each rank
   // rankCount = { 10: 1, J: 1, Q: 1, K: 1, A: 1 }
   const rankCount = rankValues.reduce(
      (acc, val) => {
         acc[val] = (acc[val] || 0) + 1;
         return acc;
      },
      {} as Record<number, number>
   );

   // Check for Four of a Kind, return if found
   const fourOfAKindRank = Object.keys(rankCount)
      .map(Number)
      .find(rank => rankCount[rank] === 4);
   if (fourOfAKindRank !== undefined) {
      const name = 'Four of a Kind';
      const winningCards = hand.filter(
         card => rankStringToInt(card.slice(0, -1)) === fourOfAKindRank
      );
      return rankingToReturn(name, [fourOfAKindRank], winningCards);
   }

   // Check for Three of a Kind (used later)
   const threeOfAKindRank = Object.keys(rankCount)
      .map(Number)
      .find(rank => rankCount[rank] === 3);

   // Check for Pair(s) (used later)
   const pairRank = Object.keys(rankCount)
      .map(Number)
      .find(rank => rankCount[rank] === 2);

   // Check for Full House, return if found
   const hasFullHouse =
      threeOfAKindRank !== undefined && pairRank !== undefined;
   if (hasFullHouse) {
      const name = 'Full House';
      return rankingToReturn(name, [threeOfAKindRank!, pairRank!]);
   }

   // Return if we have a flush
   if (isFlush) {
      const name = 'Flush';
      return rankingToReturn(name);
   }

   // Return if we have a straight
   if (isStraight) {
      const name = 'Straight';
      return rankingToReturn(name);
   }

   // Check for Three of a Kind, return if found
   if (threeOfAKindRank !== undefined) {
      const name = 'Three of a Kind';
      const winningCards = hand.filter(
         card => rankStringToInt(card.slice(0, -1)) === threeOfAKindRank
      );
      return rankingToReturn(name, [threeOfAKindRank], winningCards);
   }

   // If we have a pair, check for Two Pair or One Pair
   if (pairRank !== undefined) {
      // Check for Two Pair, return if found
      const secondPairRank = Object.keys(rankCount)
         .map(Number)
         .find(rank => rankCount[rank] === 2 && rank !== pairRank);
      if (secondPairRank !== undefined) {
         const name = 'Two Pair';
         const pairsSorted = [pairRank, secondPairRank].sort((a, b) => b - a); // highest pair first for tiebreakers
         const remainingCards = rankValues
            .filter(val => val !== pairRank && val !== secondPairRank)
            .sort((a, b) => b - a);
         const winningCards = hand.filter(card =>
            [pairRank, secondPairRank].includes(
               rankStringToInt(card.slice(0, -1))
            )
         );
         return rankingToReturn(
            name,
            [...pairsSorted, ...remainingCards],
            winningCards
         );
      }

      const winningCards = hand.filter(card =>
         [pairRank].includes(rankStringToInt(card.slice(0, -1)))
      );
      // Default to One Pair and return
      const name = 'One Pair';
      const remainingCards = rankValues.filter(val => val !== pairRank);
      return rankingToReturn(name, [pairRank, ...remainingCards], winningCards);
   }

   // Default to High Card and return
   const name = 'High Card';
   const winningCards = hand.filter(
      card => rankStringToInt(card.slice(0, -1)) === rankValues[0]
   );
   return rankingToReturn(name, rankValues, winningCards);
}
