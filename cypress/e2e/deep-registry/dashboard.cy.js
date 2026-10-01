import DeepRegistryDashboardPage from '../../support/pageObjects/DeepRegistryDashboardPage';
import { DEEP_REGISTRY_DASHBOARD_SELECTORS } from '../../support/deepRegistryDashboardSelectors';

describe('Deep Registry Dashboard', () => {
  beforeEach(() => {
    DeepRegistryDashboardPage.visitWithSession();
    cy.location('pathname', { timeout: 10000 }).should('eq', '/deep-registry/dashboard');
    DeepRegistryDashboardPage.verifyPageLoaded();
  });

  it('should load the dashboard shell and core page sections', () => {
    DeepRegistryDashboardPage.verifySidebar();
    DeepRegistryDashboardPage.verifyHeader();
    DeepRegistryDashboardPage.verifyHeroAndSummary();
    DeepRegistryDashboardPage.verifyRequestsAndSummaryCards();
  });

  it('should display the main Deep Registry dashboard elements', () => {
    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.sidebar).should('be.visible');
    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.hero).should('be.visible');
    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.pageTitle).should('contain.text', 'Deep Registry');
    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.registryVisual).should('be.visible');
    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.kpiCards).should('have.length', 4);
    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.summaryCard).should('be.visible');
  });

  it('should render the request and vessel statistics blocks', () => {
    DeepRegistryDashboardPage.verifyRequestsAndSummaryCards();
    DeepRegistryDashboardPage.verifyVesselStatistics();
    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.chartCards).should('have.length.at.least', 3);
  });

  it('should render the company users and party analytics sections', () => {
    DeepRegistryDashboardPage.verifyCompanyUsersSection();
    DeepRegistryDashboardPage.verifyPartySections();
    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.companyUsersCard).should('be.visible');
    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.partyDashboardGrid).should('be.visible');
  });

  it('should allow switching the company users period filters', () => {
    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.companyPeriodButtons).should('have.length', 3);
    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.companyPeriodButtons).eq(0).click();
    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.companyPeriodButtons).eq(0).should('have.class', 'active');

    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.companyPeriodButtons).eq(1).click();
    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.companyPeriodButtons).eq(1).should('have.class', 'active');

    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.companyPeriodButtons).eq(2).click();
    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.companyPeriodButtons).eq(2).should('have.class', 'active');
  });

  it('should keep the dashboard controls visible and interactive', () => {
    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.themeToggle).should('be.visible').click();
    cy.get('html').should('have.attr', 'data-theme').and('match', /dark|light/);

    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.languageButtons).should('have.length', 2);
    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.languageButtons).contains('button', 'FR').click();
    cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.languageButtons).contains('button', 'FR').should('have.class', 'active');
  });
});
