describe('Prueba servicio web rsbeneficiarios', () => {

    let token = null;
    beforeEach(() => {
        cy.visit('/');

        cy.get("#user").type(Cypress.env('usuarioBen'));
        cy.get("#paswe").type(Cypress.env('passwordBen'));
        cy.get('button[type=submit]').click();
        cy.get('body button.btn-primary').click();
        cy.get('body').then(($span) => {
            const objeto = $span.text();
            token = JSON.parse(objeto).access_token;
            cy.log(token);

        })
    });

    it('Get Persona Natural', () => {
        cy.request({
            method: 'GET',
            url: Cypress.env('baseTest') + '/rsbeneficiarios/api/v1/beneficiarios/natural?numeroDocumento=6157034&primerApellido=ALVARADO&segundoApellido=ATAHUICHI&nombres=ARIEL&fechaNacimiento=05-10-1985', // baseUrl is prepended to url
            headers: {
                'Authorization': "bearer " + token
            },
            form: false
        }).then((resp) => {
            var data = resp.body.data;
            console.log(data);
            expect(data).to.have.property('numeroDocumento', "6157034");
        })
    });

    it('Post Persona Natural', () => {
        let dataFirmada = {};
        cy.request({
            method: 'POST',
            url: Cypress.env('baseTest') + '/rsseguridad/api/utils/firmamelo',
            headers: {
                'Authorization': "bearer " + token,
                "Content-Type": "application/json"
            },
            form: false,
            body: {
                "numeroDocumento": "2716980",
                "complemento": "",
                "expDepartamento": "1",
                "expPais": "BO",
                "primerApellido": "MONTALVO",
                "segundoApellido": "JAUREGUI",
                "apellidoCasada": "",
                "nombres": "LIDIA EULALIA",
                "email": "",
                "fechaNacimiento": "03/08/1965",
                "estadoCivil": "S",
                "formatoInf": "NUAC",
                "pais": "BO",
                "ciudad": "La Paz",
                "casillaPostal": "",
                "localidad": "La Paz",
                "direccion": "Z/ B. V. PACAJES AV B # 58",
                "telefono": "",
                "celular": "",
                "fax": ""
            }
        }).then((resp) => {
            dataFirmada = resp.body;
            dataFirmada.header.kid = "mefp.busa";
            cy.request({
                method: 'POST',
                url: Cypress.env('baseTest') + '/rsbeneficiarios/api/v1/beneficiarios/natural',
                headers: {
                    'Authorization': "bearer " + token,
                    "Content-Type": "application/json"
                },
                form: false,
                timeout: 5000,
                body: dataFirmada
            }).then((resp) => {
                expect(JSON.parse(atob(resp.body.payload)).data).to.have.property('beneficiario');
                expect(JSON.parse(atob(resp.body.payload)).data).to.have.property('numeroDocumento', "2716980");
            })
        })

    });

    it('Post Persona Natural existente', () => {
        let dataFirmada = {};
        cy.request({
            method: 'POST',
            url: Cypress.env('baseTest') + '/rsseguridad/api/utils/firmamelo',
            headers: {
                'Authorization': "bearer " + token,
                "Content-Type": "application/json"
            },
            form: false,
            body: {
                "numeroDocumento": "2716980",
                "complemento": "",
                "expDepartamento": "1",
                "expPais": "BO",
                "primerApellido": "MONTALVO",
                "segundoApellido": "JAUREGUI",
                "apellidoCasada": "",
                "nombres": "LIDIA EULALIA",
                "email": "",
                "fechaNacimiento": "03/08/1965",
                "estadoCivil": "S",
                "formatoInf": "NUAC",
                "pais": "BO",
                "ciudad": "La Paz",
                "casillaPostal": "",
                "localidad": "La Paz",
                "direccion": "Z/ B. V. PACAJES AV B # 58",
                "telefono": "",
                "celular": "",
                "fax": ""
            }
        }).then((resp) => {
            dataFirmada = resp.body;
            dataFirmada.header.kid = "mefp.busa";
            cy.request({
                method: 'POST',
                url: Cypress.env('baseTest') + '/rsbeneficiarios/api/v1/beneficiarios/natural',
                headers: {
                    'Authorization': "bearer " + token,
                    "Content-Type": "application/json"
                },
                form: false,
                failOnStatusCode: false,
                timeout: 5000,
                body: dataFirmada
            }).then((resp) => {
                expect(JSON.parse(atob(resp.body.payload)).data.errores[0]).to.have.property('mensaje', "El registro del beneficiario ya existe");
            })
        })

    });

    it('PUT Persona Natural existente', () => {
        let dataFirmada = {};
        cy.request({
            method: 'POST',
            url: Cypress.env('baseTest') + '/rsseguridad/api/utils/firmamelo',
            headers: {
                'Authorization': "bearer " + token,
                "Content-Type": "application/json"
            },
            form: false,
            body: {
                "beneficiario": "167853",
                "numeroDocumento": "8344553",
                "complemento": "",
                "expDepartamento": "1",
                "expPais": "BO",
                "primerApellido": "MERCADO",
                "segundoApellido": "MONTALVO",
                "apellidoCasada": "",
                "nombres": "PEDRO ALEJANDRO",
                "email": "zafirapeter3@gmail.com",
                "fechaNacimiento": "12/12/1992",
                "estadoCivil": "S",
                "formatoInf": "NUAC",
                "pais": "BO",
                "ciudad": "La Paz",
                "casillaPostal": "",
                "localidad": "La Paz",
                "direccion": "YO SOY GROOD :D",
                "telefono": "",
                "celular": "",
                "fax": ""
            }
        }).then((resp) => {
            dataFirmada = resp.body;
            dataFirmada.header.kid = "mefp.busa";
            cy.log(dataFirmada);
            cy.request({
                method: 'PUT',
                url: Cypress.env('baseTest') + '/rsbeneficiarios/api/v1/beneficiarios/natural',
                headers: {
                    'Authorization': "bearer " + token,
                    "Content-Type": "application/json"
                },
                form: false,
                failOnStatusCode: false,
                timeout: 5000,
                body: dataFirmada
            }).then((resp) => {
                expect(JSON.parse(atob(resp.body.payload)).data).to.have.property('beneficiario');
            })
        })

    });

    it('Get Persona Juridica', () => {
        cy.get("#user").type(Cypress.env('usuarioBen'));
        cy.get("#paswe").type(Cypress.env('passwordBen'));
        cy.get('button[type=submit]').click();
        cy.get('body button.btn-primary').click();
        cy.get('body').then(($span) => {
            const objeto = $span.text();
            var token = JSON.parse(objeto).access_token;
            cy.log(token);
            cy.request({
                method: 'GET',
                url: Cypress.env('baseTest') + '/rsbeneficiarios/api/v1/beneficiarios/juridico?numeroDocumento=310740020', // baseUrl is prepended to url
                headers: {
                    'Authorization': "bearer " + token
                },
                form: false
            }).then((resp) => {
                var data = resp.body.data;
                console.log(data);
                expect(data).to.have.property('beneficiario', 785005);
                //alert(JSON.stringify(data));
            })
        })
    });

    it('Post Ben Juridico', () => {
        let dataFirmada = {};
        cy.request({
            method: 'POST',
            url: Cypress.env('baseTest') + '/rsseguridad/api/utils/firmamelo',
            headers: {
                'Authorization': "bearer " + token,
                "Content-Type": "application/json"
            },
            form: false,
            body: {
                "numeroDocumento": "10901758018",
                "matriculaComercio": "411024",
                "pais": "BO",
                "ciudad": "LA PAZ",
                "localidad": "cami",
                "direccion": "por aa",
                "email": "JOEANDPELUa@beni.com",
                "telefono": "73088057",
                "celular": "",
                "fax": ""
            }
        }).then((resp) => {
            dataFirmada = resp.body;
            dataFirmada.header.kid = "mefp.busa";
            cy.request({
                method: 'POST',
                url: Cypress.env('baseTest') + '/rsbeneficiarios/api/v1/beneficiarios/juridico',
                headers: {
                    'Authorization': "bearer " + token,
                    "Content-Type": "application/json"
                },
                form: false,
                failOnStatusCode: false,
                timeout: 5000,
                body: dataFirmada
            }).then((resp) => {
                expect(JSON.parse(atob(resp.body.payload)).data).to.have.property('beneficiario');
            })
        })

    });
});
