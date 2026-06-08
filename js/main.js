document.addEventListener("DOMContentLoaded", () => {
    const waxSeal = document.getElementById("waxSeal");
    const envelopeBox = document.querySelector(".envelope-box");

    waxSeal.addEventListener("click", () => {
        if (!envelopeBox.classList.contains("open")) {
            envelopeBox.classList.add("open");
            console.log("Proyecto XV-años-glam: Inicializado con Flexbox & Grid.");
        }
    });
});
