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
        const envelopeSection = document.getElementById("envelope-section");
        const cardWrapper = document.getElementById("card-wrapper");
        const mainCard = document.getElementById("main-card");
        const particlesContainer = document.getElementById("particles-container");

        // FECHA OBJETIVO DEL EVENTO (Configurable)
        const targetDate = new Date("December 12, 2026 18:00:00").getTime();

        /* ----------------------------------------------------------------------
           A. SISTEMA DE CUENTA REGRESIVA
           ---------------------------------------------------------------------- */
        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            // Si la fecha ya llegó o pasó, detenemos el reloj
            if (difference < 0) {
                clearInterval(countdownInterval);
                return;
            }

            // Cálculos matemáticos de conversión de tiempo
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Captura de elementos en el DOM
            const dDays = document.getElementById("timer-days");
            const dHours = document.getElementById("timer-hours");
            const dMins = document.getElementById("timer-minutes");
            const dSecs = document.getElementById("timer-seconds");

            // Formateo e inyección con dos dígitos fijos (ej: 09 en lugar de 9)
            if (dDays) dDays.innerText = days < 10 ? "0" + days : days;
            if (dHours) dHours.innerText = hours < 10 ? "0" + hours : hours;
            if (dMins) dMins.innerText = minutes < 10 ? "0" + minutes : minutes;
            if (dSecs) dSecs.innerText = seconds < 10 ? "0" + seconds : seconds;
        };
        
        // Ejecución inmediata inicial y arranque del intervalo por segundo
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);

        /* ----------------------------------------------------------------------
           B. GENERADOR DE PARTÍCULAS MÁGICAS DE FONDO
           ---------------------------------------------------------------------- */
        const createParticles = () => {
            if (!particlesContainer) return;
            const particleCount = 20; // Cantidad óptima de rendimiento
            const colors = ['#FFFFFF', '#D0BCFF', '#F3CA65']; // Blanco, lila y oro

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement("div");
                particle.classList.add("m3-particle");
                
                const size = Math.random() * 8 + 4; // Tamaños variados finos
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.color = randomColor;
                particle.style.backgroundColor = randomColor;
                
                // Duración y retrasos aleatorios para flujo natural orgánico
                particle.style.animationDuration = `${Math.random() * 7 + 6}s`;
                particle.style.animationDelay = `${Math.random() * 6}s`;
                
                particlesContainer.appendChild(particle);
            }
        };
        createParticles();

        /* ----------------------------------------------------------------------
           C. EFECTO PARALLAX 3D TÁCTIL Y DE MOUSE (PORTADA)
           ---------------------------------------------------------------------- */
        const handleMove = (clientX, clientY) => {
            if (!cardWrapper || !mainCard) return;
            const rect = cardWrapper.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            // Distancia del cursor o dedo relativa al centro de la tarjeta (-1 a 1)
            const angleX = (clientX - cardCenterX) / (rect.width / 2);
            const angleY = (clientY - cardCenterY) / (rect.height / 2);
            
            const maxRotation = 12; // Grados máximos sugeridos por M3
            const rotateY = (angleX * maxRotation).toFixed(2);
            const rotateX = (-angleY * maxRotation).toFixed(2);
            
            // Rotación física y proyección de sombras inversas
            mainCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            mainCard.style.boxShadow = `
                ${-rotateY * 1.5}px ${rotateX * 1.5}px 16px 3px rgba(0, 0, 0, 0.5), 
                ${-rotateY * 0.8}px ${rotateX * 0.8}px 6px 0px rgba(0, 0, 0, 0.3)
            `;
        };

        // Eventos para computadoras (Mouse)
        if (cardWrapper) {
            cardWrapper.addEventListener("mousemove", (e) => handleMove(e.clientX, e.clientY));
            cardWrapper.addEventListener("mouseleave", () => {
                // Restablecer tarjeta a su estado plano original de forma limpia
                mainCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
                mainCard.style.boxShadow = `0px 12px 30px 4px rgba(0, 0, 0, 0.5), 0px 4px 10px 0px rgba(0, 0, 0, 0.3)`;
            });

            // Eventos para dispositivos móviles (Touch)
            cardWrapper.addEventListener("touchmove", (e) => {
                if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
            });
            cardWrapper.addEventListener("touchend", () => {
                mainCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
            });
        }

        /* ----------------------------------------------------------------------
           D. TRANSICIÓN FLUIDA AL CONTENIDO DE GALA
           ---------------------------------------------------------------------- */
        if (btnOpen) {
            btnOpen.addEventListener("click", function (e) {
                // Animación nativa de ondas M3 (Ripple) al hacer clic
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

                // Secuencia coordinada de desvanecimiento entre pantallas
                setTimeout(() => {
                    // Desvanece la portada suavemente hacia adelante
                    heroSection.style.opacity = "0";
                    heroSection.style.transform = "scale(1.02)";
                    heroSection.style.transition = "opacity 0.4s ease, transform 0.4s ease";

                    setTimeout(() => {
                        // Corta la existencia de la portada para liberar recursos del navegador
                        heroSection.style.display = "none";

                        // Monta el contenedor de la tarjeta interna en formato Flex
                        envelopeSection.style.display = "flex"; 
                        envelopeSection.classList.remove("m3-hidden");
                        
                        // Forzar Reflow (Garantiza que la transición CSS se renderice limpia)
                        void envelopeSection.offsetWidth; 
                        
                        // Enciende la opacidad y activa el scroll nativo de la invitación
                        envelopeSection.style.opacity = "1";
                        envelopeSection.classList.add("is-active");

                    }, 400);
                }, 350);
            });
        }
    }
});
