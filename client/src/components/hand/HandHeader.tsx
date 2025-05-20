import clsx from 'clsx';
import { Heading } from '@/components/typography';
import { Icon } from '@/components/icons';
import { useHandHeader } from '@/hooks';
import { PlayerName } from './PlayerName';

/**
 * Props for the HandHeader component.
 * @interface HandHeaderProps
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
   const {
      winnerTextClass,
      players,
      isEditing,
      tempNames,
      handleStartEditing,
      handleKeyDown,
      setTempName,
      saveEditing,
      cancelEditing,
      inputRef
   } = useHandHeader(playerIndex);
   const pIndex = playerIndex + 1;
      // Validate playerIndex
   if (playerIndex < 0 || playerIndex >= players.length) {
      console.error(`Invalid playerIndex: ${playerIndex}.`);
      throw new Error(`HandHeader received an invalid playerIndex: ${playerIndex}.`);
   }
   // Validate players array
   if (!Array.isArray(players) || players.length === 0) {
      console.error('useHandHeader returned an invalid or empty `players` array.');
      throw new Error('HandHeader requires a valid `players` array.');
   }
   // Validate finalHand
   if (finalHand && (!finalHand.name || typeof finalHand.rank !== 'number')) {
      console.error('HandHeader received an invalid `finalHand` object.');
      throw new Error('HandHeader requires a valid `finalHand` object.');
   }
   // Validate winnerTextClass
   if (!winnerTextClass) {
      console.warn('winnerTextClass is missing or invalid. Defaulting to an empty string.');
   }
   
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
               <PlayerName
                  playerIndex={playerIndex}
                  playerName={players[playerIndex].name}
                  isEditing={isEditing[playerIndex]}
                  tempName={tempNames[playerIndex]}
                  inputRef={inputRef}
                  handleStartEditing={handleStartEditing}
                  handleKeyDown={handleKeyDown}
                  setTempName={setTempName}
                  saveEditing={saveEditing}
                  cancelEditing={cancelEditing}
               />
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
