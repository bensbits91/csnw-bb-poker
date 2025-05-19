import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Install uuid: npm install uuid

/**
 * Player interface.
 * Represents a player with a unique ID and a name.
 *
 * @typedef {Object} Player
 * @property {string} id - The unique identifier for the player.
 * @property {string} name - The name of the player.
 */
interface Player {
   id: string;
   name: string;
}

/**
 * usePlayers hook.
 * Manages the state and logic for players, including their names, editing state, and persistence in local storage.
 *
 * @returns {Object} The state and functions for managing players.
 * @property {Player[]} players - The list of players with their IDs and names.
 * @property {(index: number, newName: string) => void} updatePlayerName - Updates the name of a player.
 * @property {boolean[]} isEditing - An array indicating whether each player is currently being edited.
 * @property {string[]} tempNames - Temporary names used during editing.
 * @property {(index: number) => void} startEditing - Starts editing a player's name.
 * @property {(index: number) => void} cancelEditing - Cancels editing a player's name and resets it to the original.
 * @property {(index: number) => void} saveEditing - Saves the edited name for a player.
 * @property {(index: number, newName: string) => void} setTempName - Sets a temporary name for a player during editing.
 */
export function usePlayers() {
   /**
    * State for the list of players.
    * Initializes from local storage or creates default players if none are stored.
    */
   const [players, setPlayers] = useState<Player[]>(() => {
      const storedPlayers = localStorage.getItem('players');
      if (storedPlayers) {
         return JSON.parse(storedPlayers);
      }
      // Initialize with default players if none are stored
      return [
         { id: uuidv4(), name: 'Player 1' },
         { id: uuidv4(), name: 'Player 2' },
         { id: uuidv4(), name: 'Player 3' },
         { id: uuidv4(), name: 'Player 4' }
      ];
   });

   /**
    * State for tracking whether each player is being edited.
    */
   const [isEditing, setIsEditing] = useState<boolean[]>(() =>
      Array(players.length).fill(false)
   );

   /**
    * State for temporary names used during editing.
    */
   const [tempNames, setTempNames] = useState<string[]>(() =>
      players.map(player => player.name)
   );

   /**
    * Effect to persist players to local storage whenever they change.
    */
   useEffect(() => {
      localStorage.setItem('players', JSON.stringify(players));
   }, [players]);

   /**
    * Updates the name of a player.
    *
    * @param {number} index - The index of the player to update.
    * @param {string} newName - The new name for the player.
    */
   const updatePlayerName = (index: number, newName: string) => {
      setPlayers(prevPlayers => {
         const updatedPlayers = [...prevPlayers];
         updatedPlayers[index] = { ...updatedPlayers[index], name: newName }; // Update name, keep id
         return updatedPlayers;
      });
   };

   /**
    * Starts editing a player's name.
    *
    * @param {number} index - The index of the player to edit.
    */
   const startEditing = (index: number) => {
      setIsEditing(prevEditing => {
         const updatedEditing = [...prevEditing];
         updatedEditing[index] = true;
         return updatedEditing;
      });
   };

   /**
    * Cancels editing a player's name and resets it to the original name.
    *
    * @param {number} index - The index of the player to cancel editing for.
    */
   const cancelEditing = (index: number) => {
      setTempNames(prevTempNames => {
         const updatedTempNames = [...prevTempNames];
         updatedTempNames[index] = players[index].name; // Reset to original name
         return updatedTempNames;
      });
      setIsEditing(prevEditing => {
         const updatedEditing = [...prevEditing];
         updatedEditing[index] = false;
         return updatedEditing;
      });
   };

   /**
    * Saves the edited name for a player.
    *
    * @param {number} index - The index of the player to save the name for.
    */
   const saveEditing = (index: number) => {
      if (tempNames[index].trim() !== '') {
         updatePlayerName(index, tempNames[index]); // Save the name
         setIsEditing(prevEditing => {
            const updatedEditing = [...prevEditing];
            updatedEditing[index] = false;
            return updatedEditing;
         });
      }
   };

   /**
    * Sets a temporary name for a player during editing.
    *
    * @param {number} index - The index of the player to set the temporary name for.
    * @param {string} newName - The temporary name for the player.
    */
   const setTempName = (index: number, newName: string) => {
      setTempNames(prevTempNames => {
         const updatedTempNames = [...prevTempNames];
         updatedTempNames[index] = newName;
         return updatedTempNames;
      });
   };

   return {
      players, // Array of { id, name }
      updatePlayerName,
      isEditing,
      tempNames,
      startEditing,
      cancelEditing,
      saveEditing,
      setTempName
   };
}
