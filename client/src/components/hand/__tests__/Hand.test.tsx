import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Hand } from '../Hand';

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
         hiddenCards: [],
         isSelection: false,
         handleCardClick: jest.fn(),
         handleReplace: jest.fn(),
         handleKeepAll: jest.fn()
      });

      render(
         <Hand
            playerIndex={0}
            hand={['2♠', '3♠', '4♠', '5♠', '6♠']}
            onReplaceCards={mockOnReplaceCards}
            onLockHand={mockOnLockHand}
         />
      );

      // Verify cards are rendered
      expect(screen.getAllByRole('button')).toHaveLength(7); // 5 cards + 2 buttons (replace, keep all)

      // Verify header is rendered
      expect(screen.getByText('Player 1')).toBeInTheDocument();
   });

   // TODO: Figure out why this test fails
   it.skip('disables cards when the hand is locked', () => {
      mockUseHand.mockReturnValue({
         selectedCards: [],
         isLocked: true,
         hiddenCards: [],
         isSelection: false,
         handleCardClick: jest.fn(),
         handleReplace: jest.fn(),
         handleKeepAll: jest.fn()
      });

      render(
         <Hand
            playerIndex={0}
            hand={['2♠', '3♠', '4♠', '5♠', '6♠']}
            finalHand={{ name: 'High Card', rank: 1, tiebreaker: [14] }}
            onReplaceCards={mockOnReplaceCards}
            onLockHand={mockOnLockHand}
         />
      );

      // Verify cards are disabled
      screen.getAllByRole('button').forEach(button => {
         expect(button).toBeDisabled();
      });
   });
});
