import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Heading } from '../Heading';

describe('Heading Component', () => {
   it('renders the correct HTML tag based on the level prop', () => {
      render(
         <Heading level={2} ariaLabel="Test Heading">
            Test Heading
         </Heading>
      );

      // Verify the correct tag is rendered
      const heading = screen.getByRole('heading', { name: 'Test Heading' });
      expect(heading.tagName).toBe('H2');
   });

   it('applies the correct styles based on the appearance prop', () => {
      render(
         <Heading level={3} appearance={1} ariaLabel="Styled Heading">
            Styled Heading
         </Heading>
      );

      // Verify the correct styles are applied
      const heading = screen.getByRole('heading', { name: 'Styled Heading' });
      expect(heading).toHaveClass(
         'text-4xl/[50px] tracking-tight md:text-5xl/[50px]'
      );
   });

   it('applies the correct styles based on the weight prop', () => {
      render(
         <Heading level={1} weight="bold" ariaLabel="Bold Heading">
            Bold Heading
         </Heading>
      );

      // Verify the correct weight class is applied
      const heading = screen.getByRole('heading', { name: 'Bold Heading' });
      expect(heading).toHaveClass('font-bold');
   });

   it('applies the correct margin styles based on the top and bottom props', () => {
      render(
         <Heading level={1} top="md" bottom="lg" ariaLabel="Margin Heading">
            Margin Heading
         </Heading>
      );

      // Verify the correct margin classes are applied
      const heading = screen.getByRole('heading', { name: 'Margin Heading' });
      expect(heading).toHaveClass('mt-4 mb-8');
   });

   it('applies the aria-label for accessibility', () => {
      render(
         <Heading level={1} ariaLabel="Accessible Heading">
            Hidden Heading
         </Heading>
      );

      // Verify the aria-label is applied
      const heading = screen.getByRole('heading', {
         name: 'Accessible Heading'
      });
      expect(heading).toBeInTheDocument();
   });

   it('renders the children correctly', () => {
      render(
         <Heading level={1} ariaLabel="Child Content">
            Child Content
         </Heading>
      );

      // Verify the children are rendered
      const heading = screen.getByRole('heading', { name: 'Child Content' });
      expect(heading).toHaveTextContent('Child Content');
   });
});
