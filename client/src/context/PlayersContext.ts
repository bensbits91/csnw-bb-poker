import { createContext, use } from 'react';

/**
 * Represents a player with a unique ID and a name.
 *
 * @interface Player
 * @property {string} id - The unique identifier for the player.
 * @property {string} name - The name of the player.
 */
export interface Player {
   id: string;
   name: string;
}

/**
 * Defines the shape of the PlayersContext.
 *
 * @interface PlayersContextType
 * @property {Player[]} players - The array of players.
 * @property {(index: number, newName: string) => void} updatePlayerName - Function to update a player's name.
 * @property {boolean[]} isEditing - Array indicating whether each player is being edited.
 * @property {string[]} tempNames - Temporary names used during editing.
 * @property {(playerIndex: number) => void} startEditing - Function to start editing a player's name.
 * @property {(playerIndex: number) => void} cancelEditing - Function to cancel editing a player's name.
 * @property {(playerIndex: number) => void} saveEditing - Function to save the edited name.
 * @property {(playerIndex: number, name: string) => void} setTempName - Function to set a temporary name for a player.
 */
export interface PlayersContextType {
   players: Player[];
   updatePlayerName: (index: number, newName: string) => void;
   isEditing: boolean[];
   tempNames: string[];
   startEditing: (playerIndex: number) => void;
   cancelEditing: (playerIndex: number) => void;
   saveEditing: (playerIndex: number) => void;
   setTempName: (playerIndex: number, name: string) => void;
}

/**
 * Creates the PlayersContext with an undefined default value.
 *
 * This ensures that the context must be provided by a PlayersProvider.
 * Attempting to use the context without a provider will result in an error.
 *
 * @constant
 * @type {React.Context<PlayersContextType | undefined>}
 */
export const PlayersContext = createContext<PlayersContextType | undefined>(
   undefined
);

/**
 * Custom hook to safely use the PlayersContext.
 * Ensures the context is not accessed outside of a PlayersProvider.
 *
 * @returns {PlayersContextType} The PlayersContext value.
 * @throws {Error} If the context is used outside of a PlayersProvider.
 */
export function usePlayersContext(): PlayersContextType {
   const context = use(PlayersContext);
   if (!context) {
      throw new Error(
         'usePlayersContext must be used within a PlayersProvider.'
      );
   }
   return context;
}
