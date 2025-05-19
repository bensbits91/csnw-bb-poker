import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WinnerAnimation } from '../WinnerAnimation';
import type { LottieRefCurrentProps } from 'lottie-react';

/* eslint-disable @typescript-eslint/no-unused-vars */
jest.mock('lottie-react', () => ({
   __esModule: true,
   default: jest
      .fn()
      .mockImplementation(
         ({ lottieRef, autoplay, animationData, ...props }) => {
            // Mock the Lottie component and attach the ref
            if (lottieRef) {
               lottieRef.current = {
                  setSpeed: jest.fn(),
                  goToAndPlay: jest.fn()
               } as unknown as LottieRefCurrentProps;
            }
            // Exclude autoplay, animationData, and other non-standard props
            return <div data-testid="mock-lottie" {...props}></div>;
         }
      )
}));
/* eslint-enable @typescript-eslint/no-unused-vars */

describe('WinnerAnimation Component', () => {
   it('renders the Lottie animation with correct props', () => {
      render(<WinnerAnimation />);

      // Verify the Lottie component is rendered
      const lottie = screen.getByTestId('mock-lottie');
      expect(lottie).toBeInTheDocument();

      // Verify the aria-label is applied
      expect(lottie).toHaveAttribute(
         'aria-label',
         'Winner receiving chips animation'
      );
   });

   it.skip('replays the animation when clicked', () => {
      render(<WinnerAnimation />);

      // Access the mocked Lottie component
      const lottie = screen.getByTestId('mock-lottie');

      // Access the lottieRef from the mock implementation
      const lottieRef = (
         lottie as unknown as { lottieRef?: { current: LottieRefCurrentProps } }
      ).lottieRef?.current;

      // Simulate a click on the container
      const container = screen.getByLabelText('Play winner animation');
      fireEvent.click(container);

      // Verify that setSpeed and goToAndPlay are called with the correct arguments
      expect(lottieRef?.setSpeed).toHaveBeenCalledWith(3);
      expect(lottieRef?.goToAndPlay).toHaveBeenCalledWith(0, true);
   });
});
