import { MODULE_SELECTOR } from "../ModuleConstants";
import { TEST_CONFIG } from "../constants";
class ModulePage {
    visit() {
        cy.visit(TEST_CONFIG.baseUrl + TEST_CONFIG.modulesUrl);
        return this;
    }

    verifyLoaded() {
        cy.get(MODULE_SELECTOR.moduleContainer).should('be.visible');
        cy.get(MODULE_SELECTOR.moduleMain).should('be.visible');
        cy.get(MODULE_SELECTOR.modernCard).should('have.length', 5);
        cy.get(MODULE_SELECTOR.themeToggleButton).should('be.visible');
        cy.get(MODULE_SELECTOR.languageSwitcher).find('button').should('have.length', 2);
        cy.get(MODULE_SELECTOR.themeConfigButton).should('be.visible');
        cy.get(MODULE_SELECTOR.profileAvatar).should('be.visible');
        cy.get(MODULE_SELECTOR.notifiactionButton).should('be.visible');
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
        cy.get(MODULE_SELECTOR.notifiactionButton).click();
        return this;
    }

    clickThemeConfiguration() {
        cy.get(MODULE_SELECTOR.themeConfigButton).click();
        return this;
    }

    switchThemeConfiguration() {
        cy.get('.color-presets').should('be.visible');
        cy.get('.color-presets').find('button').should('have.length', 6)
        cy.get('.color-presets').find('button').each(($button) => {
            cy.wrap($button).click();
            this.clickThemeConfiguration();
        });
    }

    switchDesignSystem() {
        cy.get('.design-grid').should('be.visible');
        cy.get('.design-grid').find('button').should('have.length', 3);
        cy.get('.design-grid').find('button').each(($button) => {
            const label = $button.text().trim();
            cy.wrap($button).click();
            cy.contains('.design-grid .design-item', label).should('have.class', 'active');
            this.clickThemeConfiguration();
        });
    }

}

export default new ModulePage();