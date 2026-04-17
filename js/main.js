document.addEventListener('comenzarRitual', () => {
    document.getElementById('capa-cortinas').style.transition='opacity 2s ease';
    document.getElementById('capa-cortinas').style.opacity='0';
    // Aquí puedes disparar una función de barra-carga.js si la necesitas

    // Ejemplo: cuando termina la animación de la última cortina
    setTimeout(() => {
            iniciarSecuenciaNarrativa(); 
        },3000);
});