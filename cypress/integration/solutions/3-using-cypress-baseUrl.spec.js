describe('License plate store home page', () => {

    it('displays the right main title', () => {
        cy.visit('/');
        cy.contains('Welcome to our store').should('be.visible');
    });

    it('displays 8 license plates', () => {
        cy.visit('/');
        cy.get('app-license-plate').should('have.length', 8);
    });
});
