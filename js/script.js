document.addEventListener("DOMContentLoaded", () => {
    const btnOpen = document.getElementById("btn-open-invitation");

    // Efecto Onda (Ripple) oficial de Material Design
    if (btnOpen) {
        btnOpen.addEventListener("click", function (e) {
            // Eliminar ondas anteriores si existen
            const oldRipple = this.querySelector(".m3-ripple-active");
            if (oldRipple) oldRipple.remove();

            const ripple = document.createElement("span");
            ripple.classList.add("m3-ripple", "m3-ripple-active");

            // Calcular posición del clic relativo al botón
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

            this.appendChild(ripple);
            
            // Simular la acción de apertura tras la animación
            setTimeout(() => {
                console.log("Abriendo sobre de invitación...");
                // Aquí conectaremos la transición del siguiente paso
            }, 400);
        });
    }
});
