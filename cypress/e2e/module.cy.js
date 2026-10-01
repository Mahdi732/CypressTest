import { MODULE_SELECTOR, MODULE_NAVIGATION_CASES } from '../support/ModuleConstants';
import ModulePage from '../support/pageObjects/ModulePage';





describe('Module Page', () => {
    beforeEach(() => {
        ModulePage.visitWithSession();
        cy.location('pathname', { timeout: 10000 }).should('eq', '/modules');
        ModulePage.verifyLoaded();
    });

    it('should load the modules page successfully', () => {
        ModulePage.verifyLoaded();
        cy.url().should('include', '/modules');
    });

    describe('module navigation', () => {
        MODULE_NAVIGATION_CASES.forEach(({ name, code, expectedPath }) => {
            it(`should navigate to ${name} when its card is clicked`, () => {
                ModulePage.openModuleByCode(code);
                cy.location('pathname', { timeout: 10000 }).should('eq', expectedPath);
            });
        });
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
            cy.get(MODULE_SELECTOR.notificationPopover).should('be.visible');
        });
    })

    describe('theme configiration', () => {
        it('should change the theme color', () => {
            ModulePage.clickThemeConfiguration();
            cy.get(MODULE_SELECTOR.themePopover).should('be.visible');
            ModulePage.switchThemeConfiguration();
        });

        it('should change design system', () => {
            ModulePage.clickThemeConfiguration();
            cy.get(MODULE_SELECTOR.themePopover).should('be.visible');
            ModulePage.switchDesignSystem();
        })

    })
});