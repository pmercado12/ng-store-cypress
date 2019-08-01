describe('License plate store home page', () => {

    it('displays the right main title', () => {
        cy.visit('/');
        cy.contains('Welcome to our store').should('be.visible');
    });

    it('displays 8 license plates', () => {
        cy.visit('/');
        cy.get('app-license-plate').should('have.length', 8);
        cy.checkLicensePlateAt(1, '2008 Georgia license plate', '$8');
        cy.checkLicensePlateAt(2, '2015 New Jersey license plate', '$11');
        cy.checkLicensePlateAt(3, '2013 California My Tahoe license plate', '$9');
        cy.checkLicensePlateAt(4, '2010 Colorado license plate', '$5');
        cy.checkLicensePlateAt(5, '2017 Florida license plate', '$10');
        cy.checkLicensePlateAt(6, '2014 Utah license plate', '$10');
        cy.checkLicensePlateAt(7, '2016 New York license plate', '$9');
        cy.checkLicensePlateAt(8, '2007 Pennsylvania license plate', '$11');
    });
});
