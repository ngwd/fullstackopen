describe('blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')

  })
  it('login form shown', function() {
    cy.contains('login to application')
    cy.contains('user name')
    cy.contains('password')
    cy.contains('login')
  }) 
  describe('Login', function() {
    it('succeed in login', function() {
      cy.get('#username').type('ngwd') 
      cy.get('#password').type('fullstack') 
      cy.get('#login-button').click() 
      cy.contains('wuedak ng logged in')
    })
    it('failure in login', function() {
      cy.get('#username').type('ngwd') 
      cy.get('#password').type('fulslstack') 
      cy.get('#login-button').click() 
      cy.contains('invalid password or user name')
      cy.get('#notification-label').should('exist')
      cy.get('#notification-label')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.wait(4000)
      cy.get('#notification-label').should('not.exist')
    })
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