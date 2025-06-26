
import { CONFIG } from './config.js';

export class NavigationManager {
    constructor() {
        this.navLinks = document.querySelectorAll(CONFIG.SELECTORS.NAV_LINKS);
        this.sections = document.querySelectorAll(CONFIG.SELECTORS.SECTIONS);
        this.ticking = false;
        
        this.init();
    }
    
    init() {
        this.setupScrollNavigation();
        this.setupSmoothScroll();
        this.updateActiveNavigation();
    }
    
    setupScrollNavigation() {
        window.addEventListener('scroll', this.throttledUpdateNavigation.bind(this));
    }
    
    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });
    }
    
    handleNavClick(e) {
        e.preventDefault();
        
        const targetId = e.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            this.scrollToSection(targetSection);
            this.closeMobileMenu();
            this.addClickFeedback(e.target);
        }
    }
    
    scrollToSection(section) {
        const headerHeight = document.querySelector(CONFIG.SELECTORS.HEADER).offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 30;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    updateActiveNavigation() {
        let current = '';
        const scrollPosition = window.pageYOffset + CONFIG.ANIMATION_TIMING.NAVBAR_UPDATE_OFFSET;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        if (!current && window.pageYOffset < 300) {
            current = 'sobre';
        }
        
        this.updateActiveLink(current);
    }
    
    updateActiveLink(current) {
        this.navLinks.forEach(link => {
            link.classList.remove(CONFIG.CLASSES.ACTIVE);
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add(CONFIG.CLASSES.ACTIVE);
                this.addActiveAnimation(link);
            }
        });
    }
    
    addActiveAnimation(link) {
        link.style.transform = 'translateX(6px) scale(1.05)';
        setTimeout(() => {
            link.style.transform = '';
        }, 200);
    }
    
    addClickFeedback(element) {
        element.style.background = 'linear-gradient(135deg, #3182ce, #2c5aa0)';
        setTimeout(() => {
            element.style.background = '';
        }, 300);
    }
    
    closeMobileMenu() {
        const sidebar = document.querySelector(CONFIG.SELECTORS.SIDEBAR);
        if (sidebar && sidebar.classList.contains(CONFIG.CLASSES.ACTIVE)) {
            sidebar.classList.remove(CONFIG.CLASSES.ACTIVE);
        }
    }
    
    throttledUpdateNavigation() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateActiveNavigation();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
}
