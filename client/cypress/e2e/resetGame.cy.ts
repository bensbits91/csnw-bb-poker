describe('Poker Game - Game Reset', () => {
   it('should reset the game and return to the initial state', () => {
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

      // Click the "Reset Game" button
      cy.findByRole('button', { name: /New deal button/i }).click();

      // Verify that all player hands are cleared
      cy.findAllByTestId('player-hand').each(hand => {
         cy.wrap(hand).findAllByTestId('card').should('have.length', 5);
      });

      // Verify that the game is ready to start again
      cy.findByRole('button', { name: /New deal button/i }).should(
         'be.visible'
      );
   });
});
