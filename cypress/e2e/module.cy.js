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
                accessToken: 'token'
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
                .contains('FR')
                .should('have.class', 'active');
        
            ModulePage.switchLanguage('en');
            cy.get(MODULE_SELECTOR.languageSwitcher)
                .find(MODULE_SELECTOR.languageSwitcherButton)
                .contains('EN')
                .should('have.class', 'active')
        });
    });

    describe('theme switching', () => {

        it('should change theme', () => {
            ModulePage.switchTheme();
            cy.get('html').should('have.attr', 'data-theme', 'dark');
        })
    })

    describe('notification', () => {
        it('should show notification popup', () => {
            ModulePage.clickNotification();
            cy.get('.p-popover-content').should('be.visible');
        });
    })

    describe('theme configiration', () => {
        it('should change the theme color', () => {
            ModulePage.clickThemeConfiguration();
            cy.get('.p-popover-content').should('be.visible');
            ModulePage.switchThemeConfiguration();
        });

        it('should change design system', () => {
            ModulePage.clickThemeConfiguration();
            cy.get('.p-popover-content').should('be.visible');
            ModulePage.switchDesignSystem()
        })

    })
});