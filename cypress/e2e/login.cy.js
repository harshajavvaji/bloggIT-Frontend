import userData from "../fixtures/users.json"

describe('Test login for BlogIt application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.location('pathname').should('eq', '/login')
    
    cy.clearLocalStorage()
  })

  
  it('Navigate and login using correct credentials', () => {
    cy.login(userData.validUser.email, userData.validUser.password)
    cy.location('pathname').should('not.eq', '/login')
  })

  it('Try to login with Invalid credentials', ()=> {
    cy.login(userData.invalidUser.email, userData.invalidUser.password)
    cy.contains('Enter valid password')
  })
})