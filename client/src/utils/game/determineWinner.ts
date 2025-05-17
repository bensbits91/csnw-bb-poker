import { rankHand } from '@/utils/game';

interface determineWinnerResult {
   winners: number[];
   rankedHands: {
      playerIndex: number;
      rank: number;
      name: string;
      tiebreaker: number[];
   }[];
}

export function determineWinner(players: string[][]): determineWinnerResult {
   const rankedHands = players.map((hand, index) => ({
      playerIndex: index,
      ...rankHand(hand)
   }));

   // Find the highest rank
   const highestRank = Math.max(...rankedHands.map(hand => hand.rank));

   // Filter players with the highest rank
   const potentialWinners = rankedHands.filter(hand => hand.rank === highestRank);

   // Break ties using tiebreaker
   potentialWinners.sort((a, b) => {
      for (let i = 0; i < a.tiebreaker.length; i++) {
         if (a.tiebreaker[i] !== b.tiebreaker[i]) {
            return b.tiebreaker[i] - a.tiebreaker[i];
         }
      }
      return 0; // Hands are identical
   });

   // Return the winner(s)
   const winningRank = potentialWinners[0].tiebreaker;
   const winners = potentialWinners
      .filter(hand => hand.tiebreaker.join() === winningRank.join())
      .map(hand => hand.playerIndex);

   return { winners, rankedHands }; // Return the winners and their ranked hands
}
