document.addEventListener("DOMContentLoaded", () => {
    // Monitoreamos la existencia del botón una vez que los Custom Elements inyecten su HTML
    const checkBtnInterval = setInterval(() => {
        const btnOpen = document.getElementById("btn-open-invitation");
        const heroSection = document.getElementById("hero-section");
        const galaSection = document.getElementById("gala-section");

        if (btnOpen && heroSection && galaSection) {
            clearInterval(checkBtnInterval); // Detenemos el reloj de búsqueda

            btnOpen.addEventListener("click", (e) => {
                // Efecto de onda Material Design 3 (Ripple)
                const ripple = document.createElement("span");
                ripple.classList.add("m3-ripple");
                const rect = btnOpen.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
                ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
                btnOpen.appendChild(ripple);

                // Secuencia fluida de transición entre pantallas
                setTimeout(() => {
                    heroSection.style.opacity = "0";
                    heroSection.style.transform = "scale(1.02)";
                    heroSection.style.transition = "opacity 0.4s ease, transform 0.4s ease";

                    setTimeout(() => {
                        heroSection.style.display = "none";
                        
                        galaSection.classList.remove("m3-hidden");
                        void galaSection.offsetWidth; // Forzar reflow del DOM para renderizar CSS
                        
                        galaSection.classList.add("is-active");
                    }, 400);
                }, 350);
            });
        }
    }, 50);
});
