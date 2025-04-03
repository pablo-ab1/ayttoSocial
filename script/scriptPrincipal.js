// let formCrear = document.querySelector('#formCrear');
let botonDesplegable = document.querySelectorAll('.btnDesplegable');
const textarea = document.querySelector(".publicacionNueva textarea");
const botonCrear = document.querySelector('#crear');
const postFooter = document.querySelector('.publicacionNueva .postFooter');
const botonImg = document.querySelector('.publicacionNueva .postFooter span');
let selectCategoria = document.getElementById('categoria');

let filtroCat = document.getElementById('filtroCategoria');
let categorias = [];
let abierto = false;
getCategorias();

botonDesplegable.forEach(boton => {
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        let div = e.target.nextElementSibling;
        div.classList.toggle('noVisible');
        div.style.height = 'auto';
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


async function getCategorias() {
    
    let url = '../controller/GetCategorias.php';

    try{
        let respuesta = await fetch(url);    
        if(!respuesta.ok){
            throw new Error(respuesta.statusText);
        }

        datos = await respuesta.text();
        console.log(datos);
        cat = JSON.parse(datos);

        cat.forEach(categoria =>{
            crearRadio(categoria.id, 'categoria', filtroCat);
            crearOption(categoria.id, selectCategoria);
        })

    }catch (error){
        console.error(error.message);
    }
    
}

let opcionActiva = false;

function crearRadio(opcion, name, contenedor){
    let input = document.createElement('input');
    let label = document.createElement('label');
    
    input.type = 'radio';
    input.value = opcion;
    input.id = 'o'+opcion;
    input.name = name;
    input.classList.add('radio');

    label.addEventListener("click", e => {
        if(opcionActiva){
            opcionActiva.classList.toggle('opcionActiva');
        }
        e.target.classList.add('opcionActiva')
        opcionActiva = e.target;
    });
    label.htmlFor = input.id;
    label.classList.add('opcion');
    label.textContent = opcion;

    contenedor.append(input);
    contenedor.append(label);
}

function crearOption(opcion, contenedor){
    opt = document.createElement('option');
    opt.value = opcion;
    opt.textContent = opcion;
    contenedor.append(opt);
}

{/* <select id="categoria" value="General" name="categoria" required> 
<option value="General">General</option> */}