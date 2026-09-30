import LoginPage from '../support/pageObjects/LoginPage';
import ModulePage from '../support/pageObjects/ModulePage';

describe('Module Page', () => {
  beforeEach(() => {
    LoginPage.visit()
    LoginPage.login('yassine', 'yassine1');
    ModulePage.visit();
  });

  it('should load the modules page successfully', () => {
    ModulePage.verifyLoaded();
    cy.url().should('include', '/modules');
  });

  describe('language switching', () => {

    it('should switch languge', () => {
        ModulePage.switchLanguage('fr')
    });
  })
});