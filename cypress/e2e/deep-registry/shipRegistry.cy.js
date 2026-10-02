describe('Ship Registry Navigation and Data Load Test', () => {
    beforeEach(() => {
        beforeEach(() => {
            DeepRegistryShipPage.visitWithSession();
            DeepRegistryShipPage.verifyPageLoaded();
          });
    });


  it('navigates to Ship Registry and verifies data is loaded', () => {
    // 1. Visit the application
    cy.visit('/deep-registry/vessels');

    // 2. Click on "Ship Registry" in the sidebar
    // Replace '.sidebar-ship-registry-btn' with your actual class/selector
    cy.get('.sidebar-ship-registry-btn')
      .should('be.visible')
      .click();

    // 3. Verify that the table or data container is visible
    // Replace '.vessels-table' with your main table/grid container class
    cy.get('.vessels-table').should('be.visible');

    // 4. Assert that table rows/data items exist inside the loaded page
    // Replace '.table-row' with your row item class
    cy.get('.table-row')
      .should('have.length.greaterThan', 0);

    // Optional: Check specific text content to confirm real data is rendered
    cy.get('.vessels-table').should('contain', 'MV Libreville Star');
  });
});