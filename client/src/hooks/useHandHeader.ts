import { useRef } from 'react';
import { useTheme, usePlayers } from '@/hooks';

/**
 * Custom hook for managing the logic and state of the HandHeader component.
 * Provides functionality for editing player names, handling keyboard events,
 * and managing theme-based styles.
 *
 * @param {number} playerIndex - The index of the player whose header is being managed.
 * @returns {Object} The state and functions for managing the HandHeader component.
 * @property {string} theme - The current theme ('light' or 'dark').
 * @property {boolean} isDarkMode - Whether the current theme is dark mode.
 * @property {string} winnerTextClass - The CSS class for styling the winner text based on the theme.
 * @property {Array} players - The list of players from the `usePlayers` hook.
 * @property {Array<boolean>} isEditing - An array indicating which players are currently being edited.
 * @property {Array<string>} tempNames - Temporary names for players during editing.
 * @property {Function} handleStartEditing - Starts editing the player's name and focuses the input field.
 * @property {Function} handleKeyDown - Handles keyboard events for the input field (e.g., Enter to save, Escape to cancel).
 * @property {Function} setTempName - Updates the temporary name for the player being edited.
 * @property {Function} saveEditing - Saves the edited name for the player.
 * @property {Function} cancelEditing - Cancels editing for the player and reverts to the original name.
 * @property {React.RefObject<HTMLInputElement>} inputRef - A ref for the input field used during editing.
 */
export const useHandHeader = (playerIndex: number) => {
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

   if (playerIndex < 0 || playerIndex >= players.length) {
      console.error(`Invalid playerIndex: ${playerIndex}.`);
      throw new Error('useHandHeader received an invalid playerIndex.');
   }

   const inputRef = useRef<HTMLInputElement>(null);

   const handleStartEditing = () => {
      startEditing(playerIndex);
      // setTimeout(() => {
      if (!inputRef.current) {
         console.error(
            'inputRef is not set. Unable to focus or select the input field.'
         );
         return;
      }
      if (inputRef.current) {
         inputRef.current.focus();
         inputRef.current.select();
      }
      // }, 0);
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         saveEditing(playerIndex);
      } else if (e.key === 'Escape') {
         cancelEditing(playerIndex);
      }
   };

   return {
      theme,
      isDarkMode,
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
   };
};
