//-----------------------------------------------
// MUSICA
//-----------------------------------------------

const configAudio = {
    musicaAmbiente: 0.05,
    musicaVals: 0.1,
    rainSFX: 0.05,
    sonidoConfeti: 0.4,
    turnCardSFX: 0.5,
    mesaSFX: 0.5,
    magiaSFX: 0.6,
    cardsFlySFX: 0.05,
    chairSFX: 0.6,
    rubSFX: 0.7
};

// --- MÚSICAS Y AMBIENTE ---
const musicaAmbiente = new Audio('https://cdn.pixabay.com/audio/2024/03/19/audio_0926f80b30.mp3');
musicaAmbiente.loop = true;
musicaAmbiente.pause();

const musicaVals = new Audio('https://cdn.pixabay.com/audio/2025/07/17/audio_a9b3fca004.mp3');
musicaVals.loop = true;

const musicaTensa = new Audio('https://cdn.pixabay.com/audio/2025/10/01/audio_6696a47e25.mp3');
musicaTensa.loop = true;

const musicaFinale = new Audio('https://cdn.pixabay.com/audio/2023/12/22/audio_21091ac9f1.mp3');
musicaFinale.loop = true;

const rainSFX = new Audio('https://cdn.pixabay.com/audio/2026/03/10/audio_c1db4d0201.mp3');
rainSFX.loop = true;

const sonidoConfeti = new Audio('https://cdn.pixabay.com/audio/2025/10/27/audio_fc19563f7b.mp3');
sonidoConfeti.loop = true;

// --- EFECTOS DE SONIDO (SFX) ---
const pasarCortinaSFX = new Audio('https://cdn.pixabay.com/audio/2025/04/05/audio_bf3e6a2a8e.mp3');
const sponsorAd = new Audio('https://www.myinstants.com/media/sounds/kono-bangumi-fast.mp3');
const tosSFX = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_f5a2f3258a.mp3');
const itemSFX = new Audio('https://cdn.pixabay.com/audio/2025/09/20/audio_9a48e2700a.mp3');
const magiaSFX = new Audio('https://cdn.pixabay.com/audio/2025/07/25/audio_134842825b.mp3');
const pickCardSFX = new Audio('https://cdn.pixabay.com/audio/2022/03/10/audio_020fef8bae.mp3');
const turnCardSFX = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_e385f1aa0d.mp3');
const cardsFallSFX = new Audio('https://cdn.pixabay.com/audio/2022/03/17/audio_bab2836fe3.mp3');
const shuffleSFX = new Audio('https://cdn.pixabay.com/audio/2022/03/09/audio_8fc5a15946.mp3');
const cardsFlySFX = new Audio('https://cdn.pixabay.com/audio/2025/02/25/audio_16119f408f.mp3');
const rubSFX = new Audio('https://cdn.pixabay.com/audio/2022/03/17/audio_662facd5e2.mp3');
const cardTrickSFX = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_9e9c729082.mp3');
const seeFeetSFX = new Audio('https://cdn.pixabay.com/audio/2022/03/10/audio_f13f4e8ae7.mp3');
const chairSFX = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_74458be212.mp3');
const mesaSFX = new Audio('https://cdn.pixabay.com/audio/2022/03/25/audio_c4d761c6c3.mp3');


// Funcion para reproducir
function reproducirSonido(music, nombre) {
    // Si existe una configuración para este sonido, la usa. Si no, usa 0.5 por defecto.
    const volumenBase = configAudio[nombre] || 0.5;
    
    music.volume = volumenBase;
    music.currentTime = 0; // Reinicia el audio por si se solapa
    music.play();
}

function toggleMusicaLento(music, nombre) {
    const volumenObjetivo = configAudio[nombre] || 0.5;
        // Si el audio está pausado, lo iniciamos con volumen 0 y hacemos fade-in
    if (music.paused) {
        music.volume = 0;
        music.play().catch(e => console.log("Error:", e));
        const intervaloFade = setInterval(() => {
            if (music.volume < volumenObjetivo) {
                music.volume += 0.025;
            } else {
                music.volume = volumenObjetivo;
                clearInterval(intervaloFade);
            }
        }, 100);
    } else {
        const intervaloFade = setInterval(() => {
            if (music.volume > volumenObjetivo) {
                music.volume -= 0.025;
            } else {
                clearInterval(intervaloFade);
                music.pause();
                music.currentTime = 0;
                music.volume = 0.5; // Reset para la próxima vez
            }
        }, 100);
    }
}

// --- LÓGICA DE EVENTOS ---

document.addEventListener('musicaAmbiente', () => toggleMusicaLento(musicaAmbiente, 'musicaAmbiente'));
document.addEventListener('musicaVals', () => toggleMusicaLento(musicaVals, 'musicaVals'));
document.addEventListener('musicaTensa', () => toggleMusicaLento(musicaTensa, 'musicaTensa'));
document.addEventListener('musicaFinale', () => toggleMusicaLento(musicaFinale, 'musicaFinale'));
document.addEventListener('rainSFX', () => toggleMusicaLento(rainSFX, 'rainSFX'));

document.addEventListener('itemSFX', () => {
    itemSFX.currentTime = 0;
    reproducirSonido(itemSFX, 'itemSFX');
});

document.addEventListener('magiaSFX', () => {
    magiaSFX.currentTime = 0;
    reproducirSonido(magiaSFX, 'magiaSFX');
});

document.addEventListener('pickCardSFX', () => {
    pickCardSFX.currentTime = 0;
    reproducirSonido(pickCardSFX, 'pickCardSFX');
});

document.addEventListener('pasarCortinaSFX', () => {
    pasarCortinaSFX.currentTime = 0;
    reproducirSonido(pasarCortinaSFX, 'pasarCortinaSFX');
});

document.addEventListener('sponsorAd', () => {
    sponsorAd.currentTime = 0;
    toggleMusicaLento(sponsorAd,'sponsorAd'); // Si quieres que entre suave
});

document.addEventListener('tosSFX', () => {
    tosSFX.currentTime = 0;
    reproducirSonido(tosSFX, 'tosSFX');
});

document.addEventListener('turnCardSFX', () => {
    turnCardSFX.currentTime = 0;
    reproducirSonido(turnCardSFX, 'turnCardSFX');
});

document.addEventListener('cardsFallSFX', () => {
    cardsFallSFX.currentTime = 0;
    reproducirSonido(cardsFallSFX, 'cardsFallSFX');
});

document.addEventListener('shuffleSFX', () => {
    shuffleSFX.currentTime = 0;
    reproducirSonido(shuffleSFX, 'shuffleSFX');
});

document.addEventListener('cardsFlySFX', () => {
    cardsFlySFX.currentTime = 0;
    reproducirSonido(cardsFlySFX, 'cardsFlySFX');
});

document.addEventListener('rubSFX', () => {
    rubSFX.currentTime = 0;
    reproducirSonido(rubSFX, 'rubSFX');
});

document.addEventListener('cardTrickSFX', () => {
    cardTrickSFX.currentTime = 0;
    reproducirSonido(cardTrickSFX, 'cardTrickSFX');
});

document.addEventListener('seeFeetSFX', () => {
    seeFeetSFX.currentTime = 0;
    reproducirSonido(seeFeetSFX, 'seeFeetSFX');
});

document.addEventListener('chairSFX', () => {
    chairSFX.currentTime = 0;
    reproducirSonido(chairSFX, 'chairSFX');
});

document.addEventListener('mesaSFX', () => {
    mesaSFX.currentTime = 0;
    reproducirSonido(mesaSFX, 'mesaSFX');
});

//-------------------------------------------------------------------------------------------
// PANTALLAS
//-------------------------------------------------------------------------------------------

// PANTALLA DE INICIO

//-------------------------------------------------------------------------------------------
const pantallaInicio = document.getElementById('pantalla-inicio');
const textoInicio = document.querySelector(".contenido-inicio");
let wakeLock = null;

// Evento de inicio
pantallaInicio.addEventListener('click', () => {
    toggleMusicaLento(musicaAmbiente, 'musicaAmbiente');
    activarMantenerPantallaEncendida();
    // Esperar 1 segundo (1000ms) antes de quitar el fondo negro
    //textoInicio.classList.add('oculto');
    textoInicio.style.transition= "opacity 2s ease";
    textoInicio.style.opacity = "0";
    setTimeout(() => {
        pantallaInicio.classList.add('oculto');
        
        // Una vez que el fondo negro se fue, iniciamos las cortinas
        // (Podemos darle otros 500ms si queremos que el ojo se limpie)
        setTimeout(() => {
            actualizarCortina();
        }, 100);

    }, 2000);
});

// Mantener pantalla encendida
async function activarMantenerPantallaEncendida() {
    try {
        // Solo funciona si el navegador lo soporta
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log("La pantalla se mantendrá encendida durante el ritual.");

            // Si la pestaña se minimiza y vuelve, hay que re-activarlo
            wakeLock.addEventListener('release', () => {
                console.log("El bloqueo de pantalla fue liberado.");
            });
        }
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
}

//-------------------------------------------------------------------------------------------

// CUMPLEAÑOS FELIZ FINAL

//-------------------------------------------------------------------------------------------
const checkboxes = document.querySelectorAll('.carta-toggle');
let appFinalizo = false;

function reproducirConfeti() {
    toggleMusicaLento(musicaFinale);
    toggleMusicaLento(rainSFX);
    toggleMusicaLento(sonidoConfeti);
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const marcados = document.querySelectorAll('.carta-toggle:checked').length;
        
        // El sonido de la carta suena SIEMPRE que haya un cambio (interactividad)
        turnCardSFX.currentTime = 0;
        turnCardSFX.play();

        // El "Gran Final" solo ocurre una vez
        if (marcados === 3 && !appFinalizo) {
            appFinalizo = true; // Bloqueamos el paso inmediatamente
            
            reproducirConfeti();
            
            // Activamos visuales en CSS
            document.getElementById('capa-tarot').classList.add('final-alcanzado');
            
            // Liberamos recursos de sistema
            liberarPantalla();

            console.log("Protocolo de finalización ejecutado.");
        }
    });
});

function liberarPantalla() {
    if (wakeLock !== null) {
        wakeLock.release()
            .then(() => {
                wakeLock = null;
            });
    }
}
//-------------------------------------------------------------------------------------------

// SALIR DE CORTINAS

//-------------------------------------------------------------------------------------------
document.addEventListener('comenzarRitual', () => {
    document.getElementById('capa-cortinas').style.transition='opacity 2s ease';
    document.getElementById('capa-cortinas').style.opacity='0';
    // Aquí puedes disparar una función de barra-carga.js si la necesitas

    // Ejemplo: cuando termina la animación de la última cortina
    setTimeout(() => {
            iniciarSecuenciaNarrativa(); 
        },3000);
});