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
    "ADVERTENCIA: LOS DIALOGOS SE PASAN SOLOS, MANTEN TU ATENCION A LOS MISMOS YA QUE PUEDE QUE SE ME HAYA PASADO LA MANO.. ESTE MENSAJE TAMBIEN SE PASARA POR SI SOLO EN BREVES",
    "Las fuerzas místicas te llaman, te atrajeron aquí...",
    "Siento un disturbio a tu alrededor.. \n\n/me toce",
    "..perdon por eso, ejem sigamos..",
    "Desocupemos la mesa, dejaste muchas cosas la última vez..."
];

const frasesMesa = [
    "Llamaré a las fuerzas del cosmos mientras limpias, no te asustes si el lugar.. se sacude un poco",
    "Te prometo que no es otro temblor"
];

const frasesMonologo = [
    //{ texto: "", tiempo: 3000 },
    { texto: "El septagrama, adornado por los simbolos de los planetas, brilla con intensidad..", tiempo: 4000, accion: true},
    { texto: "La sala entera vibra hasta que las energias se calman y cartas comienzan a flotar al rededor de la figura frente a ti..", tiempo: 7000, accion: true},
    { texto: "Ella, completamente calmada mueve lentamente su mano para tomar una entre cientos de cartas danzando por el aire.", tiempo: 6000, accion: true},
    { texto: "Veamos.. tu primera carta y la que representa tu esencia es...", tiempo: 4000 },
    
    { texto: "El Hermitaño, al derecho", tiempo: 6000 },
    { texto: "Caminaste sola, acompañada unicamente por tu 'luz'", tiempo: 6000 },
    { texto: "Necesitas tu propio espacio para permitirte existir..", tiempo: 6000 },
    { texto: "Y tu luz te lo confiere, esa luz.. que es mas que suficiente", tiempo: 6000 },
    { texto: "Guias con una bondad silenciosa, que acompaña; sin perseguir el protagonismo.", tiempo: 6000 },

    { texto: "...una lectura curiosa, haz de haber pasado por tanto..", tiempo: 5000 },
    { texto: "Su capucha se sobreexalta al ver tu reaccion de sorpresa (obvio que la tienes) y comienza a acariciar tu cabeza con incomodidad.", tiempo: 9000, accion: true},
    { texto: "Ya, ya, no llores.. mantente fuerte como el hermitaño (en serio no llores que me voy a sentir muy culpable)", tiempo: 5000 },
    { texto: "Entonces, ahora sigue tu presente y tu carta es..", tiempo: 4000 },
    { texto: "Repite la misma frase muchas veces, pues cada vez que intenta tomar una carta, la misma lo esquiva como si estuviese a punto de cometer un error..", tiempo: 10000, accion: true},
    { texto: "Hazta que finalmente una se deja atrapar.", tiempo:4000, accion: true},
    
    { texto: "La Fuerza, al derecho", tiempo: 6000 },
    { texto: "Te mantienes firme ante el caos, lo das todo por ser un apoyo para el resto y para ti misma..", tiempo: 6000 },
    { texto: "..y con bastante exito si me lo preguntas", tiempo: 6000 },
    { texto: "Tu esfuerzo silencioso pasa por alto algunas miradas, si..", tiempo: 6000 },
    { texto: "..pero nunca olvides que siempre existiran quienes te reconozcan, aunque no lo digan en voz alta.", tiempo: 6000 },

    { texto: "Antes de continuar, la silueta encapuchada ladea un poco la cabeza mientras te observa detenidamente..", tiempo: 7000, accion: true},
    { texto: "A pesar de su falta de rostro, sientes que sonrie calidamente..", tiempo: 4000, accion: true},
    { texto: "Te parece oir, por momentos, como juega con sus manos bajo la mesa, quiza sea.. nerviosismo?", tiempo: 6000, accion: true},

    { texto: "Admirable, las cartas no saben mentir; y ahora mismo estan delatando tu humildad, permitete disfrutar de lo que tienes.. ok?", tiempo: 9000 },
    { texto: "Por ultimo vamos a revelar el consejo que mi universo tiene para ti", tiempo: 5000 },
    { texto: "Y te toca...", tiempo: 6000 },
    { texto: "(no es ese tipo de chiste, deja de reirte >:c)", tiempo: 3000, accion: true},

    { texto: "La Estrella.. del derecho una vez mas", tiempo: 6000 },
    { texto: "Esta carta te promete esperanza y sanacion, quiza no exitos materiales pero..", tiempo: 6000 },
    { texto: "Si paz espiritual, un mensaje suave:", tiempo: 6000 },
    { texto: "Eventualmente las aguas se calmaran, solo centrate en seguir tu estrella.", tiempo: 6000 },
    { texto: "...", tiempo: 3000 },

    { texto: "El Oraculo ordena sus cartas mientras mira en tu direccion, cuanto mas le sostienes la mirada..", tiempo: 6000, accion: true},
    { texto: "Con mas torpeza ejecuta sus cortes y trucos extravagantes.", tiempo: 5000, accion: true},

    { texto: "Okey creo que nos fue genial, puedes recoger tus cosas e irte", tiempo: 5000 },
    { texto: "...", tiempo: 3000 },
    { texto: "..o es que acaso esperabas mas? Que avariciosa chiquilla", tiempo: 5000 },
    { texto: "PUES LARGATE DE MI VISTA O TE..", tiempo: 3000 },
    { texto: "Se alza de su asiento bruscamente, empujando la mesa y causando que el mazo de cartas vuele por los aires..", tiempo: 7000, accion: true},
    { texto: "*KNOCK*    *SWOOSH*    *FLAP FLAP FLAP*", tiempo: 3000, critico: true},
    { texto: "Preocupado por mantener su imagen, el sujeto alza ambas manos y adopta una postura de boxeador", tiempo: 6000, accion: true},
    { texto: "Comienza a lanzar veloces jabs que cortan el aire a medida que atrapa todas y cada una de sus cartas..", tiempo: 7000, accion: true},
    { texto: "..Excepto tres.", tiempo: 6000, accion: true},

    { texto: "Ups! parece que cayeron algunas cartas por accidente..", tiempo: 4000 },
    { texto: "NO LAS TOQUES", tiempo: 1500, critico: true },

    { texto: "Velozmente toma una postura confiada y retoma su papel 'misterioso'.", tiempo: 6000, accion: true},

    { texto: "Quizá tratan de revelar algo más..", tiempo: 4000 },
    { texto: "...", tiempo: 2000 },

    { texto: "Sigilosamente y con dedos tan rapidos como balas, el intercambia las bellisimas cartas de tarot..", tiempo: 9000, accion: true},
    { texto: "(porfa creeme que si lo son, solo no me dio tiempo a hacerlas(?)", tiempo: 3000, accion: true},
    { texto: "Por unas mas.. 'artesanales', claramente hechas sin mucha tecnica pero mucho esmero..", tiempo: 7000, accion: true},
    { texto: "Entonces predica:", tiempo: 4000, accion: true},
    { texto: "Ya, desvélalas poco a poco..", tiempo: 6000 }
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
        await new Promise(r => setTimeout(r, 8000)); // Duración de la frase
        texto.style.opacity = 0;
        await new Promise(r => setTimeout(r, 1500)); // Pausa entre frases
    }

    // 3. TRANSICIÓN A LA MESA
    // Quitamos el overlay negro y mostramos la mesa (pero sin barra aún)
    overlay.classList.remove('visible');
    capaRitual.style.display = 'block'; // O tu lógica para mostrar la mesa
    
    // Esperamos un momento para que el usuario vea los objetos
    await new Promise(r => setTimeout(r, 2000));

    // 4. Frases sobre la mesa
    // Reutilizamos el overlay pero con fondo transparente para que se vea la mesa detrás
    overlay.style.background = "rgba(0,0,0,0.9)"; // Oscurecemos un poco la mesa para leer bien
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

async function iniciarMonologoFinal() {
    const overlay = document.getElementById('narrativa-intro');
    const texto = document.getElementById('texto-narrativa');
    const capaTarot = document.getElementById('capa-tarot');
    const loadbar = document.querySelector('.loadbar');

    // 1. Ocultamos la barra de carga suavemente
    loadbar.style.opacity = "0";
    setTimeout(() => loadbar.style.display = "none", 1000);

    // 2. Preparamos el overlay (transparente para ver la mesa)
    overlay.style.background = "rgba(0,0,0,0.9)"; // Oscurecemos un poco la mesa para leer bien
    overlay.classList.add('visible');

// 3. Ejecutar el monólogo COMPLETO
    for (let i = 0; i < frasesMonologo.length; i++) {
        const frase = frasesMonologo[i];
        
        texto.textContent = frase.texto;
        texto.style.opacity = 1;

        // Efectos visuales según la frase
        if (frase.critico) {
            texto.style.color = "#ff4444";
            texto.style.textShadow = "0 0 15px rgba(71, 4, 4, 0.6)";
            texto.style.transform = "scale(1.2)";
            document.body.classList.add("vibracion-media");
        } else if (frase.accion){
            texto.style.color = "#2FD42F";
            texto.style.textShadow = "0 0 15px rgba(9, 94, 9, 0.6)";
            texto.style.transform = "scale(1)";
            document.body.classList.remove("vibracion-media");
        } else {
            texto.style.color = "#f0e68c";
            texto.style.textShadow = "0 0 15px rgba(238, 186, 48, 0.6)";
            texto.style.transform = "scale(1)";
            document.body.classList.remove("vibracion-media");
        }

        // ESPERAR a que el usuario lea la frase
        await new Promise(r => setTimeout(r, frase.tiempo));
        
        // Ocultar frase antes de la siguiente
        texto.style.opacity = 0;
        await new Promise(r => setTimeout(r, 800));
    }
    
    // 4. EL MOMENTO CLAVE: Los diálogos terminaron.
    // Ahora el narrador se calla y las cartas caen.
    overlay.classList.remove('visible'); // Quitamos el fondo oscuro

    // Pequeña pausa de suspenso en silencio antes de las cartas
    await new Promise(r => setTimeout(r, 1000)); 
    
    // Disparamos la animación de las cartas
    capaTarot.classList.add("visible");
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

            iniciarMonologoFinal();
        }, 1500); 

    } else if (timeout === "empty") {
        loadbar.classList.remove("unloading");
    }
});