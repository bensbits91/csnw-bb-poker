import { useState } from 'react';
import Hand from './Hand';
import { initializeDeck, dealCards, replaceCards } from '../utils/card';

export default function Game() {
   const [deck, setDeck] = useState(initializeDeck());
   const [players, setPlayers] = useState(dealCards(deck, 4)); // 4 players

   const handleReplaceCards = (playerIndex: number, cardIndices: number[]) => {
      const { updatedPlayers, updatedDeck } = replaceCards(
         players,
         deck,
         playerIndex,
         cardIndices
      );
      setPlayers(updatedPlayers);
      setDeck(updatedDeck);
   };

   return (
      <div className='game'>
         <h1 className='text-center text-2xl font-bold'>5 Card Draw Poker</h1>
         <div className='players grid grid-cols-2 gap-4'>
            {players.map((hand, index) => (
               <Hand
                  key={index}
                  playerIndex={index}
                  hand={hand}
                  onReplaceCards={handleReplaceCards}
               />
            ))}
         </div>
      </div>
   );
}
