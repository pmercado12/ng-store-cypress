describe('Nuevo documento de carga masiva', () => {

    beforeEach(() => {
        cy.window().then((win) => {
            win.sessionStorage.clear()
        });
        cy.clearCookies();
        cy.visit('/');
    });

    it('NIT Inactivo', () => {
        cy.get('a[title="Entrar"]').click();
        cy.get("#user").type(Cypress.env('usuarioCat'));
        cy.get("#paswe").type(Cypress.env('passwordCat'));
        cy.get('button[type=submit]').click();
        cy.get('a[title="Cambiar Perfil"]').click();
        cy.get('sigep-cambiaperfil input[type=text]').type('815{enter}');
        cy.get('sigep-cambiaperfil input[type=radio]').click();
        cy.get('a[title="Catálogo de Bienes y Servicios"]').click();
        cy.get('a[title="Solicitudes de Carga Masiva"]').click();
        cy.get('div.opcionesMenuPagina button.dropdown-toggle').click();
        cy.get('div.opcionesMenuPagina').contains('Modificar Catálogo').click();

        cy.get('input[name=procResumenOperacion]').type('Prueba automatizada :D');
        cy.get('botones-opciones-footer i.fa-arrow-right').click();
        cy.get('sccatite-multiple-tree').contains('10000000').click();
        cy.get('sccatite-multiple-tree').contains('10100000').click();
        cy.get('sccatite-multiple-tree').contains('10101500').click();
        
        
        
        /*
        cy.get('#tablaValues tbody tr:nth-child(1) button').click();
        cy.get('#tablaValues tbody tr:nth-child(1) ul li a span.fa-edit').click();
        cy.get('sigep-mensaje div.modal-header').contains("ERROR");
        cy.get('sigep-mensaje div.modal-body').contains("El dato del NIT no es correcto");*/

    });
});
