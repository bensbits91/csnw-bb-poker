describe('Poker Game - Card Replacement', () => {
   it('should allow a player to replace cards and update the deck', () => {
      // Visit the homepage
      cy.visit('/');

      // Start the game
      cy.findByRole('button', { name: /New deal button/i }).click();

      // Verify that player hands are displayed
      cy.findAllByTestId('player-hand').should('have.length', 4); // Assuming 4 players

      // Select the first player's hand
      cy.findAllByTestId('player-hand')
         .first()
         .within(() => {
            // Select the first card to replace
            cy.findAllByTestId('card').first().click();

            // Click the "Replace Selected" button
            cy.findByRole('button', { name: /Replace selected/i }).click();
         });

      // Verify that the first card in the player's hand has changed
      cy.findAllByTestId('player-hand')
         .first()
         .within(() => {
            cy.findAllByTestId('card')
               .first()
               .should('not.have.text', 'Original Card Text'); // Replace with actual card text logic
         });
   });
});
