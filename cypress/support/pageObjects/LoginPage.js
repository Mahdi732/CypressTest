import { LOGIN_SELECTORS, TEST_CONFIG } from '../constants';

class LoginPage {

  visit() {
    cy.visit(TEST_CONFIG.baseUrl + TEST_CONFIG.loginUrl);
    this.verifyPageLoaded();
    return this;
  }


  verifyPageLoaded() {
    cy.get(LOGIN_SELECTORS.loginForm).should('be.visible');
    cy.get(LOGIN_SELECTORS.usernameInput).should('be.visible');
    cy.get(LOGIN_SELECTORS.passwordInput).should('be.visible');
    cy.get(LOGIN_SELECTORS.submitButton).should('be.visible');
    return this;
  }

  /**
   *  username 
   * @param {string} username
   */
  enterUsername(username) {
    cy.get(LOGIN_SELECTORS.usernameInput)
      .should('be.visible')
      .clear()
      .type(username);
    return this;
  }

  /**
   * password
   * @param {string} password
   */
  enterPassword(password) {
    cy.get(LOGIN_SELECTORS.passwordInput)
      .should('be.visible')
      .clear()
      .type(password, { log: false });
    return this;
  }

  clickSubmit() {
    cy.get(LOGIN_SELECTORS.submitButton)
      .should('be.visible')
      .click();
    return this;
  }

  /**
   * login credentials
   * @param {string} username
   * @param {string} password
   */
  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickSubmit();
    return this;
  }

  /**
   * expected error text
   * @param {string} expectedMessage 
   */
  verifyErrorMessage(expectedMessage) {
    cy.get(LOGIN_SELECTORS.errorMessage)
      .should('be.visible')
      .should('contain', expectedMessage);
    return this;
  }

  verifyNoErrorMessage() {
    cy.get(LOGIN_SELECTORS.errorMessage).should('not.exist');
    return this;
  }

  verifyLoadingState() {
    cy.get(LOGIN_SELECTORS.submitButton)
      .should('be.disabled')
      .find('.pi-spinner')
      .should('exist');
    return this;
  }

  verifyNotLoadingState() {
    cy.get(LOGIN_SELECTORS.submitButton)
      .should('not.be.disabled')
      .find('span')
      .should('be.visible');
    return this;
  }

  /**
   * expected URL after successful login
   * @param {string} expectedUrl 
   */
  verifyLoginSuccess(expectedUrl = '/modules') {
    cy.url({ timeout: 10000 }).should('include', expectedUrl);
    return this;
  }

  verifyLoginFailure() {
    cy.url().should('include', '/login');
    return this;
  }

  clearForm() {
    cy.get(LOGIN_SELECTORS.usernameInput).clear();
    cy.get(LOGIN_SELECTORS.passwordInput).clear();
    return this;
  }

  /**
   * Switch to a different language
   * @param {string} language 
   */
  switchLanguage(language) {
    if (language === 'fr') {
      cy.get(LOGIN_SELECTORS.languageSwitcher).contains('button', 'FR').click();
    } else {
      cy.get(LOGIN_SELECTORS.languageSwitcher).contains('button', 'EN').click();
    }
    return this;
  }

  toggleTheme() {
    cy.get(LOGIN_SELECTORS.themeToggle).click();
    return this;
  }

  verifyLanguageSwitcher() {
    cy.get(LOGIN_SELECTORS.languageSwitcher).within(() => {
      cy.get('button').should('have.length', 2);
    });
    return this;
  }

  verifyThemeToggle() {
    cy.get(LOGIN_SELECTORS.themeToggle).should('be.visible');
    return this;
  }

  verifyAllUIElements() {
    this.verifyPageLoaded();
    this.verifyLanguageSwitcher();
    this.verifyThemeToggle();
    cy.get('.form-brand img').should('be.visible');
    cy.get('.form-header h2').should('be.visible');
    return this;
  }
}

export default new LoginPage();
