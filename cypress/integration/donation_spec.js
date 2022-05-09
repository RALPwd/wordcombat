/* eslint-disable no-undef */
beforeEach(() => {
  cy.visit('http://localhost:3000/');
});

Cypress.config('defaultCommandTimeout', 10000);

describe('Donations', () => {
  it('should login', () => {
    cy.get('input[type="email"]').type('correo1@fake.com');
    cy.get('input[type="password"]').type('contrasena');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/lobby');
  });

  it('should make a donation', () => {
    cy.get('input[type="email"]').type('correo1@fake.com');
    cy.get('input[type="password"]').type('contrasena');
    cy.get('button[type="submit"]').click();
    cy.get('a[href="/donation"]').click();
    cy.get('input[name="name"]').type('Ernesto');
    cy.get('input[name="lastName"]').type('Perez');
    cy.get('select[name="docType"]').select('CC');
    cy.get('input[name="docNumber"]').type('1010100100');
    cy.get('button[type="button"]').click();
    cy.get('input[name="cardNumber"]').type('4575623182290326');
    cy.get('input[name="cardExpYear"]').type('2025');
    cy.get('input[name="cardExpMonth"]').type('12');
    cy.get('input[name="cardCvc"]').type('123');
    cy.get('input[name="amount"]').type('10000');
    cy.get('textarea[name="message"]').type('Donación automatizada por Cypress para pruebas');
    cy.get('button[type="submit"]').click();
    cy.get('.title').should('contain', 'Gracias');
  });
});
