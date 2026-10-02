import DeepRegistryDashboardPage from '../../support/pageObjects/Deep-registry-logic/DeepRegistryDashboardPage';
import { DEEP_REGISTRY_DASHBOARD_SELECTORS } from '../../support/constant/deepRegistryDashboardSelectors';

describe('Deep Registry Dashboard', () => {
  beforeEach(() => {
    DeepRegistryDashboardPage.visitWithSession();
    DeepRegistryDashboardPage.verifyPageLoaded();
  });

  describe('Dashboard shell', () => {
    it('should render the complete dashboard shell', () => {
      DeepRegistryDashboardPage.verifySidebar();
      DeepRegistryDashboardPage.verifyHeader();
      DeepRegistryDashboardPage.verifyUserProfile();
      DeepRegistryDashboardPage.verifyHero();
    });
  });

  describe('Sidebar navigation', () => {
    it('should render all sidebar menu entries correctly', () => {
      DeepRegistryDashboardPage.verifySidebarNavigation();
    });

    it('should navigate back to the module dashboard', () => {
      DeepRegistryDashboardPage.navigateBackToModule();
    });

    it('should expose the dashboard route through the brand button', () => {
      cy.get('.logo-home-button')
        .should('have.attr', 'aria-label', 'Go to module dashboard')
        .click();

      cy.location('pathname', { timeout: 10000 })
        .should('eq', '/modules');
    });
  });

  describe('Hero section', () => {
    it('should display the correct dashboard identity', () => {
      DeepRegistryDashboardPage.verifyHero();
    });
  });

  describe('KPI section', () => {
    it('should display all dashboard KPIs', () => {
      DeepRegistryDashboardPage.verifyKpis();
    });

    it('should expose pending validation details', () => {
      DeepRegistryDashboardPage.verifyPendingValidationDetails();
    });
  });

  describe('Request analytics', () => {
    it('should render request analytics and summary data', () => {
      DeepRegistryDashboardPage.verifyRequestsAnalytics();
    });
  });

  describe('Vessel statistics', () => {
    it('should render all vessel statistics cards and charts', () => {
      DeepRegistryDashboardPage.verifyVesselStatistics();
    });
  });

  describe('Company users analytics', () => {
    it('should render the company users analytics section', () => {
      DeepRegistryDashboardPage.verifyCompanyUsersSection();
    });

    it('should allow switching between all available periods', () => {
      DeepRegistryDashboardPage.verifyCompanyPeriodFilters();
    });

    it('should allow entering a company search term', () => {
      const value = 'Test';

      DeepRegistryDashboardPage.searchCompany(value);

      cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.companyInput)
        .should('have.value', value);
    });
  });

  describe('Party analytics', () => {
    it('should render party analytics sections', () => {
      DeepRegistryDashboardPage.verifyPartyAnalytics();
    });
  });

  describe('Language', () => {
    it('should switch to French', () => {
      DeepRegistryDashboardPage.switchLanguage('fr');
      DeepRegistryDashboardPage.verifyActiveLanguage('fr');
    });

    it('should switch back to English', () => {
      DeepRegistryDashboardPage.switchLanguage('fr');
      DeepRegistryDashboardPage.verifyActiveLanguage('fr');

      DeepRegistryDashboardPage.switchLanguage('en');
      DeepRegistryDashboardPage.verifyActiveLanguage('en');
    });
  });

  describe('Theme', () => {
    it('should toggle between light and dark themes', () => {
      DeepRegistryDashboardPage.verifyThemeToggleCycle();
    });
  });

  describe('Notifications', () => {
    it('should open the notifications panel', () => {
      DeepRegistryDashboardPage.openNotifications();
      DeepRegistryDashboardPage.verifyNotificationsPanel();
    });
  });

  describe('Theme configuration', () => {
    it('should open the theme configuration panel', () => {
      DeepRegistryDashboardPage.openThemeConfiguration();
      DeepRegistryDashboardPage.verifyThemePanel();
    });

    it('should render all color preset controls', () => {
      DeepRegistryDashboardPage.openThemeConfiguration();
      DeepRegistryDashboardPage.verifyThemePanel();
      DeepRegistryDashboardPage.verifyColorPresetControls();
    });

    it('should render all design system controls', () => {
      DeepRegistryDashboardPage.openThemeConfiguration();
      DeepRegistryDashboardPage.verifyThemePanel();
      DeepRegistryDashboardPage.verifyDesignSystemControls();
    });

    it('should allow selecting each design system', () => {
      [0, 1, 2].forEach((index) => {
        DeepRegistryDashboardPage.selectDesignSystemByIndex(index);
      });
    });
  });

  describe('Accessibility and keyboard interaction', () => {
    it('should keep the primary interactive controls keyboard accessible', () => {
      DeepRegistryDashboardPage.verifyKeyboardAccessibility();
    });
  });

  describe('Responsive layout', () => {
    it('should preserve dashboard integrity across supported viewports', () => {
      DeepRegistryDashboardPage.verifyResponsiveIntegrity();
    });
  });
});