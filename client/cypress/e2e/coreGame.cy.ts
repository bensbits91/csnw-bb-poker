// Import Cypress Testing Library commands
import '@testing-library/cypress';

describe('Poker Game - Core Game Flow', () => {
   it('should start the game, deal cards, lock hands, and determine a winner', () => {
      // Visit the homepage
      cy.visit('/');

      // Start the game
      cy.findByRole('button', { name: /New deal button/i }).click();

      // Verify that player hands are displayed
      cy.findAllByTestId('player-hand').should('have.length', 4); // Assuming 4 players

      // Verify that each player has 5 cards
      cy.findAllByTestId('player-hand').each(hand => {
         cy.wrap(hand).findAllByTestId('card').should('have.length', 5);
      });

      // Lock all player hands
      cy.findAllByRole('button', { name: /Keep all/i }).each(button => {
         cy.wrap(button).click();
      });

      // Verify that the winner is displayed
      cy.get('[data-testid="winner-indicator"]').should('be.visible');
   });
});
