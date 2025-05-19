import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HandToolbar } from '../HandToolbar';
import ThemeProvider from '@/context/ThemeContext';

describe('HandToolbar Component', () => {
   const mockOnKeepAllClick = jest.fn();
   const mockOnReplaceClick = jest.fn();

   it('renders buttons and handles clicks', () => {
      render(
         <ThemeProvider
            value={{
               theme: 'light',
               setTheme: jest.fn(),
               toggleTheme: jest.fn()
            }}>
            <HandToolbar
               playerIndex={0}
               isSelection={true}
               isLocked={false}
               onKeepAllClick={mockOnKeepAllClick}
               onReplaceClick={mockOnReplaceClick}
            />
         </ThemeProvider>
      );

      // Verify buttons are rendered
      const keepAllButton = screen.getByText('Keep all');
      const replaceButton = screen.getByText('Replace selected');

      expect(keepAllButton).toBeInTheDocument();
      expect(replaceButton).toBeInTheDocument();

      // Simulate button clicks
      fireEvent.click(keepAllButton);
      fireEvent.click(replaceButton);

      expect(mockOnKeepAllClick).toHaveBeenCalled();
      expect(mockOnReplaceClick).toHaveBeenCalled();
   });

   it('disables buttons when locked', () => {
      render(
         <ThemeProvider
            value={{
               theme: 'light',
               setTheme: jest.fn(),
               toggleTheme: jest.fn()
            }}>
            <HandToolbar
               playerIndex={0}
               isSelection={false}
               isLocked={true}
               onKeepAllClick={mockOnKeepAllClick}
               onReplaceClick={mockOnReplaceClick}
            />
         </ThemeProvider>
      );

      // Verify buttons are disabled
      expect(screen.getByText('Keep all')).toBeDisabled();
      expect(screen.getByText('Replace selected')).toBeDisabled();
   });
});
