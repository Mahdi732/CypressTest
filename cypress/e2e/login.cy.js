import LoginPage from '../support/pageObjects/LoginPage';
import {
  TEST_USERS,
  LOGIN_SELECTORS,
  API_CONFIG,
  TEST_CONFIG,
} from '../support/constant/constants';

describe('Login Page - Authentication', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  describe('Form Elements', () => {
    it('should display all required form elements', () => {
      LoginPage.verifyPageLoaded();
    });

    it('should have password input type set to password', () => {
      cy.get(LOGIN_SELECTORS.passwordInput)
        .should('have.attr', 'type', 'password');
    });

    it('should expose the language switcher and theme toggle', () => {
      LoginPage.verifyLanguageSwitcher();
      LoginPage.verifyThemeToggle();
    });
  });

  describe('Form Interaction', () => {
    it('should allow typing in username field', () => {
      LoginPage.enterUsername('testuser');

      cy.get(LOGIN_SELECTORS.usernameInput)
        .should('have.value', 'testuser');
    });

    it('should allow typing in password field', () => {
      LoginPage.enterPassword('password123');

      cy.get(LOGIN_SELECTORS.passwordInput)
        .should('have.value', 'password123');
    });

    it('should allow clearing previously entered credentials', () => {
      LoginPage.enterUsername('testuser');
      LoginPage.enterPassword('password123');
      LoginPage.clearForm();

      cy.get(LOGIN_SELECTORS.usernameInput)
        .should('have.value', '');

      cy.get(LOGIN_SELECTORS.passwordInput)
        .should('have.value', '');
    });
  });

  describe('Valid Login', () => {
    it('should authenticate successfully with valid credentials', () => {
      cy.intercept('POST', API_CONFIG.loginEndpoint).as('login');

      LoginPage.login(
        TEST_USERS.validUser.username,
        TEST_USERS.validUser.password
      );

      cy.wait('@login').then(({ request, response }) => {
        expect(request.method).to.equal('POST');
        expect(response.statusCode).to.equal(200);
      });

      LoginPage.verifyLoginSuccess();
    });
  });

  describe('Invalid Credentials', () => {
    it('should reject invalid credentials with 401', () => {
      cy.intercept('POST', API_CONFIG.loginEndpoint).as('login');

      LoginPage.login(
        TEST_USERS.invalidCredentials.username,
        TEST_USERS.invalidCredentials.password
      );

      cy.wait('@login').then(({ response }) => {
        expect(response.statusCode).to.equal(401);
      });

      LoginPage.verifyLoginFailure();
      LoginPage.verifyErrorMessage();
    });
  });

  describe('Form Validation', () => {
    it('should not submit when username is missing', () => {
      cy.intercept('POST', API_CONFIG.loginEndpoint).as('loginAttempt');

      LoginPage.enterPassword('password123');
      LoginPage.clickSubmit();

      cy.get(LOGIN_SELECTORS.usernameInput)
        .should('have.attr', 'required');

      cy.get(LOGIN_SELECTORS.loginForm).then(($form) => {
        expect($form[0].checkValidity()).to.equal(false);
      });

      cy.get('@loginAttempt.all').should('have.length', 0);

      LoginPage.verifyLoginFailure();
    });

    it('should not submit when password is missing', () => {
      cy.intercept('POST', API_CONFIG.loginEndpoint).as('loginAttempt');

      LoginPage.enterUsername('username');
      LoginPage.clickSubmit();

      cy.get(LOGIN_SELECTORS.passwordInput)
        .should('have.attr', 'required');

      cy.get(LOGIN_SELECTORS.loginForm).then(($form) => {
        expect($form[0].checkValidity()).to.equal(false);
      });

      cy.get('@loginAttempt.all').should('have.length', 0);

      LoginPage.verifyLoginFailure();
    });

    it('should mark username and password as required fields', () => {
      cy.get(LOGIN_SELECTORS.usernameInput)
        .should('have.attr', 'required');

      cy.get(LOGIN_SELECTORS.passwordInput)
        .should('have.attr', 'required');
    });
  });

  describe('Language Switching', () => {
    it('should switch to French', () => {
      LoginPage.switchLanguage('fr');
      LoginPage.verifyActiveLanguage('fr');
    });

    it('should switch to English', () => {
      LoginPage.switchLanguage('en');
      LoginPage.verifyActiveLanguage('en');
    });
  });

  describe('Accessibility', () => {
    it('should expose authentication errors as an alert', () => {
      cy.intercept('POST', API_CONFIG.loginEndpoint, {
        statusCode: 401,
      }).as('login');

      LoginPage.login('wrong', 'wrong');

      cy.wait('@login');

      cy.get(LOGIN_SELECTORS.errorMessage)
        .should('be.visible')
        .and('have.attr', 'role', 'alert');
    });

    it('should allow keyboard focus on the main controls', () => {
      cy.get(LOGIN_SELECTORS.usernameInput)
        .focus()
        .should('have.focus');

      cy.get(LOGIN_SELECTORS.passwordInput)
        .focus()
        .should('have.focus');

      cy.get(LOGIN_SELECTORS.submitButton)
        .focus()
        .should('have.focus');
    });
  });

  describe('UI Contract', () => {
    it('should render the complete login interface', () => {
      LoginPage.verifyAllUIElements();
    });
  });
});