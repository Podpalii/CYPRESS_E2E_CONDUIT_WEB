/// <reference types="cypress" />

const { generateCommentData } = require("../support/generateCommentData");

describe('Main page (positive)', () => {

  beforeEach(() => {

    cy.loginUser();
    cy.visit('/');

  });  

  it('should allow to Global Feed screen', () => {

    cy.wait(2000);

    cy.get('.feed-toggle > .nav > :nth-child(2) > .nav-link')
      .click();

  });    

  it('should allow to Popular tag implementations', () => {

    cy.wait(2000);

    cy.get('.sidebar')
      .click(60, 45, {multiple: true});

    cy.get('[class="nav-link active"]')
      .should('have.text', ' implementations')
    
  });   

  it('should allow access to other author profiles', () => {

    cy.wait(2000);

    cy.get('.sidebar')
      .click(60, 45, {multiple: true});

    cy.get(':nth-child(1) > .article-meta > .info > .author')
      .click()  

    cy.get('.user-img')
      .should('be.visible');  
    
  }); 

  it('should allow to follow the user', () => {

    cy.unfollowedToUserProfile();

    cy.get('[class="btn btn-sm action-btn btn-outline-secondary"]')
      .click();

    cy.get('[class="btn btn-sm action-btn btn-secondary"]') 
      .should('contain', 'Unfollow') 

  }); 

  it('should allow to unfollow the user', () => {

    cy.followedToUserProfile();

    cy.get('[class="btn btn-sm action-btn btn-secondary"]') 
      .click();

    cy.get('[class="btn btn-sm action-btn btn-outline-secondary"]')  
      .should('contain', 'Follow')

  }); 
  
  
  it('should allow to like articles of other users', () => {

    cy.unlikedAuthorArticle();
    
    cy.wait(4000);

    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn')
      .click(); 
      
    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn') 
      .should('have.focus')   

      
  });  

  it('should allow to unlike other user articles', () => {

    cy.likedAuthorArticle();

    cy.wait(4000);  

    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn')
      .click()  

    cy.get('body')
      .click('right');  
      
    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn') 
      .should('not.have.focus') 

  });  

  it('should allow to read articles of other users', () => {

    cy.wait(2000);

    cy.get('.sidebar')
      .click(60, 45, {multiple: true});

    cy.wait(2000);  

    cy.get(':nth-child(1) > .article-meta > .pull-xs-right > .btn')
      .click() 

    cy.get('[href="#article/Create-a-new-implementation-1"]') 
      .click();

    cy.url().should('include', '#/article');   
      
  });  

  it('should allow to post comment for other user articles', () => {

    const {comment} = generateCommentData();

    cy.redirectedToUserArticle();

    cy.get('[placeholder="Write a comment..."]')
      .type(comment)

    cy.get('[class="btn btn-sm btn-primary"]') 
      .click();
      
    cy.get(':nth-child(1) > .card-block > .card-text') 
      .should('have.text', comment)
    
  });  

  it('should allow to delete the posted comment for other user article', () => {

    const {comment} = generateCommentData();

    cy.redirectedToUserArticle();

    cy.get('[placeholder="Write a comment..."]')
      .type(comment)

    cy.get('[class="btn btn-sm btn-primary"]') 
      .click();  

    cy.get(':nth-child(1) > .card-footer > .mod-options > .ion-trash-a')
      .click(); 
    
    cy.get(':nth-child(1) > .card-block > .card-text')
      .should("not.have.text", comment);  

  });  
});  