const bromas = [
    { texto: "Entra a la casa...", color: "#eeba30" }, // Amarillo
    { texto: "Ups, no recordaba tener 2 cortinas, ánimo", color: "#1a1a1a" }, // Negro
    { texto: "3..? Creo que debo contactar a mis decoradores", color: "#eeba30" },
    { texto: "En serio una más? Esto ya parece un gacha", color: "#1a1a1a" },
    { texto: "Te juro, te prometo, que es la última", color: "#eeba30" }
];

let indiceActual = 0;
const wrapper = document.getElementById('wrapper-bromas');
const cortina = document.getElementById('cortina-activa');
const texto = document.getElementById('texto-broma');
const mesa = document.getElementById('mesa');
const estatica = document.getElementById('cortina-estatica');

let startX = 0;
let xActual = 0;
let isDragging = false;

// OPTIMIZACIÓN: Pre-calculamos el ancho para que el swipe sea relativo
const threshold = window.innerWidth * 0.4;

// Inicializar la primera cortina
function actualizarCortina() {
    if (indiceActual < bromas.length) {
        // 1. Quitamos transiciones para que el "salto" al centro sea instantáneo
        cortina.style.transition = 'none'; 
        cortina.style.opacity = 0; // Empieza invisible
        cortina.style.transform = "translate3d(0, 0, 0) rotate(0deg)";

        // 2. Usamos un pequeño delay (o offset) para que el navegador procese el cambio de posición
        // antes de volverla a mostrar
        setTimeout(() => {
            cortina.style.backgroundImage = "url(resources/images/endState/cortina.webp)";
            cortina.style.backgroundSize = "cover";
            texto.innerText = bromas[indiceActual].texto;
            
            // 3. Ahora que ya está en el centro, la hacemos aparecer suavemente
            cortina.style.transition = 'opacity 1s ease';
            cortina.style.opacity = 1;
            cortina.classList.remove('lanzada');
        }, 200); // 50ms son suficientes para engañar al ojo
    } else {
        // Final de las bromas
        estatica.classList.add('vuelo-final');

        //desvanecer texto y cortinas suavemente
        wrapper.style.transition = 'opacity 1s ease';
        wrapper.style.opacity = '0';

        //mostrar el texto final
        mesa.style.display = 'block';
        setTimeout(() => mesa.style.opacity = "1", 500);

        setTimeout(() => {
            wrapper.style.display = 'none';
            estatica.style.display = 'none';
            finalizarCortinas(); //llamar ritual
        },4000);
    }
}

actualizarCortina();

cortina.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    cortina.style.cursor = 'grabbing';

    // Quitamos transiciones mientras arrastramos para que sea instantáneo
    cortina.style.transition = 'none'; 
    
    // Evita que el navegador intente "arrastrar" la imagen como archivo
    if (e.cancelable) e.preventDefault();
});

window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    xActual = e.clientX - startX;

    /*
        USO DE REQUEST ANIMATION FRAME (Implícito al usar Transform)
        Añadimos un multiplicador de 1.1 para que se sienta más "ligera" 
    */
    const translate = xActual * 0.5;
    const rotation = xActual * -0.01; // Reducimos un poco el cálculo de rotación
    
    // Permitir arrastrar hacia ambos lados
    // IMPORTANTE: translate3d activa la aceleración por hardware (GPU)
    cortina.style.transform = `translate3d(${translate}px, 0, 0) rotate(${rotation}deg)`;
});

window.addEventListener('pointerup', () => {
    if (!isDragging) return;
    isDragging = false;
    cortina.style.cursor = 'grab';

    if (Math.abs(xActual) > threshold) {
        lanzarCortina();
    } else {
        // Le devolvemos la transición solo para el rebote al centro
        cortina.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        cortina.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
    }
    xActual = 0; 
});

function lanzarCortina() {
    // RE-ACTIVAMOS la transición aquí para que el viaje hacia afuera sea visible
    cortina.style.transition = 'transform 0.6s cubic-bezier(0.2, 0, 0.2, 1), opacity 0.4s ease';

    // Animacion de salida suave
    cortina.style.opacity = 0;
    cortina.classList.add('lanzada');

    // La lanzamos hacia el lado que iba el arrastre
    const direccion = xActual > 0 ? 150 : -150;
    cortina.style.transform = `translate3d(${direccion}vw, 0, 0) rotate(${direccion * -0.05}deg)`;

   // Esperar a que salga de pantalla para poner la siguiente
    setTimeout(() => {
        indiceActual++;
        actualizarCortina();
    }, 600);
}

// Termina el ingreso
function finalizarCortinas() {
    // Al terminar la última cortina, avisamos al sistema
    document.dispatchEvent(new CustomEvent('comenzarRitual'));
}