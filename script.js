// Configurações e Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeInteractiveElements();
    initializeIntersectionObserver();
});

// Navegação e Menu com Melhor Destaque Ativo
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Atualiza navegação ativa baseada na seção visível
    function updateActiveNavigation() {
        let current = '';
        const scrollPosition = window.pageYOffset + 200; // Offset para melhor detecção
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Se nenhuma seção foi detectada e estamos no topo, ativar "sobre"
        if (!current && window.pageYOffset < 300) {
            current = 'sobre';
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                
                // Adiciona um pequeno efeito de pulso ao item ativo
                link.style.transform = 'translateX(6px) scale(1.05)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 200);
            }
        });
    }
    
    // Scroll suave para seções com melhor offset
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header-fixed').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 30;
                
                // Scroll suave personalizado
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fecha menu mobile se estiver aberto
                const sidebar = document.querySelector('.sidebar');
                if (sidebar && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                }
                
                // Adiciona feedback visual imediato
                this.style.background = 'linear-gradient(135deg, #3182ce, #2c5aa0)';
                setTimeout(() => {
                    this.style.background = '';
                }, 300);
            }
        });
    });
    
    // Throttle para melhor performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateActiveNavigation);
            ticking = true;
            setTimeout(() => { ticking = false; }, 10);
        }
    }
    
    window.addEventListener('scroll', requestTick);
    updateActiveNavigation(); // Executa uma vez no carregamento
}

// Sistema de Animações Aprimorado
function initializeScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const cards = document.querySelectorAll('.skill-card, .experience-card, .cert-card, .project-card');
    
    // Preparar elementos para animação
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
    });
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    });
}

// Intersection Observer para Animações Suaves
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                
                // Anima a seção principal
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
                section.classList.add('visible');
                
                // Anima elementos filhos com delay escalonado
                const animatedElements = section.querySelectorAll('.skill-card, .experience-card, .cert-card, .project-card, .content-card, .formation-card');
                
                animatedElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                        
                        // Adiciona um pequeno bounce
                        element.style.animation = 'subtle-bounce 0.6s ease';
                    }, index * 150);
                });
                
                // Para de observar após animar
                sectionObserver.unobserve(section);
            }
        });
    }, observerOptions);
    
    // Observa todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Adiciona CSS da animação bounce
    if (!document.querySelector('#bounce-animation')) {
        const style = document.createElement('style');
        style.id = 'bounce-animation';
        style.textContent = `
            @keyframes subtle-bounce {
                0% { transform: translateY(20px); }
                60% { transform: translateY(-5px); }
                100% { transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
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

// Efeitos de Scroll Aprimorados
function initializeScrollEffects() {
    const header = document.querySelector('.header-fixed');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Efeito de transparência no header com transição mais suave
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        // Parallax muito sutil para o hero
        const hero = document.querySelector('.hero-section');
        if (hero && scrollTop < window.innerHeight) {
            const parallaxSpeed = scrollTop * 0.3;
            hero.style.transform = `translateY(${parallaxSpeed}px)`;
        }
        
        // Efeito sutil no sidebar durante scroll
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && scrollTop > 100) {
            sidebar.style.transform = 'translateY(-50%) scale(0.98)';
        } else if (sidebar) {
            sidebar.style.transform = 'translateY(-50%) scale(1)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Elementos Interativos Aprimorados
function initializeInteractiveElements() {
    // Efeito de digitação no título principal
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        mainTitle.style.borderRight = '2px solid #4299e1';
        
        let index = 0;
        const typingSpeed = 80;
        
        function typeWriter() {
            if (index < text.length) {
                mainTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Remove cursor após terminar com fade
                setTimeout(() => {
                    mainTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Inicia o efeito após um pequeno delay
        setTimeout(typeWriter, 800);
    }
    
    // Interações aprimoradas para skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(10deg)';
                icon.style.color = '#3182ce';
            }
            this.style.borderColor = '#4299e1';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = '#4299e1';
            }
            this.style.borderColor = 'rgba(226, 232, 240, 0.8)';
        });
    });
    
    // Ripple effect melhorado
    const buttons = document.querySelectorAll('.social-btn, .contact-btn, .project-link, .nav-link');
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
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: none;
                z-index: 1000;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
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
                    transform: scale(2.5);
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
});

// Acessibilidade
document.addEventListener('keydown', function(e) {
    // Navegação por teclado no menu
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        const toggleButton = document.querySelector('.mobile-menu-toggle');
        
        if (sidebar && sidebar.classList.contains('active')) {
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
    // Aqui você poderia enviar o erro para um serviço de monitoramento
}

// Adiciona rastreamento aos links importantes
document.addEventListener('click', function(e) {
    if (e.target.matches('.social-btn, .contact-btn, .project-link')) {
        const linkText = e.target.textContent.trim();
        trackEvent('link_click', { link_text: linkText });
    }
});
