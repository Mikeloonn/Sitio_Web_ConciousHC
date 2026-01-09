//Selector CSS de la barra de menú
var navMenu = document.querySelector(".main-nav");

//Selector CSS del botón Hamburguesa
var menuToggle = document.querySelector(".menu-toggle");

//Intercepta el evento click sobre el botón hamburguesa 
menuToggle.onclick = () => {
    navMenu.classList.toggle("show");
}

// main.js

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const contactForm = document.getElementById('mainForm'); // Quitamos "as HTMLFormElement"
    const carouselContainer = document.getElementById('serviceCarousel');

    // 1. Efecto de desplazamiento del encabezado
    window.addEventListener('scroll', () => {
        if (header && scrollTopBtn) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
                scrollTopBtn.style.display = 'block';
            } else {
                header.classList.remove('scrolled');
                scrollTopBtn.style.display = 'none';
            }
        }
    });

    // 2. Botón para volver al inicio
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 3. Manejo simple del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
            contactForm.reset();
        });
    }

    // 4. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Lógica del Carrusel Infinito
    if (carouselContainer) {
        const content = carouselContainer.innerHTML;
        carouselContainer.innerHTML = content + content + content;

        let isDown = false;
        let startX;
        let scrollLeft;
        let animationId; // Quitamos ": number"
        
        const speed = 1; 
        
        const autoScroll = () => {
            if (!isDown) {
                carouselContainer.scrollLeft += speed;
                
                const oneSetWidth = carouselContainer.scrollWidth / 3;
                
                if (carouselContainer.scrollLeft >= oneSetWidth * 2) {
                    carouselContainer.scrollLeft = oneSetWidth;
                } else if (carouselContainer.scrollLeft <= 0) {
                    carouselContainer.scrollLeft = oneSetWidth;
                }
            }
            animationId = requestAnimationFrame(autoScroll);
        };

        // Importante: Esperar a que las imágenes carguen para calcular bien el ancho
        // Si las imágenes no cargan, el scrollWidth puede ser incorrecto.
        window.onload = () => {
             // Ajuste inicial
             carouselContainer.scrollLeft = carouselContainer.scrollWidth / 3;
             // Iniciar animación
             animationId = requestAnimationFrame(autoScroll);
        };

        // Eventos del Mouse
        carouselContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            carouselContainer.classList.add('active');
            startX = e.pageX - carouselContainer.offsetLeft;
            scrollLeft = carouselContainer.scrollLeft;
        });

        carouselContainer.addEventListener('mouseleave', () => {
            isDown = false;
            carouselContainer.classList.remove('active');
        });

        carouselContainer.addEventListener('mouseup', () => {
            isDown = false;
            carouselContainer.classList.remove('active');
        });

        carouselContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carouselContainer.offsetLeft;
            const walk = (x - startX) * 2;
            carouselContainer.scrollLeft = scrollLeft - walk;
        });
    }
});