import clsx from 'clsx';
import { Card } from '@/components/card';
import { WinnerAnimation } from '@/components/animation';
import { HandHeader } from './HandHeader';
import { HandToolbar } from './HandToolbar';
import { useHand, useTheme } from '@/hooks/';

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
            'relative flex flex-col gap-4 rounded-lg border-2 p-2 shadow-md md:p-6',
            isDarkMode
               ? 'bg-elevated-dark-1 shadow-dark-1'
               : 'bg-elevated-1 shadow-1',
            isWinner ? winnerBorderClass : 'border-transparent'
         )}>
         <HandHeader
            playerIndex={playerIndex}
            isLocked={isLocked || isGameOver}
            finalHand={finalHand}
            isWinner={isWinner}
         />
         {/* Hand */}
         <div className="mx-auto flex w-full justify-between xl:w-[80%]">
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
               data-testid="winner-indicator"
               className="absolute -right-8 -bottom-15 z-10">
               <WinnerAnimation />
            </div>
         )}
      </div>
   );
}
