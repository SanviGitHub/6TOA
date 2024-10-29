document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');

    // Toggle de menú en dispositivos móviles
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('show');
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
});
