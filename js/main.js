// ==========================================================================
// LÓGICA PRINCIPAL: INVITACIÓN DIGITAL DIANA (XV-años-glam)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const waxSeal = document.getElementById("waxSeal");
    const envelope = document.getElementById("envelope");
    const envelopeWrapper = document.getElementById("envelopeWrapper");

    // Evento para abrir el sobre al interactuar con el sello de cera
    waxSeal.addEventListener("click", () => {
        if (!envelope.classList.contains("open")) {
            // Activa la coreografía CSS de apertura
            envelope.classList.add("open");
            
            // Aquí integraremos más adelante el inicio de la música premium
            console.log("Proyecto XV-años-glam: Sobre abierto de forma elegante.");
        }
    });
});
