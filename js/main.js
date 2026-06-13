/**
 * ARCHIVO: js/main.js
 * DESCRIPCIÓN: Orquestador principal de transiciones y flujos entre módulos M3
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Captura de los contenedores de los componentes web (Custom Elements)
    const btnOpen = document.getElementById("btn-open-invitation");
    const heroSection = document.getElementById("hero-section");
    const galaSection = document.getElementById("gala-section");
    const timelineSection = document.getElementById("timeline-section");

    // Validamos que los tres pilares iniciales existan en el DOM antes de colgar el evento
    if (btnOpen && heroSection && galaSection) {
        
        btnOpen.addEventListener("click", (e) => {
            
            /* ------------------------------------------------------------------
               1. EFECTO ONDA NATIVO MATERIAL DESIGN 3 (RIPPLE EFFECT)
               ------------------------------------------------------------------ */
            const oldRipple = btnOpen.querySelector(".m3-ripple-active");
            if (oldRipple) oldRipple.remove(); // Limpieza de seguridad de ondas previas

            const ripple = document.createElement("span");
            ripple.classList.add("m3-ripple", "m3-ripple-active");
            
            // Medidas matemáticas para centrar la onda justo donde el dedo o cursor presionó
            const rect = btnOpen.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            
            btnOpen.appendChild(ripple);

            /* ------------------------------------------------------------------
               2. SECUENCIA DE TRANSICIÓN ULTRA FLUIDA CINEMATOGRÁFICA
               ------------------------------------------------------------------ */
            setTimeout(() => {
                // Desvanecimiento suave de la portada (Se escala un 2% simulando alejamiento)
                heroSection.style.opacity = "0";
                heroSection.style.transform = "scale(1.02)";
                heroSection.style.transition = "opacity 0.45s ease-out, transform 0.45s ease-out";

                setTimeout(() => {
                    // Removemos físicamente el Hero para liberar memoria gráfica del dispositivo
                    heroSection.style.display = "none";
                    
                    // 1. Despertamos los componentes quitando el bloqueo estricto 'display: none'
                    galaSection.classList.remove("m3-hidden");
                  /*  if (timelineSection) {
                        timelineSection.classList.remove("m3-hidden");
                    }*/
                    if (timelineSection){
                        timelineSection.classList.remove("m3-hidden");
                    }
                    if (locationsSection){
                        locationsSection.classList.remove("m3-hidden"); // Añade esto
                    }
                    // Forzar Reflow del navegador (Indispensable para recalcular transiciones CSS)
                    void galaSection.offsetWidth; 
                    
                    // 2. Encendemos las clases de animación que disparan el CSS esmerilado e interno
                    galaSection.classList.add("is-active");
                    /*if (timelineSection) {
                        timelineSection.classList.add("is-active");
                    }*/
                    if (timelineSection) {
                        timelineSection.classList.add("is-active");
                    }
                    if (locationsSection){
                        locationsSection.classList.add("is-active"); // Añade esto
                    }
                  
                    
                    // 3. Modificación del Scroll: Habilitamos el deslizamiento vertical continuo en la app
                    document.body.style.overflowY = "auto";
                    document.documentElement.style.overflowY = "auto";

                }, 450); // Tiempo exacto que dura el fade-out de la portada
            }, 350); // Tiempo de tolerancia para apreciar la onda M3

            
        });
        
    } else {
        // Alerta de desarrollo en caso de que un ID cambie accidentalmente en el index.html
        console.warn("Advertencia M3: No se encontraron los contenedores estructurales iniciales en el DOM.");
    }
});
