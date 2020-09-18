describe('Prueba Catalogo Login', () => {

    let token = null;
    let nodoSeg = null;
    let nodoCat = null;
    beforeEach(() => {
        cy.window().then((win) => {
            win.sessionStorage.clear()
        });
        cy.clearCookies();

        cy.request({
            method: 'GET',
            url: 'sigep.sigma.gob.bo/rsseguridad/checkstatus',
            form: false
        }).then((resp) => {
            var data = resp.body;
            nodoSeg = data.nodo;
        });

        cy.request({
            method: 'GET',
            url: 'sigep.sigma.gob.bo/catBienes/checkstatus',
            form: false
        }).then((resp) => {
            var data = resp.body;
            nodoCat = data.nodo;
        });
        
        //cy.visit('/');

    });

    let arrayUsuarios = [
        { usuario: "PMM834455300", password: "P3dr0Sigep" }
    ];

    for (let i = 0; i < 1; i++) {

        it(i + ') Seg:' + nodoSeg + ',Cat:' + nodoCat, () => {

            cy.request({
                method: 'POST',
                url: 'sigep.sigma.gob.bo/rsseguridad/apiseg/auth?client_id=0&response_type=code',
                form: false,
                body: {
                    "user": arrayUsuarios[0].usuario,
                    "pasw": arrayUsuarios[0].password,
                }
            }).then((resp) => {
                var data = resp.body;                
            });

            /*cy.get('a[title="Entrar"]').click();
            cy.get("#user").type(arrayUsuarios[0].usuario);
            cy.get("#paswe").type(arrayUsuarios[0].password);
            cy.get('button[type=submit]').click();*/
            /*cy.get('a[title="Catálogo de Bienes y Servicios"]').click();
            cy.get('a[title="Solicitudes de Carga Masiva"]').click()
            cy.get('scunspscd table').find('tr').should('have.length', 12);*/
            console.error(i + ') Seg:' + nodoSeg + ',Cat:' + nodoCat);
        });
    }






});

