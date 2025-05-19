import { HAND_RANKINGS } from '@/constants/handRankings';

/**
 * Evaluates a poker hand and determines its rank and tiebreaker values.
 *
 * @param {string[]} hand - An array of strings representing the cards in the hand (e.g., ['10♠', 'J♠', 'Q♠', 'K♠', 'A♠']).
 * @returns {Object} An object containing the hand's rank, name, and tiebreaker values.
 * @property {number} rank - The numerical rank of the hand (e.g., 1 for Royal Flush, 2 for Straight Flush).
 * @property {string} name - The name of the hand (e.g., "Full House", "Flush").
 * @property {number[]} tiebreaker - An array of numerical values used to resolve ties between hands.
 * @throws {Error} If the hand does not contain exactly 5 cards.
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
   const rankValues = ranks
      .map(rank => {
         if (rank === 'A') return 14;
         if (rank === 'K') return 13;
         if (rank === 'Q') return 12;
         if (rank === 'J') return 11;
         return parseInt(rank, 10);
      })
      .sort((a, b) => b - a); // Sort descending to make it easier to check for straights and get high card
   // rankValues = [14, 13, 12, 11, 10]

   // TODO: document our ranking functions
   // TODO: test live
   // TODO: unit tests
   // TODO: change card "rank" to something else to avoid confusion with rank of hand

   const isFlush = suits.every(suit => suit === suits[0]);
   const isStraight = rankValues.every(
      (val, i, arr) => i === 0 || val === arr[i - 1] - 1
   );

   // Check for Royal Flush, return if found
   if (isFlush && isStraight && rankValues[0] === 14) {
      const name = 'Royal Flush';
      return { rank: HAND_RANKINGS[name], name, tiebreaker: rankValues };
   }

   // Check for Straight Flush, return if found
   if (isFlush && isStraight) {
      const name = 'Straight Flush';
      return { rank: HAND_RANKINGS[name], name, tiebreaker: rankValues };
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
      return { rank: HAND_RANKINGS[name], name, tiebreaker: [fourOfAKindRank] };
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
      return {
         rank: HAND_RANKINGS[name],
         name,
         tiebreaker: [threeOfAKindRank!, pairRank!]
      };
   }

   // Return if we have a flush
   if (isFlush) {
      const name = 'Flush';
      return { rank: HAND_RANKINGS[name], name, tiebreaker: rankValues };
   }

   // Return if we have a straight
   if (isStraight) {
      const name = 'Straight';
      return { rank: HAND_RANKINGS[name], name, tiebreaker: rankValues };
   }

   // Check for Three of a Kind, return if found
   if (threeOfAKindRank !== undefined) {
      const name = 'Three of a Kind';
      return {
         rank: HAND_RANKINGS[name],
         name,
         tiebreaker: [threeOfAKindRank]
      };
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
            .sort((a, b) => b - a); // todo: this is wrong, in unit test, it should be [10, 9, 2] but is [9, 10, 2]
         return {
            rank: HAND_RANKINGS[name],
            name,
            tiebreaker: [...pairsSorted, ...remainingCards]
         };
      }

      // Default to One Pair and return
      const name = 'One Pair';
      const remainingCards = rankValues.filter(val => val !== pairRank);
      return {
         rank: HAND_RANKINGS[name],
         name,
         tiebreaker: [pairRank, ...remainingCards]
      };
   }

   // Default to High Card and return
   const name = 'High Card';
   return { rank: HAND_RANKINGS[name], name, tiebreaker: rankValues };
}
