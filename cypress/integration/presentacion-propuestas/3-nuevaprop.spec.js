describe('Registro de nueva propuesta', () => {

    beforeEach(() => {
        cy.window().then((win) => {
            win.sessionStorage.clear()
        });
        cy.clearCookies();
        cy.visit('/');
    });

    let arrayUsuarios = [
        { usuario: "NGL716965200", password: "NGL71696520017" }//,
        //{ usuario: "IMA1070069500", password: "IMA107006950017" }
    ]
    for (let i = 0; i < arrayUsuarios.length; i++) {
        it('Propuesta usuario' + arrayUsuarios[i].usuario, () => {
            cy.get('a[title="Entrar"]').click();
            cy.get("#user").type(arrayUsuarios[i].usuario);
            cy.get("#paswe").type(arrayUsuarios[i].password);
            cy.get('button[type=submit]').click();
            cy.get('a[title="Registro Único de Proveedores del Estado"]').click();
            cy.get('a[title="Procesos de Contratación"]').click();
            cy.get('a[title="Búsqueda de procesos"]').click();
            cy.get("scpro-list form input").type("1005271{enter}");
            cy.get('#tablaValues tbody tr:nth-child(1) button').click();
            cy.get('#tablaValues tbody tr:nth-child(1) a>span.fa-edit').click();
            cy.get('botones-opciones-footer a i.fa-arrow-right').click();
            cy.get('prv-propuesta-tecnica-screen button > i.fa-plus-circle').click();
            cy.get('seleccion-items-modal datos-items-fragment table tbody tr:nth-child(1) span.checkbox').click();
            cy.get('seleccion-items-modal div.modal-footer button:nth-child(2)').click();
        });
    }
});
