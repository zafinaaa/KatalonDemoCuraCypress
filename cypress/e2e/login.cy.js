import loginObjects from "../support/pageObjects/login"
const Messages = require ("../fixtures/katalonDemoCura/Messages.json")

describe('Verify login scenarios', () => {
    const LoginObjects = new loginObjects
    
    beforeEach(() =>{
        cy.visit('/')
        cy.accessLoginPage(LoginObjects.toggleMenuBtn)
        cy.accessLoginPage(LoginObjects.loginMenu)

    })
    it('TC1 user clicks login button with empty fields', () => {
        cy.url().should('include', '/profile.php#login')
        cy.get(LoginObjects.loginBtn).click()
        cy.get(LoginObjects.errorMsgLogin).should('be.visible')
        .should('contain', Messages.invalidLoginMsg)
    })
    
    it.only('TC2 Login with valid user login', () => {
        cy.fixture('katalonDemoCura/users.json').then((users) => {
        const datauser = users[0];
        cy.inputCredentialLogin(datauser.username, datauser.password)
        cy.get(LoginObjects.loginBtn).click()
        cy.url().should('include', '/#appointment')
      })
    })

    it('TC3 Login with invalid user login', () => {
        cy.fixture('katalonDemoCura/users.json').then((users) => {
        const datauser = users[1];
        cy.inputCredentialLogin(datauser.username, datauser.password)
        cy.get(LoginObjects.loginBtn).click()
        cy.get(LoginObjects.errorMsgLogin).should('be.visible')
        .should('contain', Messages.invalidLoginMsg)
      });
    });
})