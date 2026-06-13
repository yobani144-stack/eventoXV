class InvitacionLocations extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="m3-locations-section">
                
                <div class="m3-locations-header fade-element">
                    <span class="material-symbols-outlined m3-locations__icon">location_on</span>
                    <h2 class="m3-typography--title-locations">¿Dónde y Cuándo?</h2>
                </div>

                <div class="m3-locations-grid">
                    
                    <div class="m3-location-card fade-element">
                        <div class="m3-location-image" style="background-image: url('https://images.unsplash.com/photo-1548625361-195fe61a55ef?q=80&w=1000&auto=format&fit=crop');">
                            <div class="m3-location-tag">Ceremonia</div>
                        </div>
                        <div class="m3-location-info">
                            <h3 class="m3-location-name">Parroquia de San José</h3>
                            <div class="m3-location-details">
                                <p><span class="material-symbols-outlined">calendar_today</span> 12 de Diciembre, 2026</p>
                                <p><span class="material-symbols-outlined">schedule</span> 4:00 PM</p>
                            </div>
                            <a href="https://maps.google.com" target="_blank" class="m3-btn-maps">
                                <span class="material-symbols-outlined">directions</span>
                                Ver en Google Maps
                            </a>
                        </div>
                    </div>

                    <div class="m3-location-card fade-element">
                        <div class="m3-location-image" style="background-image: url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop');">
                            <div class="m3-location-tag">Recepción</div>
                        </div>
                        <div class="m3-location-info">
                            <h3 class="m3-location-name">Hacienda Santa Sofía</h3>
                            <div class="m3-location-details">
                                <p><span class="material-symbols-outlined">calendar_today</span> 12 de Diciembre, 2026</p>
                                <p><span class="material-symbols-outlined">schedule</span> 7:00 PM</p>
                            </div>
                            <a href="https://maps.google.com" target="_blank" class="m3-btn-maps">
                                <span class="material-symbols-outlined">directions</span>
                                Ver en Google Maps
                            </a>
                        </div>
                    </div>

                </div>
            </section>
        `;

        this.setupScrollObserver();
    }

    setupScrollObserver() {
        // Seleccionamos los elementos que queremos animar
        const elements = this.querySelectorAll('.fade-element');
        
        const observerOptions = {
            root: null,
            threshold: 0.1, // Se activa cuando el 10% es visible
            rootMargin: "0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Si el elemento entra en pantalla, añadimos la clase de visibilidad
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    // Si el usuario hace scroll hacia arriba y sale, la quitamos para que "desaparezca"
                    // Solo si sale por la parte de abajo para que sea más natural
                    if (entry.boundingClientRect.top > 0) {
                        entry.target.classList.remove('is-visible');
                    }
                }
            });
        }, observerOptions);

        elements.forEach(el => observer.observe(el));
    }
}

customElements.define('invitacion-locations', InvitacionLocations);
