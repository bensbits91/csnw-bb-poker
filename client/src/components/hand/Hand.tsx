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
      flippedCards,
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
   const pIndex = playerIndex + 1;

   return (
      <article
         aria-labelledby={`player-${pIndex}-header`}
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
         <ul className="mx-auto flex w-full justify-between xl:w-[80%]">
            {hand.map((card, index) => (
               <li key={index}>
                  <Card
                     card={card}
                     isFlipped={flippedCards.includes(index) && !finalHand}
                     disabled={isLocked || isGameOver}
                     isSelected={selectedCards.includes(index)}
                     onClick={() => handleCardClick(index)}
                  />
               </li>
            ))}
         </ul>
         <HandToolbar
            playerIndex={playerIndex}
            isSelection={isSelection}
            isLocked={isLocked || isGameOver}
            onKeepAllClick={handleKeepAll}
            onReplaceClick={handleReplace}
            aria-label={`Player ${pIndex} actions`}
         />
         {isWinner && (
            <div
               data-testid="winner-indicator"
               aria-hidden="true" // Hide animation from screen readers
               className="absolute -right-8 -bottom-15 z-10">
               <WinnerAnimation />
               <span
                  className="sr-only" // Screen reader text
                  aria-live="polite">
                  Player {pIndex} is the winner
               </span>
            </div>
         )}
      </article>
   );
}
