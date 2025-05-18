import { Card } from '../card';
import { HandHeader } from './HandHeader';
import { HandToolbar } from './HandToolbar';
import { useHand } from '@/hooks';

type HandProps = {
   playerIndex: number;
   hand: string[];
   wasReset?: boolean;
   isGameOver?: boolean;
   isWinner?: boolean;
   finalHand?: {
      name: string;
      rank: number;
      tiebreaker: number[];
   };
   onReplaceCards: (playerIndex: number, cardIndices: number[]) => void;
   onLockHand: (playerIndex: number) => void; // New prop to notify when a hand is locked
};

export function Hand({
   playerIndex,
   hand,
   wasReset = false,
   isGameOver = false,
   finalHand,
   isWinner = false,
   onReplaceCards,
   onLockHand
}: HandProps) {
   const {
      selectedCards,
      isLocked,
      hiddenCards,
      isSelection,
      handleCardClick,
      handleReplace,
      handleKeepAll
   } = useHand({
      playerIndex,
      wasReset,
      onReplaceCards,
      onLockHand
   });

   return (
      <div className='flex flex-col gap-4'>
         <HandHeader
            playerIndex={playerIndex}
            isLocked={isLocked || isGameOver}
            finalHand={finalHand}
            isWinner={isWinner}
         />
         <div className='flex md:justify-between'>
            {hand.map((card, index) => (
               <Card
                  key={index}
                  card={card}
                  isHidden={hiddenCards.includes(index) && !finalHand}
                  disabled={isLocked || isGameOver}
                  isSelected={selectedCards.includes(index)}
                  onClick={() => handleCardClick(index)}
               />
            ))}
         </div>
         <HandToolbar
            isSelection={isSelection}
            isLocked={isLocked || isGameOver}
            onKeepAllClick={handleKeepAll}
            onReplaceClick={handleReplace}
         />
      </div>
   );
}
