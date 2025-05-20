import { use } from 'react';
import type { PlayersContextType } from '@/context/PlayersContext';
import { PlayersContext } from '@/context/PlayersContext';

/**
 * Custom hook to access the PlayersContext.
 * Provides access to the players state and related functions for managing player data.
 *
 * @returns {PlayersContextType} The context value, including the players array and functions for managing players.
 * @throws {Error} If the hook is used outside of a PlayersProvider.
 */
export const usePlayers = (): PlayersContextType => {
   const context = use(PlayersContext);
   if (!context) {
      throw new Error('usePlayers must be used within a PlayersProvider');
   }
   return context;
};
