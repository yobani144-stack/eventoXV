/**
 * ARCHIVO: js/component-carousel.js
 * DESCRIPCIÓN: Carrusel horizontal interactivo con soporte táctil, flechas y dots
 */

class InvitacionCarousel extends HTMLElement {
    connectedCallback() {
        // Lista de imágenes (puedes sustituir las URLs por tus fotos reales)
        const imagenes = [
            "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600",
            "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600"
        ];

        this.currentIndex = 0;

        let slidesHTML = "";
        let dotsHTML = "";

        imagenes.forEach((img, index) => {
            slidesHTML += `
                <div class="m3-carousel-slide ${index === 0 ? 'is-active' : ''}">
                    <img src="${img}" alt="Momento de la pareja ${index + 1}" loading="lazy">
                </div>
            `;
            dotsHTML += `
                <button class="m3-carousel-dot ${index === 0 ? 'is-active' : ''}" data-index="${index}" aria-label="Ir a foto ${index + 1}"></button>
            `;
        });

        this.innerHTML = `
            <section class="m3-carousel-section fade-carousel-item">
                <div class="m3-carousel-header">
                    <span class="material-symbols-outlined m3-carousel-icon">photo_library</span>
                    <h2 class="m3-typography--title-carousel">Nuestros Momentos</h2>
                </div>

                <div class="m3-carousel-container">
                    
                    <button class="m3-carousel-nav m3-prev" id="btn-carousel-prev" aria-label="Foto anterior">
                        <span class="material-symbols-outlined">chevron_left</span>
                    </button>

                    <div class="m3-carousel-track-wrapper">
                        <div class="m3-carousel-track" id="carousel-track">
                            ${slidesHTML}
                        </div>
                    </div>

                    <button class="m3-carousel-nav m3-next" id="btn-carousel-next" aria-label="Siguiente foto">
                        <span class="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>

                <div class="m3-carousel-dots">
                    ${dotsHTML}
                </div>
            </section>
        `;

        // Vinculación de elementos del DOM interno
        this.track = this.querySelector("#carousel-track");
        this.slides = this.querySelectorAll(".m3-carousel-slide");
        this.dots = this.querySelectorAll(".m3-carousel-dot");
        this.btnPrev = this.querySelector("#btn-carousel-prev");
        this.btnNext = this.querySelector("#btn-carousel-next");

        this.inicializarEventos();
        this.inicializarScrollObserver();
    }

    inicializarEventos() {
        // Navegación por flechas
        this.btnPrev.addEventListener("click", () => this.irAIndex(this.currentIndex - 1));
        this.btnNext.addEventListener("click", () => this.irAIndex(this.currentIndex + 1));

        // Navegación por clicks en los puntos (dots)
        this.dots.forEach(dot => {
            dot.addEventListener("click", (e) => {
                const index = parseInt(e.target.getAttribute("data-index"));
                this.irAIndex(index);
            });
        });

        // Soporte de gestos táctiles (Swipe) para celulares
        let startX = 0;
        this.track.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        this.track.addEventListener("touchend", (e) => {
            let endX = e.changedTouches[0].clientX;
            let diffX = startX - endX;

            if (Math.abs(diffX) > 50) { // Umbral de sensibilidad
                if (diffX > 0) {
                    this.irAIndex(this.currentIndex + 1); // Deslizó a la izquierda -> Siguiente
                } else {
                    this.irAIndex(this.currentIndex - 1); // Deslizó a la derecha -> Anterior
                }
            }
        }, { passive: true });
    }

    irAIndex(index) {
        // Control de bucle infinito (circular)
        if (index < 0) {
            index = this.slides.length - 1;
        } else if (index >= this.slides.length) {
            index = 0;
        }

        this.currentIndex = index;

        // Desplazamiento físico del riel mediante transformaciones CSS de hardware acelerado
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;

        // Actualización de estados activos en diapositivas y puntos indicativos
        this.slides.forEach((slide, idx) => {
            slide.classList.toggle("is-active", idx === this.currentIndex);
        });

        this.dots.forEach((dot, idx) => {
            dot.classList.toggle("is-active", idx === this.currentIndex);
        });
    }

    inicializarScrollObserver() {
        const content = this.querySelector('.fade-carousel-item');
        const observerOptions = { root: null, threshold: 0.1 };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        if (content) observer.observe(content);
    }
}

customElements.define('invitacion-carousel', InvitacionCarousel);
