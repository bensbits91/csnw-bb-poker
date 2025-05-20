import type { JSX } from 'react';
import { Icon } from '@/components/icons';

/**
 * Props for the PlayerName component.
 * @interface PlayerNameProps
 * @property {number} playerIndex - The index of the player.
 * @property {string} playerName - The name of the player.
 * @property {boolean} isEditing - Whether the player name is currently being edited.
 * @property {string} tempName - The temporary name being edited for the player.
 * @property {React.RefObject<HTMLInputElement | null>} inputRef - A ref for the input field used during editing.
 * @property {(playerIndex: number) => void} handleStartEditing - Callback to start editing the player's name.
 * @property {(e: React.KeyboardEvent<HTMLInputElement>, playerIndex: number) => void} handleKeyDown - Callback to handle keyboard events in the input field.
 * @property {(playerIndex: number, name: string) => void} setTempName - Callback to update the temporary name for the player.
 * @property {(playerIndex: number) => void} saveEditing - Callback to save the edited name for the player.
 * @property {(playerIndex: number) => void} cancelEditing - Callback to cancel editing and revert to the original name.
 */
interface PlayerNameProps {
   playerIndex: number;
   playerName: string;
   isEditing: boolean;
   tempName: string;
   inputRef: React.RefObject<HTMLInputElement | null>;
   handleStartEditing: (playerIndex: number) => void;
   handleKeyDown: (
      e: React.KeyboardEvent<HTMLInputElement>,
      playerIndex: number
   ) => void;
   setTempName: (playerIndex: number, name: string) => void;
   saveEditing: (playerIndex: number) => void;
   cancelEditing: (playerIndex: number) => void;
}

/**
 * PlayerName component.
 * Handles displaying and editing a player's name.
 *
 * @param {PlayerNameProps} props - The props for the PlayerName component.
 * @returns {JSX.Element} The rendered PlayerName component.
 */
export function PlayerName({
   playerIndex,
   playerName,
   isEditing,
   tempName,
   inputRef,
   handleStartEditing,
   handleKeyDown,
   setTempName,
   saveEditing,
   cancelEditing
}: PlayerNameProps): JSX.Element {
   return (
      <div className="flex items-center gap-2">
         {isEditing ? (
            <>
               {/* Editable Input */}
               <input
                  ref={inputRef}
                  type="text"
                  value={tempName}
                  onChange={e => setTempName(playerIndex, e.target.value)}
                  onKeyDown={e => handleKeyDown(e, playerIndex)}
                  className="border-b border-gray-400 bg-transparent text-xl focus:outline-none"
                  aria-label={`Edit name for Player ${playerIndex + 1}`}
               />
               {/* Save Button */}
               <button
                  type="button"
                  onClick={() => saveEditing(playerIndex)}
                  className="cursor-pointer text-green-500"
                  aria-label={`Save name for Player ${playerIndex + 1}`}>
                  <Icon name="CheckIcon" size={4} />
               </button>
               {/* Cancel Button */}
               <button
                  type="button"
                  onClick={() => cancelEditing(playerIndex)}
                  className="cursor-pointer text-red-500"
                  aria-label={`Cancel editing name for Player ${playerIndex + 1}`}>
                  <Icon name="CloseIcon" size={4} />
               </button>
            </>
         ) : (
            <>
               {/* Display Player Name when not editing */}
               <span
                  onClick={() => handleStartEditing(playerIndex)}
                  className="cursor-pointer">
                  {playerName}
               </span>
               {/* Edit Button */}
               <button
                  type="button"
                  onClick={() => handleStartEditing(playerIndex)}
                  className="cursor-pointer text-gray-500"
                  aria-label={`Edit name for Player ${playerIndex + 1}`}>
                  <Icon name="PencilIcon" size={4} />
               </button>
            </>
         )}
      </div>
   );
}
