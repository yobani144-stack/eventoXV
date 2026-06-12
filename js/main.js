document.addEventListener("DOMContentLoaded", () => {
    const btnOpen = document.getElementById("btn-open-invitation");
    const heroSection = document.getElementById("hero-section");
    const galaSection = document.getElementById("gala-section");
    const timelineSection = document.getElementById("timeline-section");

    if (btnOpen && heroSection && galaSection) {
        btnOpen.addEventListener("click", (e) => {
            const ripple = document.createElement("span");
            ripple.classList.add("m3-ripple");
            const rect = btnOpen.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            btnOpen.appendChild(ripple);

            setTimeout(() => {
                heroSection.style.opacity = "0";
                heroSection.style.transform = "scale(1.02)";
                heroSection.style.transition = "opacity 0.4s ease, transform 0.4s ease";

                setTimeout(() => {
                    heroSection.style.display = "none";
                    
                    // Activamos de corrido Gala y Timeline para crear un solo cuerpo deslizable
                    galaSection.classList.remove("m3-hidden");
                    if (timelineSection) timelineSection.classList.remove("m3-hidden");
                    
                    void galaSection.offsetWidth; 
                    
                    galaSection.classList.add("is-active");
                    if (timelineSection) timelineSection.classList.add("is-active");
                    
                    // Permitimos scroll general en el cuerpo del documento
                    document.body.style.overflowY = "auto";
                }, 400);
            }, 350);
        });
    }
});
