import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Icon from '../Icon';

jest.mock('../index', () => ({
   SunIcon: jest.fn(() => <svg data-testid="mock-sun-icon" />),
   MoonIcon: jest.fn(() => <svg data-testid="mock-moon-icon" />)
}));

describe('Icon Component', () => {
   it('renders the correct icon when a valid name is provided', () => {
      render(<Icon name="SunIcon" />);

      // Verify the correct icon is rendered
      const icon = screen.getByTestId('icon-SunIcon');
      expect(icon).toBeInTheDocument();
      expect(screen.getByTestId('mock-sun-icon')).toBeInTheDocument();
   });

   it('logs an error and returns null when an invalid name is provided', () => {
      const consoleErrorSpy = jest
         .spyOn(console, 'error')
         .mockImplementation(() => {});

      const { container } = render(<Icon name="InvalidIcon" />);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
         'Icon "InvalidIcon" does not exist.'
      );
      expect(container.firstChild).toBeNull();

      consoleErrorSpy.mockRestore();
   });

   it('applies the correct size based on the size prop', () => {
      render(<Icon name="MoonIcon" size={6} />);

      // Verify the size styles
      const icon = screen.getByTestId('icon-MoonIcon');
      expect(icon).toHaveStyle({ height: '24px', width: '24px' }); // 6 * 4 = 24px
   });

   it('applies the default size when no size prop is provided', () => {
      render(<Icon name="SunIcon" />);

      // Verify the default size styles
      const icon = screen.getByTestId('icon-SunIcon');
      expect(icon).toHaveStyle({ height: '16px', width: '16px' }); // Default size = 4 * 4 = 16px
   });
});
