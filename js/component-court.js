/**
 * ARCHIVO: js/component-court.js
 * DESCRIPCIÓN: Módulo de Corte de Honor (Padres y Padrinos) con revelado asimétrico
 */

class InvitacionCourt extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="m3-court-section">
                
                <div class="m3-court-block">
                    <div class="m3-court-header fade-court-item">
                        <span class="material-symbols-outlined m3-court__icon">workspace_premium</span>
                        <h2 class="m3-typography--title-court">Con la bendición de nuestros padres</h2>
                    </div>

                    <div class="m3-court-grid">
                        <div class="m3-court-card fade-court-item" style="transition-delay: 0.1s;">
                            <span class="m3-court-role">Padres de Sofía</span>
                            <h3 class="m3-court-name">Roberto Méndez</h3>
                            <h3 class="m3-court-name">Elena Rostova</h3>
                        </div>

                        <div class="m3-court-card fade-court-item" style="transition-delay: 0.25s;">
                            <span class="m3-court-role">Padres de Alejandro</span>
                            <h3 class="m3-court-name">Carlos Villanueva</h3>
                            <h3 class="m3-court-name">Patricia Benítez</h3>
                        </div>
                    </div>
                </div>

                <div class="m3-court-block" style="margin-top: 80px;">
                    <div class="m3-court-header fade-court-item">
                        <span class="material-symbols-outlined m3-court__icon">auto_awesome</span>
                        <h2 class="m3-typography--title-court">Nuestros Padrinos</h2>
                    </div>

                    <div class="m3-court-grid">
                        <div class="m3-court-card fade-court-item" style="transition-delay: 0.1s;">
                            <span class="m3-court-role">Padrinos de Velación</span>
                            <h3 class="m3-court-name">Ricardo Silva</h3>
                            <h3 class="m3-court-name">Gabriela Mendoza</h3>
                        </div>

                        <div class="m3-court-card fade-court-item" style="transition-delay: 0.25s;">
                            <span class="m3-court-role">Padrinos de Anillos</span>
                            <h3 class="m3-court-name">Fernando Gómez</h3>
                            <h3 class="m3-court-name">Mónica Herrera</h3>
                        </div>
                    </div>
                </div>

            </section>
        `;

        this.inicializarScrollObserver();
    }

    inicializarScrollObserver() {
        const elements = this.querySelectorAll('.fade-court-item');
        
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    if (entry.boundingClientRect.top > 0) {
                        entry.target.classList.remove('is-visible');
                    }
                }
            });
        }, observerOptions);

        elements.forEach(el => observer.observe(el));
    }
}

customElements.define('invitacion-court', InvitacionCourt);
