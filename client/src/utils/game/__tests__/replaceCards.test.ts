import { replaceCards } from '../replaceCards';

describe('replaceCards', () => {
   it("should replace specific cards in a player's hand", () => {
      const players = [
         // two players for testing
         ['2♠', '3♠', '4♠', '5♠', '6♠'],
         ['7♠', '8♠', '9♠', '10♠', 'J♠']
      ];
      const deck = ['Q♠', 'K♠', 'A♠']; // Mini draw pile
      const playerIndex = 0; // Player 0's turn
      const cardIndices = [1, 3]; // Replace the 2nd and 4th cards

      const { updatedPlayers, updatedDeck } = replaceCards(
         players,
         deck,
         playerIndex,
         cardIndices
      );

      expect(updatedPlayers).toEqual([
         ['2♠', 'A♠', '4♠', 'K♠', '6♠'], // Updated hand for player 0
         ['7♠', '8♠', '9♠', '10♠', 'J♠'] // Player 1's hand remains unchanged
      ]);
      expect(updatedDeck).toEqual(['Q♠']); // Remaining deck after drawing two cards
   });

   it("should preserve other players' hands", () => {
      const players = [
         ['2♠', '3♠', '4♠', '5♠', '6♠'],
         ['7♠', '8♠', '9♠', '10♠', 'J♠']
      ];
      const deck = ['Q♠', 'K♠', 'A♠'];
      const playerIndex = 0;
      const cardIndices = [0]; // Replace the 1st card

      const { updatedPlayers } = replaceCards(players, deck, playerIndex, cardIndices);

      expect(updatedPlayers[1]).toEqual(['7♠', '8♠', '9♠', '10♠', 'J♠']); // Player 1's hand remains unchanged
   });

   it('should throw an error when the deck is empty', () => {
      const players = [
         ['2♠', '3♠', '4♠', '5♠', '6♠'],
         ['7♠', '8♠', '9♠', '10♠', 'J♠']
      ];
      const deck: string[] = []; // Empty deck
      const playerIndex = 0;
      const cardIndices = [0]; // Attempt to replace the 1st card

      expect(() => replaceCards(players, deck, playerIndex, cardIndices)).toThrow(
         'All cards have already been drawn from the deck'
      );
   });
});
