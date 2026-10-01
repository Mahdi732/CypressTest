import { MODULE_SELECTOR } from "../ModuleConstants";
import { TEST_CONFIG } from "../constants";
import { seedBackOfficeSession } from '../backOfficeSession';
class ModulePage {
    
    visitWithSession() {
        return cy.env(["BACK_OFFICE_SESSION"]).then((env) => {
            const session = env.BACK_OFFICE_SESSION;

            if (!session?.token || !session?.user) {
                throw new Error('Missing BACK_OFFICE_SESSION. Create Tests/.cypress.env.json with token and user data.');
            }

            cy.visit(TEST_CONFIG.baseUrl + TEST_CONFIG.modulesUrl, {
                onBeforeLoad(win) {
                    seedBackOfficeSession(win, session);
                }
            });
        });
    }

    verifyLoaded() {
        cy.get(MODULE_SELECTOR.moduleContainer, { timeout : 5000}).should('be.visible');
        cy.get(MODULE_SELECTOR.moduleMain, { timeout : 5000}).should('be.visible');
        cy.get(MODULE_SELECTOR.modernCard, { timeout : 5000}).should('have.length', 5);
        cy.get(MODULE_SELECTOR.themeToggleButton, { timeout : 5000}).should('be.visible');
        cy.get(MODULE_SELECTOR.languageSwitcher, { timeout : 5000}).find(MODULE_SELECTOR.languageSwitcherButton).should('have.length', 2);
        cy.get(MODULE_SELECTOR.themeConfigButton, { timeout : 5000}).should('be.visible');
        cy.get(MODULE_SELECTOR.profileAvatar, { timeout : 5000}).should('be.visible');
        cy.get(MODULE_SELECTOR.notificationButton, { timeout : 5000}).should('be.visible');
        return this;
    }

    /**
     * @param {string} language
     */
    switchLanguage(language) {
        if (language === 'fr') {
            cy.get(MODULE_SELECTOR.languageSwitcher).contains('button', 'FR').click();
        } else {
            cy.get(MODULE_SELECTOR.languageSwitcher).contains('button', 'EN').click();
        }
        return this;
    }

    switchTheme() {
        cy.get(MODULE_SELECTOR.themeToggleButton).click();
        return this;
    }

    clickNotification() {
        cy.get(MODULE_SELECTOR.notificationButton).click();
        return this;
    }

    clickThemeConfiguration() {
        cy.get(MODULE_SELECTOR.themeConfigButton).click();
        return this;
    }

    openModuleByCode(code) {
        cy.contains(MODULE_SELECTOR.modernCard, code)
            .scrollIntoView()
            .should('be.visible')
            .click();
        return this;
    }

    switchThemeConfiguration() {
        cy.get(MODULE_SELECTOR.themePopover).should('be.visible');
        cy.get(MODULE_SELECTOR.themePopover).find('.color-presets button').should('have.length', 6);
        cy.get(MODULE_SELECTOR.themePopover).find('.color-presets button').each(($button) => {
            cy.wrap($button).click();
            this.clickThemeConfiguration();
        });
    }

    switchDesignSystem() {
        cy.get(MODULE_SELECTOR.themePopover).should('be.visible');
        cy.get(MODULE_SELECTOR.themePopover).find('.design-grid').should('be.visible');
        cy.get(MODULE_SELECTOR.themePopover).find('.design-grid button').should('have.length', 3);
        cy.get(MODULE_SELECTOR.themePopover).find('.design-grid button').each(($button) => {
            const label = $button.text().trim();
            cy.wrap($button).click();
            cy.contains('.design-grid .design-item', label).should('have.class', 'active');
            this.clickThemeConfiguration();
        });
    }

}

export default new ModulePage();