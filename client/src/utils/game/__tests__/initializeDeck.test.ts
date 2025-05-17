import { initializeDeck } from '../initializeDeck';
import { suits, ranks } from '@/constants/card';

describe('initializeDeck', () => {
   it('should create a deck with 52 cards', () => {
      const deck = initializeDeck();
      expect(deck).toHaveLength(52);
   });

   it('should create a deck with all unique cards', () => {
      const deck = initializeDeck();
      const uniqueCards = new Set(deck);
      expect(uniqueCards.size).toBe(52);
   });

   it('should create a deck with all combinations of suits and ranks', () => {
      const deck = initializeDeck();
      const expectedDeck = suits.flatMap(suit => ranks.map(rank => `${rank}${suit}`));
      expect(deck.sort()).toEqual(expectedDeck.sort());
   });
});
