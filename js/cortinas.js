const bromas = [
    { texto: "Entra a la casa...", color: "#eeba30" }, // Amarillo
    { texto: "Ups, no recordaba tener 2 cortinas, ánimo", color: "#1a1a1a" }, // Negro
    { texto: "3..? Creo que debo contactar a mis decoradores", color: "#eeba30" },
    { texto: "En serio una más? Esto ya parece un gatcha", color: "#1a1a1a" },
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

// Inicializar la primera cortina
function actualizarCortina() {
    if (indiceActual < bromas.length) {
        cortina.style.opacity = 1;
        cortina.style.transform = "translateX(0)";
        cortina.style.backgroundImage = "url(resources/images/endState/cortina.webp)";
        cortina.style.backgroundSize = "cover";
        //cortina.style.backgroundColor = "#cccccc";
        //cortina.style.backgroundColor = bromas[indiceActual].color;
        texto.innerText = bromas[indiceActual].texto;
        cortina.classList.remove('lanzada');
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
        },10000);
    }
}

actualizarCortina();

cortina.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    cortina.style.cursor = 'grabbing';
});

window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    xActual = e.clientX - startX;
    
    // Permitir arrastrar hacia ambos lados
    cortina.style.transform = `translateX(${xActual}px) rotate(${xActual * -0.005}deg)`;
});

window.addEventListener('pointerup', () => {
    if (!isDragging) return;
    isDragging = false;
    cortina.style.cursor = 'grab';

    // Si el "swipe" es lo suficientemente fuerte (150px)
    if (Math.abs(xActual) > 300) {
        lanzarCortina();
    } else {
        // Reset si no arrastró lo suficiente
        cortina.classList.add('lanzada');
        cortina.style.transform = "translateX(0) rotate(0)";
    }
});

function lanzarCortina() {
    cortina.style.opacity = 0;
    cortina.classList.add('lanzada');
    // La lanzamos hacia el lado que iba el arrastre
    const direccion = xActual > 0 ? 100 : -100;
    cortina.style.transform = `translateX(${direccion}vw) rotate(${direccion * -0.002}deg)`;

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