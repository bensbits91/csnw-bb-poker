import clsx from 'clsx';
import { Heading } from '@/components/typography';
import { Icon } from '@/components/icons';
import { useTheme } from '@/hooks/';
import { useRef } from 'react';
import { usePlayers } from '@/hooks/usePlayers';

/**
 * Props for the HandHeader component.
 * @typedef {Object} HandHeaderProps
 * @property {number} playerIndex - The index of the player.
 * @property {string} [playerName] - The name of the player.
 * @property {boolean} isLocked - Whether the player's hand is locked.
 * @property {Object} [finalHand] - The player's final ranked hand.
 * @property {string} finalHand.name - The name of the hand (e.g., "Full House").
 * @property {number} finalHand.rank - The rank of the hand.
 * @property {number[]} finalHand.tiebreaker - The tiebreaker values for the hand.
 * @property {boolean} [isWinner=false] - Whether the player is the winner.
 * @property {(playerIndex: number, name: string) => void} onUpdatePlayerName - Callback to update the player's name.
 */
interface HandHeaderProps {
   playerIndex: number;
   playerName?: string;
   isLocked: boolean;
   finalHand?: {
      name: string;
      rank: number;
      tiebreaker: number[];
   };
   isWinner?: boolean;
   onUpdatePlayerName: (playerIndex: number, name: string) => void;
}

/**
 * HandHeader component.
 * Displays the header for a player's hand, including their name, status, and final hand details.
 * Allows editing the player's name with keyboard and mouse interactions.
 *
 * @param {HandHeaderProps} props - The props for the HandHeader component.
 * @returns {JSX.Element} The rendered HandHeader component.
 */
export function HandHeader({
   playerIndex,
   isLocked,
   finalHand,
   isWinner = false
}: HandHeaderProps) {
   const { theme } = useTheme();
   const isDarkMode = theme === 'dark';
   const winnerTextClass = isDarkMode ? 'text-teal-dark' : 'text-teal';

   const {
      players,
      isEditing,
      tempNames,
      startEditing,
      cancelEditing,
      saveEditing,
      setTempName
   } = usePlayers();

   const inputRef = useRef<HTMLInputElement>(null); // Ref for the input element

   /**
    * Handles the start of editing the player's name.
    * Focuses the input field and selects all text.
    */
   const handleStartEditing = () => {
      startEditing(playerIndex); // Enable editing
      setTimeout(() => {
         if (inputRef.current) {
            inputRef.current.focus(); // Focus the input
            inputRef.current.select(); // Select all text
         }
      }, 0);
   };

   /**
    * Handles keyboard events for the input field.
    * Saves the name on Enter and cancels editing on Escape.
    *
    * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
    */
   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         saveEditing(playerIndex); // Trigger saveEditing on Enter
      } else if (e.key === 'Escape') {
         cancelEditing(playerIndex); // Trigger cancelEditing on Escape
      }
   };

   const pIndex = playerIndex + 1;

   return (
      <header
         id={`player-${pIndex}-header`}
         className={clsx(
            'z-10 flex items-end justify-between gap-2',
            isWinner && winnerTextClass
         )}>
         <div className="flex items-end gap-2">
            {/* Player Icon */}
            <Icon name={`Player${pIndex}Icon`} size={8} />
            <Heading level={2} appearance={3}>
               <div className="flex items-center gap-2">
                  {isEditing[playerIndex] ? (
                     <>
                        {/* Editable Input */}
                        <input
                           ref={inputRef} // Attach the ref to the input
                           type="text"
                           value={tempNames[playerIndex]}
                           onChange={e =>
                              setTempName(playerIndex, e.target.value)
                           }
                           onKeyDown={handleKeyDown} // Handle keyboard events
                           className="border-b border-gray-400 bg-transparent text-xl focus:outline-none"
                           aria-label={`Edit name for Player ${pIndex}`}
                        />
                        {/* Save Button */}
                        <button
                           type="button"
                           onClick={() => saveEditing(playerIndex)}
                           className="cursor-pointer text-green-500"
                           aria-label={`Save name for Player ${pIndex}`}>
                           <Icon name="CheckIcon" size={4} />
                        </button>
                        {/* Cancel Button */}
                        <button
                           type="button"
                           onClick={() => cancelEditing(playerIndex)}
                           className="cursor-pointer text-red-500"
                           aria-label={`Cancel editing name for Player ${pIndex}`}>
                           <Icon name="CloseIcon" size={4} />
                        </button>
                     </>
                  ) : (
                     <>
                        {/* Display Player Name when not editing */}
                        <span
                           onClick={handleStartEditing}
                           className="cursor-pointer">
                           {players[playerIndex].name}
                        </span>
                        {/* Edit Button */}
                        <button
                           type="button"
                           onClick={handleStartEditing}
                           className="cursor-pointer text-gray-500"
                           aria-label={`Edit name for Player ${pIndex}`}>
                           <Icon name="PencilIcon" size={4} />
                        </button>
                     </>
                  )}
               </div>
            </Heading>
         </div>
         <div className="flex items-end gap-2">
            {/* Final Hand Display */}
            {finalHand && (
               <div className="text-center text-3xl" aria-live="polite">
                  {finalHand.name}
               </div>
            )}
            {/* Lock Icon */}
            {isLocked && !finalHand && <Icon name="LockIcon" size={8} />}
         </div>
      </header>
   );
}
