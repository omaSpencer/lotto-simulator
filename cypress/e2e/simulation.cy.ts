/// <reference types="cypress" />

describe('Lotto Simulation – Full E2E', () => {
  it('should run a full simulation with fixed numbers', () => {
    cy.visit('/ws?speed=80')

    cy.get('[data-cy="draw-panel-header"]').should('exist')

    //? Random checkbox not checked
    cy.get('[data-cy="draw-panel-checkbox-random-numbers"]').should(
      'have.attr',
      'aria-checked',
      'false',
    )

    //? Start
    cy.get('[data-cy="draw-panel-btn-start"]').click()

    //? Will not start because validation fails so showing alert
    cy.get('[data-cy="draw-panel-alert"]').should('exist')

    //? Checkbox set to true
    cy.get('[data-cy="draw-panel-checkbox-random-numbers"]').click()

    //? Start again
    cy.get('[data-cy="draw-panel-btn-start"]').click()

    //? Wait for the alert to disappear and the simulation to start
    cy.wait(10000) //? Wait 10 seconds for the simulation to run
    cy.get('[data-cy="draw-panel-alert"]').should('not.exist') //? Alert should not be visible
    cy.get('[data-cy="draw-panel-btn-stop"]').should('exist') //? Stop button should be visible
    cy.get('[data-cy="draw-panel-header-timer"]').should('exist') //? Timer should be visible

    //? Stop 1st simulation
    cy.get('[data-cy="draw-panel-btn-stop"]').click()

    //? Reset player numbers and check that they are all set to 0
    cy.get('[data-cy="reset-numbers-button"]').click()
    Array.from({ length: 5 }, (_, idx) => {
      cy.get(
        `[data-cy="draw-panel-player-number-select-trigger-${idx}"]`,
      ).should('have.text', '0')
    })

    //? Checkbox set to false
    cy.get('[data-cy="draw-panel-checkbox-random-numbers"]').click()

    //? Pick player numbers
    const numbers = [11, 22, 33, 44, 55]
    numbers.forEach((num, idx) => {
      cy.get(
        `[data-cy="draw-panel-player-number-select-trigger-${idx}"]`,
      ).click()
      cy.get(`[data-cy="draw-panel-player-number-select-item-${num}"]`).click()
    })

    //? Start again
    cy.get('[data-cy="draw-panel-btn-start"]').click()

    //? Wait 30 seconds for the simulation to run
    cy.wait(30000)

    //? Stop
    cy.get('[data-cy="draw-panel-btn-stop"]').click()

    //? Check results
    cy.get('[data-cy="simulation-stats-numOfTickets')
      .should('exist')
      .invoke('text')
      .then(Number)
      .should('be.gte', 100)
    cy.get('[data-cy="simulation-stats-yearsSpent"]')
      .should('exist')
      .invoke('text')
      .then(Number)
      .should('be.gte', 1)
    cy.get('[data-cy="simulation-stats-costOfTickets"]')
      .should('exist')
      .get('[data-cost]')
      .invoke('attr', 'data-cost')
      .then(Number)
      .should('be.gte', 40000)
  })
})
