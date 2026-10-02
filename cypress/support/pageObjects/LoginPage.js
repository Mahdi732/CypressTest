import {
  LOGIN_SELECTORS,
  TEST_CONFIG,
} from '../constant/constants';

class LoginPage {
  visit() {
    cy.visit(
      `${TEST_CONFIG.baseUrl}${TEST_CONFIG.loginUrl}`,
      {
        onBeforeLoad(win) {
          win.localStorage.clear();
          win.sessionStorage.clear();
        },
      }
    );

    this.verifyPageLoaded();

    return this;
  }

  verifyPageLoaded() {
    cy.get(LOGIN_SELECTORS.loginForm, {
      timeout: TEST_CONFIG.defaultTimeout,
    })
      .should('exist')
      .and('be.visible');

    cy.get(LOGIN_SELECTORS.usernameInput, {
      timeout: TEST_CONFIG.defaultTimeout,
    })
      .should('exist')
      .and('be.visible');

    cy.get(LOGIN_SELECTORS.passwordInput, {
      timeout: TEST_CONFIG.defaultTimeout,
    })
      .should('exist')
      .and('be.visible');

    cy.get(LOGIN_SELECTORS.submitButton, {
      timeout: TEST_CONFIG.defaultTimeout,
    })
      .should('exist')
      .and('be.visible');

    return this;
  }

  enterUsername(username) {
    cy.get(LOGIN_SELECTORS.usernameInput)
      .should('be.visible')
      .clear()
      .type(username);

    return this;
  }

  enterPassword(password) {
    cy.get(LOGIN_SELECTORS.passwordInput)
      .should('be.visible')
      .clear()
      .type(password, {
        log: false,
      });

    return this;
  }

  clickSubmit() {
    cy.get(LOGIN_SELECTORS.submitButton)
      .should('be.visible')
      .and('be.enabled')
      .click();

    return this;
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickSubmit();

    return this;
  }

  verifyErrorMessage(expectedMessage) {
    cy.get(LOGIN_SELECTORS.errorMessage)
      .should('exist')
      .and('be.visible');

    if (expectedMessage) {
      cy.get(LOGIN_SELECTORS.errorMessage)
        .should('contain.text', expectedMessage);
    }

    return this;
  }

  verifyNoErrorMessage() {
    cy.get(LOGIN_SELECTORS.errorMessage)
      .should('not.exist');

    return this;
  }

  verifyLoadingState() {
    cy.get(LOGIN_SELECTORS.submitButton)
      .should('be.disabled')
      .find(LOGIN_SELECTORS.loadingIcon)
      .should('exist');

    return this;
  }

  verifyNotLoadingState() {
    cy.get(LOGIN_SELECTORS.submitButton)
      .should('not.be.disabled');

    return this;
  }

  verifyLoginSuccess(expectedUrl = TEST_CONFIG.modulesUrl) {
    cy.url({
      timeout: 10000,
    }).should('include', expectedUrl);

    return this;
  }

  verifyLoginFailure() {
    cy.url().should('include', TEST_CONFIG.loginUrl);

    return this;
  }

  clearForm() {
    cy.get(LOGIN_SELECTORS.usernameInput).clear();
    cy.get(LOGIN_SELECTORS.passwordInput).clear();

    return this;
  }

  switchLanguage(language) {
    const languageButton = language.toUpperCase();

    cy.get(LOGIN_SELECTORS.languageSwitcher)
      .find('button')
      .contains(languageButton)
      .should('be.visible')
      .click();

    return this;
  }

  verifyActiveLanguage(language) {
    const languageButton = language.toUpperCase();

    cy.get(LOGIN_SELECTORS.languageSwitcher)
      .find('button')
      .contains(languageButton)
      .should('have.class', 'active');

    return this;
  }

  toggleTheme() {
    cy.get(LOGIN_SELECTORS.themeToggle)
      .should('be.visible')
      .click();

    return this;
  }

  verifyLanguageSwitcher() {
    cy.get(LOGIN_SELECTORS.languageSwitcher)
      .should('exist')
      .and('be.visible')
      .within(() => {
        cy.get('button')
          .should('have.length', 2)
          .each(($button) => {
            cy.wrap($button)
              .should('be.visible')
              .and('not.be.disabled');
          });
      });

    return this;
  }

  verifyThemeToggle() {
    cy.get(LOGIN_SELECTORS.themeToggle)
      .should('exist')
      .and('be.visible')
      .and('not.be.disabled');

    return this;
  }

  verifyAllUIElements() {
    this.verifyPageLoaded();
    this.verifyLanguageSwitcher();
    this.verifyThemeToggle();

    cy.get(LOGIN_SELECTORS.brandImage)
      .should('exist')
      .and('be.visible');

    cy.get(LOGIN_SELECTORS.formTitle)
      .should('exist')
      .and('be.visible');

    return this;
  }
}

export default new LoginPage();