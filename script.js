
// Script principal refatorado e otimizado
import { CONFIG } from './js/config.js';
import { AnimationManager } from './js/animations.js';
import { NavigationManager } from './js/navigation.js';
import { InteractionManager } from './js/interactions.js';

class PortfolioApp {
    constructor() {
        this.animationManager = null;
        this.navigationManager = null;
        this.interactionManager = null;
        
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeManagers();
            this.prepareAnimations();
            this.setupPerformanceOptimizations();
        });
        
        window.addEventListener('load', () => {
            this.onPageLoad();
        });
    }
    
    initializeManagers() {
        try {
            this.animationManager = new AnimationManager();
            this.navigationManager = new NavigationManager();
            this.interactionManager = new InteractionManager(this.animationManager);
            
            console.log('Portfolio managers initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio managers:', error);
        }
    }
    
    prepareAnimations() {
        // Prepara elementos para animação
        const sections = document.querySelectorAll(CONFIG.SELECTORS.SECTIONS);
        const cards = document.querySelectorAll(CONFIG.SELECTORS.CARDS);
        
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        });
    }
    
    setupPerformanceOptimizations() {
        // Lazy loading para imagens
        this.initializeLazyLoading();
        
        // Preload de recursos críticos
        this.preloadCriticalResources();
        
        // Service Worker
        this.registerServiceWorker();
    }
    
    initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window && images.length > 0) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove(CONFIG.CLASSES.LOADING);
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    preloadCriticalResources() {
        const criticalResources = [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }
    
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registrado com sucesso:', registration.scope);
                })
                .catch(registrationError => {
                    console.log('Falha no registro do SW:', registrationError);
                });
        }
    }
    
    onPageLoad() {
        // Remove loading states
        document.body.classList.remove(CONFIG.CLASSES.LOADING);
        
        // Inicia lazy loading
        this.initializeLazyLoading();
        
        console.log('Portfolio loaded successfully');
    }
    
    // Método público para rastreamento de eventos
    trackEvent(eventName, properties = {}) {
        console.log('Evento rastreado:', eventName, properties);
        // Aqui você pode integrar com analytics
    }
}

// Inicializa a aplicação
const portfolioApp = new PortfolioApp();

// Rastreamento de eventos
document.addEventListener('click', function(e) {
    if (e.target.matches('.social-btn, .contact-btn, .project-link')) {
        const linkText = e.target.textContent.trim();
        portfolioApp.trackEvent('link_click', { link_text: linkText });
    }
});

// Tratamento de erros global
window.addEventListener('error', function(e) {
    console.error('Erro capturado:', e.error);
});

// Exporta para uso global se necessário
window.PortfolioApp = PortfolioApp;
