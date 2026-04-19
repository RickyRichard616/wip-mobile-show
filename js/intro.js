//------------------------------------------------------------------------
// VARIABLES
//------------------------------------------------------------------------
const loadbar = document.querySelector(".loadbar");
const load = document.querySelector(".load");
const mesaWrapper = document.querySelector('.mesa-wrapper');
const septagramaImg = document.querySelector('.septagrama img');
const zonaRitual = document.getElementById('capa-ritual');

let objetosList = []; 
let timeout = null;
let isComplete = false;

const frasesIntro = [ 
    { texto: "ADVERTENCIA: LOS DIÁLOGOS SE PASAN SOLOS. MANTÉN TU ATENCIÓN A LOS MISMOS YA QUE PUEDE QUE SE ME HAYA PASADO LA MANO... ESTE MENSAJE TAMBIÉN SE PASARÁ POR SÍ SOLO EN BREVE.", duracion: 16000, musica: "musicaVals" },
    { texto: "Las fuerzas místicas te llaman, te atrajeron aquí..", duracion: 5500, accion: true, ruido: "rainSFX"},
    { texto: "..a pesar de la lluvia y el viento, llegaste a mi humilde hogar", accion: true, duracion: 5500},
    { texto: "Una choza alejada de todo, en lo mas profundo del bosque", accion: true, duracion: 5500},
    { texto: "Siento un disturbio cer..", duracion: 500, ruido: "rainSFX"},
    { texto: "/me tose", duracion: 3000, musica: "musicaVals", ruido: "tosSFX"},
    { texto: "...perdón por eso, ejem, sigamos...", accion: true, duracion: 4500},
    { texto: "Siento un disturbio cerca, un desbalance..", duracion: 5000, musica: "musicaVals", ruido: "rainSFX"},
    { texto: "..quiza sea duda o angustia", duracion: 3000},
    { texto: "...", duracion: 2500},
    { texto: "Y.. tu que haces aqui?", duracion: 3000},
    { texto: "Crei que estabas.. ya entiendo, no digas nada, el tito Oraculo se encargara de ti, esta bien?", duracion: 8000},
    { texto: "Tomate este te magico que obviamente sabe como tu te favorito y sigueme, te dare una lectura gratis~", duracion: 8000},
    { texto: "Con suavidad toma tu mano y ambos cruzan el portal de madera vieja.", accion: true, duracion: 5500 },
    { texto: "Desocupemos la mesa, dejaste muchas cosas aqui la última vez...", duracion: 6000 }
];

const frasesMesa = [
    "Llamaré a las fuerzas del cosmos mientras limpias, no te asustes si el lugar.. se sacude un poco",
    "Te prometo que no es otro temblor como la ultima vez(?)."
];

/*
const frasesMonologo = [
    //{ texto: "", tiempo: 3000 },
    { texto: "El septagrama, adornado por los símbolos de los planetas, brilla con intensidad...", tiempo: 5000, accion: true},
    { texto: "La sala entera vibra hasta que las energías se calman y las cartas comienzan a flotar alrededor de la figura frente a ti...", tiempo: 8500, accion: true, ruido: "magiaSFX"},
    { texto: "Ella, completamente calmada, mueve lentamente su mano para tomar una entre cientos de cartas danzando por el aire.", tiempo: 7500, accion: true, ruido: "pickCardSFX"},
    { texto: "Veamos... tu primera carta y la que representa tu esencia es...", tiempo: 4500 },
    
    { texto: "El Ermitaño, al derecho", tiempo: 3500, ruido: "turnCardSFX" },
    { texto: "Caminaste sola, acompañada únicamente por tu 'luz'.", tiempo: 5500 },
    { texto: "Necesitas tu propio espacio para permitirte existir...", tiempo: 5000 },
    { texto: "Y tu luz te lo confiere, esa luz... que es más que suficiente.", tiempo: 6000 },
    { texto: "Guías con una bondad silenciosa, que acompaña sin perseguir el protagonismo.", tiempo: 7000 },

    { texto: "...una lectura curiosa, has de haber pasado por tanto...", tiempo: 5500 },
    { texto: "Su capucha se sobreexalta al ver tu reacción de sorpresa (obvio que la tienes(?)) y se acerca para acariciar tus hombros mientras intenta consolarte.", tiempo: 9500, accion: true},
    { texto: "Ya, ya, no llores... mantente fuerte como el ermitaño (en serio no llores que me voy a sentir muy culpable).", tiempo: 7500, ruido: "rubSFX" },
    { texto: "Entonces, ahora sigue tu presente y tu carta es...", tiempo: 4500 },
    { texto: "Repite la misma frase muchas veces, pues cada vez que intenta tomar una carta, la misma lo esquiva como si estuviese a punto de cometer un error...", tiempo: 9500, accion: true, ruido: "cardsFlySFX"},
    { texto: "Hasta que finalmente una se deja atrapar.", tiempo: 4000, accion: true, ruido: "pickCardSFX"},
    
    { texto: "La Fuerza, al derecho", tiempo: 3500, ruido: "turnCardSFX"},
    { texto: "Te mantienes firme ante el caos, lo das todo por ser un apoyo para el resto y para ti misma...", tiempo: 7500 },
    { texto: "...y con bastante éxito si me lo preguntas.", tiempo: 4500 },
    { texto: "Las miradas suelen pasar por alto tu esfuerzo silencioso..", tiempo: 5500 },
    { texto: "..pero nunca olvides que siempre existirán quienes te reconozcan, aunque no lo digan en voz alta.", tiempo: 8000 },

    { texto: "Antes de continuar, la silueta encapuchada ladea un poco la cabeza mientras te observa detenidamente...", tiempo: 8000, accion: true},
    { texto: "A pesar de su rostro completamente obscurecido, sientes que sonríe cálidamente...", tiempo: 7500, accion: true},
    { texto: "Un movimiento veloz te llama la atencion por debajo de la mesa, te haces la tonta para mirar..", tiempo: 7500, accion: true, ruido: "seeFeetSFX"},
    { texto: "Y descubres que sus pies se mueven constantemente, tratan de acercarse pero se retraen justo antes de tocar los tuyos.", tiempo: 8000, accion: true},

    { texto: "Admirable, las cartas no saben mentir; y ahora mismo están delatando tu humildad, permítete disfrutar de lo que tienes... ¿ok?", tiempo: 9000 },
    { texto: "Por último vamos a revelar el consejo que mi universo tiene para ti.", tiempo: 6000 },
    { texto: "Y te toca...", tiempo: 3000, ruido: "pickCardSFX"},
    { texto: "Por un momento la carta casi se le cae pero se recompone rapidamente.", tiempo: 4500, accion: true},

    { texto: "La Estrella... al derecho una vez más.", tiempo: 4500 , ruido: "turnCardSFX"},
    { texto: "Esta carta te promete esperanza y sanación, quizá no éxitos materiales pero si..", tiempo: 7500 },
    { texto: "..paz espiritual, y un mensaje para ti:", tiempo: 5000 },
    { texto: '"Eventualmente las aguas se calmarán, para lograr todo lo que deseas solo sigue tu estrella"', tiempo: 7000 },
    { texto: "...", tiempo: 2500 },

    { texto: "El Oráculo ordena sus cartas mientras mira en tu dirección; cuanto más le sostienes la mirada...", tiempo: 8000, accion: true, ruido: "shuffleSFX"},
    { texto: "Con más torpeza ejecuta sus cortes y trucos extravagantes.", tiempo: 6000, accion: true, ruido: "cardTrickSFX"},

    { texto: "Las visiones se nublan... el hilo de plata que nos unía se está tensando demasiado.", tiempo: 6000 },
    { texto: "...", tiempo: 2500 },
    { texto: "Ya has tenido suficiente de mi tiempo. La mística no es una fuente inagotable, chiquilla avariciosa.", tiempo: 7000 },
    { texto: "¡Vete! Antes de que las estrellas se olviden de tu nombre por preguntar tanto.", tiempo: 5000 },
    { texto: "¡HE DICHO QUE TE LARGUES O YO...!", tiempo: 3500 },
    { texto: "Se alza de su asiento bruscamente, empujando la mesa y causando que el mazo de cartas vuele por los aires...", tiempo: 8500, accion: true, ruido: "mesaSFX"},
    { texto: "*KNOCK* *SWOOSH* *FLAP FLAP FLAP*", tiempo: 3000, critico: true, ruido: "cardsFlySFX"},
    
    // MEME HAJIME

    { texto: "Preocupado por mantener su imagen, el sujeto alza ambas manos y adopta una postura de boxeador.", tiempo: 7500, accion: true},
    { texto: "Comienza a lanzar veloces jabs que cortan el aire a medida que atrapa todas y cada una de sus cartas...", tiempo: 8500, accion: true},

    { texto: "...Excepto tres.", tiempo: 4000, accion: true},

    { texto: "¡Ups! Parece que cayeron algunas cartas por accidente...", tiempo: 4500, ruido:"cardsFallSFX"},
    { texto: "NO LAS TOQUES", tiempo: 1500, critico: true },

    { texto: "Velozmente toma una postura confiada y retoma su papel 'misterioso' acomodando su silla nuevamente.", tiempo: 6500, accion: true, ruido:"chairSFX"},

    { texto: "Quizá tratan de revelar algo más...", tiempo: 4500 },
    { texto: "...", tiempo: 2000 },

    { texto: "Sigilosamente y con dedos tan rápidos como balas, él intercambia las bellísimas cartas de tarot...", tiempo: 9000, accion: true, ruido:"shuffleSFX"},
    { texto: "(porfa créeme que sí lo son, solo no me dio tiempo a hacerlas(?))", tiempo: 5000, accion: true},
    { texto: "Por unas más... 'artesanales', claramente hechas sin mucha técnica pero mucho esmero...", tiempo: 8000, accion: true, ruido:"shuffleSFX"},
    { texto: "Entonces predica:", tiempo: 3500, accion: true},
    { texto: "Ya, desvélalas poco a poco...", tiempo: 5000 }
];
*/

const frasesMonologo = [
    // --- ACTO 1: EL RITUAL ---
    { texto: "El septagrama sobre la mesa comienza a pulsar con un brillo rítmico, proyectando sombras planetarias contra las paredes.", tiempo: 7500, accion: true },
    { texto: "Una vibración sorda recorre la habitación. Las cartas se elevan en un remolino controlado, orbitando la figura encapuchada que preside la escena.", tiempo: 9500, accion: true, ruido: "magiaSFX" },
    { texto: "El Oráculo extiende un brazo con precisión mecánica y captura una carta en el aire. Sus movimientos son lentos, casi ceremoniales.", tiempo: 8500, accion: true, ruido: "pickCardSFX" },
    { texto: "El sistema ha arrojado la primera variable. Tu esencia, el núcleo que sostiene tu arquitectura.", tiempo: 7500 },
    
    // --- ACTO 2: EL ERMITAÑO ---
    { texto: "La carta es revelada sobre el tapete con un movimiento firme: El Ermitaño, al derecho.", tiempo: 5000, accion: true, ruido: "turnCardSFX" },
    { texto: "Has caminado sola, guiada por una luz que no depende de fuentes externas para brillar.", tiempo: 6000 },
    { texto: "Necesitas tu propio espacio para permitirte existir, y tu luz personal es más que suficiente para iluminar ese vacío.", tiempo: 8000 },
    { texto: "Tienes una presencia que acompaña sin buscar el protagonismo; una luz que opera, aun bajo el diluvio.", tiempo: 7500 },

    // --- ACTO 3: LA GRIETA EN LA FACHADA ---
    { texto: "La atmósfera se vuelve densa. El Oráculo parece detectar el peso de la lectura en ti y su postura solemne se altera.", tiempo: 8500, accion: true },
    { texto: "Su capucha se agita ligeramente, adelantandose a el posible asomo de una lágrima. Se inclina hacia adelante, rompiendo la distancia mística para ofrecer consuelo.", tiempo: 9500, accion: true, ruido: "chairSFX"},
    { texto: "Mantente fuerte como el Ermitaño..", tiempo: 3000, ruido: "rubSFX" },
    { texto: "Murmura, sus manos rozando tus hombros con cuidado.", tiempo: 3500, accion: true },
    { texto: "No permitas que el sistema colapse, ok?", tiempo: 3000},
    
    // --- ACTO 4: LA FUERZA ---
    { texto: "Él retoma su posición original con rapidez, intentando restablecer el orden. Declara que el presente exige atención inmediata.", tiempo: 8000, accion: true },
    { texto: "Lanza la mano hacia el mazo danzante, pero las cartas parecen esquivar sus dedos con una agilidad casi caprichosa...", tiempo: 8500, accion: true, ruido: "cardsFlySFX" },
    { texto: "Finalmente atrapa una entre cientos. La sujeta con firmeza, impidiendo que vuelva a escapar al flujo del aire.", tiempo: 7000, accion: true, ruido: "pickCardSFX" },
    
    { texto: "La Fuerza, al derecho.", tiempo: 4500, ruido: "turnCardSFX" },
    { texto: "Te mantienes firme ante el caos. Actúas como el soporte estructural para el resto, y con un éxito indiscutible.", tiempo: 8500 },
    { texto: "Aunque el esfuerzo pase desapercibido para la mayoría, siempre existirán quienes reconocem.. reconozcan tu fortaleza en silencio.", tiempo: 9000 },

    // --- ACTO 5: LA CONEXIÓN HUMANA ---
    { texto: "El Oráculo ladea la cabeza, observando a su interlocutora con una fijeza que trasciende la oscuridad de su capucha.", tiempo: 8000, accion: true },
    { texto: "A pesar del rostro oculto, se percibe la calidez de un gesto genuino. Sin embargo, un movimiento bajo la mesa rompe la ilusión mística...", tiempo: 8500, accion: true, ruido: "seeFeetSFX" },
    { texto: "Sus pies se mueven con nerviosismo, buscando un contacto que se retrae justo antes de concretarse por un resto de decoro.", tiempo: 9000, accion: true },

    // --- ACTO 6: LA ESTRELLA (EL CONSEJO) ---
    { texto: "Admirable. Las cartas delatan una humildad que debería ser celebrada. Permítete disfrutar de lo que posees.", tiempo: 9000 },
    { texto: "Anuncia que el universo ha reservado un último consejo para este encuentro.", tiempo: 6000, accion: true },
    { texto: "Toma la última carta, aunque sus dedos parecen haber perdido parte de la seguridad robótica del inicio.", tiempo: 7000, accion: true, ruido: "pickCardSFX" },

    { texto: "La Estrella... al derecho una vez más.", tiempo: 4500, ruido: "turnCardSFX" },
    { texto: "Esta carta promete esperanza y sanación. El sistema se estabiliza; no busques triunfos materiales, busca paz espiritual.", tiempo: 9000 },
    { texto: '"Eventualmente las aguas se calmarán. Para lograr todo lo que deseas, solo sigue tu propia estrella".', tiempo: 8000 , wiggle: true },
    { texto: "El silencio se prolonga, permitiendo que el mensaje se asiente en el aire de la sala.", tiempo: 6000, accion: true },

    // --- ACTO 7: EL COLAPSO DEL PERSONAJE ---
    { texto: "El Oráculo comienza a ordenar sus cartas con movimientos mecánicos, intentando recuperar el control de su propia imagen.", tiempo: 8500, accion: true, ruido: "shuffleSFX" },
    { texto: "Sin embargo, la torpeza se apodera de sus manos. Los cortes y trucos se vuelven erráticos ante la mirada del observador.", tiempo: 8000, accion: true, ruido: "cardTrickSFX" },
    { texto: "Lo notas.. asustado de algo, quiza vio demasiado..", tiempo: 4500, accion: true },
    { texto: "..el Oraculo observo tu alma..", tiempo: 3000, accion: true },
    { texto: "..y teme que ya sea demasiado tarde para cerrar los ojos..", tiempo: 4500, accion: true },
    { texto: "Aquellos ojos ocultos, cuyas pupilas se dilatan en tu presencia..", tiempo: 4500, accion: true },
    { texto: "Ojos que delatan.", tiempo: 1500, accion: true },

    { texto: "...", tiempo: 3000 },
    { texto: "La sesión ha concluido.. Puedes recoger tus cosas y retirarte antes de que la mística se disuelva.", tiempo: 8500 },
    { texto: "...", tiempo: 3000 },
    { texto: "Ante la falta de movimiento de quien escucha, el pavor intoxica sus venas.", tiempo: 6500, accion: true },
    { texto: "Ehh..", tiempo: 1500 },
    { texto: "¡LA SESION SE ACABO!", tiempo: 2500, critico: true },
    { texto: "Se levanta bruscamente, volcando la mesa. El mazo de cartas sale disparado, estallando en un caos de cartón sobre ambos...", tiempo: 9000, accion: true, ruido: "mesaSFX" },
    { texto: "*CRASH* *SWOOSH* *FLAP FLAP FLAP*", tiempo: 3500, critico: true, ruido: "cardsFlySFX" },
    
    // --- ACTO 8: LA VERDAD ARTESANAL ---
    { texto: "En un intento desesperado por salvar su dignidad, el sujeto lanza golpes al aire, tratando de atrapar las cartas como un boxeador en pleno ring.", tiempo: 9000, accion: true , ruido: "cardsFlySFX" },
    { texto: "Corre de un lado a otro, recuperando frenéticamente los naipes mientras su fachada de experto se desmorona por completo.", tiempo: 8500, accion: true },

    { texto: "Se detiene en seco. Tres cartas han quedado en el suelo, fuera de su alcance y de su control.", tiempo: 7000, accion: true, ruido: "cardsFallSFX" },

    { texto: "¡Eh..el protocolo se ha roto!. ¡No las toques! ¡No las mires!", tiempo: 5500, critico: true },
    { texto: "Acomoda su silla e intenta recuperar la compostura, aunque el rastro del desastre es imposible de ignorar.", tiempo: 8000, accion: true, ruido: "chairSFX" },

    { texto: "Quizá el caos era necesario.. Quizá estas cartas revelan algo mas", tiempo: 7500 },

    { texto: "Duda por un momento..", tiempo: 2000, accion: true },
    { texto: "Pero con dedos que aún tiemblan, intercambia las bellas cartas de tarot por unas notablemente distintas...", tiempo: 9000, accion: true, ruido: "shuffleSFX" },
    { texto: "Pide disculpas por la falta de técnica, alegando que el hardware es limitado pero el proceso de creación fue honesto. (NotaAutor: creeme porfa(?))", tiempo: 8500, accion: true },
    { texto: "Entrega tres cartas artesanales, hechas con esmero, sin trucos.", tiempo: 9000, accion: true, ruido: "shuffleSFX" },
    { texto: "Él da un paso atrás y aguarda en silencio a que las cartas sean descubiertas, una a una.", tiempo: 7500, accion: true },
    { texto: "Ya no hay guion que seguir..", tiempo: 4000, accion: true },
    { texto: "..no?", tiempo: 3000, accion: true }
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

    if (septagramaImg && !isComplete) {
        septagramaImg.style.opacity = 0 + (p * 1);
    }

    objetosList.forEach((obj, index) => {
        const threshold = ((index + 1) / objetosList.length) * 0.8;
        
        if (p > threshold) {
            // --- EL CAMBIO ESTÁ AQUÍ ---
            // Solo disparamos el sonido si el objeto TODAVÍA es visible
            if (obj.style.opacity !== "0") { 
                obj.style.opacity = "0";
                obj.style.transform = "scale(0.8) translateY(-20px)";
                
                // Filtro para no sonar en el 100% (si así lo deseas)
                if (p < 0.9) {
                    document.dispatchEvent(new CustomEvent('itemSFX'));
                }
            }
        } else {
            // Si la barra retrocede, lo volvemos a hacer "disponible"
            if (obj.style.opacity !== "1") {
                obj.style.opacity = "1";
                obj.style.transform = "scale(1) translateY(0)";
            }
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

    overlay.classList.add('visible');
    
    // 2. Ciclo de frases iniciales actualizado
    for (let fraseObj of frasesIntro) {
        // CAMBIO CLAVE: usamos innerText para reconocer el \n
        texto.innerText = fraseObj.texto; 
        texto.style.opacity = 1;

        // Efectos visuales según la frase
        if (fraseObj.critico) {
            texto.style.color = "#ff4444";
            texto.style.textShadow = "0 0 15px rgba(71, 4, 4, 0.6)";
            texto.style.transform = "scale(1.2)";
            document.body.classList.add("vibracion-media");
        } else if (fraseObj.accion){
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

        // SOUND MANAGER
        if (fraseObj.musica){
            document.dispatchEvent(new CustomEvent(fraseObj.musica));
        }
        if (fraseObj.ruido){
            document.dispatchEvent(new CustomEvent(fraseObj.ruido));
        }
        
        // CAMBIO CLAVE: usamos la duración específica de cada frase
        await new Promise(r => setTimeout(r, fraseObj.duracion)); 
        
        texto.style.opacity = 0;
        await new Promise(r => setTimeout(r, 1500)); 
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
        await new Promise(r => setTimeout(r, 3000));
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

        // SOUND MANAGER
        if (frase.musica){
            document.dispatchEvent(new CustomEvent(frase.musica));
        }
        if (frase.ruido){
            document.dispatchEvent(new CustomEvent(frase.ruido));
        }

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
        await new Promise(r => setTimeout(r, 1000));
    }
    
    // 4. EL MOMENTO CLAVE: Los diálogos terminaron.
    // Ahora el narrador se calla y las cartas caen.
    overlay.classList.remove('visible'); // Quitamos el fondo oscuro
    overlay.style.pointerEvents = 'none'; // Que deje pasar los clicks a las cartas
    overlay.style.display = 'none';

    // Pequeña pausa de suspenso en silencio antes de las cartas
    await new Promise(r => setTimeout(r, 1000)); 
    
    // Disparamos la animación de las cartas
    capaTarot.classList.add("visible");

    
    // REPRODUCIR SONIDO DE ENTREGAR CARTAS SINCRONIZADO
    // Primer sonido a los 1000ms (1s)
    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('turnCardSFX'));
    }, 100);

    // Segundo sonido a los 2000ms (2s)
    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('turnCardSFX'));
    }, 150);

    // Tercer sonido a los 3000ms (3s)
    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('turnCardSFX'));
    }, 200);
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
    
    const loadbar = document.querySelector('.loadbar');
    if (!loadbar.classList.contains('visible')) {
        return; 
    }

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
        // Añadimos efecto de sonido
        document.dispatchEvent(new CustomEvent("magiaSFX"));
        
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

// SOLUCION AL MENU CONTEXTUAL
zonaRitual.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Adiós al menú contextual
    return false;
});