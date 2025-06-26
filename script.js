
// Configurações e Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeInteractiveElements();
});

// Navegação e Menu
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Atualiza navegação ativa baseada na seção visível
    function updateActiveNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Scroll suave para seções
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header-fixed').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fecha menu mobile se estiver aberto
                const sidebar = document.querySelector('.sidebar');
                if (sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });
    
    // Atualiza navegação no scroll
    window.addEventListener('scroll', updateActiveNavigation);
    updateActiveNavigation(); // Executa uma vez no carregamento
}

// Menu Mobile
function initializeMobileMenu() {
    // Cria botão do menu mobile se não existir
    if (!document.querySelector('.mobile-menu-toggle')) {
        const toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-menu-toggle';
        toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
        toggleButton.setAttribute('aria-label', 'Abrir menu de navegação');
        document.body.appendChild(toggleButton);
        
        const sidebar = document.querySelector('.sidebar');
        
        toggleButton.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            
            // Atualiza ícone do botão
            const icon = this.querySelector('i');
            if (sidebar.classList.contains('active')) {
                icon.className = 'fas fa-times';
                this.setAttribute('aria-label', 'Fechar menu de navegação');
            } else {
                icon.className = 'fas fa-bars';
                this.setAttribute('aria-label', 'Abrir menu de navegação');
            }
        });
        
        // Fecha menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !toggleButton.contains(e.target)) {
                sidebar.classList.remove('active');
                toggleButton.querySelector('i').className = 'fas fa-bars';
                toggleButton.setAttribute('aria-label', 'Abrir menu de navegação');
            }
        });
    }
}

// Animações no Scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Anima elementos filhos com delay
                const children = entry.target.querySelectorAll('.skill-card, .experience-card, .cert-card, .project-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observa todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Prepara elementos para animação
    const animatedElements = document.querySelectorAll('.skill-card, .experience-card, .cert-card, .project-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
}

// Efeitos de Scroll
function initializeScrollEffects() {
    const header = document.querySelector('.header-fixed');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Efeito de transparência no header
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Parallax suave para o hero
        const hero = document.querySelector('.hero-section');
        if (hero && scrollTop < window.innerHeight) {
            const parallaxSpeed = scrollTop * 0.5;
            hero.style.transform = `translateY(${parallaxSpeed}px)`;
        }
        
        lastScrollTop = scrollTop;
    });
}

// Elementos Interativos
function initializeInteractiveElements() {
    // Efeito de digitação no título principal
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        mainTitle.style.borderRight = '2px solid #4299e1';
        
        let index = 0;
        const typingSpeed = 100;
        
        function typeWriter() {
            if (index < text.length) {
                mainTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Remove cursor após terminar
                setTimeout(() => {
                    mainTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Inicia o efeito após um pequeno delay
        setTimeout(typeWriter, 500);
    }
    
    // Contador animado para skills
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon i');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Ripple effect nos botões
    const buttons = document.querySelectorAll('.social-btn, .contact-btn, .project-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Adiciona CSS para animação ripple
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Utilitários
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading para imagens (se houver)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores sem suporte
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('loading');
        });
    }
}

// Performance e otimizações
window.addEventListener('load', function() {
    // Remove loading states
    document.body.classList.remove('loading');
    
    // Inicia lazy loading
    initializeLazyLoading();
    
    // Preload de recursos críticos
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
});

// Tratamento de erros
window.addEventListener('error', function(e) {
    console.error('Erro capturado:', e.error);
    // Aqui você poderia enviar o erro para um serviço de monitoramento
});

// Acessibilidade
document.addEventListener('keydown', function(e) {
    // Navegação por teclado no menu
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        const toggleButton = document.querySelector('.mobile-menu-toggle');
        
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            if (toggleButton) {
                toggleButton.querySelector('i').className = 'fas fa-bars';
                toggleButton.focus();
            }
        }
    }
});

// Modo de alto contraste (opcional)
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
}

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado com sucesso:', registration.scope);
            })
            .catch(registrationError => {
                console.log('Falha no registro do SW:', registrationError);
            });
    });
}

// Analytics e métricas (placeholder)
function trackEvent(eventName, properties = {}) {
    console.log('Evento rastreado:', eventName, properties);
    // Aqui você integraria com Google Analytics, Mixpanel, etc.
}

// Adiciona rastreamento aos links importantes
document.addEventListener('click', function(e) {
    if (e.target.matches('.social-btn, .contact-btn, .project-link')) {
        const linkText = e.target.textContent.trim();
        trackEvent('link_click', { link_text: linkText });
    }
});
