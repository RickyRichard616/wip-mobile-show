document.addEventListener('comenzarRitual', () => {
    document.getElementById('capa-cortinas').style.transition='opacity 2s ease';
    document.getElementById('capa-cortinas').style.opacity='0';
    // Aquí puedes disparar una función de barra-carga.js si la necesitas

    // Ejemplo: cuando termina la animación de la última cortina
    setTimeout(() => {
            iniciarSecuenciaNarrativa(); 
        },3000);
});

// Funcion para voltear las cartas al final
const carta = document.querySelector(".contenedor-carta");
carta.addEventListener('pointerdown', (e) => {
    // Esto unifica click de mouse, dedo de tablet y lápiz
    voltearCarta(e.currentTarget);
    // sonido de voltear carta
    turnCardSFX.currentTime = 0;
    turnCardSFX.play();
});

//-----------------------------------------------
// MUSICA
//-----------------------------------------------

// --- MÚSICAS Y AMBIENTE ---
const musicaAmbiente = new Audio('https://cdn.pixabay.com/audio/2024/03/19/audio_0926f80b30.mp3');
musicaAmbiente.loop = true;

const musicaVals = new Audio('https://cdn.pixabay.com/audio/2025/07/17/audio_a9b3fca004.mp3');
musicaVals.loop = true;

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



// Funcion para iniciar musica
function reproducir(music) {
    music.volume = 0.5
    music.currentTime = 0; // Opcional: vuelve al inicio
    music.play();
}

// Función para detener la música completamente
function detenerMusica(music) {
    music.pause();
    music.currentTime = 0; // Opcional: vuelve al inicio
}

// Función para iniciar musica (desde 0 con fade)
function iniciarMusicaLento(music) {
    music.volume = 0;
    music.play().catch(e => console.log("Error:", e));
    const intervaloFade = setInterval(() => {
        if (music.volume < 0.45) {
            music.volume += 0.05;
        } else {
            music.volume = 0.5;
            clearInterval(intervaloFade);
        }
    }, 100);
}

// Función para detener musica (con fade hasta 0)
function desvanecerYDetenerMusica(music) {
    const intervaloFade = setInterval(() => {
        if (music.volume > 0.05) {
            music.volume -= 0.05;
        } else {
            clearInterval(intervaloFade);
            music.pause();
            music.currentTime = 0;
            music.volume = 0.5; // Reset para la próxima vez
        }
    }, 100);
}

function toggleMusicaLento(music) {
    if (music.paused) {
        iniciarMusicaLento(music);
    } else {
        desvanecerYDetenerMusica(music);
    }
}

// Función para pausar/reanudar (Toggle)
function toggleMusicaLento(music) {
    if (music.paused){
        iniciarMusicaLento(music);
    } else {
        desvanecerYDetenerMusica(music);
    }
}

// --- LÓGICA DE EVENTOS ---

document.addEventListener('musicaAmbiente', () => toggleMusicaLento(musicaAmbiente));
document.addEventListener('musicaVals', () => toggleMusicaLento(musicaVals));
document.addEventListener('rainSFX', () => toggleMusicaLento(rainSFX));

document.addEventListener('itemSFX', () => {
    itemSFX.currentTime = 0;
    itemSFX.play();
});

document.addEventListener('magiaSFX', () => {
    magiaSFX.currentTime = 0;
    magiaSFX.play();
});

document.addEventListener('pickCardSFX', () => {
    pickCardSFX.currentTime = 0;
    pickCardSFX.play();
});

document.addEventListener('SFX', () => {
    SFX.currentTime = 0;
    SFX.play();
});

document.addEventListener('pasarCortinaSFX', () => {
    pasarCortinaSFX.currentTime = 0;
    pasarCortinaSFX.play();
});

document.addEventListener('sponsorAd', () => {
    sponsorAd.currentTime = 0;
    iniciarMusicaLento(sponsorAd); // Si quieres que entre suave
});

document.addEventListener('tosSFX', () => {
    tosSFX.currentTime = 0;
    tosSFX.play();
});

document.addEventListener('turnCardSFX', () => {
    turnCardSFX.currentTime = 0;
    turnCardSFX.play();
});

document.addEventListener('cardsFallsSFX', () => {
    cardsFallsSFX.currentTime = 0;
    cardsFallsSFX.play();
});

document.addEventListener('shuffleSFX', () => {
    shuffleSFX.currentTime = 0;
    shuffleSFX.play();
});

document.addEventListener('cardsFlySFX', () => {
    cardsFlySFX.currentTime = 0;
    cardsFlySFX.play();
});

document.addEventListener('rubSFX', () => {
    rubSFX.currentTime = 0;
    rubSFX.play();
});

document.addEventListener('cardTrickSFX', () => {
    cardTrickSFX.currentTime = 0;
    cardTrickSFX.play();
});

document.addEventListener('seeFeetSFX', () => {
    seeFeetSFX.currentTime = 0;
    seeFeetSFX.play();
});

document.addEventListener('chairSFX', () => {
    chairSFX.currentTime = 0;
    chairSFX.play();
});

document.addEventListener('mesaSFX', () => {
    mesaSFX.currentTime = 0;
    magiaSFX.play();
});

//-------------------------------------------------------------------------------------------
// PANTALLAS
//-------------------------------------------------------------------------------------------

// PANTALLA DE INICIO

//-------------------------------------------------------------------------------------------
const pantallaInicio = document.getElementById('pantalla-inicio');
const textoInicio = document.querySelector(".contenido-inicio");

// Evento de inicio
pantallaInicio.addEventListener('click', () => {
    // A. Reproducir música (El navegador lo permite porque es un click del usuario)
    toggleMusicaLento(musicaAmbiente);

    // B. Esperar 1 segundo (1000ms) antes de quitar el fondo negro
    //textoInicio.classList.add('oculto');
    textoInicio.style.transition= "opacity 2s ease";
    textoInicio.style.opacity = "0";
    setTimeout(() => {
        pantallaInicio.classList.add('oculto');
        
        // 4. Una vez que el fondo negro se fue, iniciamos las cortinas
        // (Podemos darle otros 500ms si queremos que el ojo se limpie)
        setTimeout(() => {
            actualizarCortina();
        }, 100);

    }, 2000);
});
//-------------------------------------------------------------------------------------------

// CUMPLEAÑOS FELIZ FINAL

//-------------------------------------------------------------------------------------------
const checkboxes = document.querySelectorAll('.carta-toggle');

function reproducirConfeti() {
    toggleMusicaLento(musicaAmbiente);
    toggleMusicaLento(sonidoConfeti);
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        // Contamos cuántos checkboxes están marcados actualmente
        const marcados = document.querySelectorAll('.carta-toggle:checked').length;
        if (marcados === 3) {
            reproducirConfeti();
        }
    });
});
//-------------------------------------------------------------------------------------------