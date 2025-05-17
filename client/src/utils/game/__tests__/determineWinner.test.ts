import { determineWinner } from '../determineWinner';

describe('determineWinner', () => {
   it('should correctly determine a single winner', () => {
      const players = [
         ['10♠', 'J♠', 'Q♠', 'K♠', 'A♠'], // Royal Flush
         ['9♠', '10♠', 'J♠', 'Q♠', 'K♠'], // Straight Flush
         ['10♠', '10♥', '10♦', '10♣', '2♠'] // Four of a Kind
      ];
      const result = determineWinner(players);
      expect(result).toEqual({
         winners: [0], // Player 0 wins with Royal Flush
         rankedHands: expect.any(Array) // Ensure rankedHands is returned
      });
   });

   it('should correctly handle ties', () => {
      const players = [
         ['10♠', '10♥', '9♠', '9♥', '2♠'], // Two Pair
         ['10♣', '10♦', '9♣', '9♦', '2♣'] // Two Pair (tie)
      ];
      const result = determineWinner(players);
      expect(result).toEqual({
         winners: [0, 1], // Both players tie
         rankedHands: expect.any(Array)
      });
   });

   it('should correctly break ties with tiebreakers', () => {
      const players = [
         ['10♠', '10♥', '9♠', '9♥', '3♠'], // Two Pair with kicker 3
         ['10♣', '10♦', '9♣', '9♦', '2♣'] // Two Pair with kicker 2
      ];
      const result = determineWinner(players);
      expect(result).toEqual({
         winners: [0], // Player 0 wins with higher kicker
         rankedHands: expect.any(Array)
      });
   });
});
