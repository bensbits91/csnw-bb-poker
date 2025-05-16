export function dealCards(deck: string[], numPlayers: number): string[][] {
   const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
   const players = Array.from({ length: numPlayers }, () => shuffledDeck.splice(0, 5));
   return players;
}
