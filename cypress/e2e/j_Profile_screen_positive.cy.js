/// <reference types="cypress" />

describe('Profile screen (positive)', () => {

  beforeEach(() => {

    cy.loginUser();
    cy.visit('/');

  });  

  it('should allow to like own article', () => {
    
    cy.unlikedOwnArticle();

    cy.get('.user-pic')
      .click();

    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn')
      .click();

    cy.wait(2000);  
      
    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn') 
      .should('have.focus')

  }); 
  
  it('should allow to unlike own article', () => {

    cy.likedOwnArticle();
    
    cy.get('.user-pic')
      .click();

    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn')
      .click();

    cy.get('body')
      .click('right', {force: true});   

    cy.wait(2000);  
      
    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn') 
      .should('not.have.focus')

  });   

  it('should allow to Favorited Articles screen', () => {

    cy.get('.user-pic')
      .click();
    
    cy.contains('a', 'Favorited Articles')
      .click();

    cy.url().should('include', '/favorites');  
      
  });    
});   