import {
    DEEP_REGISTRY_DASHBOARD_SELECTORS,
} from '../../constant/deepRegistryDashboardSelectors';

import { TEST_CONFIG } from '../../constant/constants';
import { seedBackOfficeSession } from '../../backOfficeSession';

class DeepRegistryDashboardPage {
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
                `${TEST_CONFIG.baseUrl}${TEST_CONFIG.deepRegistryDashboardUrl}`,
                {
                    onBeforeLoad(win) {
                        seedBackOfficeSession(win, session);
                    },
                }
            );
        });
    }

    verifyPageLoaded() {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;
        const timeout = TEST_CONFIG.defaultTimeout;

        // Actual dashboard component = readiness signal
        cy.get(selectors.dashboardComponent, { timeout: 20000 })
            .should('exist');

        // Actual page content
        cy.get(selectors.pageBody, { timeout: 20000 })
            .should('exist')
            .and('be.visible');

        cy.get(selectors.hero, { timeout })
            .should('exist')
            .and('be.visible');

        cy.get(selectors.pageTitle, { timeout })
            .should('exist')
            .and('be.visible')
            .and('contain.text', 'Deep Registry Dashboard');

        cy.get(selectors.registryVisual, { timeout })
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'role', 'img');

        cy.location('pathname', { timeout: 20000 })
            .should('eq', TEST_CONFIG.deepRegistryDashboardUrl);

        return this;
    }

    verifySidebar() {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;

        cy.get(selectors.sidebar)
            .should('exist')
            .and('be.visible');

        cy.get(selectors.sidebarHeader)
            .should('be.visible');

        cy.get(selectors.brandLink)
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'aria-label', 'Go to module dashboard');

        cy.get(selectors.brandLogo)
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'alt', 'Deep Maritime');

        cy.get(selectors.backButton)
            .should('exist')
            .and('be.visible')
            .and('contain.text', 'Back to modules');

        cy.get(selectors.sidebarNav)
            .should('be.visible');

        cy.get(selectors.menuList)
            .should('be.visible');

        cy.get(selectors.menuItem)
            .should('have.length', 6);

        return this;
    }

    verifySidebarNavigation() {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;

        /*
         * Dashboard is a real route link.
         */
        cy.get(selectors.menuItem)
            .first()
            .should('have.class', 'active')
            .within(() => {
                cy.get(selectors.menuLink)
                    .should('have.attr', 'href', '/deep-registry/dashboard')
                    .and('contain.text', 'Dashboard');

                cy.get(selectors.menuIcon)
                    .should('exist');

                cy.get(selectors.menuLabel)
                    .should('contain.text', 'Dashboard');
            });

        /*
         * The remaining entries are submenu triggers.
         * They intentionally do NOT contain href attributes.
         */
        cy.get(selectors.menuItem)
            .filter('.has-children')
            .should('have.length', 5)
            .each(($item) => {
                cy.wrap($item)
                    .find(selectors.menuLink)
                    .should('exist')
                    .and('not.have.attr', 'href');

                cy.wrap($item)
                    .find(selectors.menuLabel)
                    .should('exist')
                    .and('not.be.empty');

                cy.wrap($item)
                    .find(selectors.submenuArrow)
                    .should('exist');
            });

        return this;
    }

    verifyHeader() {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;

        cy.get(selectors.topbarShell)
            .should('exist');

        cy.get(selectors.sidebarToggle)
            .should('exist')
            .and('be.visible')
            .and('not.be.disabled');

        cy.get(selectors.breadcrumb)
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'aria-label', 'Breadcrumb');

        cy.get(selectors.breadcrumbModule)
            .should('exist')
            .and('have.attr', 'href', '/deep-registry/dashboard')
            .and('contain.text', 'DeepRegistry');

        cy.get(selectors.breadcrumbCurrent)
            .should('exist')
            .and('have.attr', 'aria-current', 'page')
            .and('contain.text', 'Dashboard');

        cy.get(selectors.notificationButton)
            .should('exist')
            .and('be.visible')
            .and('not.be.disabled');

        cy.get(selectors.themeConfigButton)
            .should('exist')
            .and('be.visible')
            .and('not.be.disabled');

        cy.get(selectors.languageButtons)
            .should('have.length', 2)
            .each(($button) => {
                cy.wrap($button)
                    .should('be.visible')
                    .and('not.be.disabled');
            });

        cy.get(selectors.themeToggle)
            .should('exist')
            .and('be.visible')
            .and('not.be.disabled');

        cy.get(selectors.profileAvatar)
            .should('exist')
            .and('be.visible')
            .and('not.be.disabled');

        return this;
    }

    verifyUserProfile() {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;

        cy.get(selectors.userProfile)
            .should('exist')
            .and('be.visible');

        cy.get(selectors.userAvatar)
            .should('exist')
            .and('be.visible')
            .and('not.be.empty');

        cy.get(selectors.userName)
            .should('exist')
            .and('be.visible')
            .and('not.be.empty');

        cy.get(selectors.userRole)
            .should('exist')
            .and('be.visible')
            .and('not.be.empty');

        cy.get(selectors.userMenuButton)
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'title', 'Profile');

        return this;
    }

    verifyHero() {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;

        cy.get(selectors.hero)
            .should('exist')
            .and('be.visible');

        cy.get(selectors.kicker)
            .should('exist')
            .and('be.visible')
            .and('contain.text', 'Deep Registry');

        cy.get(`${selectors.kicker} i`)
            .should('have.class', 'pi')
            .and('have.class', 'pi-id-card');

        cy.get(selectors.pageTitle)
            .should('be.visible')
            .and('contain.text', 'Deep Registry Dashboard');

        cy.get(selectors.pageSubtitle)
            .should('be.visible')
            .and('contain.text', 'System-wide registry requests overview and tracking.');

        cy.get(selectors.registryVisual)
            .should('be.visible');

        return this;
    }

    verifyKpis() {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;

        cy.get(selectors.kpiCards)
            .should('have.length', 4)
            .each(($card) => {
                cy.wrap($card)
                    .should('be.visible')
                    .within(() => {
                        cy.get(selectors.kpiTitle)
                            .should('exist')
                            .and('be.visible')
                            .and('not.be.empty');

                        cy.get(selectors.kpiValues)
                            .should('exist')
                            .and('be.visible')
                            .invoke('text')
                            .then((text) => {
                                const value = text.trim();

                                expect(
                                    value,
                                    'KPI value should be numeric'
                                ).to.match(/^\d[\d,.\s]*$/);
                            });

                        cy.get(selectors.kpiSubtitle)
                            .should('exist')
                            .and('be.visible')
                            .and('not.be.empty');

                        cy.get(selectors.kpiChange)
                            .should('exist')
                            .and('be.visible');

                        cy.get(selectors.kpiIcon)
                            .should('exist');
                    });
            });

        return this;
    }

    verifyPendingValidationDetails() {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;

        cy.get(selectors.pendingKpi)
            .should('exist')
            .and('have.attr', 'tabindex', '0');

        cy.get(selectors.pendingKpiTooltip)
            .should('exist')
            .and('have.attr', 'role', 'tooltip');

        cy.get(selectors.pendingTooltipItem)
            .should('have.length', 2)
            .each(($item) => {
                cy.wrap($item)
                    .find('strong')
                    .should('exist')
                    .and('not.be.empty');
            });

        cy.get(selectors.pendingKpiTooltip)
            .should('contain.text', 'Pending administrative validation')
            .and('contain.text', 'Pending technical validation');

        return this;
    }

    verifyRequestsAnalytics() {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;

        cy.get(selectors.chartsGrid)
            .should('exist')
            .and('be.visible');

        cy.get(selectors.revenueChart)
            .should('exist')
            .and('be.visible');

        cy.get(selectors.revenueChartTitle)
            .should('contain.text', 'Total Requests');

        cy.get(selectors.revenueChartSubtitle)
            .should('contain.text', 'Created This Month');

        cy.get(selectors.revenueChartCanvas)
            .should('exist')
            .and('have.attr', 'role', 'img');

        cy.get(selectors.summaryCard)
            .should('exist')
            .and('be.visible');

        cy.get(selectors.summaryCardTitle)
            .should('contain.text', 'DeepRegistry');

        cy.get(selectors.summaryCardSubtitle)
            .should(
                'contain.text',
                'System-wide registry requests overview and tracking.'
            );

        cy.get(selectors.summaryItems)
            .should('have.length', 3)
            .each(($item) => {
                cy.wrap($item)
                    .find(selectors.summaryLabel)
                    .should('exist')
                    .and('not.be.empty');

                cy.wrap($item)
                    .find('strong')
                    .should('exist')
                    .and('not.be.empty');
            });

        cy.get(selectors.pendingValidationChart)
            .should('exist')
            .and('be.visible');

        cy.get(`${selectors.pendingValidationChart} svg`)
            .should('exist');

        cy.get(`${selectors.pendingValidationChart} .pending-bar-value`)
            .should('have.length', 2);

        return this;
    }

    verifyVesselStatistics() {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;

        cy.get(selectors.vesselStatisticsCard)
            .should('exist')
            .and('be.visible');

        cy.get(selectors.vesselStatisticsTitle)
            .should('have.text', 'Vessel registry overview');

        cy.get(selectors.vesselStatisticsSubtitle)
            .should('be.visible')
            .and('not.be.empty');

        cy.get(selectors.vesselTotalPill)
            .should('exist')
            .and('be.visible')
            .within(() => {
                cy.contains('Registered vessels')
                    .should('be.visible');

                cy.get('strong')
                    .should('exist')
                    .invoke('text')
                    .then((text) => {
                        expect(
                            text.trim(),
                            'registered vessel total should be numeric'
                        ).to.match(/^\d+$/);
                    });
            });

        cy.get(selectors.vesselStatCards)
            .should('have.length', 4)
            .each(($card) => {
                cy.wrap($card)
                    .should('be.visible')
                    .within(() => {
                        cy.get('h4')
                            .should('exist')
                            .and('not.be.empty');

                        cy.get('p')
                            .should('exist')
                            .and('not.be.empty');

                        cy.get(selectors.vesselDonutChart)
                            .should('exist')
                            .and('be.visible');

                        cy.get(`${selectors.vesselDonutChart} svg`)
                            .should('exist')
                            .and('have.attr', 'role', 'img');
                    });
            });

        return this;
    }

    verifyCompanyUsersSection() {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;

        cy.get(selectors.companyUsersCard)
            .should('exist')
            .and('be.visible');

        cy.get(selectors.companyUsersIntro)
            .should('exist')
            .and('be.visible')
            .and('contain.text', 'Party Management')
            .and('contain.text', 'Party statistics overview');

        cy.get(selectors.companyUsersTitle)
            .should('contain.text', 'Company users evolution');

        cy.get(selectors.companyUsersSubtitle)
            .should(
                'contain.text',
                'Cumulative portal users growth by company'
            );

        cy.get(selectors.companyPeriodGroup)
            .should('exist')
            .and('have.attr', 'role', 'group');

        cy.get(selectors.companyPeriodButtons)
            .should('have.length', 3)
            .each(($button) => {
                cy.wrap($button)
                    .should('be.visible')
                    .and('not.be.disabled')
                    .and('not.be.empty');
            });

        cy.get(selectors.companyInput)
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'type', 'text')
            .and('have.attr', 'placeholder', 'Search company...');

        cy.get(selectors.companyUsersChart)
            .should('exist')
            .and('be.visible');

        cy.get(`${selectors.companyUsersChart} svg`)
            .should('exist');

        cy.get(`${selectors.companyUsersChart} .company-user-point`)
            .should('have.length', 12);

        return this;
    }

    verifyCompanyPeriodFilters() {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;
        const expectedPeriods = ['7 days', 'Month', 'Year'];

        cy.get(selectors.companyPeriodButtons)
            .should('have.length', expectedPeriods.length);

        expectedPeriods.forEach((period) => {
            cy.get(selectors.companyPeriodButtons)
                .contains(period)
                .should('be.visible')
                .and('not.be.disabled')
                .click();

            cy.get(selectors.companyPeriodButtons)
                .contains(period)
                .should('have.class', 'active');
        });

        return this;
    }

    searchCompany(value) {
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.companyInput)
            .should('exist')
            .and('be.visible')
            .clear()
            .focus()
            .type(value, {
                delay: 100,
            });

        return this;
    }

    verifyPartyAnalytics() {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;

        cy.get(selectors.partyDashboardGrid)
            .should('exist')
            .and('be.visible');

        cy.get(selectors.partyChartCards)
            .should('have.length', 2)
            .each(($card) => {
                cy.wrap($card)
                    .should('be.visible')
                    .within(() => {
                        cy.get(selectors.partyChartTitle)
                            .should('exist')
                            .and('be.visible')
                            .and('not.be.empty');

                        cy.get(selectors.partyChartSubtitle)
                            .should('exist')
                            .and('be.visible')
                            .and('not.be.empty');

                        cy.get(selectors.partyD3Charts)
                            .should('exist')
                            .and('be.visible');

                        cy.get('svg')
                            .should('exist');
                    });
            });

        cy.get(selectors.partyChartLiveLabel)
            .should('have.length', 2)
            .each(($label) => {
                cy.wrap($label)
                    .should('be.visible')
                    .and('not.be.empty');
            });

        return this;
    }

    switchLanguage(language) {
        const labels = {
            en: 'EN',
            fr: 'FR',
        };

        if (!labels[language]) {
            throw new Error(
                `Unsupported language "${language}". Expected "en" or "fr".`
            );
        }

        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.languageButtons)
            .contains('button', labels[language])
            .should('be.visible')
            .and('not.be.disabled')
            .click();

        return this;
    }

    verifyActiveLanguage(language) {
        const labels = {
            en: 'EN',
            fr: 'FR',
        };

        if (!labels[language]) {
            throw new Error(
                `Unsupported language "${language}". Expected "en" or "fr".`
            );
        }

        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.languageButtons)
            .contains('button', labels[language])
            .should('have.class', 'active');

        return this;
    }

    switchTheme() {
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.themeToggle)
            .should('be.visible')
            .and('not.be.disabled')
            .click();

        return this;
    }

    verifyThemeToggleCycle() {
        cy.get('html')
            .invoke('attr', 'data-theme')
            .then((initialTheme) => {
                expect(['light', 'dark']).to.include(initialTheme);

                this.switchTheme();

                cy.get('html')
                    .invoke('attr', 'data-theme')
                    .should((newTheme) => {
                        expect(['light', 'dark']).to.include(newTheme);
                        expect(newTheme).to.not.equal(initialTheme);
                    });

                this.switchTheme();

                cy.get('html')
                    .should('have.attr', 'data-theme', initialTheme);
            });

        return this;
    }

    openNotifications() {
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.notificationButton)
            .should('be.visible')
            .and('not.be.disabled')
            .click();

        return this;
    }

    verifyNotificationsPanel() {
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.notificationPanel)
            .should('exist')
            .and('be.visible');

        return this;
    }

    openThemeConfiguration() {
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.themeConfigButton)
            .should('be.visible')
            .and('not.be.disabled')
            .click();

        return this;
    }

    verifyThemePanel() {
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.themePanel)
            .should('exist')
            .and('be.visible');

        return this;
    }

    verifyColorPresetControls() {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;

        cy.get(selectors.themePanel)
            .find(selectors.colorPresetButtons)
            .should('have.length', 6)
            .each(($button) => {
                cy.wrap($button)
                    .should('be.visible')
                    .and('not.be.disabled');
            });

        return this;
    }

    selectColorPreset(index) {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;

        this.openThemeConfiguration();

        cy.get(selectors.themePanel)
            .should('be.visible')
            .find(selectors.colorPresetButtons)
            .eq(index)
            .should('be.visible')
            .and('not.be.disabled')
            .click();

        return this;
    }

    verifyDesignSystemControls() {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;

        cy.get(selectors.themePanel)
            .should('be.visible');

        cy.get(selectors.designGrid)
            .should('exist')
            .and('be.visible');

        cy.get(selectors.designSystemButtons)
            .should('have.length', 3)
            .each(($item) => {
                cy.wrap($item)
                    .should('be.visible')
                    .and('not.be.disabled');

                cy.wrap($item)
                    .find(selectors.designName)
                    .should('exist')
                    .and('not.be.empty');
            });

        return this;
    }

    navigateBackToModule() {

        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.sidebar).then(($sidebar) => {
            if ($sidebar.hasClass('collapsed')) {
                cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.sidebarToggle).click();
            }
        });
        cy.get(DEEP_REGISTRY_DASHBOARD_SELECTORS.sidebar).should('not.have.class', 'collapsed');


        cy.get('.back-btn')
            .should('be.visible')
            .click();

        cy.location('pathname', { timeout: 10000 })
            .should('eq', '/modules');

    }

    selectDesignSystemByIndex(index) {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;

        this.openThemeConfiguration();

        cy.get(selectors.themePanel)
            .should('be.visible');

        cy.get(selectors.designSystemButtons)
            .should('have.length', 3)
            .eq(index)
            .scrollIntoView()
            .click({ force: true });

        return this;
    }

    verifyKeyboardAccessibility() {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;

        cy.get(selectors.sidebarToggle)
            .focus()
            .should('have.focus');

        cy.get(selectors.notificationButton)
            .focus()
            .should('have.focus');

        cy.get(selectors.themeConfigButton)
            .focus()
            .should('have.focus');

        cy.get(selectors.themeToggle)
            .focus()
            .should('have.focus');

        cy.get(selectors.profileAvatar)
            .focus()
            .should('have.focus');

        cy.get(selectors.companyInput)
            .focus()
            .should('have.focus');

        return this;
    }

    verifyResponsiveIntegrity() {
        const selectors = DEEP_REGISTRY_DASHBOARD_SELECTORS;

        const viewports = [
            {
                name: 'desktop',
                width: 1440,
                height: 900,
            },
            {
                name: 'tablet',
                width: 1024,
                height: 768,
            },
            {
                name: 'mobile',
                width: 390,
                height: 844,
            },
        ];

        viewports.forEach(({ width, height }) => {
            cy.viewport(width, height);

            cy.get(selectors.pageBody)
                .should('be.visible');

            cy.get(selectors.hero)
                .should('be.visible');

            cy.get(selectors.pageTitle)
                .should('be.visible');

            cy.get(selectors.kpiCards)
                .should('have.length', 4);

            cy.get(selectors.vesselStatisticsCard)
                .should('be.visible');

            cy.get(selectors.companyUsersCard)
                .should('be.visible');

            cy.get(selectors.partyDashboardGrid)
                .should('be.visible');

            cy.get(selectors.themeToggle)
                .should('be.visible');

            cy.get(selectors.languageButtons)
                .should('have.length', 2);

            cy.get(selectors.notificationButton)
                .should('be.visible');
        });

        return this;
    }


}

export default new DeepRegistryDashboardPage();