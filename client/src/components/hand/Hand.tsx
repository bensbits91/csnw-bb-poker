import clsx from 'clsx';
import { Card } from '../card';
import { HandHeader } from './HandHeader';
import { HandToolbar } from './HandToolbar';
import { WinnerAnimation } from '@/components/animation';
import { useHand } from '@/hooks';
import { useTheme } from '@/hooks/';

// TODO: Separate player and hand components?

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
   onLockHand: (playerIndex: number) => void;
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

   const { theme } = useTheme();
   const isDarkMode = theme === 'dark';
   const winnerBorderClass = isDarkMode ? 'border-teal-dark' : 'border-teal';

   return (
      <div
         className={clsx(
            'relative flex flex-col gap-4 p-6 rounded-lg border-2 shadow-md',
            isDarkMode ? 'bg-elevated-dark-1 shadow-dark-1' : 'bg-elevated-1 shadow-1',
            isWinner ? winnerBorderClass : 'border-transparent'
         )}>
         <HandHeader
            playerIndex={playerIndex}
            isLocked={isLocked || isGameOver}
            finalHand={finalHand}
            isWinner={isWinner}
         />
         <div className='flex md:justify-between w-[80%] mx-auto'>
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
         {isWinner && (
            <div
               data-testid='winner-indicator'
               className='absolute right-0 -bottom-5 z-10'>
               <WinnerAnimation />
            </div>
         )}
      </div>
   );
}
