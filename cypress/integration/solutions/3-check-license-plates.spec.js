describe('License plate store home page', () => {

    it('displays the right main title', () => {
        cy.visit('http://store.angulartraining.com');
        cy.contains('Welcome to our store').should('be.visible');
    });

    it('displays 8 license plates', () => {
        cy.visit('http://store.angulartraining.com');
        cy.get('app-license-plate').should('have.length', 8);
        cy.get('app-license-plate').then( $plates => {
            cy.wrap($plates[0]).contains('2008 Georgia license plate').should('be.visible');
            cy.wrap($plates[0]).contains('$8').should('be.visible');
        });
    });
});
