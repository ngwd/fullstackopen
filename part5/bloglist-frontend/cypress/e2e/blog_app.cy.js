import blogs from "../../src/services/blogs"

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
      cy.get('#login-button').click() 
      cy.get('#username').type('ngwd') 
      cy.get('#password').type('fulslstack') 
      cy.get('#login-button').click() 

      cy.contains('invalid password or user name')
      cy.get('.error')
        .should('contain', 'invalid password or user name')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.wait(4000)
      cy.get('.error').should('not.exist')
    })
  })

  describe('When login', function() {
    beforeEach(function() {
      // cy.login({userName:'ngwd', password:'fullstack'})
      cy.get('#username').type('ngwd') 
      cy.get('#password').type('fullstack') 
      cy.get('#login-button').click() 
    })
    it('new blog can be created and deleted, operated on webpage', function() {
      cy.get('#show-new-blog-form-button').click()
      cy.get('#hide-new-blog-form-button').click()
      cy.get('#show-new-blog-form-button').click()
      cy.get('#title-input').type('Batanm\'s war')
      cy.get('#author-input').type('zojiritsu')
      cy.get('#url-input').type('http://localhost')
      cy.get('#new-button').click()
      cy.contains('Batanm\'s war by zojiritsu').find('button').contains('view').click()
      cy.contains('Batanm\'s war by zojiritsu').parent()
      cy.contains('remove').click()
      cy.contains('Batanm\'s war by zojiritsu').should('not.exist')
    })
  })
  describe('Test the like', function() {
    beforeEach(function() {
      cy.login({userName:'ngwd', password:'fullstack'})
    })
    it('create new blog and like it', function() {
      cy.createNewBlog({title:'Batanm\'s war', author:'zojiritsu', url:'http://localhost'})
      cy.contains('Batanm\'s war by zojiritsu').as( 'blog')
      cy.get('@blog').find('button').contains('view').click()
      cy.get('@blog').parent().as('parent')
      cy.get('@parent').contains('like 0')
      cy.get('@parent').find('button').contains('like').click()
      cy.get('@parent').contains('like 1')
    })
  })
  describe('Test delete button coexist with the login user', function() {
    beforeEach(function() {
      cy.login({userName:'ngwd', password:'fullstack'})
    })
    it('create new blog and see the button of remove and user name', function() {
      cy.get('div.blog').each(($blog) => {
        cy.wrap($blog).should($unExpandedBlog => {
          expect($unExpandedBlog.find('button')).to.have.length.lessThan(2)
        })

        cy.wrap($blog).find('button').contains('view').click()

        cy.wrap($blog).should($expandedBlog => {
          expect($expandedBlog.find('button')).to.have.length.greaterThan(2)
          let $removeButton = $expandedBlog.find('button:contains("remove")')
          let removeButtonInvisible = $removeButton.css('display') === 'none'

          let $ps = $expandedBlog.find('p')
          let hasSpecificName = $ps.toArray().some(p => p.innerText.trim() === 'wuedak ng') 

          console.log(removeButtonInvisible, hasSpecificName)
          expect(removeButtonInvisible).not.equal(hasSpecificName) 
        })
        cy.wrap($blog).find('button').contains('hide').click()
      })
    })
  })
  describe('test the sorting ', function() {
    beforeEach(function() {
      cy.login({userName:'ngwd', password:'fullstack'})
    })
    it('sorting are descending', function() {
      let previousLike = Number.MAX_SAFE_INTEGER 
      cy.get('div.blog').each($blog => {
        cy.wrap($blog).find('button').contains('view').click()

        cy.wrap($blog).should($expandedBlog => {
          const ar = $expandedBlog.find('p').toArray().map($s => $s.innerText.trim())
          const likeText = ar.filter(p => p.includes('like'))

          const match = likeText[0].match(/\d+/)
          let currentLike = parseInt(match[0], 10)
          // expect(currentLike).to.be.at.most(previousLike)
          console.log(previousLike, currentLike)
          expect(currentLike <= previousLike).to.be.true
          previousLike = currentLike
        })
        cy.wrap($blog).find('button').contains('hide').click() // click the 'hide'
      })
    })
  })
})