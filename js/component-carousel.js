class InvitacionCarousel extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="m3-carousel-section">
                
                <div class="m3-carousel-header scroll-fade">
                    <span class="material-symbols-outlined m3-carousel__icon">photo_library</span>
                    <h2 class="m3-typography--title-carousel">Nuestros Momentos</h2>
                    <p class="m3-typography--subtitle-carousel">Un vistazo a los instantes que han marcado nuestra historia</p>
                </div>

                <div class="m3-carousel-track">
                    
                    <div class="m3-carousel-item scroll-fade">
                        <div class="m3-carousel-img-container">
                            <img src="https://picsum.photos/800/1000?random=1" alt="Momento Especial 1" class="m3-parallax-img">
                            <div class="m3-img-overlay-card"><span>Cómplices</span></div>
                        </div>
                    </div>

                    <div class="m3-carousel-item scroll-fade">
                        <div class="m3-carousel-img-container">
                            <img src="https://picsum.photos/800/1000?random=2" alt="Momento Especial 2" class="m3-parallax-img">
                            <div class="m3-img-overlay-card"><span>Aventuras</span></div>
                        </div>
                    </div>

                    <div class="m3-carousel-item scroll-fade">
                        <div class="m3-carousel-img-container">
                            <img src="https://picsum.photos/800/1000?random=3" alt="Momento Especial 3" class="m3-parallax-img">
                            <div class="m3-img-overlay-card"><span>Nuestra Calma</span></div>
                        </div>
                    </div>

                </div>

                <div class="m3-lightbox" id="carousel-lightbox">
                    <button class="m3-lightbox-close"><span class="material-symbols-outlined">close</span></button>
                    <div class="m3-lightbox-card" id="lightbox-card-3d">
                        <img src="" alt="Vista Expandida" id="lightbox-img">
                        <p id="lightbox-caption"></p>
                    </div>
                </div>

            </section>
        `;

        this.inicializarEfectos();
    }

    inicializarEfectos() {
        const items = this.querySelectorAll('.scroll-fade');
        const parallaxImages = this.querySelectorAll('.m3-parallax-img');
        const lightbox = this.querySelector('#carousel-lightbox');
        const lightboxImg = this.querySelector('#lightbox-img');
        const lightboxCaption = this.querySelector('#lightbox-caption');
        const lightboxCard = this.querySelector('#lightbox-card-3d');
        const closeBtn = this.querySelector('.m3-lightbox-close');

        /* ------------------------------------------------------------------
           A. INTERSECTION OBSERVER (APARECER/DESAPARECER AL SCROLLEAR)
           ------------------------------------------------------------------ */
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    // Desaparece dinámicamente si sale por abajo
                    if (entry.boundingClientRect.top > 0) {
                        entry.target.classList.remove('is-visible');
                    }
                }
            });
        }, observerOptions);

        items.forEach(item => observer.observe(item));

        /* ------------------------------------------------------------------
           B. PARALLAX EFECTO MOVIMIENTO INTERNO
           ------------------------------------------------------------------ */
        window.addEventListener('scroll', () => {
            parallaxImages.forEach(img => {
                const rect = img.parentElement.getBoundingClientRect();
                const viewHeight = window.innerHeight;
                
                // Si el contenedor de la imagen es visible en pantalla
                if (rect.top < viewHeight && rect.bottom > 0) {
                    const shift = (viewHeight - rect.top) * 0.08; // Factor de velocidad del parallax
                    img.style.transform = `translateY(${shift - 30}px) scale(1.15)`;
                }
            });
        });

        /* ------------------------------------------------------------------
           C. INTERACTIVIDAD AL CLIC (LIGHTBOX CON EFECTO 3D)
           ------------------------------------------------------------------ */
        this.querySelectorAll('.m3-carousel-img-container').forEach(container => {
            container.addEventListener('click', () => {
                const img = container.querySelector('img');
                const span = container.querySelector('.m3-img-overlay-card span');
                
                lightboxImg.src = img.src;
                lightboxCaption.innerText = span.innerText;
                lightbox.classList.add('is-active');
                document.body.style.overflow = 'hidden'; // Bloquea scroll de fondo
            });
        });

        // Cerrar Modal
        const cerrarModal = () => {
            lightbox.classList.remove('is-active');
            lightboxCard.style.transform = "rotateX(0deg) rotateY(0deg)";
            document.body.style.overflowY = 'auto';
        };

        closeBtn.addEventListener('click', cerrarModal);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) cerrarModal(); });

        // Efecto 3D Giro giroscópico/cursor dentro del Lightbox Abierto
        lightbox.addEventListener('mousemove', (e) => {
            if (!lightbox.classList.contains('is-active')) return;
            const width = window.innerWidth;
            const height = window.innerHeight;
            const xAxis = (width / 2 - e.clientX) / 25;
            const yAxis = (height / 2 - e.clientY) / 25;
            lightboxCard.style.transform = `rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }
}

customElements.define('invitacion-carousel', InvitacionCarousel);
