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
