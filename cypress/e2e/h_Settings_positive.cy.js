/// <reference types="cypress" />

const { generateUser } = require("../support/generate");

const { generateArticleData } = require("../support/generateArticleData");

describe('Settings (positive)', () => {

  beforeEach(() => {

    cy.loginUser();
    cy.visit('/');

  });  

  it('should allow to update current settings', () => {

    const {whatAbout, writeArticle, articleTitle, enterTag} = generateArticleData();

    const {email, password, username} = generateUser();
  
    cy.get('.ion-gear-a')
      .click();

    cy.url()
      .should('include', '/#/settings')
    
    cy.get('[placeholder="Username"]')
      .type('{selectall}{del}');

    cy.get('[placeholder="Username"') 
      .type(username);

    cy.get('[placeholder="Short bio about you"]')
      .type(whatAbout);

    cy.get('[class="btn btn-lg btn-primary pull-xs-right"]')
      .click();

    cy.get('.nav-link')
      .should('contain', username)     
      
  });  

  it('should allow to logout', () => {

    cy.get('.ion-gear-a')
      .click();

    cy.get('[class="btn btn-outline-danger"]') 
      .click();
      
    cy.wait(2000);  

    cy.get('[href="#login"]')
      .should('contain', 'Sign in')

  });    
});  