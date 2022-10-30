describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Eduardo Almeida',
      username: 'taliesin',
      password: 'password',
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'taliesin', password: 'password' })
    })

    it('A blog can be created', function () {
      cy.request('GET', 'http://localhost:3003/api/blogs').then((response) => {
        expect(response.body).to.have.length(0)
      })

      cy.contains('New Blog').click()
      cy.get('#author').type('New Author')
      cy.get('#title').type('New Title')
      cy.get('#url').type('www.NewUrl.com')
      cy.contains('Save').click()

      cy.request('GET', 'http://localhost:3003/api/blogs').then((response) => {
        expect(response.body).to.have.length(1)
      })
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ author: 'new author', title: 'new title', url: 'new url' })
      })

      it('Users can Like an existing blog', function () {
        cy.contains('show').click()
        cy.get('#likeButton').click()
        cy.get('.likes').contains('1')
      })

      it('Users can delete their blogs', function () {
        cy.contains('show').click()
        cy.contains('Remove').click()
        cy.request('GET', 'http://localhost:3003/api/blogs').then((response) => {
          expect(response.body).to.have.length(0)
        })
      })
    })

    describe('and two or more blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ author: 'author 1', title: 'title 1', url: 'url 1' })
        cy.createBlog({ author: 'author 2', title: 'title 2', url: 'url 2' })
      })

      it('blogs are sorted by likes', function () {
        cy.contains('title 2').contains('show').click()
        cy.get('#likeButton').click()
        cy.get('#likeButton').click()
        cy.reload()
        cy.get('.blog').eq(0).should('contain', 'title 2')
      })
    })
  })

  describe('Login', function () {
    it('Succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('input:first').type('taliesin')
      cy.get('input:last').type('password')
      cy.get('#login-button').click()
      cy.contains('logout').click()
    })

    it('Fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('input:first').type('taliesin')
      cy.get('input:last').type('wrong_password')
      cy.get('#login-button').click()

      cy.contains('Wrong Credentials')
    })
  })
})
