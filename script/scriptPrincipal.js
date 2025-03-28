let botonCrear = document.querySelector('.add');
let formCrear = document.querySelector('#formCrear');
let botonCerrar = document.querySelector('.cerrar');

botonCrear.addEventListener('click', () => {
    formCrear.style.display = 'flex'; 
})

botonCerrar.addEventListener ('click', (e) => {
    e.preventDefault();
    formCrear.style.display = 'none'; 
})