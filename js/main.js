document.addEventListener('comenzarRitual', () => {
    document.getElementById('capa-cortinas').style.display = 'none';
    const capaRitual = document.getElementById('capa-ritual');
    capaRitual.style.display = 'flex';
    // Aquí puedes disparar una función de barra-carga.js si la necesitas
});

document.addEventListener('comenzarTarot', () => {
    document.getElementById('capa-ritual').style.display = 'none';
    document.getElementById('capa-tarot').style.display = 'block';
});