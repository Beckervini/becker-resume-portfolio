
import { CONFIG } from './config.js';

// Classe para gerenciar apenas interações com mouse
export class AnimationManager {
    constructor() {
        this.addCustomStyles();
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
    
    // Adiciona estilos customizados apenas para ripple
    addCustomStyles() {
        if (!document.querySelector('#dynamic-animations')) {
            const style = document.createElement('style');
            style.id = 'dynamic-animations';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2.5);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}
