describe('Prueba servicio web rsclasificadores', () => {

    let token = null;
    beforeEach(() => {
        cy.visit('/');

        cy.get("#user").type(Cypress.env('usuarioCla'));
        cy.get("#paswe").type(Cypress.env('passwordCla'));
        cy.get('button[type=submit]').click();
        cy.get('body button.btn-primary').click();
        cy.get('body').then(($span) => {
            const objeto = $span.text();
            token = JSON.parse(objeto).access_token;
            cy.log(token);

        })
    });

    it('Get Datos Otros financiadores', () => {
        cy.request({
            method: 'GET',
            url: Cypress.env('baseTest') + '/rsclasificadores/api/v1/otrosFinanciadores/vigentes?idEntidad=15&Gestion=2020',
            headers: {
                'Authorization': "bearer " + token
            },
            form: false
        }).then((resp) => {
            console.log(resp.body.data);
        })
    });
});
