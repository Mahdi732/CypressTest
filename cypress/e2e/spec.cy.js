import LoginPage from '../support/pageObjects/LoginPage';
import { TEST_USERS, LOGIN_SELECTORS, API_CONFIG } from '../support/constants';

describe('Login Page - Authentication', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  describe('Form Elements', () => {
    it('should display all required form elements', () => {
      cy.get(LOGIN_SELECTORS.loginForm).should('be.visible');
      cy.get(LOGIN_SELECTORS.usernameInput).should('be.visible');
      cy.get(LOGIN_SELECTORS.passwordInput).should('be.visible');
      cy.get(LOGIN_SELECTORS.submitButton).should('be.visible');
    });

    it('should have password input type set to password', () => {
      cy.get(LOGIN_SELECTORS.passwordInput).should('have.attr', 'type', 'password');
    });
  });

  describe('Form Interaction', () => {
    it('should allow typing in username field', () => {
      LoginPage.enterUsername('testuser');
      cy.get(LOGIN_SELECTORS.usernameInput).should('have.value', 'testuser');
    });

    it('should allow typing in password field', () => {
      LoginPage.enterPassword('password123');
      cy.get(LOGIN_SELECTORS.passwordInput).should('have.value', 'password123');
    });
  });

  describe('Valid Login', () => {
    it('should log in successfully with valid credentials', () => {
      cy.intercept('POST', API_CONFIG.loginEndpoint, {
        statusCode: 200,
        body: {
          user: { id: '123', username: TEST_USERS.validUser.username, function: 'admin' },
          token: 'token'
        }
      }).as('login');

      LoginPage.login(TEST_USERS.validUser.username, TEST_USERS.validUser.password);
      cy.wait('@login');
      cy.url().should('include', '/modules');
    });
  });

  describe('Invalid Credentials', () => {
    it('should show error on invalid credentials (401)', () => {
      cy.intercept('POST', API_CONFIG.loginEndpoint, {
        statusCode: 401,
        body: { message: 'Unauthorized' }
      }).as('invalid');

      LoginPage.login('wrong', 'wrong');
      cy.wait('@invalid');
      cy.url().should('include', '/login');
      cy.get(LOGIN_SELECTORS.errorMessage).should('be.visible');
    });
  });

  describe('Form Validation', () => {
    it('should not submit without username', () => {
      LoginPage.enterPassword('password123');
      LoginPage.clickSubmit();
      cy.url().should('include', '/login');
    });

    it('should not submit without password', () => {
      LoginPage.enterUsername('username');
      LoginPage.clickSubmit();
      cy.url().should('include', '/login');
    });
  });

  describe('Language Switching', () => {
    it('should switch to French', () => {
      LoginPage.switchLanguage('fr');
      cy.get('.language-switcher button').eq(1).should('have.class', 'active');
    });

    it('should switch to English', () => {
      LoginPage.switchLanguage('en');
      cy.get('.language-switcher button').eq(0).should('have.class', 'active');
    });
  });

  describe('Accessibility', () => {
    it('should have error type role alert', () => {
      cy.intercept('POST', '**/api/auth/login', { statusCode: 401 }).as('error');

      LoginPage.login('wrong', 'wrong');
      cy.wait('@error');
      cy.get(LOGIN_SELECTORS.errorMessage).should('have.attr', 'role', 'alert');
    });

    it('should have required fields marked', () => {
      cy.get(LOGIN_SELECTORS.usernameInput).should('have.attr', 'required');
      cy.get(LOGIN_SELECTORS.passwordInput).should('have.attr', 'required');
    });
  });
});
