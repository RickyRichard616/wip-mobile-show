
/*
    Esperamos al primer frame post carga del html
    para cargar el js
*/
function initApp(){
    document.body.classList.add("app-ready");
}
window.addEventListener("load", () => {
    requestAnimationFrame(initApp);
    console.log("nice");
});

/*
    Funcionalidad de la barra de carga
    preparada para mobile
*/
const loadbar = document.querySelector(".loadbar");
const load = document.querySelector(".load");
let timeout = null;
let isComplete = false;

// Evitar el menu contextual al hacer click
loadbar.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});
loadbar.addEventListener("touchstart", (e) => {
    e.preventDefault();
}, { passive: false });

// comenzar a cargar
loadbar.addEventListener("pointerdown", (e) => {
    e.preventDefault();

    timeout = "full"

    loadbar.classList.remove("unloading");
    loadbar.classList.add("loading");

    load.style.setProperty("--progress", "0%");
});

// dejar de cargar
function stopLoading() {
    if (isComplete) return;
    timeout = "empty"

    loadbar.classList.remove("loading");
    loadbar.classList.add("unloading");

    load.style.setProperty("--progress", "-100%");
}
loadbar.addEventListener("pointerup", stopLoading);
loadbar.addEventListener("pointerleave", stopLoading);

// Detectar el final de cada animacion de la barra
// y acabar con la vibracion o desaparecer la barra
load.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;

    if (timeout === "full"){
        console.log("Carga completa");
        isComplete = true;

        loadbar.classList.remove("loading");
        loadbar.style.opacity = "0";

        //cambiar a las cartas
        setTimeout(() => {finalizarRitual();},10000);
    }else if (timeout === "empty") {
        console.log("Carga vacia");

        loadbar.classList.remove("unloading");
    }
});

// Obtener progreso de la barra de carga
function getProgress() {
    const style = getComputedStyle(load);
    const matrix = new DOMMatrixReadOnly(style.transform);

    const x = matrix.m41; // posición actual
    const width = load.offsetWidth;

    // x va de -width → 0
    const progress = 1 + (x / width);

    return Math.min(Math.max(progress, 0), 1);
}

// Leer esquinas
const corners = {
    tl: document.querySelector(".tl"),
    tr: document.querySelector(".tr"),
    bl: document.querySelector(".bl"),
    br: document.querySelector(".br"),
};

// Preparar ocultado de esquinas
function toggleCorner(el, condition) {
    if (condition) {
        el.classList.add("hide");
    } else {
        el.classList.remove("hide");
    }
}

// Ocultar esquinas progresivamente
function updateCorners(p) {
    toggleCorner(corners.tl, p > 0.25);
    toggleCorner(corners.tr, p > 0.50);
    toggleCorner(corners.bl, p > 0.75);
    toggleCorner(corners.br, p >= 1);
}

// Loop de actualizacion
function update() {
    const p = getProgress();

    updateCorners(p);

    requestAnimationFrame(update);
}

// Ejecucion del loop que monitorea la carga
update();

//funcion que ejecutar para pasar a las cartas
function finalizarRitual() {
    // Al terminar la última cortina, avisamos al sistema
    document.dispatchEvent(new CustomEvent('comenzarTarot'));
}