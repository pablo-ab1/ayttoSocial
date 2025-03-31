let botonCrear = document.querySelector('.add');
let formCrear = document.querySelector('#formCrear');
let botonCerrar = document.querySelector('.cerrar');
let botonDesplegable = document.querySelectorAll('.btnDesplegable');

botonCrear.addEventListener('click', () => {
    formCrear.style.display = 'flex'; 
})

botonCerrar.addEventListener ('click', (e) => {
    e.preventDefault();
    formCrear.style.display = 'none'; 
})

botonDesplegable.forEach(boton => {
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        let div = e.target.nextElementSibling;
        div.classList.toggle('noVisible');
    })
});