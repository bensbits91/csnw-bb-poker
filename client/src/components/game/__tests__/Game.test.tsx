import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Game } from '../Game';
import * as useGameHook from '@/hooks/useGame';
import { cardUnicodeMap } from '@/constants/card';
import ThemeProvider from '@/context/ThemeContext';
import MockPlayersProvider from '@/context/__mocks__/MockPlayersProvider';

jest.mock('@/hooks/useGame');
jest.mock('lottie-react', () => ({
   __esModule: true,
   default: () => <div data-testid="mock-lottie" /> // Mock Lottie component
}));
jest.mock('@/assets/winner.json', () => ({
   default: {} // Provide a mock JSON object
}));

const player1Cards = ['2♠', '3♠', '4♠', '5♠', '6♠'].map(
   card => cardUnicodeMap[card]
);
const player2Cards = ['7♠', '8♠', '9♠', '10♠', 'J♠'].map(
   card => cardUnicodeMap[card]
);

describe('Game Component', () => {
   it('should render players and handle the deal click', () => {
      const mockHandleDealClick = jest.fn();
      const mockHandleReplaceCards = jest.fn();

      // Mock the useGame hook
      (useGameHook.useGame as jest.Mock).mockReturnValue({
         hands: [player1Cards, player2Cards],
         finalHands: [null, null], // Mock finalHands with the same length as players
         handleDealClick: mockHandleDealClick,
         handleReplaceCards: mockHandleReplaceCards,
         winners: null
      });

      render(
         <ThemeProvider
            value={{
               theme: 'light',
               toggleTheme: jest.fn()
            }}>
            <MockPlayersProvider>
               <Game />
            </MockPlayersProvider>
         </ThemeProvider>
      );

      // Check Player 1's cards
      player1Cards.forEach(card => {
         expect(screen.getByRole('button', { name: card })).toBeInTheDocument();
      });

      // Check Player 2's cards
      player2Cards.forEach(card => {
         expect(screen.getByRole('button', { name: card })).toBeInTheDocument();
      });

      // Simulate clicking the "Deal" button
      fireEvent.click(screen.getByText('New deal'));
      expect(mockHandleDealClick).toHaveBeenCalled();
   });

   it('should display winners when they are determined', () => {
      // Mock the useGame hook
      (useGameHook.useGame as jest.Mock).mockReturnValue({
         hands: [
            player1Cards,
            player2Cards
         ],
         finalHands: [
            { name: 'High Card', rank: 1, tiebreaker: [14] },
            { name: 'Pair', rank: 2, tiebreaker: [10, 9] }
         ], // Mock finalHands with data
         handleDealClick: jest.fn(),
         handleReplaceCards: jest.fn(),
         winners: [0]
      });

      render(
         <ThemeProvider
            value={{
               theme: 'light',
               toggleTheme: jest.fn()
            }}>
            <MockPlayersProvider>
               <Game />
            </MockPlayersProvider>
         </ThemeProvider>
      );

      // Verify winners are displayed
      expect(screen.getByTestId('winner-indicator')).toBeInTheDocument();
   });
});
