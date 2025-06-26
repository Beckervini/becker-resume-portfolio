import { CONFIG } from './config.js';

// Classe para gerenciar animações
export class AnimationManager {
    constructor() {
        this.observer = null;
        this.setupIntersectionObserver();
        this.addCustomStyles();
    }
    
    // Configura o Intersection Observer
    setupIntersectionObserver() {
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            CONFIG.OBSERVER_OPTIONS
        );
        
        // Observa todas as seções
        document.querySelectorAll(CONFIG.SELECTORS.SECTIONS).forEach(section => {
            this.observer.observe(section);
        });
    }
    
    // Manipula a intersecção dos elementos
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateSection(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    // Anima uma seção específica
    animateSection(section) {
        // Anima a seção principal
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        section.classList.add(CONFIG.CLASSES.VISIBLE);
        
        // Anima elementos filhos
        const animatedElements = section.querySelectorAll(CONFIG.SELECTORS.CARDS);
        this.staggerAnimation(animatedElements);
    }
    
    // Animação simultânea para elementos (sem delay escalonado)
    staggerAnimation(elements) {
        elements.forEach((element) => {
            // Remove o delay baseado no index - todos animam ao mesmo tempo
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.animation = 'subtle-bounce 0.6s ease';
        });
    }
    
    // Efeito de digitação para o título
    typeWriter(element, text) {
        element.textContent = '';
        element.style.borderRight = '2px solid #4299e1';
        
        let index = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(index);
            index++;
            
            if (index >= text.length) {
                clearInterval(timer);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, CONFIG.ANIMATION_TIMING.TYPING_SPEED);
    }
    
    // Efeito ripple para botões
    createRippleEffect(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            z-index: 1000;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), CONFIG.ANIMATION_TIMING.RIPPLE_DURATION);
    }
    
    // Adiciona estilos customizados
    addCustomStyles() {
        if (!document.querySelector('#dynamic-animations')) {
            const style = document.createElement('style');
            style.id = 'dynamic-animations';
            style.textContent = `
                @keyframes subtle-bounce {
                    0% { transform: translateY(20px); }
                    60% { transform: translateY(-5px); }
                    100% { transform: translateY(0); }
                }
                
                @keyframes ripple {
                    to {
                        transform: scale(2.5);
                        opacity: 0;
                    }
                }
                
                @keyframes float {
                    0%, 100% { transform: rotate(0deg) translateY(0px); }
                    50% { transform: rotate(180deg) translateY(-10px); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}
