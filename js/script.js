document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Cargamos las plantillas usando la función global del loader
    window.loadTemplates().then(() => {
        // Todo este bloque se ejecutará ÚNICAMENTE cuando los archivos HTML externos ya existan en la página
        inicializarInvitacion();
    }).catch(err => {
        console.error("Error crítico al inicializar los componentes:", err);
    });

    // 2. Encapsulamos toda la lógica interna de la invitación
    function inicializarInvitacion() {
        const btnOpen = document.getElementById("btn-open-invitation");
        const heroSection = document.getElementById("hero-section");
        const envelopeSection = document.getElementById("envelope-section");
        const envelope = document.getElementById("envelope");
        const cardWrapper = document.getElementById("card-wrapper");
        const mainCard = document.getElementById("main-card");
        const particlesContainer = document.getElementById("particles-container");

        /* ==========================================
           GENERADOR DE PARTÍCULAS
           ========================================== */
        const createParticles = () => {
            if (!particlesContainer) return;
            const particleCount = 20;
            const colors = ['#FFFFFF', '#D0BCFF', '#F3CA65'];

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement("div");
                particle.classList.add("m3-particle");
                
                const size = Math.random() * 8 + 4;
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.color = randomColor;
                particle.style.backgroundColor = randomColor;
                particle.style.animationDuration = `${Math.random() * 7 + 6}s`;
                particle.style.animationDelay = `${Math.random() * 6}s`;
                
                particlesContainer.appendChild(particle);
            }
        };
        createParticles();

        /* ==========================================
           EFECTO PARALLAX 3D PORTADA
           ========================================== */
        const handleMove = (clientX, clientY) => {
            if (!cardWrapper || !mainCard) return;
            const rect = cardWrapper.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const angleX = (clientX - cardCenterX) / (rect.width / 2);
            const angleY = (clientY - cardCenterY) / (rect.height / 2);
            
            const maxRotation = 12; 
            const rotateY = (angleX * maxRotation).toFixed(2);
            const rotateX = (-angleY * maxRotation).toFixed(2);
            
            mainCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            mainCard.style.boxShadow = `
                ${-rotateY * 1.5}px ${rotateX * 1.5}px 16px 3px rgba(0, 0, 0, 0.5), 
                ${-rotateY * 0.8}px ${rotateX * 0.8}px 6px 0px rgba(0, 0, 0, 0.3)
            `;
        };

        if (cardWrapper) {
            cardWrapper.addEventListener("mousemove", (e) => handleMove(e.clientX, e.clientY));
            cardWrapper.addEventListener("mouseleave", () => {
                mainCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
                mainCard.style.boxShadow = `0px 12px 30px 4px rgba(0, 0, 0, 0.5), 0px 4px 10px 0px rgba(0, 0, 0, 0.3)`;
            });
            cardWrapper.addEventListener("touchmove", (e) => {
                if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
            });
            cardWrapper.addEventListener("touchend", () => {
                mainCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
            });
        }

        /* ==========================================
           LÓGICA DE APERTURA DEL SOBRE
           ========================================== */
        if (btnOpen) {
            btnOpen.addEventListener("click", function (e) {
                const oldRipple = this.querySelector(".m3-ripple-active");
                if (oldRipple) oldRipple.remove();

                const ripple = document.createElement("span");
                ripple.classList.add("m3-ripple", "m3-ripple-active");
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
                ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
                this.appendChild(ripple);

                setTimeout(() => {
                    heroSection.style.opacity = "0";
                    heroSection.style.transform = "scale(1.05)";
                    heroSection.style.transition = "opacity 0.5s ease, transform 0.5s ease";

                    setTimeout(() => {
                        heroSection.style.display = "none";

                        envelopeSection.classList.remove("m3-hidden");
                        void envelopeSection.offsetWidth; 
                        envelopeSection.style.opacity = "1";
                        envelopeSection.style.transform = "scale(1)";

                        setTimeout(() => {
                            envelope.classList.add("is-open");
                        }, 600);

                    }, 500);
                }, 400);
            });
        }
    }
});
