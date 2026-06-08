// ==========================================================================
// EFECTO GLITTER: PARTÍCULAS DE ORO FLOTANTES (XV-años-glam)
// ==========================================================================

const initGoldParticles = () => {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    // Ajustar el canvas al tamaño de su contenedor padre
    const resizeCanvas = () => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Clase constructora de cada destello
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height + canvas.height; // Nacen abajo
            this.size = Math.random() * 2 + 0.5; // Tamaños pequeños para elegancia
            this.speedY = Math.random() * 0.4 + 0.1; // Subida muy lenta
            this.alpha = Math.random() * 0.5 + 0.2; // Opacidad variable
            this.angle = Math.random() * 2;
            this.spin = Math.random() * 0.02 - 0.01;
        }
        update() {
            this.y -= this.speedY;
            this.angle += this.spin;
            this.x += Math.sin(this.angle) * 0.2; // Balanceo orgánico lateral
            
            // Si sale de la pantalla, reaparece abajo
            if (this.y < 0) {
                this.y = canvas.height + 10;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            // Color oro reflejo satinado
            ctx.fillStyle = '#dfba6b';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Inicializar banco de partículas (pocas para mantener el minimalismo)
    const init = () => {
        particlesArray = [];
        const numberOfParticles = 40; 
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    };

    // Bucle de animación optimizado
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    };

    init();
    animate();
};
