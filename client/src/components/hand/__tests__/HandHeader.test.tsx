import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HandHeader } from '../HandHeader';
import ThemeProvider from '@/context/ThemeContext';
import MockPlayersProvider from '@/context/__mocks__/MockPlayersProvider';

describe('HandHeader Component', () => {
   it('renders player name and final hand', () => {
      render(
         <ThemeProvider
            value={{
               theme: 'light',
               toggleTheme: jest.fn()
            }}>
            <MockPlayersProvider>
               <HandHeader
                  playerIndex={0}
                  isLocked={false}
                  finalHand={{ name: 'High Card', rank: 1, tiebreaker: [14] }}
                  onUpdatePlayerName={jest.fn()}
               />
            </MockPlayersProvider>
         </ThemeProvider>
      );

      expect(screen.getByText('Player 1')).toBeInTheDocument();
      expect(screen.getByText('High Card')).toBeInTheDocument();
   });
});
