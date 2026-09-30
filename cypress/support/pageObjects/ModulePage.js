import { MODULE_SELECTOR } from "../ModuleConstants";
class ModulePage {
    visit() {
        cy.visit('http://localhost:4200/modules');
        return this;
    }

    verifyLoaded() {
        cy.get(MODULE_SELECTOR.moduleContainer).should('be.visible');
        cy.get(MODULE_SELECTOR.moduleMain).should('be.visible');
        cy.get(MODULE_SELECTOR.modernCard).should('be.visible');
        cy.get(MODULE_SELECTOR.themeToggleButton).should('be.visible');
        cy.get(MODULE_SELECTOR.languageSwitcher).should('have.length', 3)
        return this;
    }

    /**
     * @param {string} language
     */
    switchLanguage(language) {
        if (language == 'fr') {
            cy.get(MODULE_SELECTOR.languageSwitcher + ' button').eq(1).click()
        }else {
            cy.get(MODULE_SELECTOR.languageSwitcher + 'button').eq(0).click();
        }
        return this;
    }

    switchTheme() {
        cy.get(MODULE_SELECTOR.themeToggleButton).click();
        return this;
    }

}

export default new ModulePage();