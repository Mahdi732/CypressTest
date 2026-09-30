import { MODULE_SELECTOR } from "../ModuleConstants";
class ModulePage {
    visit() {
        cy.visit('http://localhost:4200/modules');
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
            cy.get(MODULE_SELECTOR.languageSwitcher).find('button').eq(1).click()
        }else {
            cy.get(MODULE_SELECTOR.languageSwitcher).find('button').eq(0).click();
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
        for (let i = 0; i < 6; i++) {
            cy.get('.color-presets').find('button').eq(i).click();
            this.clickThemeConfiguration();
        }
    }

    switchDesignSystem() {
        cy.get('.design-grid').should('be.visible');
        cy.get('.design-grid').find('button').should('have.length', 3);
        for (let i = 0; i < 3; i++) {
            cy.get('.design-grid').find('button').eq(i).click();
            cy.get('.design-grid').find('button').eq(i).should('have.class', 'active');
            this.clickThemeConfiguration();
        }
    }

}

export default new ModulePage();