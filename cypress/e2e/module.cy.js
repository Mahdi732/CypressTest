import {
  MODULE_SELECTOR,
  MODULE_NAVIGATION_CASES,
} from '../support/constant/ModuleConstants';

import ModulePage from '../support/pageObjects/ModulePage';
import { TEST_CONFIG } from '../support/constant/constants';

describe('Modules Page', () => {
  beforeEach(() => {
    ModulePage.visitWithSession();

    cy.location('pathname', {
      timeout: TEST_CONFIG.defaultTimeout,
    }).should('eq', TEST_CONFIG.modulesUrl);

    ModulePage.verifyLoaded();
  });

  describe('Page rendering', () => {
    it('should load the modules page successfully', () => {
        
      cy.location('pathname').should('eq', TEST_CONFIG.modulesUrl);
      ModulePage.verifyLoaded();
    });
  });

  describe('Module navigation', () => {
    MODULE_NAVIGATION_CASES.forEach(
      ({ name, code, expectedPath }) => {
        it(`should navigate to ${name} from its module card`, () => {
          ModulePage.openModuleByCode(code);

          cy.location('pathname', {
            timeout: TEST_CONFIG.defaultTimeout,
          }).should('eq', expectedPath);
        });
      }
    );

    it('verify color are active ', function() {});
  });

  describe('Language switching', () => {
    it('should switch the interface to French and English', () => {
      ModulePage.switchLanguage('fr');
      ModulePage.verifyActiveLanguage('fr');

      ModulePage.switchLanguage('en');
      ModulePage.verifyActiveLanguage('en');
    });
  });

  describe('Theme switching', () => {
    it('should switch the interface to dark theme', () => {
      ModulePage.verifyTheme('light');

      ModulePage.switchTheme();

      ModulePage.verifyTheme('dark');
    });
  });

  describe('Notifications', () => {
    it('should open the notification panel', () => {
      ModulePage.openNotificationPanel();

      cy.get(MODULE_SELECTOR.notificationPopover)
        .should('exist')
        .and('be.visible');
    });
  });

  describe('Theme configuration', () => {
    it('should allow selecting each color preset', () => {
      ModulePage.openThemeConfiguration();
      ModulePage.verifyThemePanel();

      ModulePage.verifyColorPresets();
    });

    it('should allow selecting each design system', () => {
      ModulePage.openThemeConfiguration();
      ModulePage.verifyThemePanel();

      ModulePage.verifyDesignSystems();
    });
  });
});