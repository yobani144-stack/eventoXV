document.addEventListener("DOMContentLoaded", () => {
    const btnEnter = document.getElementById("btnEnter");
    const heroCover = document.getElementById("heroCover");

    btnEnter.addEventListener("click", () => {
        // Desliza la portada cinematográfica hacia arriba
        heroCover.classList.add("dismissed");
        
        console.log("Proyecto XV-años-glam: Portada removida. Revelando contenido principal.");
    });
});
