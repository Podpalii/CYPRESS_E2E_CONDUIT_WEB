/// <reference types="cypress" />

describe('Settings (negative)', () => {

  beforeEach(() => {

    cy.loginUser();
    cy.visit('/#/settings');

  });  

  it('should not allow to update settings when username field is empty', () => {

    cy.get('[placeholder="Username"]')
      .type('{selectall}{del}');

    cy.get('[class="btn btn-lg btn-primary pull-xs-right"]')
      .click();

    cy.wait(4000);  

    cy.get('.error-messages > li')  
      .should('contain', 'username can\'t be blank');  

  });   

  it('should not allow to update settings when email field is empty', () => {

    cy.get('[placeholder="Email"]')
      .type('{selectall}{del}');

    cy.get('[class="btn btn-lg btn-primary pull-xs-right"]')
      .click();
      
    cy.wait(2000);  
      
    cy.get('.error-messages > li')  
      .should('contain', 'email can\'t be blank');  

  });    

  it('should not allow to update settings with invalid format email', () => {

    cy.get('[placeholder="Email"]')
      .type('{selectall}{del}');

    cy.get('[placeholder="Email"]')
      .type('email');  

    cy.get('[class="btn btn-lg btn-primary pull-xs-right"]')
      .click();
      
    cy.wait(2000);   

    cy.url().should('include', '/#/settings');

  });
});   