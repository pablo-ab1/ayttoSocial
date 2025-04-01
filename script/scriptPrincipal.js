// let formCrear = document.querySelector('#formCrear');
let botonDesplegable = document.querySelectorAll('.btnDesplegable');
const textarea = document.querySelector(".publicacionNueva textarea");
const botonCrear = document.querySelector('#crear');
const postFooter = document.querySelector('.publicacionNueva .postFooter');
const botonImg = document.querySelector('.publicacionNueva .postFooter span');

let abierto = false;



botonDesplegable.forEach(boton => {
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        let div = e.target.nextElementSibling;
        div.classList.toggle('noVisible');
        div.style.height = '50px';
    })
});

textarea.addEventListener("focus", function () {
    this.style.height = "200px";
    if(!abierto){
        botonCrear.classList.toggle('noVisible');
        botonImg.classList.toggle('noVisible');
        postFooter.style.height = '30px';
    }
});

textarea.addEventListener("blur", function () {
    if (this.value.trim() === "") {
        this.style.height = "50px";
        botonCrear.classList.toggle('noVisible');
        botonImg.classList.toggle('noVisible');
        postFooter.style.height = '0px';
        abierto = false;
    }else{
        abierto = true;
    }
    
});