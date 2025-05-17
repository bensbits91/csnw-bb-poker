import { shuffleAndDealCards } from '../shuffleAndDealCards';

describe('shuffleAndDealCards', () => {
   it('should deal the correct number of hands to players', () => {
      const deck = Array.from({ length: 52 }, (_, i) => `Card${i + 1}`);
      const numPlayers = 4;

      const { dealtPlayers, updatedDeck } = shuffleAndDealCards(deck, numPlayers);

      expect(dealtPlayers).toHaveLength(numPlayers); // Verify the correct number of players
      dealtPlayers.forEach(hand => {
         expect(hand).toHaveLength(5); // Each player gets 5 cards
      });
      expect(updatedDeck).toHaveLength(52 - numPlayers * 5); // Remaining deck size
   });

   it('should not have duplicate cards in hands or remaining deck', () => {
      const deck = Array.from({ length: 52 }, (_, i) => `Card${i + 1}`);
      const numPlayers = 4;

      const { dealtPlayers, updatedDeck } = shuffleAndDealCards(deck, numPlayers);

      const allCards = [...dealtPlayers.flat(), ...updatedDeck];
      const uniqueCards = new Set(allCards);

      expect(allCards).toHaveLength(uniqueCards.size); // No duplicates
   });

   it('should handle edge case where deck has fewer cards than required', () => {
      const deck = Array.from({ length: 10 }, (_, i) => `Card${i + 1}`);
      const numPlayers = 3;

      const { dealtPlayers, updatedDeck } = shuffleAndDealCards(deck, numPlayers);

      // Verify that players are dealt as many cards as possible
      const totalCardsDealt = dealtPlayers.flat().length;
      expect(totalCardsDealt + updatedDeck.length).toBe(10); // All cards are accounted for
   });
});
