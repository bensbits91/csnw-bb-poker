import { useState, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlayersContext } from './PlayersContext';
import type { PlayersContextType, Player } from './PlayersContext';

/**
 * PlayersProvider component.
 * Provides the PlayersContext to its children, managing the players state and related functions.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the PlayersContext.
 *
 * @returns {JSX.Element} The PlayersProvider component.
 *
 * @example
 * // Wrap your application in the PlayersProvider to provide access to the players state:
 * import { PlayersProvider } from '@/context/PlayersProvider';
 *
 * const App = () => (
 *    <PlayersProvider>
 *       <YourComponent />
 *    </PlayersProvider>
 * );
 */
export const PlayersProvider: React.FC<{ children: React.ReactNode }> = ({
   children
}) => {
   /**
    * State for the list of players.
    * Initializes from local storage or creates default players if none are stored.
    */
   const [players, setPlayers] = useState<Player[]>(() => {
      const storedPlayers = localStorage.getItem('players');
      if (storedPlayers) {
         try {
            const parsedPlayers = JSON.parse(storedPlayers);
            if (
               Array.isArray(parsedPlayers) &&
               parsedPlayers.every(player => player.id && player.name)
            ) {
               return parsedPlayers;
            }
         } catch (error) {
            console.error('Error parsing players from local storage:', error);
         }
      }
      const defaultPlayers = [
         { id: uuidv4(), name: 'Player 1' },
         { id: uuidv4(), name: 'Player 2' },
         { id: uuidv4(), name: 'Player 3' },
         { id: uuidv4(), name: 'Player 4' }
      ];
      localStorage.setItem('players', JSON.stringify(defaultPlayers));
      return defaultPlayers;
   });

   /**
    * Updates the name of a player and persists the updated state to local storage.
    *
    * @param {number} index - The index of the player to update.
    * @param {string} newName - The new name for the player.
    */
   const updatePlayerName = useCallback((index: number, newName: string) => {
      setPlayers(prevPlayers => {
         const updatedPlayers = [...prevPlayers];
         updatedPlayers[index] = { ...updatedPlayers[index], name: newName };
         localStorage.setItem('players', JSON.stringify(updatedPlayers));
         return updatedPlayers;
      });
   }, []);

   /**
    * State for tracking whether each player is being edited.
    */
   const [isEditing, setIsEditing] = useState<boolean[]>(
      players.map(() => false)
   );

   /**
    * State for temporary names used during editing.
    */
   const [tempNames, setTempNames] = useState<string[]>(
      players.map(player => player.name)
   );

   /**
    * Starts editing a player's name.
    *
    * @param {number} playerIndex - The index of the player to start editing.
    */
   const startEditing = useCallback(
      (playerIndex: number) => {
         setIsEditing(prev =>
            prev.map((edit, idx) => (idx === playerIndex ? true : edit))
         );
         setTempNames(prev =>
            prev.map((name, idx) =>
               idx === playerIndex ? players[playerIndex].name : name
            )
         );
      },
      [players]
   );

   /**
    * Cancels editing a player's name and resets the temporary name.
    *
    * @param {number} playerIndex - The index of the player to cancel editing.
    */
   const cancelEditing = useCallback(
      (playerIndex: number) => {
         setIsEditing(prev =>
            prev.map((edit, idx) => (idx === playerIndex ? false : edit))
         );
         setTempNames(prev =>
            prev.map((name, idx) =>
               idx === playerIndex ? players[playerIndex].name : name
            )
         );
      },
      [players]
   );

   /**
    * Saves the edited name for a player.
    *
    * @param {number} playerIndex - The index of the player to save the name for.
    */
   const saveEditing = useCallback(
      (playerIndex: number) => {
         updatePlayerName(playerIndex, tempNames[playerIndex]);
         setIsEditing(prev =>
            prev.map((edit, idx) => (idx === playerIndex ? false : edit))
         );
      },
      [updatePlayerName, tempNames]
   );

   /**
    * Sets a temporary name for a player during editing.
    *
    * @param {number} playerIndex - The index of the player to set the temporary name for.
    * @param {string} name - The temporary name for the player.
    */
   const setTempName = useCallback((playerIndex: number, name: string) => {
      setTempNames(prev =>
         prev.map((n, idx) => (idx === playerIndex ? name : n))
      );
   }, []);

   /**
    * Memoized context value to avoid unnecessary re-renders.
    */
   const contextValue = useMemo<PlayersContextType>(
      () => ({
         players,
         updatePlayerName,
         isEditing,
         tempNames,
         startEditing,
         cancelEditing,
         saveEditing,
         setTempName
      }),
      [
         players,
         updatePlayerName,
         isEditing,
         tempNames,
         startEditing,
         cancelEditing,
         saveEditing,
         setTempName
      ]
   );

   return <PlayersContext value={contextValue}>{children}</PlayersContext>;
};
