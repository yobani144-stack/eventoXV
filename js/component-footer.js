/**
 * ARCHIVO: js/component-footer.js
 * DESCRIPCIÓN: Módulo de cierre con botón de informes premium ultra-identificable
 */

class InvitacionFooter extends HTMLElement {
    connectedCallback() {
        const enlaceDiseñador = "https://wa.me/527291255411?text=Hola!%20Vi%20la%20invitacion%20digital%20de%20Alejandro%20y%20Sofia%20y%20me%20gustaria%20pedir%20informes%20para%20un%20evento.";

        this.innerHTML = `
            <footer class="m3-footer-section">
                <div class="m3-footer-content fade-footer-item">
                    
                    <p class="m3-footer-thanks">Cada momento es más valioso si lo compartimos contigo.</p>
                    <h4 class="m3-footer-couple">Alejandro & Sofía</h4>
                    <p class="m3-footer-date">12 . 12 . 2026</p>

                    <div class="m3-footer-divider"></div>

                    <div class="m3-designer-card">
                        <p class="m3-designer-text">¿Quieres una invitación inteligente para tu gran evento?</p>
                        
                        <a href="${enlaceDiseñador}" target="_blank" class="m3-btn-designer">
                            <span class="material-symbols-outlined m3-icon-btn-designer">auto_awesome</span>
                            <span>Cotizar Invitación Digital</span>
                            <span class="m3-designer-pulse"></span>
                        </a>
                    </div>

                </div>
            </footer>
        `;

        this.inicializarScroll();
    }

    inicializarScroll() {
        const content = this.querySelector('.fade-footer-item');
        const observerOptions = { root: null, threshold: 0.15 };

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

        if (content) observer.observe(content);
    }
}

customElements.define('invitacion-footer', InvitacionFooter);
