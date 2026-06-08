// ==========================================================================
// LÓGICA DE CONTROL: TRANSICIONES, CUENTA REGRESIVA Y RSVP (Diana)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const btnEnter = document.getElementById("btnEnter");
    const heroCover = document.getElementById("heroCover");

    // 1. CONTROL DE ACCESO PREMIUM
    btnEnter.addEventListener("click", () => {
        // Ejecuta la animación CSS para retirar la portada
        heroCover.classList.add("dismissed");
        
        // Arranca el fondo interactivo de brillos dorados
        if (typeof initGoldParticles === "function") {
            initGoldParticles();
        }
    });

    // 2. MOTOR DEL RELOJ DE CUENTA REGRESIVA
    // Seteamos la fecha destino: 24 de Octubre de 2026 17:00:00
    const targetDate = new Date("October 24, 2026 17:00:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            clearInterval(countdownInterval);
            document.querySelector(".countdown-grid").innerHTML = "<p style='grid-column: 1/-1; color: #dfba6b;'>¡LLEGÓ EL GRAN DÍA!</p>";
            return;
        }

        // Cálculos aritméticos de tiempo
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Inyección visual formateada con ceros a la izquierda
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    };

    // Actualiza el reloj cada segundo de manera síncrona
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Ejecución inmediata inicial

    // 3. ENRUTADOR DE ASISTENCIA RSVP POR WHATSAPP
    const rsvpForm = document.getElementById("rsvpForm");
    
    rsvpForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita la recarga de página estándar

        const name = document.getElementById("guestName").value.trim();
        const attendance = document.getElementById("attendance").value;
        const tickets = document.getElementById("tickets").value;

        // Teléfono ficticio o el real de confirmaciones (ej: +52 para México)
        const phoneNumber = "5210000000000"; 
        
        let message = `¡Hola Diana! ✨%0A`;
        
        if (attendance === "si") {
            message += `Confirmó mi asistencia a tus XV Años. 🥂%0A`;
            message += `A nombre de: *${name}*%0A`;
            message += `Pases solicitados: *${tickets} ${parseInt(tickets) === 1 ? 'persona' : 'personas'}*.%0A`;
            message += `¡Nos vemos pronto para celebrar!`;
        } else {
            message += `Lamentablemente no podré asistir a tus XV Años.%0A`;
            message += `A nombre de: *${name}*%0A`;
            message += `Te deseo una noche increíble y llena de magia. ✨`;
        }

        // Abre WhatsApp Web o App nativa con el string codificado
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
        window.open(whatsappUrl, '_blank');
    });
});
