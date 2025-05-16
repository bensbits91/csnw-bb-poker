export function initializeDeck(): string[] {
   const suits = ['♠', '♥', '♦', '♣'];
   const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
   return suits.flatMap(suit => ranks.map(rank => `${rank}${suit}`));
}
