import {
  MODULE_SELECTOR,
} from '../constant/ModuleConstants';

import {
  TEST_CONFIG,
} from '../constant/constants';

import {
  seedBackOfficeSession,
} from '../backOfficeSession';

class ModulePage {
  visitWithSession() {
    return cy.env(['BACK_OFFICE_SESSION']).then((env) => {
      const session = env.BACK_OFFICE_SESSION;

      if (!session || !session.token || !session.user) {
        throw new Error(
          'Missing BACK_OFFICE_SESSION. ' +
          'Create Tests/.cypress.env.json with valid token and user data.'
        );
      }

      cy.visit(
        `${TEST_CONFIG.baseUrl}${TEST_CONFIG.modulesUrl}`,
        {
          onBeforeLoad(win) {
            seedBackOfficeSession(win, session);
          },
        }
      );
    });
  }

  verifyLoaded() {
    const timeout = TEST_CONFIG.defaultTimeout;

    cy.get(MODULE_SELECTOR.moduleContainer, { timeout })
      .should('exist')
      .and('be.visible');

    cy.get(MODULE_SELECTOR.moduleMain, { timeout })
      .should('exist')
      .and('be.visible');

    cy.get(MODULE_SELECTOR.modernCard, { timeout })
      .should('have.length', 5);

    cy.get(MODULE_SELECTOR.themeToggleButton, { timeout })
      .should('exist')
      .and('be.visible')
      .and('not.be.disabled');

    cy.get(MODULE_SELECTOR.languageSwitcher, { timeout })
      .should('exist')
      .and('be.visible')
      .within(() => {
        cy.get(MODULE_SELECTOR.languageSwitcherButton)
          .should('have.length', 2);
      });

    cy.get(MODULE_SELECTOR.themeConfigButton, { timeout })
      .should('exist')
      .and('be.visible')
      .and('not.be.disabled');

    cy.get(MODULE_SELECTOR.profileAvatar, { timeout })
      .should('exist')
      .and('be.visible');

    cy.get(MODULE_SELECTOR.notificationButton, { timeout })
      .should('exist')
      .and('be.visible')
      .and('not.be.disabled');

    return this;
  }

  switchLanguage(language) {
    const languages = {
      fr: 'FR',
      en: 'EN',
    };

    if (!languages[language]) {
      throw new Error(
        `Unsupported language "${language}". Expected "en" or "fr".`
      );
    }

    cy.get(MODULE_SELECTOR.languageSwitcher)
      .find(MODULE_SELECTOR.languageSwitcherButton)
      .contains(languages[language])
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    return this;
  }

  verifyActiveLanguage(language) {
    const languages = {
      fr: 'FR',
      en: 'EN',
    };

    if (!languages[language]) {
      throw new Error(
        `Unsupported language "${language}". Expected "en" or "fr".`
      );
    }

    cy.get(MODULE_SELECTOR.languageSwitcher)
      .find(MODULE_SELECTOR.languageSwitcherButton)
      .contains(languages[language])
      .should('have.class', 'active');

    return this;
  }

  switchTheme() {
    cy.get(MODULE_SELECTOR.themeToggleButton)
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    return this;
  }

  verifyTheme(expectedTheme) {
    cy.get('html')
      .should('have.attr', 'data-theme', expectedTheme);

    return this;
  }

  openNotificationPanel() {
    cy.get(MODULE_SELECTOR.notificationButton)
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    return this;
  }

  openThemeConfiguration() {
    cy.get(MODULE_SELECTOR.themeConfigButton)
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    return this;
  }

  verifyThemePanel() {
    cy.get(MODULE_SELECTOR.themePopover)
      .should('exist')
      .and('be.visible');

    return this;
  }

  openModuleByCode(code) {
    cy.get(MODULE_SELECTOR.modernCard)
      .filter(`:contains("${code}")`)
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click();

    return this;
  }

  verifyColorPresets() {
    cy.get(MODULE_SELECTOR.themePopover)
      .find('.color-presets button')
      .should('have.length', 6);

    cy.get(MODULE_SELECTOR.themePopover)
      .find('.color-presets button')
      .then(($buttons) => {
        const count = $buttons.length;

        for (let index = 0; index < count; index += 1) {
          this.selectColorPreset(index);
        }
      });

    return this;
  }

  selectColorPreset(index) {
    this.openThemeConfiguration();

    cy.get(MODULE_SELECTOR.themePopover)
      .should('be.visible')
      .find('.color-presets button')
      .eq(index)
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    return this;
  }

  verifyDesignSystems() {
    cy.get(MODULE_SELECTOR.themePopover)
      .find('.design-grid button')
      .should('have.length', 3);

    cy.get(MODULE_SELECTOR.themePopover)
      .find('.design-grid button')
      .then(($buttons) => {
        const count = $buttons.length;

        for (let index = 0; index < count; index += 1) {
          this.selectDesignSystem(index);
        }
      });

    return this;
  }

  selectDesignSystem(index) {
    this.openThemeConfiguration();

    cy.get(MODULE_SELECTOR.themePopover)
      .should('be.visible')
      .find('.design-grid button')
      .eq(index)
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    return this;
  }
}

export default new ModulePage();