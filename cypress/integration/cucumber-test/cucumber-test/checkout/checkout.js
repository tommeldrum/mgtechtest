import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

//SCENARIO: Accessing the Dresses page
Given('the homepage is displayed', () => {
    cy.visit('/')
})

When('the user selects the Dresses category', () => {
    cy.get('[data-id="category-1"] > a > h5').click()
    cy.wait(10000) //to complete Captcha
})

Then('the Dresses PLP is displayed', () => {
    cy.url().should('include', '/dresses')
    cy.get('h1').should('contain', 'Dresses')
})

//SCENARIO: Clicking on an item to access its PDP
Given('the Dresses page is displayed with a maximum price filter', () => {
    cy.visit('/dresses?p_high=200&p_low=2&price_gbp=2%3C19') 
})

When('the user selects an item', () => {
    cy.get('[data-test="product-grid"] > div:first-child > a').then(($firstItem) => { //Goes to the PDP of first result 
        const firstItem = $firstItem[0].attributes[2].textContent                     //Saves title name to Cypress Env to be asserted against below
        Cypress.env('firstItem', firstItem)
    })
    .click()  
    
    cy.wait(10000) //to complete Captcha
})

Then('the PDP of the selected item is displayed', () => {
    cy.get('[data-test=prodInfo-add-to-bag-button]').should('be.visible') //Checks for Add to Bag button 
    cy.get('[data-test=prodInfo-title]').should('have.text', Cypress.env('firstItem')) //Asserts that product title matches title of product selected
})

//SCENARIO Adding an item to the bag
Given('a PDP is displayed', () => {
    cy.visit('/khaki-v-neck-cami-strap-slip-dress-10236143')
})

When('the user selects add to bag', () => {
    cy.get('[data-test=prodInfo-size-2]').scrollIntoView()
    cy.intercept('POST', '/ajax/cart/add/', {                  //Intercepting call that returns 403 during automation and stubbing with valid response
        fixture: 'Addresponse.html'                            //Before adding to basket
    })
    .then((req) => {
        cy.get('[data-test=prodInfo-add-to-bag-button]').click()
    })
})

Then('the item is added to the bag', () => {
    cy.get('.exiGc2F1A6ThgurZflCR7').find('span').should('eq', '1')
})


 //SCENARIO Checking out an item in the bag
Given('there is an item in the basket', () => {
    cy.visit('/khaki-v-neck-cami-strap-slip-dress-10236143')
    cy.intercept('POST', '/ajax/cart/add/', {
        fixture: 'Addresponse.html'
    })
    .then((req) => {
        cy.get('[data-test=prodInfo-add-to-bag-button]').click()
    })
})

When('the user clicks on the bag', () => {
    cy.get('.exiGc2F1A6ThgurZflCR7').click()
    cy.get('h2 > a').should('have.text', Cypress.env('firstItem')) 
})

And('the user enters in delivery information and payment details', () => {
    cy.get('#lookup-email').type('email@email.com')
    cy.get('#shipping:firstname').type('firstname')
    cy.get('#shipping:lastname').type('lastname')
    cy.get('#shipping:telephone').type('07941424701')
    cy.get('#shipping-age-confirmation-checkbox').click()
    cy.get('#shipping:capture-plus').type('M20 4YA')
    cy.get('#co-shipping-method-form > ul > li:nth-child(1) > label').click()
    cy.get('[class="payment-button-label form-field__control form-field__control--radio selected "]').click()
    cy.get('[data-elements-stable-field-name="cardNumber"]').type('21234124241234')
    cy.get('[data-elements-stable-field-name="cardExpiry"]').type('04/07')
    cy.get('[data-elements-stable-field-name="cardCvc"]').type('234')
})

Then('the user can finish checking out', () => {
    cy.get('#paypal-save-button').should('not.be.disabled')
})

