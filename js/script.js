

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. CARGA DE COMPONENTES MODULARES
    // ==========================================================================
    if (window.loadTemplates) {
        window.loadTemplates().then(() => {
            // Inicializa toda la interactividad una vez que el HTML externo se inyectó
            inicializarInvitacion();
        }).catch(err => {
            console.error("Error crítico al cargar los módulos HTML:", err);
        });
    } else {
        // En caso de que no se use el cargador asíncrono por separado, inicializa directo
        inicializarInvitacion();
    }

    // ==========================================================================
    // 2. FUNCIÓN PRINCIPAL DE INTERACTIVIDAD
    // ==========================================================================
    function inicializarInvitacion() {
        const btnOpen = document.getElementById("btn-open-invitation");
        const heroSection = document.getElementById("hero-section");
        const cardWrapper = document.getElementById("card-wrapper");
        const mainCard = document.getElementById("main-card");
        const particlesContainer = document.getElementById("particles-container");

        // FECHA OBJETIVO DEL EVENTO (Configurable)
        const targetDate = new Date("December 12, 2026 18:00:00").getTime();

        /* ----------------------------------------------------------------------
           A. SISTEMA DE CUENTA REGRESIVA (Blindado)
           ---------------------------------------------------------------------- */
        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference < 0) {
                clearInterval(countdownInterval);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            const dDays = document.getElementById("timer-days");
            const dHours = document.getElementById("timer-hours");
            const dMins = document.getElementById("timer-minutes");
            const dSecs = document.getElementById("timer-seconds");

            if (dDays) dDays.innerText = days < 10 ? "0" + days : days;
            if (dHours) dHours.innerText = hours < 10 ? "0" + hours : hours;
            if (dMins) dMins.innerText = minutes < 10 ? "0" + minutes : minutes;
            if (dSecs) dSecs.innerText = seconds < 10 ? "0" + seconds : seconds;
        };
        
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);

        /* ----------------------------------------------------------------------
           B. GENERADOR DE PARTÍCULAS MÁGICAS DE FONDO
           ---------------------------------------------------------------------- */
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

        /* ----------------------------------------------------------------------
           C. EFECTO PARALLAX 3D PROTEGIDO (Evita el TypeError de la consola)
           ---------------------------------------------------------------------- */
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

        // EVALUACIÓN ESTRICTA: Solo añade listeners si cardWrapper existe físicamente
        if (cardWrapper && mainCard) {
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

        /* ----------------------------------------------------------------------
           D. TRANSICIÓN FLUIDA AL CONTENIDO DE GALA (CORREGIDA)
           ---------------------------------------------------------------------- */
        if (btnOpen && heroSection) {
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
                    heroSection.style.transform = "scale(1.02)";
                    heroSection.style.transition = "opacity 0.4s ease, transform 0.4s ease";

                    setTimeout(() => {
                        heroSection.style.display = "none";

                        // Buscamos dinámicamente la sección premium inyectada
                        const targetSection = document.getElementById("envelope-section");
                        if (targetSection) {
                            targetSection.style.display = "flex"; 
                            targetSection.classList.remove("m3-hidden");
                            
                            void targetSection.offsetWidth; // Forzar reflow del DOM
                            
                            targetSection.style.opacity = "1";
                            targetSection.classList.add("is-active");
                        } else {
                            console.warn("Advertencia: No se encontró '#envelope-section' en el documento.");
                        }

                    }, 400);
                }, 350);
            });
        }
    }
});
