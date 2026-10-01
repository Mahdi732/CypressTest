export const MODULE_SELECTOR = {
    moduleContainer : ".modules-container",
    moduleMain : ".modules-main",
    modernCard : ".modern-card",
    languageSwitcher: '.lang-pill',
    themeToggleButton : '.theme-toggle-btn',
    languageSwitcherButton : '.lang-pill-btn',
    themeConfigButton : '.theme-config-btn',
    profileAvatar : '.profile-avatar',
    notificationButton : '.notification-btn',
    themePopover: '.theme-panel',
    notificationPopover: '.surveyor-notification-panel'
}

export const MODULE_NAVIGATION_CASES = [
    { name: 'Deep Registry', code: 'REG-SYS', expectedPath: '/deep-registry/dashboard' },
    { name: 'Deep Flag', code: 'FLAG-CERT', expectedPath: '/deep-flag/dashboard' },
    { name: 'Deep Crew', code: 'CREW-ADM', expectedPath: '/deep-crew/dashboard' },
    { name: 'Deep Core', code: 'FLT-NAV', expectedPath: '/Deep-Core/dashboard' },
    { name: 'Portal', code: 'PUB-PTL', expectedPath: '/portal/login' }
];