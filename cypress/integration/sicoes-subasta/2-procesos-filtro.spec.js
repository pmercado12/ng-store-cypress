describe('Prueba servicio web rssicoes', () => {

    let token = null;
    beforeEach(() => {
        cy.window().then((win) => {
            win.sessionStorage.clear()
        });
        cy.clearCookies();
        cy.visit('/');

        /*cy.get('body').then(($span) => {
            const objeto = $span.text();
            token = JSON.parse(objeto).access_token;
            cy.log(token);

        })*/
    });

    it('Get Datos Proceso', () => {
        /*cy.request({
            method: 'GET',
            url: Cypress.env('baseTest') + '/rssicoes/api/v1/procesos?cuce=19-0904-02-999437-1-1',
            headers: {
                'Authorization': "bearer " + token
            },
            form: false
        }).then((resp) => {
            var data = resp.body.data;
            expect(data).to.have.property('cuce');
        })*/
    });
});
