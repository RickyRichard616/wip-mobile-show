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
});

//-----------------------------------------------
// MUSICA
//-----------------------------------------------

// Función para detener la música completamente
function detenerMusica(music) {
    music.pause();
    music.currentTime = 0; // Opcional: vuelve al inicio
}

// Funcion para detener musica de a poco (Fade out)
function desvanecerYDetenerMusica(music) {
    music.volume = 0.5
    const intervaloFade = setInterval(() => {
        if (music.volume > 0.4) {
            music.volume -= 0.05; // Baja el volumen de a poco
        } else {
            // Cuando ya casi no se escucha, la detenemos
            clearInterval(intervaloFade);
            music.pause();
            music.volume = 0.5; // Lo reseteamos para la próxima vez
        }
    }, 100); // Se ejecuta cada 100ms
}

function iniciarMusicaLento(music){
    music.volume = 0;
    music.play();
    const intervaloFade = setInterval(() => {
        if (music.volume < 0.5) {
            music.volume += 0.05; // Baja el volumen de a poco
        } else {
            // Dejamos de subir si alcanzamos el volumen deseado
            clearInterval(intervaloFade);
        }
    }, 100); // Se ejecuta cada 100ms
}

// Función para pausar/reanudar (Toggle)
function toggleMusica(music) {
    if (music.paused){
        music.play();
    } else {
        music.pause();
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

// CUMPLEAÑOS FELIZ
const sonidoConfeti = new Audio('https://cdn.pixabay.com/audio/2025/10/27/audio_fc19563f7b.mp3'); 
// https://pixabay.com/music/special-occasions-happy-birthday-festive-music-414654/
sonidoConfeti.loop = true;
sonidoConfeti.volume = 0.5; // Ajustamos el volumen al 50%

const checkboxes = document.querySelectorAll('.carta-toggle');

function reproducirConfeti() {
    // Reiniciamos el audio por si acaso ya se estaba reproduciendo
    sonidoConfeti.currentTime = 0; 
    sonidoConfeti.play().catch(error => {
        console.log("El navegador bloqueó el audio hasta que el usuario interactúe.");
    });
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


// CORTINAS
const musicaAmbiente = new Audio('https://cdn.pixabay.com/audio/2024/03/19/audio_0926f80b30.mp3');
// https://pixabay.com/music/fantasy-dreamy-childrens-ways-of-the-wizard-197105/
musicaAmbiente.loop = true; // Que no pare nunca
musicaAmbiente.volume = 0.4; // Un poco más baja para que no opaque los diálogos

const pantallaInicio = document.getElementById('pantalla-inicio');
const textoInicio = document.querySelector(".contenido-inicio");

// Evento de inicio
pantallaInicio.addEventListener('click', () => {
    // A. Reproducir música (El navegador lo permite porque es un click del usuario)
    musicaAmbiente.volume = 0;
    musicaAmbiente.play().catch(error => console.log("Error audio:", error));

    const intervaloFade = setInterval(() => {
        if (musicaAmbiente.volume < 0.4) {
            musicaAmbiente.volume += 0.005; // Sube el volumen de a poco
        } else {
            clearInterval(intervaloFade);
        }
    }, 100); // Se ejecuta cada 100ms

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
document.addEventListener('musicaAmbiente', () => {
    toggleMusicaLento(musicaAmbiente);
});

// PASAR CORTINAS
const pasarCortinaSFX = new Audio('https://cdn.pixabay.com/audio/2025/04/05/audio_bf3e6a2a8e.mp3');
//https://cdn.pixabay.com/audio/2025/04/05/audio_bf3e6a2a8e.mp3
pasarCortinaSFX.volume = 0.5;
document.addEventListener('pasarCortinaSFX', () => {
    pasarCortinaSFX.play().catch(error => console.log("Error audio:", error));
});


// SPONSOR JAPONES (guardado en Drive)
const sponsorAd = new Audio('https://www.myinstants.com/media/sounds/kono-bangumi-fast.mp3');
//https://www.myinstants.com/en/instant/sponsor-rpgtv-41282/
sponsorAd.volume = 0;
document.addEventListener('sponsorAd', () => {
    sponsorAd.play().catch(error => console.log("Error audio:", error));
    
    const intervaloFade = setInterval(() => {
        if (sponsorAd.volume < 0.8) {
            sponsorAd.volume += 0.1; // Sube el volumen de a poco
        } else {
            clearInterval(intervaloFade);
        }
    }, 100); // Se ejecuta cada 100ms
});


// RUIDO TOS
const tosSFX = new Audio('https://cdn.pixabay.com/audio/2025/11/01/audio_cfe5a52192.mp3');
//https://pixabay.com/sound-effects/people-cough-429803/
tosSFX.volume = 0.5;
document.addEventListener('tosSFX', () => {
    tosSFX.play().catch(error => console.log("Error audio:", error));
});



// VALS TRISTE/MELANCOLICO
const musicaVals = new Audio('https://cdn.pixabay.com/audio/2025/07/17/audio_a9b3fca004.mp3');
//https://cdn.pixabay.com/audio/2025/07/17/audio_a9b3fca004.mp3
musicaVals.volume = 0.5;
musicaVals.loop = true;
document.addEventListener('musicaVals', () => {
    toggleMusicaLento(musicaVals);
});



// LEVANTAR OBJETO
const itemSFX = new Audio('https://cdn.pixabay.com/audio/2025/09/20/audio_9a48e2700a.mp3');
//https://pixabay.com/sound-effects/film-special-effects-item-wind-swing-407575/
itemSFX.volume = 0.5;
document.addEventListener('itemSFX', () => {
    itemSFX.play().catch(error => console.log("Error audio:", error));
});