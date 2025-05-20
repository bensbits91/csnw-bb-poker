describe('Poker Game - Winner Determination', () => {
   it('should determine and display the winner after all hands are locked', () => {
      // Visit the homepage
      cy.visit('/');

      // Start the game
      cy.findByRole('button', { name: /New deal button/i }).click();

      // Verify that player hands are displayed
      cy.findAllByTestId('player-hand').should('have.length', 4); // Assuming 4 players

      // Lock all player hands
      cy.findAllByRole('button', { name: /Skip to winner button/i }).click();

      // Verify that the winner is displayed
      cy.get('[data-testid="winner-indicator"]').should('be.visible');

      // Verify that the winner's name is displayed
      cy.get('[data-testid="winner-name"]').should('not.be.empty');

      // Verify that the winner's hand is highlighted
      cy.findAllByTestId('player-hand').each(hand => {
         cy.wrap(hand).then($hand => {
            if ($hand.hasClass('winner')) {
               cy.wrap($hand).should('contain.text', 'Winner');
            }
         });
      });
   });
});
