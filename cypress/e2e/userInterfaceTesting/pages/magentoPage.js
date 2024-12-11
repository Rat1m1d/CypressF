class magentoPage {
    clickButtonByLocator(buttonElement) {
        cy.get(buttonElement).click()
    }
    clickButtonByText(buttonElement, buttonText) {
        cy.get(buttonElement).contains(buttonText).click()
    }
    sendText(locator, text) {
        cy.get(locator).type(text)
    }
}
module.exports = new magentoPage()