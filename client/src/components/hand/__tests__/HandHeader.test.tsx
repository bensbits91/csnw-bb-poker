import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HandHeader } from '../HandHeader';

describe('HandHeader Component', () => {
   it('renders player name and final hand', () => {
      render(
         <HandHeader
            playerIndex={0}
            isLocked={false}
            finalHand={{ name: 'High Card', rank: 1, tiebreaker: [14] }}
         />
      );

      // Verify player name and final hand are displayed
      expect(screen.getByText('Player 1')).toBeInTheDocument();
      expect(screen.getByText('High Card')).toBeInTheDocument();
   });

   it('renders winner indicator when the player is a winner', () => {
      render(<HandHeader playerIndex={0} isLocked={false} isWinner={true} />);

      // Verify winner indicator is displayed
      expect(screen.getByTestId('winner-indicator')).toBeInTheDocument();
   });
});
