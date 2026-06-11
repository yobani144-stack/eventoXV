import './component-hero.js';
import './component-gala.js';

document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el clic cuando el componente Hero ya se inyectó en el DOM
    const checkBtnInterval = setInterval(() => {
        const btnOpen = document.getElementById("btn-open-invitation");
        const heroSection = document.getElementById("hero-section");
        const galaSection = document.getElementById("gala-section");

        if (btnOpen) {
            clearInterval(checkBtnInterval); // Detenemos la búsqueda

            btnOpen.addEventListener("click", (e) => {
                // Efecto onda M3
                const ripple = document.createElement("span");
                ripple.classList.add("m3-ripple");
                const rect = btnOpen.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
                ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
                btnOpen.appendChild(ripple);

                // Transición fluida de salida/entrada
                setTimeout(() => {
                    heroSection.style.opacity = "0";
                    heroSection.style.transform = "scale(1.02)";
                    heroSection.style.transition = "opacity 0.4s ease, transform 0.4s ease";

                    setTimeout(() => {
                        heroSection.style.display = "none";
                        
                        galaSection.classList.remove("m3-hidden");
                        // Forzar lectura del DOM para asegurar la animación
                        void galaSection.offsetWidth; 
                        
                        galaSection.classList.add("is-active");
                    }, 400);
                }, 350);
            });
        }
    }, 50);
});
