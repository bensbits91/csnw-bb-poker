import { rankHand } from '@/utils/game';

/**
 * Result of the determineWinner function.
 * @interface determineWinnerResult
 * @property {number[]} winners - The indices of the winning players.
 * @property {Object[]} rankedHands - The ranked hands of all players.
 * @property {number} rankedHands[].playerIndex - The index of the player.
 * @property {number} rankedHands[].rank - The rank of the player's hand.
 * @property {string} rankedHands[].name - The name of the hand (e.g., "Full House").
 * @property {number[]} rankedHands[].tiebreaker - The tiebreaker values for the hand.
 */
interface determineWinnerResult {
   winners: number[];
   rankedHands: {
      playerIndex: number;
      rank: number;
      name: string;
      tiebreaker: number[];
   }[];
}

/**
 * Determines the winner(s) of the poker game.
 * Ranks the hands of all players, identifies the highest-ranked hand(s),
 * and resolves ties using tiebreaker values.
 *
 * @param {string[][]} players - An array of player hands, where each hand is an array of card strings.
 * @returns {determineWinnerResult} The result containing the indices of the winners and the ranked hands of all players.
 */
export function determineWinner(players: string[][]): determineWinnerResult {
   if (!Array.isArray(players) || players.length === 0) {
      console.error('Invalid input: players must be a non-empty array.');
      throw new Error(
         'determineWinner requires a valid array of player hands.'
      );
   }

   /**
    * Ranks the hands of all players.
    * Each hand is ranked using the `rankHand` utility function.
    */
   const rankedHands = players.map((hand, index) => ({
      playerIndex: index,
      ...rankHand(hand)
   }));

   /**
    * Finds the highest rank among all hands.
    */
   const highestRank = Math.max(...rankedHands.map(hand => hand.rank));

   /**
    * Filters players with the highest rank.
    */
   const potentialWinners = rankedHands.filter(
      hand => hand.rank === highestRank
   );

   if (potentialWinners.length === 0) {
      console.error('No valid winners found. All hands may be invalid.');
      throw new Error('determineWinner could not determine a winner.');
   }

   /**
    * Breaks ties among players with the highest rank using tiebreaker values.
    */
   potentialWinners.sort((a, b) => {
      for (let i = 0; i < a.tiebreaker.length; i++) {
         if (a.tiebreaker[i] !== b.tiebreaker[i]) {
            return b.tiebreaker[i] - a.tiebreaker[i];
         }
      }
      return 0; // Hands are identical
   });

   /**
    * Identifies the winner(s) by comparing tiebreaker values.
    */
   const winningRank = potentialWinners[0].tiebreaker;
   const winners = potentialWinners
      .filter(hand => hand.tiebreaker.join() === winningRank.join())
      .map(hand => hand.playerIndex);

   return { winners, rankedHands }; // Return the winners and their ranked hands
}
