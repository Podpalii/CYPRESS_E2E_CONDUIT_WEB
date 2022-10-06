/// <reference types="cypress" />

const { generateArticleData } = require("../support/generateArticleData");

describe('Article (negative)', () => {

  beforeEach(() => {

    cy.loginUser();
    cy.visit('/#/editor');

  });

  it('should not allow to create a new article when Article Title is blank ', () => {

    const {whatAbout, writeArticle, articleTitle, enterTag} = generateArticleData();

    cy.get('[placeholder="Article Title"]')     

    cy.get('[placeholder="What\'s this article about?"]')
      .type(whatAbout);  

    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(writeArticle);  

    cy.get('[placeholder="Enter tags"]')
      .type(enterTag);   
       
    cy.get('.btn') 
      .click(); 

    cy.get('[class="error-messages"]')
      .should('contain', 'title can\'t be blank'); 

  });  
    
  it('should not allow to create a new article when description is blank ', () => {

    const {whatAbout, writeArticle, articleTitle, enterTag} = generateArticleData();

    cy.get('[placeholder="Article Title"]')  
      .type(articleTitle);      

    cy.get('[placeholder="What\'s this article about?"]')

    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(writeArticle);  

    cy.get('[placeholder="Enter tags"]')
      .type(enterTag);   
       
    cy.get('.btn') 
      .click(); 

    cy.get('[class="error-messages"]')
      .should('contain', 'description can\'t be blank'); 

  });  

  it('should not allow to create a new article when body is blank ', () => {

    const {whatAbout, writeArticle, articleTitle, enterTag} = generateArticleData();

    cy.get('[placeholder="Article Title"]')  
      .type(articleTitle);      

    cy.get('[placeholder="What\'s this article about?"]')
      .type(whatAbout);  

    cy.get('[placeholder="Write your article (in markdown)"]')

    cy.get('[placeholder="Enter tags"]')
      .type(enterTag);   
       
    cy.get('.btn') 
      .click(); 

    cy.get('[class="error-messages"]')
      .should('contain', 'body can\'t be blank'); 

  });  
});
