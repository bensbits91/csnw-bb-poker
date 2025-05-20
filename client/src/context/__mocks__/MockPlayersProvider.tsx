import type { ReactNode } from 'react';
import { PlayersContext } from '@/context/PlayersContext';

import { useMemo } from 'react';

function MockPlayersProvider({ children }: { children: ReactNode }) {
   const mockPlayersContextValue = useMemo(
      () => ({
         players: [
            { id: '1', name: 'Player 1' },
            { id: '2', name: 'Player 2' }
         ],
         updatePlayerName: jest.fn(),
         isEditing: [false, false],
         tempNames: [],
         startEditing: jest.fn(),
         cancelEditing: jest.fn(),
         saveNames: jest.fn(),
         saveEditing: jest.fn(),
         setTempName: jest.fn()
      }),
      []
   );

   return (
      <PlayersContext value={mockPlayersContextValue}>
         {children}
      </PlayersContext>
   );
}

export default MockPlayersProvider;
