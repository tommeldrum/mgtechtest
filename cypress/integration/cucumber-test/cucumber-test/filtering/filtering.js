import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'


//SCENARIO: Filtering results by setting a maximum price
Given('the Dresses page is displayed', () => {
    cy.visit('/dresses')
})

When('the user sets the price range maximum to £19.99', () => {
    cy.get('[data-test=range-max-input]')
    .click()
    .clear()
    .type('19.99{enter}')

 Then('only dresses under £19.99 are displayed', () => {
    cy.wait(5000)
    cy.get('[data-test=price]')
    .each(($el) => {                    //Iterate through price of each item and check it's less than £20
        var el = $el[0].innerText
        var rep = el.replace('£', '')
        var numb = parseInt(rep)
        console.log(numb) 
        expect(numb).to.be.lessThan(20)
    })
})
 })

 