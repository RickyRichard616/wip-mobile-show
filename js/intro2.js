document.addEventListener('comenzarRitual', () => {
    const capaRitual = document.getElementById('capa-ritual');
    const barra = document.querySelector('.load');
    
    // Mostramos la pantalla
    capaRitual.style.display = 'flex';
    capaRitual.style.opacity = '0';
    
    // Fade in suave
    setTimeout(() => {
        capaRitual.style.transition = 'opacity 2s ease';
        capaRitual.style.opacity = '1';
        iniciarCarga();
    }, 100);

    function iniciarCarga() {
        let progreso = 0;
        const intervalo = setInterval(() => {
            progreso += Math.random() * 3; // Carga irregular para que parezca "orgánica"
            
            if (progreso >= 100) {
                progreso = 100;
                clearInterval(intervalo);
                finalizarRitual();
            }
            
            barra.style.width = progreso + '%';
        }, 150);
    }
});

function finalizarRitual() {
    const capaRitual = document.getElementById('capa-ritual');
    const capaTarot = document.getElementById('capa-tarot');

    setTimeout(() => {
        capaRitual.style.transition = 'opacity 1.5s ease';
        capaRitual.style.opacity = '0';
        
        setTimeout(() => {
            capaRitual.style.display = 'none';
            // Aquí activamos la pantalla de las cartas
            capaTarot.style.display = 'flex'; 
        }, 1500);
    }, 1000);
}