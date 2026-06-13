class InvitacionTimeline extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="m3-timeline-section">
                
                <div class="m3-timeline-header">
                    <span class="material-symbols-outlined m3-timeline__icon">history_edu</span>
                    <h2 class="m3-typography--title-timeline">Nuestra Historia</h2>
                    <p class="m3-typography--subtitle-timeline">Cada pequeño paso nos trajo hasta este día tan especial</p>
                </div>

                <div class="m3-timeline-container">
                    <div class="m3-timeline-line"></div>

                    <div class="m3-timeline-item">
                        <div class="m3-timeline-badge">
                            <span class="material-symbols-outlined">coffee</span>
                        </div>
                        <div class="m3-timeline-content">
                            <span class="m3-timeline-year">2018</span>
                            <h3 class="m3-timeline-node-title">El Primer Café</h3>
                            <p class="m3-timeline-node-text">Donde las horas parecieron minutos. Una plática improvisada que se convirtió en el inicio de la conversación más larga de nuestras vidas.</p>
                        </div>
                    </div>

                    <div class="m3-timeline-item">
                        <div class="m3-timeline-badge">
                            <span class="material-symbols-outlined">flight_takeoff</span>
                        </div>
                        <div class="m3-timeline-content">
                            <span class="m3-timeline-year">2020</span>
                            <h3 class="m3-timeline-node-title">Nuestra Primera Aventura</h3>
                            <p class="m3-timeline-node-text">Descubrimos que viajar juntos no solo era conocer nuevos lugares, sino darnos cuenta de que encajábamos perfectamente en cualquier rincón del mundo.</p>
                        </div>
                    </div>

                    <div class="m3-timeline-item">
                        <div class="m3-timeline-badge">
                            <span class="material-symbols-outlined">maps_home_work</span>
                        </div>
                        <div class="m3-timeline-content">
                            <span class="m3-timeline-year">2023</span>
                            <h3 class="m3-timeline-node-title">Un Nuevo Comienzo</h3>
                            <p class="m3-timeline-node-text">Decidimos dar el gran paso de construir un hogar. Entre mudanzas, risas y tazas de café por la mañana, consolidamos nuestro mejor equipo.</p>
                        </div>
                    </div>

                    <div class="m3-timeline-item">
                        <div class="m3-timeline-badge">
                            <span class="material-symbols-outlined">favorite</span>
                        </div>
                        <div class="m3-timeline-content">
                            <span class="m3-timeline-year">2025</span>
                            <h3 class="m3-timeline-node-title">El "¡Sí, acepto!"</h3>
                            <p class="m3-timeline-node-text">Bajo el escenario más romántico y con el corazón latiendo a mil, prometimos entrelazar nuestros destinos para siempre. ¡Y hoy queremos celebrarlo contigo!</p>
                        </div>
                    </div>

                </div>
            </section>
        `;

        this.inicializarScrollEfectos();
    }

    inicializarScrollEfectos() {
        // Usamos Intersection Observer para revelar los hitos conforme el usuario baja la pantalla
        const items = this.querySelectorAll('.m3-timeline-item');
        const observerOptions = {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entries[0].target.closest('invitacion-gala')) return; // Evita falsos disparos
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        items.forEach(item => observer.observe(item));
    }
}

customElements.define('invitacion-timeline', InvitacionTimeline);
