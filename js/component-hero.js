/**
 * ARCHIVO: js/component-hero.js
 * DESCRIPCIÓN: Portada Premium (Hero) con nombres en relieve y contador de gala integrado
 */

class InvitacionHero extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="m3-hero-section" id="hero-section">
                <div class="m3-hero-bg-overlay"></div>

                <div class="m3-hero-frame">
                    <p class="m3-hero-subtitle">NUESTRA BODA</p>
                    
                    <h1 class="m3-hero-couple-names">
                        <span class="m3-name-glow">Alejandro</span>
                        <span class="m3-name-amp">&</span>
                        <span class="m3-name-glow">Sofía</span>
                    </h1>

                    <p class="m3-hero-date">12 . 12 . 2026</p>

                    <div class="m3-hero-countdown" id="hero-countdown">
                        <div class="m3-countdown-item">
                            <span class="m3-countdown-number" id="countdown-days">00</span>
                            <span class="m3-countdown-label">Días</span>
                        </div>
                        <div class="m3-countdown-item">
                            <span class="m3-countdown-number" id="countdown-hours">00</span>
                            <span class="m3-countdown-label">Horas</span>
                        </div>
                        <div class="m3-countdown-item">
                            <span class="m3-countdown-number" id="countdown-minutes">00</span>
                            <span class="m3-countdown-label">Min</span>
                        </div>
                        <div class="m3-countdown-item">
                            <span class="m3-countdown-number" id="countdown-seconds">00</span>
                            <span class="m3-countdown-label">Seg</span>
                        </div>
                    </div>

                    <div class="m3-hero-seal-container">
                        <div class="m3-wax-seal">
                            <span class="material-symbols-outlined m3-seal-icon">mail</span>
                        </div>
                    </div>

                    <div class="m3-hero-emblem-wrapper">
                        <div class="m3-gold-emblem">
                            <span class="m3-emblem-monogram">A & S</span>
                        </div>
                    </div>

                    <button class="m3-btn-open-premium" id="btn-open-invitation">
                        <span class="m3-btn-text">Desliza o Toca para más magia</span>
                        <span class="material-symbols-outlined m3-btn-icon-pulse">expand_more</span>
                    </button>
                </div>
            </section>
        `;

        this.inicializarContador();
    }

    inicializarContador() {
        // Fecha del evento (12 de Diciembre de 2026 18:00:00)
        const fechaEvento = new Date("Dec 12, 2026 18:00:00").getTime();

        const dd = this.querySelector("#countdown-days");
        const hh = this.querySelector("#countdown-hours");
        const mm = this.querySelector("#countdown-minutes");
        const ss = this.querySelector("#countdown-seconds");

        const actualizarReloj = () => {
            const ahora = new Date().getTime();
            const diferencia = fechaEvento - ahora;

            if (diferencia <= 0) {
                clearInterval(intervalo);
                this.querySelector("#hero-countdown").innerHTML = "<p class='m3-countdown-finished'>¡Llegó el gran día!</p>";
                return;
            }

            // Cálculos matemáticos de tiempo estándar
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

            // Formatear con ceros a la izquierda si es menor a 10
            if(dd) dd.innerText = dias < 10 ? "0" + dias : dias;
            if(hh) hh.innerText = horas < 10 ? "0" + horas : horas;
            if(mm) mm.innerText = minutos < 10 ? "0" + minutos : minutos;
            if(ss) ss.innerText = segundos < 10 ? "0" + segundos : segundos;
        };

        actualizarReloj(); // Ejecución inmediata inicial
        const intervalo = setInterval(actualizarReloj, 1000);
    }
}

customElements.define('invitacion-hero', InvitacionHero);
