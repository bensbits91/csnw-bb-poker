import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../Button';
import { useTheme } from '@/hooks/';

jest.mock('@/hooks/', () => ({
   useTheme: jest.fn()
}));

describe('Button Component', () => {
   const mockOnClick = jest.fn();

   beforeEach(() => {
      jest.resetAllMocks();
      (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });
   });

   it('renders the button with correct children', () => {
      render(<Button onClick={mockOnClick}>Click Me</Button>);

      // Verify the button content
      const button = screen.getByRole('button', { name: 'Click Me' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Click Me');
   });

   it('applies the correct styles when disabled', () => {
      render(
         <Button onClick={mockOnClick} disabled={true}>
            Click Me
         </Button>
      );

      // Verify the button is disabled
      const button = screen.getByRole('button', { name: 'Click Me' });
      expect(button).toBeDisabled();
      expect(button).toHaveClass('md:cursor-not-allowed');
   });

   it('applies the correct styles in dark mode', () => {
      (useTheme as jest.Mock).mockReturnValue({ theme: 'dark' });
      render(<Button onClick={mockOnClick}>Click Me</Button>);

      // Verify the dark mode styles
      const button = screen.getByRole('button', { name: 'Click Me' });
      expect(button).toHaveClass('shadow-black/70');
   });

   it('renders an icon when iconName is provided', () => {
      render(
         <Button onClick={mockOnClick} iconName="SunIcon">
            Click Me
         </Button>
      );

      // Verify the icon is rendered
      const icon = screen.getByTestId('icon-SunIcon');
      expect(icon).toBeInTheDocument();
   });

   it('calls the onClick handler when clicked', () => {
      render(<Button onClick={mockOnClick}>Click Me</Button>);

      // Simulate a click
      const button = screen.getByRole('button', { name: 'Click Me' });
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
   });

   it('does not call the onClick handler when disabled', () => {
      render(
         <Button onClick={mockOnClick} disabled={true}>
            Click Me
         </Button>
      );

      // Simulate a click
      const button = screen.getByRole('button', { name: 'Click Me' });
      fireEvent.click(button);
      expect(mockOnClick).not.toHaveBeenCalled();
   });

   it('applies the correct aria-label', () => {
      render(
         <Button onClick={mockOnClick} ariaLabel="Test Label">
            Click Me
         </Button>
      );

      // Verify the aria-label
      const button = screen.getByRole('button', { name: 'Test Label' });
      expect(button).toBeInTheDocument();
   });
});
