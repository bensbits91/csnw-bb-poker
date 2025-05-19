import clsx from 'clsx';
import { Card } from '@/components/card';
import { WinnerAnimation } from '@/components/animation';
import { HandHeader } from './HandHeader';
import { HandToolbar } from './HandToolbar';
import { useHand, useTheme } from '@/hooks/';

/**
 * Props for the Hand component.
 * @interface HandProps
 * @property {number} playerIndex - The index of the player.
 * @property {string} [playerName] - The name of the player.
 * @property {string[]} hand - The cards in the player's hand.
 * @property {boolean} [wasReset=false] - Whether the game was reset.
 * @property {boolean} [isGameOver=false] - Whether the game is over.
 * @property {boolean} [isWinner=false] - Whether the player is the winner.
 * @property {Object} [finalHand] - The player's final ranked hand.
 * @property {string} finalHand.name - The name of the hand (e.g., "Full House").
 * @property {number} finalHand.rank - The rank of the hand.
 * @property {number[]} finalHand.tiebreaker - The tiebreaker values for the hand.
 * @property {(playerIndex: number, name: string) => void} onUpdatePlayerName - Callback to update the player's name.
 * @property {(playerIndex: number, cardIndices: number[]) => void} onReplaceCards - Callback to replace cards in the player's hand.
 * @property {(playerIndex: number) => void} onLockHand - Callback to lock the player's hand.
 */
interface HandProps {
   playerIndex: number;
   playerName?: string;
   hand: string[];
   wasReset?: boolean;
   isGameOver?: boolean;
   isWinner?: boolean;
   finalHand?: {
      name: string;
      rank: number;
      tiebreaker: number[];
   };
   onUpdatePlayerName: (playerIndex: number, name: string) => void;
   onReplaceCards: (playerIndex: number, cardIndices: number[]) => void;
   onLockHand: (playerIndex: number) => void;
}

/**
 * Hand component.
 * Displays a player's hand, including the header, cards, toolbar, and winner animation.
 *
 * @param {HandProps} props - The props for the Hand component.
 * @returns {JSX.Element} The rendered Hand component.
 */
export function Hand({
   playerIndex,
   playerName,
   hand,
   wasReset = false,
   isGameOver = false,
   finalHand,
   isWinner = false,
   onUpdatePlayerName,
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
            'relative flex flex-col gap-4 rounded-lg border-2 p-2 shadow-md sm:py-6 sm:px-20 md:px-6',
            isDarkMode
               ? 'bg-elevated-dark-1 shadow-dark-1'
               : 'bg-elevated-1 shadow-1',
            isWinner ? winnerBorderClass : 'border-transparent'
         )}>
         <HandHeader
            playerIndex={playerIndex}
            playerName={playerName}
            onUpdatePlayerName={onUpdatePlayerName}
            isLocked={isLocked || isGameOver}
            finalHand={finalHand}
            isWinner={isWinner}
         />
         {/* Hand */}
         <ul className="mx-auto flex w-full justify-between xl:w-[80%]">
            {hand.map((card, index) => (
               <li key={card}>
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
