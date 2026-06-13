/**
 * ARCHIVO: js/main.js
 * DESCRIPCIÓN: Orquestador principal unificado para la activación de módulos M3
 * CONTROLADOS: Hero, Gala, Timeline, Locations y RSVP (Confirmación Etérea)
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Captura centralizada de componentes estructurales (Custom Elements)
    const btnOpen = document.getElementById("btn-open-invitation");
    const heroSection = document.getElementById("hero-section");
    const galaSection = document.getElementById("gala-section");
    const timelineSection = document.getElementById("timeline-section");
    const locationsSection = document.getElementById("locations-section");
    const carouselSection = document.getElementById("carousel-section");
    const rsvpSection = document.getElementById("rsvp-section");
    const footerSection = document.getElementById("footer-section");

    // VALIDACIÓN DE SEGURIDAD INTERNA: Evita que el script muera si falta alguna sección en el HTML
    if (!btnOpen) {
        console.warn("M3 de seguridad: No se detectó el botón 'btn-open-invitation' en el DOM.");
        return; 
    }

    /* ------------------------------------------------------------------
       2. RECEPTOR DEL EVENTO CLIC (DISPARADOR DE LA EXPERIENCIA DIGITAL)
       ------------------------------------------------------------------ */
    btnOpen.addEventListener("click", (e) => {
        
        /* --- MICRO-INTERACCIÓN: EFECTO ONDA EN BOTÓN (RIPPLE EFFECT) --- */
        const oldRipple = btnOpen.querySelector(".m3-ripple-active");
        if (oldRipple) oldRipple.remove(); // Limpieza preventiva de ondas residuales

        const ripple = document.createElement("span");
        ripple.classList.add("m3-ripple", "m3-ripple-active");
        
        // Medidas métricas del botón para que la expansión nazca exactamente bajo el dedo/puntero
        const rect = btnOpen.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        
        btnOpen.appendChild(ripple);

        /* --- SECUENCIA DE CAPAS CINEMATOGRÁFICA (TRANSICIÓN DE ENTRADA) --- */
        setTimeout(() => {
            // Desvanecimiento controlado de la portada (Escalado sutil hacia afuera)
            if (heroSection) {
                heroSection.style.opacity = "0";
                heroSection.style.transform = "scale(1.02)";
                heroSection.style.transition = "opacity 0.45s ease-out, transform 0.45s ease-out";
            }

            setTimeout(() => {
                // Desmontamos físicamente la portada para ahorrar memoria del dispositivo móvil
                if (heroSection) heroSection.style.display = "none";
                
                /* --- ENCENDIDO Y DESPERTAR EN CASCADA DE LOS COMPONENTES --- */
                
                // 1. Portada de gala premium (Foto de fondo & Cuenta regresiva)
                if (galaSection) {
                    galaSection.classList.remove("m3-hidden");
                    void galaSection.offsetWidth; // Forzado de lectura física del DOM para estabilizar transiciones
                    galaSection.classList.add("is-active");
                }
                
                // 2. Historia (Línea del tiempo interactiva con Fade In)
                if (timelineSection) {
                    timelineSection.classList.remove("m3-hidden");
                    timelineSection.classList.add("is-active");
                }
                
                // 3. Mapas (Ubicaciones inteligentes con Fade In/Out según Scroll)
                if (locationsSection) {
                    locationsSection.classList.remove("m3-hidden");
                    locationsSection.classList.add("is-active");
                }
                
                // 4. Galería fotográfica (Carrusel dinámico con Parallax y Lightbox 3D)
                if (carouselSection) {
                    carouselSection.classList.remove("m3-hidden");
                    carouselSection.classList.add("is-active");
                }

                // 5. Cierre Espectacular (Módulo de confirmación etéreo con fulgor)
                if (rsvpSection) {
                    rsvpSection.classList.remove("m3-hidden");
                    rsvpSection.classList.add("is-active");
                }
                if (footerSection) { footerSection.classList.remove("m3-hidden"); footerSection.classList.add("is-active"); }
                /* --- LIBERACIÓN DEL DESLIZAMIENTO GENERAL --- */
                // Pasamos del bloqueo total de la pantalla inicial a permitir scroll vertical infinito
                document.body.style.overflowY = "auto";
                document.documentElement.style.overflowY = "auto";

            }, 450); // Tiempo emparejado con la duración del fade-out del Hero
        }, 350); // Margen de milisegundos para que el invitado aprecie la onda expansiva
    });
});
