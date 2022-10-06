/// <reference types="cypress" />

describe('Login (positive)', () => {

  it('should allow to login registered user', () => {

    cy.visit('/')

    cy.get('[href="#login"]')
      .click();

    cy.registerNewUser().then(user => {
  
      cy.get('[placeholder="Email"]')
        .type(user.email);
  
      cy.get('[placeholder="Password"]')
        .type(user.password);
  
      cy.get('.btn') 
        .should('contain', 'Sign in')
        .click();

      cy.get('.nav-link')  
        .should('contain', user.username);   

    })  
  });
});