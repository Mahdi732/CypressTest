/**
 * Test Constants and Test Data
 * Centralized location for test data to avoid hard-coding values
 */

export const TEST_CONFIG = {
  baseUrl: 'http://localhost:4200',
  loginUrl: '/login',
  modulesUrl: '/modules',
  defaultTimeout: 5000,
};

export const TEST_USERS = {
  validUser: {
    username: 'yassine',
    password: 'yassine1',
  },
  invalidCredentials: {
    username: 'yassine',
    password: 'wrongpassword',
  },
  invalidUser: {
    username: 'nonexistent',
    password: 'password123',
  },
};

export const LOGIN_SELECTORS = {
  usernameInput: '#username',
  passwordInput: '#password',
  submitButton: '.submit-btn',
  errorMessage: '.error-message',
  loginForm: '.actual-form',
  themeToggle: '.theme-toggle',
  languageSwitcher: '.lang-pill'
};

/**
 * API and Route configurations
 */
export const API_CONFIG = {
  loginEndpoint: '**/api/auth/login',
};

