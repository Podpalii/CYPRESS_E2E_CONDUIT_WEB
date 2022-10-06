/// <reference types="cypress" />

const { generateUser } = require("../support/generate");

describe('Registration (negative)', () => {

  beforeEach(() => {

    cy.visit('/#/register')

  });

  it('should not allow to register with an existing username', () => {

    cy.registerNewUser().then(user => {

      cy.get('[placeholder="Username"]')
      .type(user.username);

      cy.get('[placeholder="Email"]')
        .type('new_' + user.email);
      
      cy.get('[placeholder="Password"]')
        .type(user.password);

      cy.contains('.btn', 'Sign in')
        .click();  

      cy.get('.error-messages > li')  
        .should('contain', 'username has already been taken');  
    })       
  });

  it('should not allow to register with an existing email', () => {

    cy.registerNewUser().then(user => {

      cy.get('[placeholder="Username"]')
        .type(user.username + '_new');

      cy.get('[placeholder="Email"]')
        .type(user.email);
      
      cy.get('[placeholder="Password"]')
        .type(user.password);

      cy.contains('.btn', 'Sign in')
        .click();  

      cy.get('.error-messages > li')  
        .should('contain', 'email has already been taken');
    })          
  });

  it('should not allow to register with blank username field', () => {

    const {email, password, username} = generateUser();
  
    cy.get('[placeholder="Username"]')

    cy.get('[placeholder="Email"]')
      .type(email);
      
    cy.get('[placeholder="Password"]')
      .type(password);

    cy.contains('.btn', 'Sign in')
      .click();  

    cy.get('.error-messages > li')  
      .should('contain', 'username can\'t be blank');  
        
  });

  it('should not allow to register with blank email field', () => {

    const {email, password, username} = generateUser();
  
    cy.get('[placeholder="Username"]')
      .type(username);

    cy.get('[placeholder="Email"]')
      
    cy.get('[placeholder="Password"]')
      .type(password);

    cy.contains('.btn', 'Sign in')
      .click();  

    cy.get('.error-messages > li')  
      .should('contain', 'email can\'t be blank');  
        
  });

  it('should not allow to register with blank password field', () => {

    const {email, password, username} = generateUser();
  
    cy.get('[placeholder="Username"]')
      .type(username);

    cy.get('[placeholder="Email"]')
      .type(email);    

    cy.get('[placeholder="Password"]')

    cy.contains('.btn', 'Sign in')
      .click();  

    cy.get('.error-messages > li')  
      .should('contain', 'password can\'t be blank');  
        
  });

  it('should not allow to register when email has invalid format', () => {

    const {email, password, username} = generateUser();
  
    cy.get('[placeholder="Username"]')
      .type(username);

    cy.get('[placeholder="Email"]')
      .type('email');    

    cy.get('[placeholder="Password"]')
      .type(password);

    cy.contains('.btn', 'Sign in')
      .click();  
    
    cy.wait(2000);  
     
    cy.url().should('include', '/#/register');   

  });
});
