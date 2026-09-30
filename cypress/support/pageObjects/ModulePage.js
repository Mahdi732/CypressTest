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
        cy.get()
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

}

export default new ModulePage();