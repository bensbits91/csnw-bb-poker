import { useState, useEffect } from 'react';
import { Card } from '../card';
import { HandToolbar } from './HandToolbar';
import { LockIcon } from '../icons';

type HandProps = {
   playerIndex: number;
   hand: string[];
   wasReset?: boolean;
   finalHand?: {
      name: string;
      rank: number;
      tiebreaker: number[];
   };
   isWinner?: boolean;
   onReplaceCards: (playerIndex: number, cardIndices: number[]) => void;
   onLockHand: (playerIndex: number) => void; // New prop to notify when a hand is locked
};

export function Hand({
   playerIndex,
   hand,
   wasReset = false,
   finalHand,
   isWinner = false,
   onReplaceCards,
   onLockHand
}: HandProps) {
   const [selectedCards, setSelectedCards] = useState<number[]>([]);
   const [isLocked, setIsLocked] = useState(false);
   const [hiddenCards, setHiddenCards] = useState<number[]>([]);

   const toggleCardSelection = (index: number) => {
      setSelectedCards(prev =>
         prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
   };

   const handleLock = () => {
      setIsLocked(true);
      setSelectedCards([]);
      onLockHand(playerIndex); // Notify Game.tsx that this hand is locked
   };

   const handleReplace = () => {
      onReplaceCards(playerIndex, selectedCards);
      setSelectedCards([]);
      setHiddenCards(prev => [...prev, ...selectedCards]);
      handleLock();
   };

   const handleKeepAll = () => {
      setSelectedCards([]);
      handleLock();
   };

   const handleCardClick = (index: number) => {
      setIsLocked(false);
      toggleCardSelection(index);
   };

   useEffect(() => {
      if (wasReset) {
         setHiddenCards([]);
         setSelectedCards([]);
         setIsLocked(false);
      }
   }, [wasReset]);

   const isSelection = selectedCards.length !== 0;

   return (
      <div className='hand'>
         <div className='flex justify-center items-center gap-2'>
            Player {playerIndex + 1} <div className='w-4'>{isLocked && <LockIcon />}</div>
         </div>
         {finalHand && (
            <>
               {isWinner && (
                  <div className='text-center text-lg font-semibold text-green-500'>
                     Winner!
                  </div>
               )}
               <div className='text-center text-lg font-semibold'>{finalHand.name}</div>
            </>
         )}
         <div className='flex gap-2 justify-center'>
            {hand.map((card, index) => (
               <Card
                  key={index}
                  card={card}
                  isHidden={hiddenCards.includes(index) && !finalHand}
                  disabled={isLocked}
                  isSelected={selectedCards.includes(index)}
                  onClick={() => handleCardClick(index)}
               />
            ))}
         </div>
         <HandToolbar
            isSelection={isSelection}
            isLocked={isLocked}
            onKeepAllClick={handleKeepAll}
            onReplaceClick={handleReplace}
         />
      </div>
   );
}
