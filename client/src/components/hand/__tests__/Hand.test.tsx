import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Hand } from '../Hand';
import ThemeProvider from '@/context/ThemeContext';

jest.mock('lottie-react', () => ({
   __esModule: true,
   default: () => <div data-testid="mock-lottie" /> // Mock Lottie component
}));

describe('Hand Component', () => {
   const mockUseHand = jest.fn();

   jest.mock('@/hooks', () => ({
      useHand: mockUseHand
   }));

   const mockOnReplaceCards = jest.fn();
   const mockOnLockHand = jest.fn();

   beforeEach(() => {
      jest.resetAllMocks();
   });

   it('renders player cards and header', () => {
      mockUseHand.mockReturnValue({
         selectedCards: [],
         isLocked: false,
         flippedCards: [],
         isSelection: false,
         handleCardClick: jest.fn(),
         handleReplace: jest.fn(),
         handleKeepAll: jest.fn()
      });

      render(
         <ThemeProvider
            value={{
               theme: 'light',
               setTheme: jest.fn(),
               toggleTheme: jest.fn()
            }}>
            <Hand
               playerIndex={0}
               hand={['2♠', '3♠', '4♠', '5♠', '6♠']}
               onReplaceCards={mockOnReplaceCards}
               onLockHand={mockOnLockHand}
            />
         </ThemeProvider>
      );

      // Verify cards are rendered
      expect(screen.getAllByRole('button')).toHaveLength(7); // 5 cards + 2 buttons (replace, keep all)

      // Verify header is rendered
      expect(screen.getByText('Player 1')).toBeInTheDocument();
   });

   it('renders player name and final hand', () => {
      render(
         <ThemeProvider
            value={{
               theme: 'light',
               setTheme: jest.fn(),
               toggleTheme: jest.fn()
            }}>
            <Hand
               playerIndex={0}
               hand={['2♠', '3♠', '4♠', '5♠', '6♠']}
               finalHand={{ name: 'High Card', rank: 1, tiebreaker: [14] }}
               onReplaceCards={jest.fn()}
               onLockHand={jest.fn()}
            />
         </ThemeProvider>
      );

      expect(screen.getByText('Player 1')).toBeInTheDocument();
      expect(screen.getByText('High Card')).toBeInTheDocument();
   });

   it('renders winner indicator when the player is a winner', () => {
      render(
         <ThemeProvider
            value={{
               theme: 'light',
               setTheme: jest.fn(),
               toggleTheme: jest.fn()
            }}>
            <Hand
               playerIndex={0}
               hand={['2♠', '3♠', '4♠', '5♠', '6♠']}
               isWinner={true}
               onReplaceCards={jest.fn()}
               onLockHand={jest.fn()}
            />
         </ThemeProvider>
      );

      expect(screen.getByTestId('winner-indicator')).toBeInTheDocument();
   });
});
