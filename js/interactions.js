
import { CONFIG } from './config.js';

export class InteractionManager {
    constructor(animationManager) {
        this.animationManager = animationManager;
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupCardInteractions();
        this.setupButtonEffects();
        this.setupTypingEffect();
        this.setupKeyboardNavigation();
    }
    
    setupMobileMenu() {
        this.createMobileToggle();
    }
    
    createMobileToggle() {
        if (!document.querySelector(CONFIG.SELECTORS.MOBILE_TOGGLE)) {
            const toggleButton = document.createElement('button');
            toggleButton.className = 'mobile-menu-toggle';
            toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
            toggleButton.setAttribute('aria-label', 'Abrir menu de navegação');
            document.body.appendChild(toggleButton);
            
            this.setupMobileToggleEvents(toggleButton);
        }
    }
    
    setupMobileToggleEvents(toggleButton) {
        const sidebar = document.querySelector(CONFIG.SELECTORS.SIDEBAR);
        
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle(CONFIG.CLASSES.ACTIVE);
            this.updateToggleIcon(toggleButton, sidebar);
        });
        
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !toggleButton.contains(e.target)) {
                sidebar.classList.remove(CONFIG.CLASSES.ACTIVE);
                this.updateToggleIcon(toggleButton, sidebar);
            }
        });
    }
    
    updateToggleIcon(button, sidebar) {
        const icon = button.querySelector('i');
        if (sidebar.classList.contains(CONFIG.CLASSES.ACTIVE)) {
            icon.className = 'fas fa-times';
            button.setAttribute('aria-label', 'Fechar menu de navegação');
        } else {
            icon.className = 'fas fa-bars';
            button.setAttribute('aria-label', 'Abrir menu de navegação');
        }
    }
    
    setupScrollEffects() {
        const header = document.querySelector(CONFIG.SELECTORS.HEADER);
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            this.updateHeaderStyle(header, scrollTop);
            this.updateParallax(scrollTop);
            this.updateSidebarScale(scrollTop);
            lastScrollTop = scrollTop;
        });
    }
    
    updateHeaderStyle(header, scrollTop) {
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
            header.style.backdropFilter = 'blur(10px)';
        }
    }
    
    updateParallax(scrollTop) {
        const hero = document.querySelector('.hero-section');
        if (hero && scrollTop < window.innerHeight) {
            const parallaxSpeed = scrollTop * 0.3;
            hero.style.transform = `translateY(${parallaxSpeed}px)`;
        }
    }
    
    updateSidebarScale(scrollTop) {
        const sidebar = document.querySelector(CONFIG.SELECTORS.SIDEBAR);
        if (sidebar) {
            const scale = scrollTop > 100 ? 'translateY(-50%) scale(0.98)' : 'translateY(-50%) scale(1)';
            sidebar.style.transform = scale;
        }
    }
    
    setupCardInteractions() {
        // Remove all custom card hover handlers - let CSS handle everything instantly
        const allCards = document.querySelectorAll('.skill-card, .experience-card, .project-card, .content-card, .formation-card, .cert-card');
        allCards.forEach(card => {
            // Remove any existing event listeners that might cause delays
            card.replaceWith(card.cloneNode(true));
        });
    }
    
    setupButtonEffects() {
        const buttons = document.querySelectorAll('.social-btn, .contact-btn, .project-link, .nav-link');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.animationManager.createRippleEffect(button, e);
            });
        });
    }
    
    setupTypingEffect() {
        const mainTitle = document.querySelector('.main-title');
        if (mainTitle) {
            const text = mainTitle.textContent;
            setTimeout(() => {
                this.animationManager.typeWriter(mainTitle, text);
            }, 800);
        }
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenuOnEscape();
            }
        });
    }
    
    closeMobileMenuOnEscape() {
        const sidebar = document.querySelector(CONFIG.SELECTORS.SIDEBAR);
        const toggleButton = document.querySelector(CONFIG.SELECTORS.MOBILE_TOGGLE);
        
        if (sidebar && sidebar.classList.contains(CONFIG.CLASSES.ACTIVE)) {
            sidebar.classList.remove(CONFIG.CLASSES.ACTIVE);
            if (toggleButton) {
                this.updateToggleIcon(toggleButton, sidebar);
                toggleButton.focus();
            }
        }
    }
}
