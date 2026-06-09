// Función para cargar un archivo HTML en un contenedor específico
async function loadComponent(url, containerId) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error al cargar ${url}`);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error("Error en la carga modular:", error);
    }
}

// Exportamos la carga para sincronizarla con el script principal
window.loadTemplates = async function() {
    await Promise.all([
      loadComponent('hero.html', 'hero-container'),
      loadComponent('envelope.html', 'envelope-container')
        
    ]);
};
