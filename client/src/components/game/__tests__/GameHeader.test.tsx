import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GameHeader } from '../GameHeader';

describe('GameHeader Component', () => {
   it('renders the heading and description', () => {
      render(<GameHeader />);

      // Verify the heading is rendered with the correct text and level
      const heading = screen.getByRole('heading', {
         name: 'CSNW Poker by Ben'
      });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1'); // Ensure it's an <h1>

      // Verify the description is rendered
      const description = screen.getByText(
         '5-card single-draw no-betting good-wholesome fun'
      );
      expect(description).toBeInTheDocument();
   });

   it('applies the correct aria-label to the heading', () => {
      render(<GameHeader />);

      const heading = screen.getByRole('heading', {
         name: 'CSNW Poker by Ben'
      });
      expect(heading).toHaveAttribute('aria-label', 'CSNW Poker by Ben');
   });
});
