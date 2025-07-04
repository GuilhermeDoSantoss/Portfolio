// Animações e interatividade
document.addEventListener('DOMContentLoaded', function() {
    // Animação de fade in para textos
    const fadeElements = document.querySelectorAll('.fade-in');
    const skillCards = document.querySelectorAll('.skill-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Animação para skill cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100); // Adiciona delay para efeito cascata
            }
        });
    }, {
        threshold: 0.1
    });

    skillCards.forEach(card => {
        cardObserver.observe(card);
    });

    // Efeito de hover com gradiente nos cards
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--light-bg), var(--white))`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--white)';
        });
    });

    // Animação de typing para títulos
    const titles = document.querySelectorAll('h2, h3');
    titles.forEach(title => {
        title.style.opacity = '0';
        let observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    title.style.opacity = '1';
                    title.classList.add('typing-animation');
                }
            });
        });
        observer.observe(title);
    });

    // Animação para as tags do hero
    const heroTags = document.querySelectorAll('.hero-tags span');
    
    const tagObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200); // Delay escalonado para cada tag
            }
        });
    }, {
        threshold: 0.1
    });

    heroTags.forEach(tag => {
        tagObserver.observe(tag);
        
        // Efeito de hover avançado
        tag.addEventListener('mousemove', (e) => {
            const rect = tag.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const shine = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2), transparent)`;
            tag.style.backgroundImage = `${shine}, linear-gradient(135deg, var(--primary-color), var(--accent-color))`;
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.backgroundImage = 'linear-gradient(135deg, var(--primary-color), var(--accent-color))';
        });
    });
});

// Efeito de parallax suave no scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.skill-card');
    
    parallaxElements.forEach(element => {
        const speed = 0.05;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Alterna o ícone do menu
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

// Fecha o menu ao rolar a página
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
    lastScrollTop = scrollTop;
});

// Adicione também estas funções para melhorar a performance em mobile
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

// Otimiza o efeito de parallax para mobile
const optimizedParallax = debounce(() => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.skill-card');
    
    if (window.innerWidth > 768) {
        parallaxElements.forEach(element => {
            const speed = 0.05;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
}, 10);

window.addEventListener('scroll', optimizedParallax);

// Ajusta a altura do hero section em mobile
function adjustHeroHeight() {
    const hero = document.querySelector('.hero');
    const vh = window.innerHeight;
    hero.style.minHeight = `${vh}px`;
}

window.addEventListener('resize', debounce(adjustHeroHeight, 250));
window.addEventListener('load', adjustHeroHeight);

// Inicialização das animações AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Animação das barras de progresso
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.level-bar');
    skillBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 500);
    });
}

// Observer para as skill cards
const skillCardsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            animateSkillBars();
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.soft-skill-card').forEach(card => {
    skillCardsObserver.observe(card);
});

// Efeito de hover avançado para as skill cards
document.querySelectorAll('.soft-skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.transform = `
            perspective(1000px)
            rotateX(${(y - rect.height/2) / 20}deg)
            rotateY(${(x - rect.width/2) / 20}deg)
            translateZ(10px)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
    });
});

// Inicialização do AOS com configurações específicas para títulos
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    anchorPlacement: 'top-bottom'
});

// Função para animar os títulos
function animateSectionTitles() {
    const titles = document.querySelectorAll('.section-title');
    
    titles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.classList.add('hover-effect');
        });

        title.addEventListener('mouseleave', () => {
            title.classList.remove('hover-effect');
        });
    });
}

// Observador de interseção para animações dos títulos
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Anima a linha inferior
            const underline = entry.target.querySelector('.title-wrapper::before');
            if (underline) {
                underline.style.transform = 'scaleX(1)';
            }
        }
    });
}, {
    threshold: 0.5
});

// Aplicar o observer a todos os títulos
document.querySelectorAll('.section-title').forEach(title => {
    titleObserver.observe(title);
});

// Inicializar as animações quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    animateSectionTitles();
}); 

// WhatsApp functions
function openWhatsApp() {
  const phoneNumber = "5521990459497";
  const message = "Olá Guilherme, gostei do seu portfólio, podemos conversar!?."
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank")
}