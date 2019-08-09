describe('License plate store home page', () => {

    beforeEach(() => {
        cy.server();
        cy.route('/demos/angular/rates.php', {EUR: 1.5, GBP: 2}).as('rates');
        cy.route('/demos/angular/plates.php', 'fixture:plates.json').as('plates');
        cy.visit('/');
        cy.wait('@rates');
        cy.wait('@plates');
    });

    it('displays the right main title', () => {
        cy.contains('Welcome to our store')
            .should('be.visible')
            .should('have.css', 'font-weight', '300')
            .should('have.css', 'font-size', '72px')
            .and('have.css', 'font-family').and('match', /Segoe UI/);
    });

    it('displays 8 license plates', () => {
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

    it('supports multiple currencies', () => {
        cy.get('app-currency-switcher').click();
        cy.contains('EUR').click();
        cy.checkLicensePlateAt(1, '2008 Georgia license plate', '€12');
        cy.checkLicensePlateAt(2, '2015 New Jersey license plate', '€16.5');
        cy.checkLicensePlateAt(3, '2013 California My Tahoe license plate', '€13.5');
        cy.checkLicensePlateAt(4, '2010 Colorado license plate', '€7.5');
        cy.checkLicensePlateAt(5, '2017 Florida license plate', '€15');
        cy.checkLicensePlateAt(6, '2014 Utah license plate', '€15');
        cy.checkLicensePlateAt(7, '2016 New York license plate', '€13.5');
        cy.checkLicensePlateAt(8, '2007 Pennsylvania license plate', '€16.5');
    });
});
