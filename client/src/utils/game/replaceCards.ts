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
