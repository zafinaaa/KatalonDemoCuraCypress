import loginObjects from "../support/pageObjects/login"
import makeAppointmentObjects from "../support/pageObjects/makeAppointment"

describe('Verify make appointment scenarios', () => {
    const LoginObjects = new loginObjects
    const MakeAppointmentObjects = new makeAppointmentObjects
    beforeEach(() =>{
        cy.visit('/')
    })
    it('TC1 Make appointment before login without Apply for hospital readmission', () => {
        cy.get(MakeAppointmentObjects.makeAppointmentBtn).should('be.visible').click()
        cy.url().should('include', '/profile.php#login') //navigate to login page
        cy.fixture('katalonDemoCura/users.json').then((users) => {
        const datauser = users[0];
        cy.inputCredentialLogin(datauser.username, datauser.password)
        cy.get(LoginObjects.loginBtn).click()
        cy.url().should('include', '/#appointment')

        cy.get('select').select('Hongkong CURA Healthcare Center').should('have.value', 'Hongkong CURA Healthcare Center')
        cy.get(MakeAppointmentObjects.radioProgramMedicaid).click()
        cy.get(MakeAppointmentObjects.visitDateField).click()
        cy.contains('28').click();
        cy.get(MakeAppointmentObjects.commentField).type('this is a comment')
        cy.get(MakeAppointmentObjects.bookAppointmentBtn).click()

        cy.url().should('include', 'appointment.php#summary')
        cy.get('#facility').should('have.text', 'Hongkong CURA Healthcare Center')
        cy.get('#hospital_readmission').should('have.text', 'No')
        cy.get('#program').should('have.text', 'Medicaid')
        })
    })
    it('TC2 Make appointment after login with Apply for hospital readmission', () => {
        cy.accessLoginPage(LoginObjects.toggleMenuBtn)
        cy.accessLoginPage(LoginObjects.loginMenu)
        cy.url().should('include', '/profile.php#login') //navigate to login page
        cy.fixture('katalonDemoCura/users.json').then((users) => {
        const datauser = users[0];
        cy.inputCredentialLogin(datauser.username, datauser.password)
        cy.get(LoginObjects.loginBtn).click()
        cy.url().should('include', '/#appointment')

        cy.get('select').select('Hongkong CURA Healthcare Center').should('have.value', 'Hongkong CURA Healthcare Center')
        cy.get(MakeAppointmentObjects.hospitalReadmissionChk).click()
        cy.get(MakeAppointmentObjects.radioProgramMedicare).click()
        cy.get(MakeAppointmentObjects.visitDateField).click()
        cy.contains('28').click();
        cy.get(MakeAppointmentObjects.commentField).type('this is a comment')
        cy.get(MakeAppointmentObjects.bookAppointmentBtn).click()

        cy.url().should('include', 'appointment.php#summary')
        cy.get(MakeAppointmentObjects.facilityField).should('have.text', 'Hongkong CURA Healthcare Center')
        cy.get(MakeAppointmentObjects.hospitalReadmissionField).should('have.text', 'Yes')
        cy.get(MakeAppointmentObjects.programField).should('have.text', 'Medicare')
        })
    })
})