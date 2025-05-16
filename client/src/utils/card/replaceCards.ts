export function replaceCards(
   players: string[][],
   deck: string[],
   playerIndex: number,
   cardIndices: number[]
): { updatedPlayers: string[][]; updatedDeck: string[] } {
   const newDeck = [...deck];
   const newHand = [...players[playerIndex]];

   cardIndices.forEach(index => {
      newHand[index] = newDeck.pop()!;
   });

   const updatedPlayers = players.map((hand, i) => (i === playerIndex ? newHand : hand));

   return { updatedPlayers, updatedDeck: newDeck };
}
