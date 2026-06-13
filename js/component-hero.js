class InvitacionHero extends HTMLElement {
    connectedCallback() {
        // Inyectamos el HTML limpio de la Portada
        this.innerHTML = `
            <section class="m3-hero">
                <div class="m3-particles" id="particles-container"></div>
                <div class="m3-hero__pattern"></div>
                
                <div class="m3-card-3d-wrapper" id="card-wrapper">
                    <div class="m3-card" id="main-card">
                        <div class="m3-card__border-line"></div>
                        <div class="m3-card__content">
                            <p class="m3-typography--label-large">NUESTRA BODA</p>
                            <h1 class="m3-typography--display-large">Alejandro <span class="m3-ampersand">&amp;</span> Sofía</h1>
                            <p class="m3-typography--headline-medium">12 . 12 . 2026</p>
                            <button class="m3-btn m3-btn--filled" id="btn-open-invitation">
                                <span class="material-symbols-outlined m3-btn__icon">mail</span>
                                <span class="m3-btn__label">Abrir Invitación</span>
                                <span class="m3-btn__glint"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Ejecutamos su interactividad interna
        this.inicializarEfectos();
    }

    inicializarEfectos() {
        const cardWrapper = this.querySelector("#card-wrapper");
        const mainCard = this.querySelector("#main-card");
        const particlesContainer = this.querySelector("#particles-container");

        // Generador de Partículas
        if (particlesContainer) {
            const colors = ['#FFFFFF', '#D0BCFF', '#F3CA65'];
            for (let i = 0; i < 20; i++) {
                const p = document.createElement("div");
                p.classList.add("m3-particle");
                const size = Math.random() * 8 + 4;
                p.style.width = p.style.height = `${size}px`;
                p.style.left = `${Math.random() * 100}%`;
                p.style.color = p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                p.style.animationDuration = `${Math.random() * 7 + 6}s`;
                p.style.animationDelay = `${Math.random() * 6}s`;
                particlesContainer.appendChild(p);
            }
        }

        // Parallax 3D
        if (cardWrapper && mainCard) {
            const moveCard = (clientX, clientY) => {
                const rect = cardWrapper.getBoundingClientRect();
                const x = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
                const y = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
                mainCard.style.transform = `rotateX(${-y * 12}deg) rotateY(${x * 12}deg)`;
            };
            cardWrapper.addEventListener("mousemove", (e) => moveCard(e.clientX, e.clientY));
            cardWrapper.addEventListener("mouseleave", () => mainCard.style.transform = "rotateX(0deg) rotateY(0deg)");
            cardWrapper.addEventListener("touchmove", (e) => { 
                if (e.touches.length > 0) moveCard(e.touches[0].clientX, e.touches[0].clientY); 
            });
            cardWrapper.addEventListener("touchend", () => mainCard.style.transform = "rotateX(0deg) rotateY(0deg)");
        }
    }
}

// Registramos la etiqueta personalizada en el navegador
customElements.define('invitacion-hero', InvitacionHero);
