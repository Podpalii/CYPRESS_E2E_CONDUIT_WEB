/// <reference types="cypress" />

const { generateArticleData } = require("../support/generateArticleData");

describe('Article (positive)', () => {

  it('should allow to create a new article filing in required fields', () => {

    cy.visit('/#/login')

    const {whatAbout, writeArticle, articleTitle, enterTag} = generateArticleData(); 

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
    
      cy.get('.ion-compose')
        .click();
      
      cy.get('[placeholder="Article Title"]')
        .type(articleTitle);     

      cy.get('[placeholder="What\'s this article about?"]')
        .type(whatAbout);  

      cy.get('[placeholder="Write your article (in markdown)"]')
        .type(writeArticle);  

      cy.get('[placeholder="Enter tags"]')
        .type(enterTag);  
       
      cy.get('.btn') 
        .click(); 

      cy.get('h1')
        .should('contain', articleTitle); 

  });

  it('should allow to edit created article', () => {

    const {whatAbout, writeArticle, articleTitle, enterTag} = generateArticleData();

    cy.createArticle();

    cy.get('.ion-edit')
      .click()
    cy.wait(2000);

    cy.get('[placeholder="Article Title"]') 
      .type('{selectall}{del}')
    cy.wait(2000);

    cy.get('[placeholder="Article Title"]') 
      .type(articleTitle);

    cy.get('[placeholder="Enter tags"]')
      .type(enterTag);  

    cy.get('[class="btn btn-lg pull-xs-right btn-primary"]') 
      .click(); 

    cy.get('h1')
      .should('contain', articleTitle)  

  });  

  it('should allow to post a comment to article', () => {

    cy.createArticle();

    cy.get('.form-control')
      .type('I like this article');
    
    cy.get('[class="btn btn-sm btn-primary"]')  
      .click();

    cy.get('.card-text')  
      .should('contain', 'I like this article')

  });    

  it('should allow to delete own created comment', () => {

    cy.createArticle();

    cy.get('.form-control')
      .type('Greate article');
    
    cy.get('[class="btn btn-sm btn-primary"]')  
      .click();
      cy.wait(2000);

    cy.get('.mod-options')  
      .click()
      
    cy.get('.card-text')
      .should("not.have.text", "Greate article");

  }); 

  it('should allow to delete created article', () => {

    cy.createArticle();

    cy.get('.ion-trash-a')
      .click();
    cy.wait(2000);

    cy.url()
      .should('include', 'https://react-redux.realworld.io/#/');  

  });   

});