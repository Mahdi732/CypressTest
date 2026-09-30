import { MODULE_SELECTOR } from '../support/ModuleConstants';
import { TEST_USERS, API_CONFIG } from '../support/constants';
import LoginPage from '../support/pageObjects/LoginPage';
import ModulePage from '../support/pageObjects/ModulePage';

describe('Module Page', () => {
    beforeEach(() => {
        LoginPage.visit()
        cy.intercept('POST', API_CONFIG.loginEndpoint, {
            statusCode: 200,
            body: {
                user: { id: '123', username: TEST_USERS.validUser.username, function: 'admin' },
                token: 'token'
            }
        }).as('login');
        LoginPage.login(TEST_USERS.validUser.username, TEST_USERS.validUser.password);
        cy.wait('@login');
        LoginPage.verifyLoginSuccess('/modules');
    });

    it('should load the modules page successfully', () => {
        ModulePage.verifyLoaded();
        cy.url().should('include', '/modules');
    });

    describe('language switching', () => {

        it('should switch languge to french', () => {
            ModulePage.switchLanguage('fr');
            cy.get(MODULE_SELECTOR.languageSwitcher)
                .find(MODULE_SELECTOR.languageSwitcherButton)
                .eq(1)
                .should('have.class', 'active');
        
            ModulePage.switchLanguage('en');
            cy.get(MODULE_SELECTOR.languageSwitcher)
                .find(MODULE_SELECTOR.languageSwitcherButton)
                .eq(0)
                .should('have.class', 'active')
        });
    });

    describe('theme switching', () => {

        it('should change theme', () => {
            ModulePage.switchTheme();
            cy.get('html').should('have.attr', 'data-theme', 'dark');
        })
    })
});