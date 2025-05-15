// let formCrear = document.querySelector('#formCrear');
let botonDesplegable = document.querySelectorAll('.btnDesplegable');
let textarea = false;
if(document.querySelector(".publicacionNueva textarea")){
    textarea = document.querySelector(".publicacionNueva textarea");
}
const botonCrear = document.querySelector('#crear');
const postFooter = document.querySelector('.publicacionNueva .postFooter');
const botonImg = document.querySelector('.publicacionNueva .postFooter span');
const proxEventos = document.querySelector('.proxEventos');
const asideFiltros = document.querySelector('.filtros');
const btnFiltros = document.querySelector('.mostrarFiltros');
const btnOcultarFiltros = document.querySelector('.ocultarFiltros');
let selectCategoria = false;
if(document.getElementById('categoria')){
    selectCategoria = document.getElementById('categoria');
}

let cargando = document.getElementById('cargandoEventos');

let filtroCat = document.getElementById('filtroCategoria');
let categorias = [];
let abierto = false;
getEventos();
getCategorias();


botonDesplegable.forEach(boton => {
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        let div = e.target.nextElementSibling;
        div.classList.toggle('noVisible');
        div.style.height = 'auto';
    })
});


if(textarea){
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

}

async function getEventos() {
    let url = '../../controller/GetEventos.php';

    try{
        let respuesta = await fetch(url);    
        if(!respuesta.ok){
            throw new Error(respuesta.statusText);
        }

        datos = await respuesta.text();
        console.log(datos);
        evento = JSON.parse(datos);

        evento.forEach(ev =>{
            proxEventos.append(crearEvento(ev));
        })
        cargando.style.display = 'none';
    }catch (error){
        console.error(error.message);
    }
}

async function getCategorias() {
    
    let url = '../../controller/GetCategorias.php';

    try{
        let respuesta = await fetch(url);    
        if(!respuesta.ok){
            throw new Error(respuesta.statusText);
        }

        datos = await respuesta.text();
        cat = JSON.parse(datos);

        cat.forEach(categoria =>{
            crearRadio(categoria.id, 'categoria', filtroCat);
            if(selectCategoria){
                crearOption(categoria.id, selectCategoria);
            }
            
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

function crearEvento(ev){
    let article = document.createElement('article');
    let artHeader = document.createElement('span');
    let titulo = document.createElement('h3');
    let categoria = document.createElement('p');
    let descripcion = document.createElement('p');
    let textoFecha = document.createElement('p');
    let fecha = new Date(ev.fecha);

    titulo.textContent = ev.titulo;
    categoria.textContent = ev.categoria;
    descripcion.textContent = ev.descripcion;

    let minutos = fecha.getMinutes();
    if(String(minutos).length == 1){
        minutos = `0${minutos}`;
    }
    let dia = fecha.getDate();
    if(String(dia).length == 1){
        dia = `0${dia}`;
    }
    let mes = +fecha.getMonth() +1;
    if(String(mes).length == 1){
        mes = `0${mes}`;
    }

    textoFecha.innerHTML = fecha.getHours() + ':' + minutos +  '<br>' + dia + '/' + mes + '/' + fecha.getFullYear();

    article.classList.add('evento');
    artHeader.append(titulo, categoria);
    article.append(artHeader);
    article.append(descripcion);
    article.append(textoFecha);

    return article;
}

btnFiltros.addEventListener('click', ()=>{
    btnOcultarFiltros.style.display = 'block';
    asideFiltros.style.display = 'flex';
    btnFiltros.style.display = 'none';
});

btnOcultarFiltros.addEventListener('click', ()=>{
    btnOcultarFiltros.style.display = 'none';
    asideFiltros.style.display = 'none';
    btnFiltros.style.display = 'block';
})

document.getElementById('inputImagen').addEventListener('change', (evento) => {
    console.log('hola');
  const file = evento.target.files[0];
  const previsualizacion = document.getElementById('previsualizacion');


    const reader = new FileReader();
    
    reader.onload = function(e) {
      previsualizacion.src = e.target.result;
    };
    
    reader.readAsDataURL(file);
});
{/* <select id="categoria" value="General" name="categoria" required> 
<option value="General">General</option> */}