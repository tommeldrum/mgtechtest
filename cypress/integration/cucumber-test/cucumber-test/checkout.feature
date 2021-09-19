Feature: Checking out
As a guest user, I want to be able to add items to the bag and checkout

    Scenario: Accessing the Dresses page
        Given the homepage is displayed
        When the user selects the Dresses category
        Then the Dresses PLP is displayed

    Scenario: Clicking on an item to access its PDP
        Given the Dresses page is displayed with a maximum price filter
        When the user selects an item 
        Then the PDP of the selected item is displayed

    Scenario: Adding an item to the bag
        Given a PDP is displayed 
        When the user selects add to bag
        Then the item is added to the bag

    Scenario: Checking out an item in the bag
        Given there is an item in the basket
        When the user clicks on the bag
        And the user enters in delivery information and payment details
        Then the user can finish checking out

