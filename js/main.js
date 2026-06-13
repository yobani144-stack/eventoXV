/**
 * ARCHIVO: js/main.js
 * DESCRIPCIÓN: Orquestador principal blindado contra errores de carga (Null Pointer)
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Captura segura de elementos buscando por ID
    const btnOpen = document.getElementById("btn-open-invitation");
    const heroSection = document.getElementById("hero-section");
    const galaSection = document.getElementById("gala-section");
    const timelineSection = document.getElementById("timeline-section");
    const locationsSection = document.getElementById("locations-section");

    // Diagnóstico rápido en consola para que sepas qué elemento falta en tu HTML
    console.log("=== Diagnóstico de Componentes M3 ===");
    console.log("Botón Abrir:", btnOpen);
    console.log("Sección Hero:", heroSection);
    console.log("Sección Gala:", galaSection);
    console.log("Sección Timeline:", timelineSection);
    console.log("Sección Ubicaciones:", locationsSection);
    console.log("=====================================");

    // 2. Solo colgamos el evento si el botón realmente existe en el HTML actual
    if (!btnOpen) {
        console.error("Error crítico: No se encontró el botón con ID 'btn-open-invitation' en el HTML.");
        return; // Detiene la ejecución de esta función de forma segura sin lanzar un Uncaught TypeError
    }

    btnOpen.addEventListener("click", (e) => {
        
        /* --- EFECTO ONDA NATIVO MATERIAL DESIGN 3 --- */
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

        /* --- SECUENCIA DE TRANSICIÓN SEGURA --- */
        setTimeout(() => {
            // Animamos la desaparición del Hero si es que existe
            if (heroSection) {
                heroSection.style.opacity = "0";
                heroSection.style.transform = "scale(1.02)";
                heroSection.style.transition = "opacity 0.45s ease-out, transform 0.45s ease-out";
            }

            setTimeout(() => {
                if (heroSection) heroSection.style.display = "none";
                
                // Despertamos y mostramos secuencialmente SOLO los componentes que sí existan en el HTML
                if (galaSection) {
                    galaSection.classList.remove("m3-hidden");
                    void galaSection.offsetWidth; // Forzar reflow
                    galaSection.classList.add("is-active");
                }
                
                if (timelineSection) {
                    timelineSection.classList.remove("m3-hidden");
                    timelineSection.classList.add("is-active");
                }
                
                if (locationsSection) {
                    locationsSection.classList.remove("m3-hidden");
                    locationsSection.classList.add("is-active");
                }
                
                // Habilitamos el scroll global en la página
                document.body.style.overflowY = "auto";
                document.documentElement.style.overflowY = "auto";

            }, 450);
        }, 350);
    });
});
