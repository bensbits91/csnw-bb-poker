/**
 * Replaces selected cards in a player's hand with new cards from the deck.
 *
 * @param {string[][]} players - An array of player hands, where each hand is an array of card strings.
 * @param {string[]} deck - The current deck of cards.
 * @param {number} playerIndex - The index of the player whose cards are being replaced.
 * @param {number[]} cardIndices - The indices of the cards in the player's hand to replace.
 * @returns {Object} An object containing the updated player hands and the updated deck.
 * @property {string[][]} updatedPlayers - The updated array of player hands.
 * @property {string[]} updatedDeck - The updated deck after cards have been drawn.
 * @throws {Error} If the deck is empty and no cards are available to draw.
 */
export function replaceCards(
   players: string[][],
   deck: string[],
   playerIndex: number,
   cardIndices: number[]
): { updatedPlayers: string[][]; updatedDeck: string[] } {
   const newHand = [...players[playerIndex]];

   cardIndices.forEach(index => {
      if (deck.length === 0) {
         throw new Error('All cards have already been drawn from the deck');
      }
      newHand[index] = deck.pop()!;
   });

   const updatedPlayers = players.map((hand, i) =>
      i === playerIndex ? newHand : hand
   );

   return { updatedPlayers, updatedDeck: deck };
}
