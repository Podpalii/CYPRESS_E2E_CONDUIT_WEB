/// <reference types="cypress" />

describe('Login (negative)', () => {

  beforeEach(() => {

    cy.visit('/#/login')

  });

  it('should not allow to login when email is blank', () => {

    cy.registerNewUser().then(user => {
    
      cy.get('[placeholder="Email"]')
  
      cy.get('[placeholder="Password"]')
        .type(user.password);
  
      cy.get('.btn') 
        .should('contain', 'Sign in')
        .click();

      cy.get('.error-messages > li')  
        .should('contain', 'email can\'t be blank');   
    
    })    
  });

  it('should not allow to login when password is blank', () => {

    cy.registerNewUser().then(user => {
  
      cy.get('[placeholder="Email"]')
        .type(user.email);
  
      cy.get('[placeholder="Password"]')
  
      cy.get('.btn') 
        .should('contain', 'Sign in')
        .click();

      cy.get('.error-messages > li')  
        .should('contain', 'password can\'t be blank');  

    })    
  });

  it('should not allow to login with not registered email', () => {

    cy.registerNewUser().then(user => {
  
      cy.get('[placeholder="Email"]')
        .type('new_' + user.email);
  
      cy.get('[placeholder="Password"]')
        .type(user.password);
  
      cy.get('.btn') 
        .should('contain', 'Sign in')
        .click();

      cy.get('.error-messages > li')  
        .should('contain', 'email or password is invalid');

    })    
  });

  it('should not allow to login with not registered password', () => {

    cy.registerNewUser().then(user => {
  
    cy.get('[placeholder="Email"]')
      .type(user.email);
  
    cy.get('[placeholder="Password"]')
      .type('new' + user.password);
  
    cy.get('.btn') 
      .should('contain', 'Sign in')
      .click();

    cy.get('.error-messages > li')  
      .should('contain', 'email or password is invalid');

    })  
  });
});