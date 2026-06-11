class InvitacionGala extends HTMLElement {
   connectedCallback() {
        this.innerHTML = `
            <section class="m3-content-section">
                <div class="m3-hero-bg-wrapper">
                    <div class="m3-hero-bg-image" style="background-image: url('https://picsum.photos/1080/1920');"></div>
                    <div class="m3-hero-bg-overlay"></div>
                </div>

                <div class="m3-gala-container">
                    
                    <div class="m3-card-section m3-gala-header">
                        <span class="material-symbols-outlined m3-gala__icon">celebration</span>
                        <h2 class="m3-typography--title-large">¡Estás Invitado!</h2>
                        <p class="m3-typography--body-medium">Acompáñanos a celebrar nuestra historia de amor</p>
                    </div>

                    <div class="m3-card-section m3-gala-countdown">
                        <p class="m3-countdown__title">FALTAN SÓLO:</p>
                        <div class="m3-countdown__grid">
                            <div class="m3-countdown__box">
                                <span class="m3-countdown__number" id="timer-days">00</span>
                                <span class="m3-countdown__label">Días</span>
                            </div>
                            <div class="m3-countdown__box">
                                <span class="m3-countdown__number" id="timer-hours">00</span>
                                <span class="m3-countdown__label">Hrs</span>
                            </div>
                            <div class="m3-countdown__box">
                                <span class="m3-countdown__number" id="timer-minutes">00</span>
                                <span class="m3-countdown__label">Min</span>
                            </div>
                            <div class="m3-countdown__box">
                                <span class="m3-countdown__number" id="timer-seconds">00</span>
                                <span class="m3-countdown__label">Seg</span>
                            </div>
                        </div>
                    </div>

                    <div class="m3-scroll-indicator">
                        <span class="material-symbols-outlined">keyboard_double_arrow_down</span>
                        <p class="m3-typography--label-small">Desliza para ver detalles</p>
                    </div>

                </div>
            </section>
        `;

        this.inicializarContador();
    }

    inicializarContador() {
        const targetDate = new Date("December 12, 2026 18:00:00").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference < 0) {
                clearInterval(countdownInterval);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            const dDays = this.querySelector("#timer-days");
            const dHours = this.querySelector("#timer-hours");
            const dMins = this.querySelector("#timer-minutes");
            const dSecs = this.querySelector("#timer-seconds");

            if (dDays) dDays.innerText = days < 10 ? "0" + days : days;
            if (dHours) dHours.innerText = hours < 10 ? "0" + hours : hours;
            if (dMins) dMins.innerText = minutes < 10 ? "0" + minutes : minutes;
            if (dSecs) dSecs.innerText = seconds < 10 ? "0" + seconds : seconds;
        };

        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }
}

customElements.define('invitacion-gala', InvitacionGala);
