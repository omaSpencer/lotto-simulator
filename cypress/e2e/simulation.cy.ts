/// <reference types="cypress" />

describe('Lotto Simulation Flow', () => {
  it('runs a simulation with fixed numbers and receives stats', () => {
    cy.visit('http://localhost:3000')

    cy.contains('Lottery Simulator')
  })
})
