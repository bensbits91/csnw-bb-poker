describe('Poker Game - Player Name Editing', () => {
   it('should allow a player to edit their name and reflect the changes', () => {
      // Visit the homepage
      cy.visit('/');

      // Start the game
      cy.findByRole('button', { name: /New deal button/i }).click();

      // Verify that player names are displayed
      cy.findAllByTestId('player-name-container').should('have.length', 4); // Assuming 4 players

      // Edit the first player's name
      cy.findAllByTestId('player-name-container')
         .first()
         .within(() => {
            // Click the edit button
            cy.findAllByTestId('edit-name-button').click();

            // Type a new name
            cy.get('input').clear().type('Player One Updated{enter}');
         });

      // Verify that the new name is displayed
      cy.findAllByTestId('player-name')
         .first()
         .should('contain.text', 'Player One Updated');

      // Verify that the game still functions (e.g., lock hands)
      cy.findAllByRole('button', { name: /Keep all/i }).each(button => {
         cy.wrap(button).click();
      });

      // Verify that the winner is displayed
      cy.get('[data-testid="winner-indicator"]').should('be.visible');
   });
});
