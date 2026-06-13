/**
 * ARCHIVO: js/main.js
 * DESCRIPCIÓN: Orquestador central M3 con soporte para Corte de Honor e Inyección de Audio
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Captura centralizada de componentes estructurales
    const btnOpen = document.getElementById("btn-open-invitation");
    const heroSection = document.getElementById("hero-section");
    const galaSection = document.getElementById("gala-section");
    const timelineSection = document.getElementById("timeline-section");
    const locationsSection = document.getElementById("locations-section");
    const carouselSection = document.getElementById("carousel-section");
    const courtSection = document.getElementById("court-section"); // Corte de Honor
    const rsvpSection = document.getElementById("rsvp-section");
    const footerSection = document.getElementById("footer-section");
    const audioSection = document.getElementById("audio-section");

    if (!btnOpen) return;

    btnOpen.addEventListener("click", (e) => {
        
        /* --- EFECTO ONDA NATIVO (RIPPLE EFFECT) --- */
        const oldRipple = btnOpen.querySelector(".m3-ripple-active");
        if (oldRipple) oldRipple.remove();
        const ripple = document.createElement("span");
        ripple.classList.add("m3-ripple", "m3-ripple-active");
        const rect = btnOpen.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        btnOpen.appendChild(ripple);

        /* --- DISPARO DE MÚSICA DE FONDO --- */
        if (audioSection) {
            audioSection.activarMusicaInicial();
        }

        /* --- TRANSICIÓN DE CAPAS CINEMATOGRÁFICAS --- */
        setTimeout(() => {
            if (heroSection) {
                heroSection.style.opacity = "0";
                heroSection.style.transform = "scale(1.02)";
                heroSection.style.transition = "opacity 0.45s ease-out, transform 0.45s ease-out";
            }

            setTimeout(() => {
                if (heroSection) heroSection.style.display = "none";
                
                // Encendido en cascada seguro de todos los módulos
                if (galaSection) { galaSection.classList.remove("m3-hidden"); void galaSection.offsetWidth; galaSection.classList.add("is-active"); }
                if (timelineSection) { timelineSection.classList.remove("m3-hidden"); timelineSection.classList.add("is-active"); }
                if (locationsSection) { locationsSection.classList.remove("m3-hidden"); locationsSection.classList.add("is-active"); }
                if (carouselSection) { carouselSection.classList.remove("m3-hidden"); carouselSection.classList.add("is-active"); }
                if (courtSection) { courtSection.classList.remove("m3-hidden"); courtSection.classList.add("is-active"); } // Activación de Corte
                if (rsvpSection) { rsvpSection.classList.remove("m3-hidden"); rsvpSection.classList.add("is-active"); }
                if (footerSection) { footerSection.classList.remove("m3-hidden"); footerSection.classList.add("is-active"); }
                
                document.body.style.overflowY = "auto";
                document.documentElement.style.overflowY = "auto";
            }, 450);
        }, 350);
    });
});
