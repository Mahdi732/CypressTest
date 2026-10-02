/**
 * Test configuration
 */
export const TEST_CONFIG = {
  baseUrl: 'http://localhost:4200',
  loginUrl: '/login',
  modulesUrl: '/modules',
  deepRegistryDashboardUrl: '/deep-registry/dashboard',
  defaultTimeout: 5000,
};

/**
 * Test users
 */
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

/**
 * Login page selectors
 */
export const LOGIN_SELECTORS = {
  loginForm: '.actual-form',
  usernameInput: '#username',
  passwordInput: '#password',
  submitButton: '.submit-btn',
  errorMessage: '.error-message',

  themeToggle: '.theme-toggle',
  languageSwitcher: '.language-switcher',

  brandImage: '.form-brand img',
  formTitle: '.form-header h2',

  loadingIcon: '.pi-spinner',
};

/**
 * API configuration
 */
export const API_CONFIG = {
  loginEndpoint: '**/api/auth/login',
};