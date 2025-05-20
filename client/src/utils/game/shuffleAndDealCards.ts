/**
 * Shuffles the deck and deals cards to players.
 *
 * @param {string[]} deck - The current deck of cards to shuffle and deal.
 * @param {number} numPlayers - The number of players to deal cards to.
 * @returns {Object} An object containing the dealt player hands and the updated deck.
 * @property {string[][]} dealtPlayers - An array of player hands, where each hand is an array of 5 card strings.
 * @property {string[]} updatedDeck - The remaining deck after dealing cards.
 */
export function shuffleAndDealCards(
   deck: string[],
   numPlayers: number
): { dealtPlayers: string[][]; updatedDeck: string[] } {
   const shuffledDeck = deck.sort(() => Math.random() - 0.5); // Shuffle the deck
   const dealtPlayers = Array.from({ length: numPlayers }, () =>
      shuffledDeck.splice(0, 5)
   ); // Deal 5 cards to each player

   return { dealtPlayers, updatedDeck: shuffledDeck }; // Return the players' hands and the remaining deck
}
