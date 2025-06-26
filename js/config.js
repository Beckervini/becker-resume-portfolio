
// Configurações e constantes do projeto
export const CONFIG = {
    // Timing das animações
    ANIMATION_TIMING: {
        TYPING_SPEED: 80,
        BOUNCE_DELAY: 150,
        SCROLL_THROTTLE: 10,
        RIPPLE_DURATION: 600,
        NAVBAR_UPDATE_OFFSET: 200
    },
    
    // Seletores principais
    SELECTORS: {
        SIDEBAR: '.sidebar',
        NAV_LINKS: '.nav-link',
        SECTIONS: '.section',
        CARDS: '.skill-card, .experience-card, .cert-card, .project-card',
        HEADER: '.header-fixed',
        MOBILE_TOGGLE: '.mobile-menu-toggle'
    },
    
    // Classes CSS
    CLASSES: {
        ACTIVE: 'active',
        VISIBLE: 'visible',
        ANIMATED: 'animated',
        LOADING: 'loading'
    },
    
    // Configurações do observer
    OBSERVER_OPTIONS: {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    }
};

// Dados dinâmicos do portfólio
export const PORTFOLIO_DATA = {
    skills: [
        { icon: 'fab fa-java', name: 'Java', level: 'Avançado' },
        { icon: 'fas fa-leaf', name: 'Spring Boot', level: 'Avançado' },
        { icon: 'fas fa-dot-circle', name: '.NET Core', level: 'Intermediário' },
        { icon: 'fab fa-python', name: 'Python', level: 'Intermediário' }
    ],
    
    experiences: [
        {
            period: '2019 - Atual',
            title: 'Desenvolvedor Full Stack',
            company: 'Empresa Acadêmica',
            description: 'Desenvolvimento de APIs REST com Java Spring Boot...',
            skills: ['Java', 'Spring Boot', '.NET WCF', 'SQL Server']
        }
    ],
    
    projects: [
        {
            name: 'Vinicius Becker',
            category: 'Portfolio',
            description: 'Site desenvolvido para apresentação de trabalhos acadêmicos...',
            tech: ['Java', 'Spring Boot', 'HTML', 'PostgreSQL'],
            github: '#'
        }
    ]
};
