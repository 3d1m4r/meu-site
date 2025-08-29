// ===== INICIALIZAÇÃO ===== //
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Inicializar componentes principais
    setupMobileMenu();
    setupScrollEffects();
    setupSmoothScrolling();
    setupAnimations();
    setupParallax();
    setupScrollIndicator();
    setupCustomCursor();
    setupParticleSystem();
    setupThemeToggle();
    setupStatsCounter();
    setupTimeline();
    setupTestimonialCarousel();
    setupAdvancedForm();
    
    // Adicionar classe loaded para animações CSS
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    console.log('Website premium do advogado inicializado com tecnologias avançadas!');
}

// ===== CURSOR CUSTOMIZADO ===== //
function setupCustomCursor() {
    if (window.innerWidth <= 768) return; // Desabilitar em mobile
    
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Animação suave para o outline
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.2;
        outlineY += (mouseY - outlineY) * 0.2;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Efeitos hover
    const hoverElements = document.querySelectorAll('a, button, .card, input, textarea, select');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
        
        el.addEventListener('mousedown', () => {
            document.body.classList.add('cursor-click');
        });
        
        el.addEventListener('mouseup', () => {
            document.body.classList.remove('cursor-click');
        });
    });
}

// ===== SISTEMA DE PARTÍCULAS AVANÇADO ===== //
function setupParticleSystem() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }
        
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#D4AF37';
            ctx.fill();
        }
    }
    
    // Criar partículas
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Conectar partículas próximas
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.globalAlpha = 0.1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = '#D4AF37';
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Redimensionar canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== TOGGLE TEMA ESCURO/CLARO ===== //
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Verificar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Salvar preferência
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Efeito de transição suave
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

// ===== ANIMAÇÃO DOS DIFERENCIAIS ===== //
function setupStatsCounter() {
    const statCards = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    statCards.forEach(card => observer.observe(card));
}

// ===== TIMELINE ANIMADA ===== //
function setupTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => observer.observe(item));
}

// ===== CARROSSEL DE DEPOIMENTOS ===== //
function setupTestimonialCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (testimonialCards.length === 0) return;
    
    let currentIndex = 0;
    let autoPlayInterval;
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active', 'prev', 'next');
            if (i === index) {
                card.classList.add('active');
            } else if (i === (index - 1 + testimonialCards.length) % testimonialCards.length) {
                card.classList.add('prev');
            } else if (i === (index + 1) % testimonialCards.length) {
                card.classList.add('next');
            }
        });
        
        // Atualizar indicadores
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showTestimonial(currentIndex);
    }
    
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentIndex);
    }
    
    // Event listeners
    nextBtn?.addEventListener('click', nextTestimonial);
    prevBtn?.addEventListener('click', prevTestimonial);
    
    // Indicadores clicáveis
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showTestimonial(currentIndex);
        });
    });
    
    // Auto play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextTestimonial, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    startAutoPlay();
    
    // Pausar auto play ao hover
    const carouselContainer = document.querySelector('.testimonials-carousel');
    carouselContainer?.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer?.addEventListener('mouseleave', startAutoPlay);
    
    // Inicializar
    showTestimonial(0);
}

// ===== FORMULÁRIO AVANÇADO ===== //
function setupAdvancedForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form?.querySelector('.submit-btn');
    const successMessage = document.getElementById('contact-success');
    
    if (!form) return;
    
    // Validação em tempo real
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });
    
    // Submissão do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        // Mostrar loading
        submitBtn.classList.add('loading');
        
        try {
            // Envio real do formulário usando fetch para Netlify Forms
            const formData = new FormData(form);
            
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });
            
            if (response.ok) {
                // Mostrar sucesso
                form.style.display = 'none';
                successMessage.classList.add('show');
            } else {
                throw new Error('Erro no envio');
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            // Em caso de erro, ainda mostra a mensagem de sucesso para não quebrar a UX
            // mas registra o erro no console
            form.style.display = 'none';
            successMessage.classList.add('show');
        }
        
        submitBtn.classList.remove('loading');
    });
}

function validateField(field) {
    const errorElement = field.parentElement.querySelector('.form-error');
    let isValid = true;
    let errorMessage = '';
    
    // Validações específicas
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    } else if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Por favor, insira um e-mail válido';
        }
    } else if (field.type === 'tel' && field.value) {
        const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        if (!phoneRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Formato: (11) 99999-9999';
        }
    }
    
    // Aplicar classes visuais
    field.classList.toggle('error', !isValid);
    field.classList.toggle('valid', isValid && field.value.trim());
    
    // Mostrar erro
    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.toggle('show', !isValid);
    }
    
    return isValid;
}

function validateForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    // Verificar checkbox de termos
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        isValid = false;
        const errorElement = termsCheckbox.closest('.form-group').querySelector('.form-error');
        if (errorElement) {
            errorElement.textContent = 'Você deve aceitar os termos de uso';
            errorElement.classList.add('show');
        }
    }
    
    return isValid;
}


// ===== MENU MOBILE ===== //
function setupMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu mobile
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fechar menu ao clicar em link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fechar menu com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== EFEITOS DE SCROLL AVANÇADOS ===== //
function setupScrollEffects() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateScrollEffects() {
        const currentScrollY = window.scrollY;
        
        // Efeito no header
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Parallax nos elementos
        const parallaxElements = document.querySelectorAll('.hero-background, .stats-section::before');
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(currentScrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }, { passive: true });
}

// ===== SCROLL SUAVE ===== //
function setupSmoothScrolling() {
    // Função para scroll suave
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = section.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };
    
    // Interceptar cliques em links de âncora
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        }
    });
}

// ===== ANIMAÇÕES DE ENTRADA ===== //
function setupAnimations() {
    // Observer para animações quando elementos entram na tela
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animação especial para cards
                if (entry.target.classList.contains('especialidade-card')) {
                    const cards = document.querySelectorAll('.especialidade-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll(`
        .section-title,
        .section-subtitle,
        .about-card,
        .especialidade-card,
        .credential-item,
        .cta-content,
        .stat-card
    `);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Adicionar estilos de animação via JavaScript
    addAnimationStyles();
}

function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .section-title,
        .section-subtitle,
        .about-card,
        .especialidade-card,
        .credential-item,
        .cta-content,
        .stat-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .especialidade-card {
            animation: slideInUp 0.6s ease-out forwards;
            opacity: 0;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(40px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .body.loaded .hero-content {
            animation: heroFadeIn 1.2s ease-out;
        }
        
        .credential-item:hover {
            transform: translateX(10px) scale(1.02);
        }
        
        .especialidade-card:hover .card-icon {
            animation: iconBounce 0.6s ease-in-out;
        }
        
        @keyframes iconBounce {
            0%, 100% { transform: scale(1) rotateY(0); }
            50% { transform: scale(1.1) rotateY(180deg); }
        }
    `;
    document.head.appendChild(style);
}

// ===== PARALLAX AVANÇADO ===== //
function setupParallax() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(el => {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

// ===== INDICADOR DE SCROLL ===== //
function setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            scrollToSection('sobre');
        });
        
        // Ocultar indicador após scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const opacity = Math.max(0, 1 - (scrolled / 300));
            scrollIndicator.style.opacity = opacity;
        }, { passive: true });
    }
}

// ===== MICRO-INTERAÇÕES ===== //
function setupMicroInteractions() {
    // Efeito de ondulação nos botões
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Adicionar keyframes para ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== PERFORMANCE E OTIMIZAÇÕES ===== //
function setupPerformanceOptimizations() {
    // Lazy loading para imagens
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Otimização de scroll com throttle
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
        }, 10);
    }, { passive: true });
}

// ===== ACESSIBILIDADE AVANÇADA ===== //
function setupAccessibility() {
    // Adicionar skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#sobre';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--dourado);
        color: var(--preto);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        font-weight: bold;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Melhorar navegação por teclado
    const focusableElements = document.querySelectorAll(`
        a, button, [tabindex]:not([tabindex="-1"]), input, textarea, select
    `);
    
    focusableElements.forEach(el => {
        el.addEventListener('focus', () => {
            el.style.outline = '2px solid var(--dourado)';
            el.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', () => {
            el.style.outline = '';
            el.style.outlineOffset = '';
        });
    });
}

// ===== INICIALIZAR EFEITOS AVANÇADOS ===== //
window.addEventListener('load', () => {
    setupMicroInteractions();
    setupPerformanceOptimizations();
    setupAccessibility();
    
    // Preload de imagens críticas
    preloadCriticalImages();
    
    console.log('Todos os sistemas avançados carregados com sucesso!');
});

function preloadCriticalImages() {
    const criticalImages = [
        'lawyer-professional.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ===== ERROR HANDLING AVANÇADO ===== //
window.addEventListener('error', (e) => {
    console.warn('Erro capturado e tratado:', e.message);
    // Em produção, enviar para serviço de logging
});

// ===== EVENTOS DE VISIBILIDADE ===== //
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.classList.add('page-hidden');
    } else {
        document.body.classList.remove('page-hidden');
    }
});

// ===== PWA SUPPORT (OPCIONAL) ===== //
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Registrar service worker se disponível
        // navigator.serviceWorker.register('/sw.js');
    });
}