import { suits, ranks } from '@/constants/card';

export function initializeDeck(): string[] {
   return suits.flatMap(suit => ranks.map(rank => `${rank}${suit}`));
}
