import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from '../Card';
import { cardUnicodeMap } from '@/constants/card';
import ThemeProvider from '@/context/ThemeContext';

describe('Card Component', () => {
   const mockOnClick = jest.fn();

   it('renders the card with correct content when not flipped', () => {
      render(
         <ThemeProvider
            value={{
               theme: 'light',
               setTheme: jest.fn(),
               toggleTheme: jest.fn()
            }}>
            <Card
               card="2♥"
               isSelected={false}
               isFlipped={false}
               onClick={mockOnClick}
            />
         </ThemeProvider>
      );

      // Verify the card content
      const button = screen.getByRole('button', { name: '2♥' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(cardUnicodeMap['2♥']);
   });

   it('renders the card with "Back" content when flipped', () => {
      render(
         <ThemeProvider
            value={{
               theme: 'light',
               setTheme: jest.fn(),
               toggleTheme: jest.fn()
            }}>
            <Card
               card="2♥"
               isSelected={false}
               isFlipped={true}
               onClick={mockOnClick}
            />
         </ThemeProvider>
      );

      // Verify the card content
      const button = screen.getByRole('button', { name: 'Flipped card' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(cardUnicodeMap['Back']);
   });

   it('applies the correct styles when selected', () => {
      render(
         <ThemeProvider
            value={{
               theme: 'light',
               setTheme: jest.fn(),
               toggleTheme: jest.fn()
            }}>
            <Card
               card="2♥"
               isSelected={true}
               isFlipped={false}
               onClick={mockOnClick}
            />
         </ThemeProvider>
      );

      // Verify the selected styles
      const cardContainer = screen.getByRole('button', {
         name: '2♥'
      }).parentElement;
      expect(cardContainer).toHaveClass('-translate-y-4 scale-110');
   });

   it('disables the button when the disabled prop is true', () => {
      render(
         <ThemeProvider
            value={{
               theme: 'light',
               setTheme: jest.fn(),
               toggleTheme: jest.fn()
            }}>
            <Card
               card="2♥"
               isSelected={false}
               isFlipped={false}
               disabled={true}
               onClick={mockOnClick}
            />
         </ThemeProvider>
      );

      // Verify the button is disabled
      const button = screen.getByRole('button', { name: '2♥' });
      expect(button).toBeDisabled();

      // Simulate a click
      fireEvent.click(button);
      expect(mockOnClick).not.toHaveBeenCalled();
   });

   it('calls the onClick handler when clicked and not disabled', () => {
      render(
         <ThemeProvider
            value={{
               theme: 'light',
               setTheme: jest.fn(),
               toggleTheme: jest.fn()
            }}>
            <Card
               card="2♥"
               isSelected={false}
               isFlipped={false}
               onClick={mockOnClick}
            />
         </ThemeProvider>
      );

      // Simulate a click
      const button = screen.getByRole('button', { name: '2♥' });
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
   });
});
