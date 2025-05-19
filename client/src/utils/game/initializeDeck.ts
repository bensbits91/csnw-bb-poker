import { suits, ranks } from '@/constants/card';

/**
 * Initializes a standard deck of 52 playing cards.
 * Combines all suits and ranks to generate the full deck.
 *
 * @returns {string[]} An array of card strings, where each card is represented as a combination of rank and suit (e.g., "A♠", "10♥").
 */
export function initializeDeck(): string[] {
   return suits.flatMap(suit => ranks.map(rank => `${rank}${suit}`));
}
