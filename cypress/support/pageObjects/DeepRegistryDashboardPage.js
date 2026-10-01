import { DEEP_REGISTRY_DASHBOARD_SELECTORS } from '../deepRegistryDashboardSelectors';
import { TEST_CONFIG } from '../constants';
import { seedBackOfficeSession } from '../backOfficeSession';


class DeepRegistryDashboardPage {

    visitWithSession() {
        return cy.env(["BACK_OFFICE_SESSION"]).then((env) => {
            const session = env.BACK_OFFICE_SESSION;

            if (!session?.token || !session?.user) {
                throw new Error('Missing BACK_OFFICE_SESSION. Create Tests/.cypress.env.json with token and user data.');
            }

            cy.visit(TEST_CONFIG.baseUrl + TEST_CONFIG.deepRegestryDashboardUrl, {
                onBeforeLoad(win) {
                    seedBackOfficeSession(win, session);
                }
            });
        });
    }

    verifyPageLoaded() {
        cy.location('pathname', { timeout: 20000 }).should('eq', '/deep-registry/dashboard');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.appRoot).should('exist');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.pageBody).should('be.visible');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.hero).should('be.visible');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.pageTitle).should('be.visible').and('not.be.empty');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.registryVisual).should('be.visible');
        return this;
    }

    verifyHeader() {
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.sidebarToggle).should('be.visible');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.themeToggle).should('be.visible');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.languageButtons).should('have.length', 2);
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.notificationButton).should('be.visible');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.userAvatar).should('be.visible').and('not.be.empty');
        return this;
    }

    verifySidebar() {
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.sidebar).should('be.visible');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.brandLink).should('be.visible').and('have.attr', 'aria-label', 'Go to module dashboard');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.brandLogo).should('be.visible').and('have.attr', 'alt', 'Deep Maritime');
        return this;
    }

    verifyHeroAndSummary() {
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.kicker).should('be.visible');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.pageSubtitle).should('be.visible').and('not.be.empty');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.kpiCards).should('have.length', 4);
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.kpiTitles).should('have.length', 4);
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.kpiValues).each(($value) => {
            cy.wrap($value).invoke('text').then((text) => {
                expect(text.trim()).to.not.equal('');
            });
        });
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.kpiChanges).should('have.length.at.least', 1);
        return this;
    }

    verifyRequestsAndSummaryCards() {
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.chartCards).should('have.length.at.least', 2);
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.summaryCard).should('be.visible');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.pendingValidationChart).should('be.visible');
        return this;
    }

    verifyVesselStatistics() {
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.vesselStatisticsCard).should('be.visible');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.vesselTotalPill).should('be.visible');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.vesselStatCards).should('have.length', 4);
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.vesselDonutCharts).should('have.length', 4);
        return this;
    }

    verifyCompanyUsersSection() {
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.companyUsersCard).should('be.visible');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.companyPeriodButtons).should('have.length', 3);
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.companyInput).should('be.visible');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.companyUsersChart).should('be.visible');
        return this;
    }

    verifyPartySections() {
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.partyDashboardGrid).should('be.visible');
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.partyChartCards).should('have.length', 2);
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.partyD3Charts).should('have.length', 2);
        return this;
    }
}

export default new DeepRegistryDashboardPage();
