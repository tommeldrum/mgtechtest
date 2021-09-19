Feature: Filtering search results
As a user, I want to be able to filter my search results

    Scenario: Filtering results by setting a maximum price
        Given the Dresses page is displayed
        When the user sets the price range maximum to £19.99
        Then only dresses under £19.99 are displayed
    