describe('License plate store home page', () => {

    it('displays the right main title', () => {
        cy.visit('http://store.angulartraining.com');
        cy.contains('Welcome to our store')
            .should('be.visible')
            .should('have.css', 'font-weight', '300');
    });

    it('displays 8 license plates', () => {
        cy.visit('http://store.angulartraining.com');
        cy.get('app-license-plate').should('have.length', 8);
    });
});
