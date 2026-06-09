document.addEventListener("DOMContentLoaded", () => {
    const cardWrapper = document.getElementById("card-wrapper");
    const mainCard = document.getElementById("main-card");
    const particlesContainer = document.getElementById("particles-container");

    /* ==========================================
       1. CREACIÓN DE PARTÍCULAS DE LUZ
       ========================================== */
    const createParticles = () => {
        const particleCount = 15; // Cantidad óptima para no saturar rendimiento
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.classList.add("m3-particle");
            
            // Tamaños y posiciones aleatorias
            const size = Math.random() * 12 + 6; 
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            
            // Velocidades y retrasos alternados
            particle.style.animationDuration = `${Math.random() * 6 + 6}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            particlesContainer.appendChild(particle);
        }
    };
    createParticles();

    /* ==========================================
       2. EFECTO PARALLAX 3D (MOUSE / TOUCH)
       ========================================== */
    const handleMove = (clientX, clientY) => {
        const rect = cardWrapper.getBoundingClientRect();
        
        // Calcular el centro del contenedor de la tarjeta
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        // Obtener la distancia del cursor/dedo respecto al centro (-1 a 1)
        const angleX = (clientX - cardCenterX) / (rect.width / 2);
        const angleY = (clientY - cardCenterY) / (rect.height / 2);
        
        // Definir grados máximos de rotación (M3 aconseja sutiles: 10deg a 15deg max)
        const maxRotation = 12; 
        const rotateY = (angleX * maxRotation).toFixed(2);
        const rotateX = (-angleY * maxRotation).toFixed(2); // Invertido para comportamiento natural
        
        // Aplicar la transformación 3D con sombra dinámica adaptativa
        mainCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        mainCard.style.boxShadow = `
            ${-rotateY * 1.5}px ${rotateX * 1.5}px 16px 3px rgba(0, 0, 0, 0.1), 
            ${-rotateY * 0.8}px ${rotateX * 0.8}px 6px 0px rgba(0, 0, 0, 0.2)
        `;
    };

    // Evento para escritorio (Mouse)
    cardWrapper.addEventListener("mousemove", (e) => {
        handleMove(e.clientX, e.clientY);
    });

    // Restablecer la tarjeta cuando el usuario deja de interactuar
    const resetCard = () => {
        mainCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
        mainCard.style.boxShadow = `0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.3)`;
    };

    cardWrapper.addEventListener("mouseleave", resetCard);

    // Compatibilidad fluida con pantallas táctiles (Móviles)
    cardWrapper.addEventListener("touchmove", (e) => {
        if (e.touches.length > 0) {
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    });
    cardWrapper.addEventListener("touchend", resetCard);
});
