document.addEventListener('comenzarRitual', () => {
    document.getElementById('capa-cortinas').style.display = 'none';
    const capaRitual = document.getElementById('capa-ritual');
    capaRitual.style.display = 'flex';
    // Aquí puedes disparar una función de barra-carga.js si la necesitas
});