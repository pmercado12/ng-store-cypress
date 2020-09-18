describe('Prueba servicio web rssicoes', () => {

    let token = null;
    beforeEach(() => {
        cy.visit('/');

        cy.get("#user").type(Cypress.env('usuarioSic'));
        cy.get("#paswe").type(Cypress.env('passwordSic'));
        cy.get('button[type=submit]').click();
        cy.get('body button.btn-primary').click();
        cy.get('body').then(($span) => {
            const objeto = $span.text();
            token = JSON.parse(objeto).access_token;
            cy.log(token);

        })
    });

    it('Get Datos Proceso', () => {
        cy.request({
            method: 'GET',
            url: Cypress.env('baseTest') + '/rssicoes/api/v1/procesos?cuce=19-0904-02-999437-1-1',
            headers: {
                'Authorization': "bearer " + token
            },
            form: false
        }).then((resp) => {
            var data = resp.body.data;
            expect(data).to.have.property('cuce');
        })
    });

    it('Get Datos Items', () => {
        cy.request({
            method: 'GET',
            url: Cypress.env('baseTest') + '/rssicoes/api/v1/items?cuce=19-0904-02-999437-1-1',
            headers: {
                'Authorization': "bearer " + token
            },
            form: false
        }).then((resp) => {
            var data = resp.body.data;
            expect(data).to.not.be.empty;
        })
    });
});
