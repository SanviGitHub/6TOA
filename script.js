document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');
    const header = document.querySelector('header');

    // Toggle de menú en dispositivos móviles
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('show');
        menuToggle.classList.toggle('active');
    });

    // Desplazamiento suave para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('show');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Resaltar la sección activa en la navegación
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Animar las secciones al hacer scroll
    const animateSections = document.querySelectorAll('.animate-section');
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                entry.target.querySelectorAll('.animate__animated').forEach(el => {
                    el.classList.add('animate__fadeInUp');
                });
            }
        });
    }, { threshold: 0.1 });

    animateSections.forEach(section => {
        animateObserver.observe(section);
    });

    // Funcionalidad del toggle de tema (dark mode)
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-adjust', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-adjust');
        }
    });

    // Efecto de escritura para la sección hero
    const typingText = document.querySelector('.typing');
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();

    // Efecto de parallax para la sección hero
    const parallax = document.querySelector('.parallax');
    window.addEventListener('scroll', () => {
        let offset = window.pageYOffset;
        parallax.style.backgroundPositionY = offset * 0.7 + 'px';
    });

    // Animación de números para las edades
    const ageNumbers = document.querySelectorAll('.age-number');
    ageNumbers.forEach(number => {
        const finalNumber = parseInt(number.textContent);
        let currentNumber = 0;
        const interval = setInterval(() => {
            if (currentNumber < finalNumber) {
                currentNumber++;
                number.textContent = currentNumber;
            } else {
                clearInterval(interval);
            }
        }, 100);
    });

    // Efecto de hover para las tarjetas de estudiantes
    const studentCards = document.querySelectorAll('.student-card');
    studentCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05) rotate(2deg)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Animación de scroll para el header
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Animación para los iconos de redes sociales
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(360deg)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Efecto de ondas para el botón CTA
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ctaButton.appendChild(ripple);
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        setTimeout(() => {
            ripple.remove();
        }, 300);
    });
});