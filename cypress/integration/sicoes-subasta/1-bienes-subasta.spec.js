describe('Form 100 con Subasta Bienes', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('Ingresar', () => {
        cy.get("div#modalComunicados button").click();
    });
});
