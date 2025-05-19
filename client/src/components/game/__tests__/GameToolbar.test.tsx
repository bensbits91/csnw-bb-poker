import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GameToolbar } from '../GameToolbar';
import { useTheme } from '@/hooks/';

jest.mock('@/hooks/', () => ({
   useTheme: jest.fn()
}));

describe('GameToolbar Component', () => {
   const mockOnDealClick = jest.fn();
   const mockOnEndClick = jest.fn();
   const mockToggleTheme = jest.fn();

   beforeEach(() => {
      jest.resetAllMocks();
      (useTheme as jest.Mock).mockReturnValue({
         theme: 'light',
         toggleTheme: mockToggleTheme
      });
   });

   it('renders all buttons correctly', () => {
      render(
         <GameToolbar
            onDealClick={mockOnDealClick}
            onEndClick={mockOnEndClick}
            isGameOver={false}
         />
      );

      // Verify "New deal" button
      const newDealButton = screen.getByRole('button', {
         name: 'New deal button'
      });
      expect(newDealButton).toBeInTheDocument();
      expect(newDealButton).toBeEnabled();

      // Verify "Skip to winner" button
      const skipToWinnerButton = screen.getByRole('button', {
         name: 'Skip to winner button'
      });
      expect(skipToWinnerButton).toBeInTheDocument();
      expect(skipToWinnerButton).toBeEnabled();

      // Verify theme toggle button
      const themeToggleButton = screen.getByRole('button', {
         name: 'Switch to dark mode'
      });
      expect(themeToggleButton).toBeInTheDocument();
   });

   it('disables "Skip to winner" button when game is over', () => {
      render(
         <GameToolbar
            onDealClick={mockOnDealClick}
            onEndClick={mockOnEndClick}
            isGameOver={true}
         />
      );

      const skipToWinnerButton = screen.getByRole('button', {
         name: 'Skip to winner button'
      });
      expect(skipToWinnerButton).toBeDisabled();
   });

   it('calls the correct handlers when buttons are clicked', () => {
      render(
         <GameToolbar
            onDealClick={mockOnDealClick}
            onEndClick={mockOnEndClick}
            isGameOver={false}
         />
      );

      // Click "New deal" button
      const newDealButton = screen.getByRole('button', {
         name: 'New deal button'
      });
      fireEvent.click(newDealButton);
      expect(mockOnDealClick).toHaveBeenCalled();

      // Click "Skip to winner" button
      const skipToWinnerButton = screen.getByRole('button', {
         name: 'Skip to winner button'
      });
      fireEvent.click(skipToWinnerButton);
      expect(mockOnEndClick).toHaveBeenCalled();
   });

   it('toggles the theme when the theme toggle button is clicked', () => {
      render(
         <GameToolbar
            onDealClick={mockOnDealClick}
            onEndClick={mockOnEndClick}
            isGameOver={false}
         />
      );

      const themeToggleButton = screen.getByRole('button', {
         name: 'Switch to dark mode'
      });
      fireEvent.click(themeToggleButton);
      expect(mockToggleTheme).toHaveBeenCalled();
   });

   it('renders the correct theme toggle button label and icon', () => {
      // Test for light mode
      (useTheme as jest.Mock).mockReturnValue({
         theme: 'light',
         toggleTheme: mockToggleTheme
      });

      const { rerender } = render(
         <GameToolbar
            onDealClick={mockOnDealClick}
            onEndClick={mockOnEndClick}
            isGameOver={false}
         />
      );

      // Verify the button is rendered with the correct test ID
      let themeToggleButton = screen.getByTestId('theme-toggle-button');
      expect(themeToggleButton).toBeInTheDocument();
      expect(themeToggleButton).toHaveAttribute(
         'aria-label',
         'Switch to dark mode'
      );

      // Test for dark mode
      (useTheme as jest.Mock).mockReturnValue({
         theme: 'dark',
         toggleTheme: mockToggleTheme
      });

      rerender(
         <GameToolbar
            onDealClick={mockOnDealClick}
            onEndClick={mockOnEndClick}
            isGameOver={false}
         />
      );

      themeToggleButton = screen.getByTestId('theme-toggle-button');
      expect(themeToggleButton).toBeInTheDocument();
      expect(themeToggleButton).toHaveAttribute(
         'aria-label',
         'Switch to light mode'
      );
   });
});
