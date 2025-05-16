import { useState } from 'react';
import { Card } from '../card';
import { Button } from '../common';
import { LockIcon } from '../icons';

type HandProps = {
   playerIndex: number;
   hand: string[];
   onReplaceCards: (playerIndex: number, cardIndices: number[]) => void;
   onLockHand: (playerIndex: number) => void; // New prop to notify when a hand is locked
};

export function Hand({ playerIndex, hand, onReplaceCards, onLockHand }: HandProps) {
   const [selectedCards, setSelectedCards] = useState<number[]>([]);
   const [isLocked, setIsLocked] = useState(false);

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

   const isSelection = selectedCards.length !== 0;

   return (
      <div className='hand'>
         <div className='flex justify-center items-center gap-2'>
            Player {playerIndex + 1} <div className='w-4'>{isLocked && <LockIcon />}</div>
         </div>
         <div className='flex gap-2 justify-center'>
            {hand.map((card, index) => (
               <Card
                  key={index}
                  card={card}
                  disabled={isLocked}
                  isSelected={selectedCards.includes(index)}
                  onClick={() => handleCardClick(index)}
               />
            ))}
         </div>
         <Button onClick={handleKeepAll} disabled={isLocked}>
            Keep All Cards
         </Button>
         <Button onClick={handleReplace} disabled={!isSelection || isLocked}>
            Replace Selected Cards
         </Button>
      </div>
   );
}
