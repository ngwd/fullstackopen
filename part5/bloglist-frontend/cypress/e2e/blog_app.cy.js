describe('blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')

    cy.contains('login to application')
    cy.contains('user name')
    cy.contains('password')

    cy.get('#username').type('ngwd') 
    cy.get('#password').type('fullstack') 
    cy.get('#login-button').click() 
    cy.contains('wuedak ng logged in')
  })
  it('new blog can be created', function() {
    cy.get('#show-new-blog-form-button').click()
    cy.get('#hide-new-blog-form-button').click()
    cy.get('#show-new-blog-form-button').click()
    cy.get('#title-input').type('Batanm\'s war')
    cy.get('#author-input').type('zojiritsu')
    cy.get('#url-input').type('http://localhost')
    cy.get('#new-button').click()
    cy.contains('Batanm\'s war by zojiritsu')
  })
})