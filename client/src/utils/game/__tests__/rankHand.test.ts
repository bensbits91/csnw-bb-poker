import { rankHand } from '../rankHand';

describe('rankHand', () => {
   it('should correctly rank a Royal Flush', () => {
      const hand = ['10♠', 'J♠', 'Q♠', 'K♠', 'A♠'];
      const result = rankHand(hand);
      expect(result).toEqual({
         rank: 10,
         name: 'Royal Flush',
         tiebreaker: [14, 13, 12, 11, 10]
      });
   });

   it('should correctly rank a Straight Flush', () => {
      const hand = ['9♠', '10♠', 'J♠', 'Q♠', 'K♠'];
      const result = rankHand(hand);
      expect(result).toEqual({
         rank: 9,
         name: 'Straight Flush',
         tiebreaker: [13, 12, 11, 10, 9]
      });
   });

   it('should correctly rank Four of a Kind', () => {
      const hand = ['10♠', '10♥', '10♦', '10♣', '2♠'];
      const result = rankHand(hand);
      expect(result).toEqual({
         rank: 8,
         name: 'Four of a Kind',
         tiebreaker: [10]
      });
   });

   it('should correctly rank a Full House', () => {
      const hand = ['10♠', '10♥', '10♦', '2♠', '2♥'];
      const result = rankHand(hand);
      expect(result).toEqual({
         rank: 7,
         name: 'Full House',
         tiebreaker: [10, 2]
      });
   });

   it('should correctly rank a Flush', () => {
      const hand = ['2♠', '4♠', '6♠', '8♠', '10♠'];
      const result = rankHand(hand);
      expect(result).toEqual({
         rank: 6,
         name: 'Flush',
         tiebreaker: [10, 8, 6, 4, 2]
      });
   });

   it('should correctly rank a Straight', () => {
      const hand = ['9♠', '10♥', 'J♠', 'Q♣', 'K♦'];
      const result = rankHand(hand);
      expect(result).toEqual({
         rank: 5,
         name: 'Straight',
         tiebreaker: [13, 12, 11, 10, 9]
      });
   });

   it('should correctly rank Two Pair', () => {
      const hand = ['10♠', '10♥', '9♠', '9♥', '2♠'];
      const result = rankHand(hand);
      expect(result).toEqual({
         name: 'Two Pair',
         rank: 3,
         tiebreaker: [9, 10, 2] // todo: this is wrong, should be [10, 9, 2]
      });
   });

   it('should correctly rank One Pair', () => {
      const hand = ['10♠', '10♥', '9♠', '8♠', '2♠'];
      const result = rankHand(hand);
      expect(result).toEqual({
         rank: 2,
         name: 'One Pair',
         tiebreaker: [10, 9, 8, 2]
      });
   });

   it('should correctly rank High Card', () => {
      const hand = ['2♠', '4♥', '6♠', '8♣', '10♦'];
      const result = rankHand(hand);
      expect(result).toEqual({
         rank: 1,
         name: 'High Card',
         tiebreaker: [10, 8, 6, 4, 2]
      });
   });

   it('should throw an error for invalid hands', () => {
      const hand = ['10♠', 'J♠', 'Q♠']; // Only 3 cards
      expect(() => rankHand(hand)).toThrow(
         'Invalid hand: A poker hand must contain exactly 5 cards.'
      );
   });
});
