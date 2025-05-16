import { useEffect, useState } from 'react';
import { Hand } from '../hand';
import { initializeDeck, shuffleAndDealCards, replaceCards } from '@/utils/card';
import { determineWinner } from '@/utils/game/determineWinner';

export function Game() {
   const [deck, setDeck] = useState(() => initializeDeck());

   // todo: this fixes the issue of the deck be reinitialized when we replace cards
   // but feels messy/hacky so let's clean it up
   const [players, setPlayers] = useState(() => {
      const { dealtPlayers, updatedDeck } = shuffleAndDealCards(deck, 4); // Deal cards to 4 players
      setDeck(updatedDeck); // Update the deck after dealing cards
      return dealtPlayers;
   });

   const [lockedHands, setLockedHands] = useState<number[]>([]); // Track locked hands
   console.log('bb ~ Game.tsx:18 ~ Game ~ lockedHands:', lockedHands);

   const [winner, setWinner] = useState<number[] | null>(null);

   const handleLockHand = (playerIndex: number) => {
      setLockedHands(prev => {
         const updatedLockedHands = [...prev, playerIndex];
         return updatedLockedHands;
      });
   };

   useEffect(() => {
      // todo: is there a more elegant way to do this?
      if (lockedHands.length === players.length) {
         const { winners, rankedHands } = determineWinner(players);
         console.log('bb ~ Game.tsx:40 ~ useEffect ~ winners:', winners);
         console.log('bb ~ Game.tsx:39 ~ useEffect ~ rankedHands:', rankedHands);
         setWinner(winners);
      }
   }, [lockedHands, players.length, players]);

   const handleReplaceCards = (playerIndex: number, cardIndices: number[]) => {
      // Replace cards and update the deck and players
      const { updatedPlayers, updatedDeck } = replaceCards(
         players,
         deck,
         playerIndex,
         cardIndices
      );
      setPlayers(updatedPlayers); // Update players' hands
      setDeck(updatedDeck); // Update the deck
   };

   return (
      <div>
         <h1 className='text-center text-2xl font-bold'>CSNW Poker by Ben</h1>
         <h2 className='text-center text-xl font-semibold'>
            5-card single-draw no-betting good-wholesome-times fun
         </h2>
         {winner && (
            <div className='text-center text-2xl font-bold'>
               Winner(s): {winner.join(', ')}
            </div>
         )}
         <div className='players grid grid-cols-2 gap-8'>
            {players.map((hand, index) => (
               <Hand
                  key={index}
                  playerIndex={index}
                  hand={hand}
                  onReplaceCards={handleReplaceCards}
                  onLockHand={handleLockHand} // Pass the callback to Hand
               />
            ))}
         </div>
      </div>
   );
}
