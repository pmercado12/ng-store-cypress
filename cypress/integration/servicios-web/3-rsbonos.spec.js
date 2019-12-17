describe('Prueba servicio web rsbonos', () => {

    let token = null;
    beforeEach(() => {
        cy.visit('/');

        cy.get("#user").type(Cypress.env('usuarioBon'));
        cy.get("#paswe").type(Cypress.env('passwordBon'));
        cy.get('button[type=submit]').click();
        cy.get('body button.btn-primary').click();
        cy.get('body').then(($span) => {
            const objeto = $span.text();
            token = JSON.parse(objeto).access_token;
            cy.log(token);

        })
    });

    it('Get Datos Adicionales Bono', () => {
        cy.request({
            method: 'GET',
            url: Cypress.env('baseTest') + '/rsbonos/api/v1/beneficiarios/datosAdicionales?beneficiario=682651&bono=1',
            headers: {
                'Authorization': "bearer " + token
            },
            form: false
        }).then((resp) => {
            var data = resp.body.data;
            expect(data).to.have.property('beneficiario');
        })
    });
});
