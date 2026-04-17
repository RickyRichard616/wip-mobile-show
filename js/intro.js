//------------------------------------------------------------------------
// VARIABLES
//------------------------------------------------------------------------
const loadbar = document.querySelector(".loadbar");
const load = document.querySelector(".load");
const mesaWrapper = document.querySelector('.mesa-wrapper');
const septagramaImg = document.querySelector('.septagrama img');

let objetosList = []; 
let timeout = null;
let isComplete = false;

const frasesIntro = [
    "Las fuerzas místicas te llaman, te atrajeron aquí...",
    "Siento un disturbio a tu alrededor..",
    "Desocupemos la mesa, dejaste muchas cosas la última vez..."
];

const frasesMesa = [
    "Llamaré a las fuerzas del cosmos mientras limpias, no te asustes si el lugar.. se sacude un poco",
    "Te prometo que no es otro temblor"
];


//------------------------------------------------------------------------
// FUNCIONES
//------------------------------------------------------------------------
function stopLoading() {
    if (isComplete) return;
    timeout = "empty";
    loadbar.classList.remove("loading");
    loadbar.classList.add("unloading");
    load.style.setProperty("--progress", "-100%");
}

function update() {
    const p = getProgress();

    // El septagrama gana opacidad mientras cargamos
    if (septagramaImg && !isComplete) {
        septagramaImg.style.opacity = 0 + (p * 1);
    }

    // Desaparición progresiva de objetos
    objetosList.forEach((obj, index) => {
        const threshold = ((index + 1) / objetosList.length) * 0.80;
        if (p > threshold) {
            obj.style.opacity = "0";
            obj.style.transform = "scale(0.8) translateY(-20px)";
        } else {
            obj.style.opacity = "1";
            obj.style.transform = "scale(1) translateY(0)";
        }
    });
    
    if (!isComplete) {
        requestAnimationFrame(update);
    }
}

function getProgress() {
    const style = window.getComputedStyle(load);
    const matrix = new DOMMatrixReadOnly(style.transform);
    const totalWidth = loadbar.offsetWidth;
    if (totalWidth === 0) return 0;
    const currentX = matrix.m41; 
    return Math.min(Math.max(1 + (currentX / totalWidth), 0), 1);
}

function iniciarRitual() {
    objetosList = document.querySelectorAll('.objetos img');
    requestAnimationFrame(update);
}
iniciarRitual();

async function iniciarSecuenciaNarrativa() {
    const overlay = document.getElementById('narrativa-intro');
    const texto = document.getElementById('texto-narrativa');
    const capaRitual = document.getElementById('capa-ritual');
    const loadbar = document.querySelector('.loadbar');

    // 1. Mostrar el overlay negro sobre las cortinas abiertas
    overlay.classList.add('visible');
    
    // 2. Ciclo de frases iniciales
    for (let frase of frasesIntro) {
        texto.textContent = frase;
        texto.style.opacity = 1;
        await new Promise(r => setTimeout(r, 3500)); // Duración de la frase
        texto.style.opacity = 0;
        await new Promise(r => setTimeout(r, 1000)); // Pausa entre frases
    }

    // 3. TRANSICIÓN A LA MESA
    // Quitamos el overlay negro y mostramos la mesa (pero sin barra aún)
    overlay.classList.remove('visible');
    capaRitual.style.display = 'block'; // O tu lógica para mostrar la mesa
    
    // Esperamos un momento para que el usuario vea los objetos
    await new Promise(r => setTimeout(r, 2000));

    // 4. Frases sobre la mesa
    // Reutilizamos el overlay pero con fondo transparente para que se vea la mesa detrás
    overlay.style.background = "transparent";
    overlay.classList.add('visible');

    for (let frase of frasesMesa) {
        texto.textContent = frase;
        texto.style.opacity = 1;
        await new Promise(r => setTimeout(r, 4000));
        texto.style.opacity = 0;
        await new Promise(r => setTimeout(r, 1000));
    }

    // 5. APARECE LA BARRA DE CARGA
    overlay.classList.remove('visible');
    loadbar.classList.add('visible');
}


//------------------------------------------------------------------------
// EVENTOS - LISTENERS
//------------------------------------------------------------------------
window.addEventListener("pointerup", stopLoading);
window.addEventListener("pointerleave", stopLoading);
window.addEventListener("touchend", stopLoading);
// 1. INICIO DE PRESIÓN
window.addEventListener("pointerdown", (e) => {
    if (isComplete) return;
    e.preventDefault(); 
    timeout = "full";
    loadbar.classList.remove("unloading");
    loadbar.classList.add("loading");
    load.style.setProperty("--progress", "0%");
});
// 3. LA COREOGRAFÍA FINAL (Único evento transitionend)
load.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;

    if (timeout === "full" && !isComplete) {
        isComplete = true;
        
        // A. Activamos el caos (Vibración de pantalla y Septagrama)
        document.body.classList.add("vibracion-extrema");
        if(septagramaImg) {
            septagramaImg.parentElement.classList.add("septagrama-activo");
        }
        
        // Limpiamos la UI de carga
        loadbar.style.transition = "opacity 0.5s ease";
        loadbar.style.opacity = "0";
        loadbar.style.pointerEvents = "none";

        // B. El Clímax (Esperamos 1.8 segundos de vibración)
        setTimeout(() => {
            // Detenemos la vibración del cuerpo
            document.body.classList.remove("vibracion-extrema");
            
            // Quitamos la clase de animación del septagrama. 
            // Gracias al CSS 'transition' que pusimos, el brillo bajará suavemente.
            if(septagramaImg) {
                septagramaImg.parentElement.classList.remove("septagrama-activo");
                septagramaImg.parentElement.classList.add("septagrama-activo-chill");
                septagramaImg.style.filter = "drop-shadow(0 0 40px #fff)";
            }

            // C. Aparición de las cartas sobre la mesa
            const capaTarot = document.getElementById('capa-tarot');
            if (capaTarot) {
                // 1. Primero mostramos el contenedor
                capaTarot.classList.add("visible"); 
                
                // 2. No hace falta hacer mucho más, el CSS con los nth-child 
                // se encarga de que aparezcan una tras otra automáticamente.
            }

        }, 1500); 

    } else if (timeout === "empty") {
        loadbar.classList.remove("unloading");
    }
});