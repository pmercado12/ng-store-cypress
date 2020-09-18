describe('Prueba servicio web rscuotas', () => {

    let token = null;
    beforeEach(() => {
        cy.visit('/');

        cy.get("#user").type(Cypress.env('usuarioCuo'));
        cy.get("#paswe").type(Cypress.env('passwordCuo'));
        cy.get('button[type=submit]').click();
        cy.get('body button.btn-primary').click();
        cy.get('body').then(($span) => {
            const objeto = $span.text();
            token = JSON.parse(objeto).access_token;
            cy.log(token);

        })
    });

    it('Get Pac Inversion Detalle', () => {
        cy.request({
            method: 'GET',
            url: Cypress.env('baseTest') + '/rscuotas/api/v1/pacinversiondetalle?correlativo=50',
            headers: {
                'Authorization': "bearer " + token
            },
            form: false
        }).then((resp) => {
            var data = resp.body.data;
            expect(data).to.have.property('estado', "ELABORADO");
            //alert(JSON.stringify(data));
        })
    });

    /*it('Post pacinversion', () => {
        //EXTRAIDA DE LOS ARCHIVOS DE LOGS DE HELP
        let dataFirmadaVIPFE = {
            "payload": "W10",
            "protected": "eyJhbGciOiJSUzUxMiJ9",
            "header": { "kid": "vipfe.cuotas" },
            "signature": "ZKfBzn_UWThD4FTbWQSA1_WrQ39ci0UeBiMHTkV21Ziijy0ml6ViAvEmycT9zFzfy0rz9Ks7mzsZoqWuvj-FetjNLuz18u5F5E9mV3wJlc16g3PRqhxtat_KD9pK2mmaJ3H7rupS_XTlBGk1-sat2VrlR43aSsiX6_dTQ1WM_WTe9E3N81OC-3rrg8agcVEAYojFZWb8nlbGkOS229cFJ3-y1pvLdDef1r0HlAZw7S5Img-vRMjMPG7946oVaIjWiyB5xnM6eZGwvCMsII6nfhzVZeSmODQBOn5RS2CxoDk9r_jVXgNNqESTVImXNdStMtcwJ79ZE7NABiMWFLlh3Q"
        };
        cy.request({
            method: 'POST',
            url: Cypress.env('baseTest') + '/rscuotas/api/v1/pacinversion',
            headers: {
                'Authorization': "bearer " + token,
                "Content-Type": "application/json"
            },
            form: false,
            failOnStatusCode: false,
            timeout: 5000,
            body: dataFirmadaVIPFE
        }).then((resp) => {
            expect(JSON.parse(atob(resp.body.payload)).data).to.have.property('correlativo');
        })

    });*/
});
