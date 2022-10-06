/// <reference types="cypress" />

const { generateUser } = require("../support/generate");

describe('Registration (positive)', () => {
  
  it('should allow to register a new user', () => {

    cy.visit('/')

    const {email, password, username} = generateUser();

    cy.get('[href="#register"]')
      .click();

    cy.get('[placeholder="Username"]')
      .type(username);

    cy.get('[placeholder="Email"]')
      .type(email);
      
    cy.get('[placeholder="Password"]')
      .type(password);

    cy.contains('.btn', 'Sign in')
      .click();  

    cy.get('.nav-link')  
      .should('contain', username);  
        
  });
});