let boton = document.querySelector('#crear');
let numPag = 5;
let meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
let siguiente = document.getElementById('siguientePagina');
let mostrarSiguiente = document.getElementById('mostrarSiguiente');
getPublicaciones();



// boton.addEventListener('click', () => {
//     main = document.querySelector('main');
//     txtUsuario = document.querySelector('#usuario');
//     txtCategoria = document.querySelector('#categoria');
//     txtContenido = document.querySelector('#comentario');
//     main.prepend(crearPublicacion(txtUsuario.value, txtCategoria.value, txtContenido.value));
//     // txtUsuario.value = txtCategoria.value = txtContenido.value = "";
// });



let publicaciones =[];

async function getPublicaciones() {
    let url = '../controller/GetPublicaciones.php';
    console.log(url);

    try{
        let respuesta = await fetch(url);    
        if(!respuesta.ok){
            throw new Error(respuesta.statusText);
        }
        
        datos = await respuesta.text();
        console.log(datos);
        publicaciones = JSON.parse(datos);
        mostrarPublicaciones();

    }catch (error){
        console.error(error.message);
    }
}

mostrarSiguiente.addEventListener('click', (e)=>{
    numPag += 5;
    mostrarPublicaciones();
})

function mostrarPublicaciones() {
    for(i = numPag-5; i <= numPag-1; i++ ){
        principal = document.querySelector('main .principal form');
        principal.append(crearPublicacion(publicaciones[i].username, publicaciones[i].categoria, publicaciones[i].texto, publicaciones[i].fechaCreacion));
    }
        
}

function crearPublicacion(txtUsuario, txtCategoria, txtContenido, fechaPublicacion){
    let txtFecha = comprobarFecha(fechaPublicacion);

    let publicacion = document.createElement('article');
    let postHead = document.createElement('div');
    let spanUsu = document.createElement('span');
    let span = document.createElement('span');
    let postBody = document.createElement('div');
    let postFooter = document.createElement('div');
    publicacion.classList.add('publicacion');
    postHead.classList.add('postHead');
    postBody.classList.add('postBody');
    postFooter.classList.add('postFooter');

    let usuario = document.createElement('p');
    let category = document.createElement('p');
    // let icon = document.createElement('i');
    let boton = document.createElement('button');
    let iconUsu = document.createElement('i'); 
    let contenido =  document.createElement('p');
    let fecha = document.createElement('p');
    usuario.classList.add('usuario');
    category.classList.add('category');
    contenido.classList.add('contenido');

    usuario.textContent = txtUsuario;
    iconUsu.classList.add('fa-solid', 'fa-user', 'usuario');
    iconUsu.style.color = "#800040";
    // icon.classList.add('fa-solid', 'fa-trash');
    // icon.style.color = 'red';
    category.textContent = txtCategoria;
    contenido.innerHTML = txtContenido;
    boton.type = 'submit';
    boton.name = 'perfil';
    boton.value = txtUsuario;
    fecha.textContent = txtFecha;
    
    boton.append(iconUsu);
    spanUsu.append(boton, usuario);
    postHead.append(spanUsu);
    span.append(category);
    postHead.append(span);
    postBody.append(contenido);
    postFooter.append(fecha);
    publicacion.append(postHead);
    publicacion.append(postBody);
    publicacion.append(postFooter);

    return publicacion;
}

function comprobarFecha(fecha){
    let fechaPubli = new Date(fecha);
    let hoy = new Date();
    let texto;

    if(hoy.getDate() == fechaPubli.getDate() && hoy.getMonth() == fechaPubli.getMonth() && hoy.getUTCFullYear() == fechaPubli.getUTCFullYear()){
        if(String(fechaPubli.getMinutes()).length == 1){
            texto = fechaPubli.getHours() + ':0' + fechaPubli.getMinutes();
        }else{
            texto = fechaPubli.getHours() + ':' + fechaPubli.getMinutes();
        }
    }else if(hoy.getUTCFullYear() == fechaPubli.getUTCFullYear()){
        mes = meses[+fechaPubli.getMonth() ] ;
        texto = fechaPubli.getDate() + ' ' + mes;
    }else{
        mes = +fechaPubli.getMonth() + 1;
        texto = fechaPubli.getDate() + '/' + mes + '/' + fechaPubli.getUTCFullYear();
    }

    return(texto);
}

