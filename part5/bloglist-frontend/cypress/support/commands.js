// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
let backendUrl = 'http://localhost:3003'
let frontendUrl = 'http://localhost:5173'
Cypress.Commands.add('login', ({ userName, password }) => {
  cy.request('POST', `${backendUrl}/api/login`, { userName, password })
    .then( res => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(res.body))
      cy.visit(`${frontendUrl}`)
    })
})
Cypress.Commands.add('createNewBlog', ({ title, author, url }) => {
  cy.request({
    url: `${backendUrl}/api/blogs`,
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `Bearer ${ JSON.parse(localStorage.getItem('loggedBlogAppUser')).token }`
    }
  })
  cy.visit(`${frontendUrl}`)
})