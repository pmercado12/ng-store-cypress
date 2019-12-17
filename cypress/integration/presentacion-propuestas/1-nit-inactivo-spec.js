describe('Presentación de propuestas Pruebas de servicios web', () => {

    beforeEach(() => {
        cy.window().then((win) => {
            win.sessionStorage.clear()
        });
        cy.clearCookies();
        cy.visit('/');
    });

    it('NIT Inactivo', () => {
        cy.get('a[title="Entrar"]').click();
        cy.get("#exampleInputEmail1").type('JSL335887000');
        cy.get("#exampleInputPassword1").type('JSL33588700017');
        cy.get('button[type=submit]').click();
        cy.get('a[title="Registro Único de Proveedores del Estado"]').click();
        cy.get('a[title="Procesos de Contratación"]').click();
        cy.get('a[title="Búsqueda de procesos"]').click();
        cy.get('#tablaValues tbody tr:nth-child(1) button').click();
        cy.get('#tablaValues tbody tr:nth-child(1) ul li a span.fa-edit').click();
        cy.get('sigep-mensaje div.modal-header').contains("ERROR");
        cy.get('sigep-mensaje div.modal-body').contains("El dato del NIT no es correcto");

    });

    it('Matrícula Inactiva', () => {
        cy.get('a[title="Entrar"]').click();
        cy.get("#exampleInputEmail1").type('GNC199210200');
        cy.get("#exampleInputPassword1").type('GNC19921020017');
        cy.get('button[type=submit]').click();
        cy.get('a[title="Registro Único de Proveedores del Estado"]').click();
        cy.get('a[title="Procesos de Contratación"]').click();
        cy.get('a[title="Búsqueda de procesos"]').click();
        cy.get('#tablaValues tbody tr:nth-child(1) button').click();
        cy.get('#tablaValues tbody tr:nth-child(1) ul li a span.fa-edit').click();
        cy.get('sigep-mensaje div.modal-header').contains("ERROR");
        cy.get('sigep-mensaje div.modal-body').contains("la matrícula no se encuentra en estado Activo");

    });
});
