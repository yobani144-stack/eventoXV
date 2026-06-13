/**
 * ARCHIVO: js/component-audio.js
 * DESCRIPCIÓN: Controlador de audio en segundo plano con reproductor interactivo flotante M3
 */

class InvitacionAudio extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <audio id="m3-background-audio" src="img/perfect.mp3" loop></audio>
 
            <button class="m3-audio-fab" id="m3-audio-toggle" aria-label="Controlar música">
                <div class="m3-audio-waves" id="m3-waves-container">
                    <span class="m3-wave-bar"></span>
                    <span class="m3-wave-bar"></span>
                    <span class="m3-wave-bar"></span>
                </div>
                <span class="material-symbols-outlined m3-audio-icon-muted" id="m3-mute-icon">music_off</span>
            </button>
        `;

        this.audio = this.querySelector("#m3-background-audio");
        this.fab = this.querySelector("#m3-audio-toggle");
        this.waves = this.querySelector("#m3-waves-container");
        this.muteIcon = this.querySelector("#m3-mute-icon");

        this.inicializarControlador();
    }

    inicializarControlador() {
        // Evento de clic en el FAB para pausar o reanudar de forma manual
        this.fab.addEventListener("click", () => {
            if (this.audio.paused) {
                this.reproducirAudio();
            } else {
                this.pausarAudio();
            }
        });
    }

    reproducirAudio() {
        this.audio.play()
            .then(() => {
                this.fab.classList.remove("is-muted");
                this.waves.classList.add("is-playing");
                this.muteIcon.style.display = "none";
            })
            .catch(err => console.log("Interacción requerida para reproducir audio:", err));
    }

    pausarAudio() {
        this.audio.pause();
        this.fab.classList.add("is-muted");
        this.waves.classList.remove("is-playing");
        this.muteIcon.style.display = "block";
    }

    // Método público que será invocado por el main.js al abrir la invitación
    activarMusicaInicial() {
        // Hace visible el botón flotante en la esquina con una transición fluida
        this.fab.classList.add("is-visible");
        this.reproducirAudio();
    }
}

customElements.define('invitacion-audio', InvitacionAudio);
