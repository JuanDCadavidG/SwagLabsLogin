import { loginSwagLabs }  from "../../support/pages/pom-swagLabs";

const baseUrl = Cypress.env('baseUrl')
const endpointInventory = Cypress.env('swagLabs').endpoint.endpointInventory
const endpointCart = Cypress.env('swagLabs').endpoint.endpointCart
const endpointStepOne = Cypress.env('swagLabs').endpoint.endpointStepOne
const endpointStepTwo = Cypress.env('swagLabs').endpoint.endpointStepTwo
const endpointComplete = Cypress.env('swagLabs').endpoint.endpointComplete
const inventoryErrorMessage = Cypress.env('swagLabs').login.errorMsg.inventoryErrorMessage
const cartErrorMessage = Cypress.env('swagLabs').login.errorMsg.cartErrorMessage
const checkoutOneErrorMessage = Cypress.env('swagLabs').login.errorMsg.checkoutOneErrorMessage
const checkoutTwoErrorMessage = Cypress.env('swagLabs').login.errorMsg.checkoutTwoErrorMessage
const checkoutAllErrorMessage = Cypress.env('swagLabs').login.errorMsg.checkoutAllErrorMessage
const lockedUserMessage = Cypress.env('swagLabs').login.errorMsg.lockedUserMessage
const passOrUserNotMatchMessage = Cypress.env('swagLabs').login.errorMsg.passOrUserNotMatchMessage
const userRequiredMessage = Cypress.env('swagLabs').login.errorMsg.userRequiredMessage
const passRequiredMessage = Cypress.env('swagLabs').login.errorMsg.passRequiredMessage
const standardUser = Cypress.env('swagLabs').login.users.standardUser
const lockedUser = Cypress.env('swagLabs').login.users.lockedUser
const problemUser = Cypress.env('swagLabs').login.users.problemUser
const performanceUser = Cypress.env('swagLabs').login.users.performanceUser
const password = Cypress.env('swagLabs').login.users.password

describe('SwagLabs | Account | Test Login and check access to Urls', function () {
    
    before(() => {
        cy.fixture('data/data-swagLabs').then(fxt => { this.fxt = fxt })
    })

    it('TC1: Validate login successfully', () => {
        //username Standard_user
        loginSwagLabs.typeLogin(standardUser, password)
        loginSwagLabs.element.cards().should('be.visible')
        cy.url().should('contain', endpointInventory)

        //username performance_glitch_user
        loginSwagLabs.typeLogin(performanceUser, password)
        loginSwagLabs.element.cards().should('be.visible')
        cy.url().should('contain', endpointInventory)
        
        //username problem_user
        loginSwagLabs.typeLogin(problemUser, password)
        loginSwagLabs.element.cards().should('be.visible')
        cy.url().should('contain', endpointInventory)
    })
    it('TC2: Validate try login with bloked account.', () => {
        //username locked_out_user
        loginSwagLabs.typeLogin(lockedUser, password)
        loginSwagLabs.element.errorMessages().should('contain', lockedUserMessage)
        cy.url().should('not.contain', endpointInventory)
    })
    it('TC3: Validate try login with incorrect or non existent account.', () => {
        const nonExistentUser = this.fxt.nonExistentUser
        const adminUser = this.fxt.adminUser
        const admin123User = this.fxt.admin123User
        const longUser = this.fxt.longUser
        const adminPassword = this.fxt.adminPassword

        //username new-user_*56--CH
        loginSwagLabs.typeLogin(nonExistentUser, password)
        loginSwagLabs.element.errorMessages().should('contain', passOrUserNotMatchMessage)
        cy.url().should('not.contain', endpointInventory)

        //username admin
        loginSwagLabs.typeLogin(adminUser, password)
        loginSwagLabs.element.errorMessages().should('contain', passOrUserNotMatchMessage)
        cy.url().should('not.contain', endpointInventory)

        //username admin123
        loginSwagLabs.typeLogin(admin123User, password)
        loginSwagLabs.element.errorMessages().should('contain', passOrUserNotMatchMessage)
        cy.url().should('not.contain', endpointInventory)

        //username admin password admin123
        loginSwagLabs.typeLogin(adminUser, adminPassword)
        loginSwagLabs.element.errorMessages().should('contain', passOrUserNotMatchMessage)
        cy.url().should('not.contain', endpointInventory)

        //username admin123 password admin123
        loginSwagLabs.typeLogin(admin123User, adminPassword)
        loginSwagLabs.element.errorMessages().should('contain', passOrUserNotMatchMessage)
        cy.url().should('not.contain', endpointInventory)

        //username fffffffffffffffffffffffffkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhaaaaaaaaaaaaaaaaaaaaaa111111
        loginSwagLabs.typeLogin(longUser, password)
        loginSwagLabs.element.errorMessages().should('contain', passOrUserNotMatchMessage)
        cy.url().should('not.contain', endpointInventory)
    })
    it('TC4: Validate try login with empty username field.', () => {
        loginSwagLabs.typeLogin('', password)
        loginSwagLabs.element.errorMessages().should('contain', userRequiredMessage)
        cy.url().should('not.contain', endpointInventory)
    })
    it('TC5: Validate try login with empty password field.', () => {
         const nonExistentUser = this.fxt.nonExistentUser

        //username standard_user
        loginSwagLabs.typeLogin(standardUser, '')
        loginSwagLabs.element.errorMessages().should('contain', passRequiredMessage)
        cy.url().should('not.contain', endpointInventory)

        //username performance_glitch_user
        loginSwagLabs.typeLogin(performanceUser, '')
        loginSwagLabs.element.errorMessages().should('contain', passRequiredMessage)
        cy.url().should('not.contain', endpointInventory)

        //username problem_user
        loginSwagLabs.typeLogin(problemUser, '')
        loginSwagLabs.element.errorMessages().should('contain', passRequiredMessage)
        cy.url().should('not.contain', endpointInventory)

        //username new-user_*56--CH
        loginSwagLabs.typeLogin(nonExistentUser, '')
        loginSwagLabs.element.errorMessages().should('contain', passRequiredMessage)
        cy.url().should('not.contain', endpointInventory)
    })
    it('TC6: Validate try login with empty both fields.', () => {
        loginSwagLabs.typeLogin('', '')
        loginSwagLabs.element.errorMessages().should('contain', userRequiredMessage)
        cy.url().should('not.contain', endpointInventory)
    })
    it('TC7: Validate try visit endpoint /inventory.html without login.', () => {
        loginSwagLabs.notAuthorizedEndpoint(endpointInventory)
        loginSwagLabs.element.errorMessages().should('contain', inventoryErrorMessage)
        cy.url().should('contain', baseUrl)
    })
    it('TC8: Validate try visit endpoint /cart.html without login.', () => {
        loginSwagLabs.notAuthorizedEndpoint(endpointCart)
        loginSwagLabs.element.errorMessages().should('contain', cartErrorMessage)
        cy.url().should('contain', baseUrl)
    })
    it('TC9: Validate try visit endpoint /checkout-step-one.html without login.', () => {
        loginSwagLabs.notAuthorizedEndpoint(endpointStepOne)
        loginSwagLabs.element.errorMessages().should('contain', checkoutOneErrorMessage)
        cy.url().should('contain', baseUrl)
    })
    it('TC10: Validate try visit endpoint /checkout-step-two.html without login.', () => {
        loginSwagLabs.notAuthorizedEndpoint(endpointStepTwo)
        loginSwagLabs.element.errorMessages().should('contain', checkoutTwoErrorMessage)
        cy.url().should('contain', baseUrl)
    })
    it('TC11: Validate try visit endpoint /checkout-complete.html without login.', () => {
        loginSwagLabs.notAuthorizedEndpoint(endpointComplete)
        loginSwagLabs.element.errorMessages().should('contain', checkoutAllErrorMessage)
        cy.url().should('contain', baseUrl)
    })
})